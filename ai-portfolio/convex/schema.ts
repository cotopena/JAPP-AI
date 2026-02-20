import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const socialLinkValidator = v.object({
  label: v.string(),
  url: v.string(),
});

const skillGroupValidator = v.object({
  category: v.string(),
  items: v.array(v.string()),
});

const projectValidator = v.object({
  slug: v.string(),
  title: v.string(),
  category: v.string(),
  summary: v.string(),
  impact: v.string(),
  stack: v.array(v.string()),
  year: v.number(),
  featured: v.boolean(),
  link: v.optional(v.string()),
});

export default defineSchema({
  portfolio: defineTable({
    slug: v.string(),
    name: v.string(),
    role: v.string(),
    location: v.string(),
    intro: v.string(),
    longBio: v.string(),
    valueProp: v.string(),
    availability: v.string(),
    email: v.string(),
    socials: v.array(socialLinkValidator),
    quickPrompts: v.array(v.string()),
    highlightBullets: v.array(v.string()),
    skillGroups: v.array(skillGroupValidator),
    projects: v.array(projectValidator),
    updatedAt: v.number(),
  }).index("by_slug", ["slug"]),
  conversations: defineTable({
    sessionId: v.string(),
    startedAt: v.number(),
    updatedAt: v.number(),
  }).index("by_session_id", ["sessionId"]),
  messages: defineTable({
    conversationId: v.id("conversations"),
    messageId: v.string(),
    role: v.union(v.literal("user"), v.literal("assistant")),
    text: v.string(),
    createdAt: v.number(),
  })
    .index("by_conversation", ["conversationId", "createdAt"])
    .index("by_message_id", ["messageId"]),
});
