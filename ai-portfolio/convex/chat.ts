import type { Id } from "./_generated/dataModel";
import type { MutationCtx } from "./_generated/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const messageRoleValidator = v.union(v.literal("user"), v.literal("assistant"));

async function ensureConversation(
  ctx: MutationCtx,
  sessionId: string,
): Promise<Id<"conversations">> {
  const existing = await ctx.db
    .query("conversations")
    .withIndex("by_session_id", (q) => q.eq("sessionId", sessionId))
    .unique();

  if (existing) {
    await ctx.db.patch(existing._id, { updatedAt: Date.now() });
    return existing._id;
  }

  return await ctx.db.insert("conversations", {
    sessionId,
    startedAt: Date.now(),
    updatedAt: Date.now(),
  });
}

export const saveMessage = mutation({
  args: {
    sessionId: v.string(),
    messageId: v.string(),
    role: messageRoleValidator,
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const trimmedText = args.text.trim();
    if (trimmedText.length === 0) {
      return null;
    }

    const existingMessage = await ctx.db
      .query("messages")
      .withIndex("by_message_id", (q) => q.eq("messageId", args.messageId))
      .unique();

    if (existingMessage) {
      return existingMessage._id;
    }

    const conversationId = await ensureConversation(ctx, args.sessionId);
    return await ctx.db.insert("messages", {
      conversationId,
      messageId: args.messageId,
      role: args.role,
      text: trimmedText,
      createdAt: Date.now(),
    });
  },
});

export const getMessagesBySession = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const conversation = await ctx.db
      .query("conversations")
      .withIndex("by_session_id", (q) => q.eq("sessionId", args.sessionId))
      .unique();

    if (!conversation) {
      return [];
    }

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) => q.eq("conversationId", conversation._id))
      .collect();

    const orderedMessages = [...messages].sort((a, b) => a.createdAt - b.createdAt);

    return orderedMessages.map((message) => ({
      id: message.messageId,
      role: message.role,
      parts: [{ type: "text" as const, text: message.text }],
    }));
  },
});
