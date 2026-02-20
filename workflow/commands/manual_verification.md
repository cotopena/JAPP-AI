# Manual Verification

Validate implemented changes through hands-on browser checks. This session **must not modify code**. Only update the plan checklist with pass/fail evidence.

## Before You Run
- Read `workflow/README.md` for the expected flow and artifact locations.
- Consult `workflow/tooling.config.json` for plan paths and tool fallbacks.
- Confirm you have the target plan path (usually `.documents/.plans/current_plan/PLAN-####-...`).
- If browser automation is needed, ensure Chrome DevTools MCP and/or Playwright MCP are available.

## Guardrails
- Do not edit source files (`index.html`, `styles.css`, `script.js`) during this command.
- Only update checklist state in the plan file (`[ ]` to `[x]`) plus short evidence notes.
- Do not invent credentials, feature flags, or environment values; ask the user when missing.
- Keep evidence in terminal/session output (screenshots, console notes, network notes).

## Workflow
1. Load the plan and list pending manual checks.
2. Start local preview if needed:
   - `python3 -m http.server 8080`
3. Run checks one by one (desktop and mobile viewport when relevant).
4. Capture evidence for each check:
   - page URL + step summary
   - console/network errors if any
   - screenshot references when helpful
5. Update the plan checklist inline:
   - Pass: `- [x] <item> - Passed: <short evidence>`
   - Fail/blocked: keep `[ ]`, append `Fails:` or `Blocked:` and reason
6. Report outcomes and next actions in the conversation.

## Reporting Template
```text
Manual Verification Results - <plan path>
- ✅ <check>: <evidence>
- ❌ <check>: <failure summary>
- ⏸️ <check>: <blocker>

Next steps:
1. ...
2. ...
```

## DevTools / Playwright Quick Reference
- Use Playwright MCP for deterministic flow replay.
- Use DevTools MCP for console/network/performance evidence.
- Prefer minimal, reproducible steps that another engineer can repeat quickly.

## Troubleshooting
- UI not loading: confirm the local server is running and correct path is open.
- Missing plan details: pause and ask for exact plan path or expected behavior.
- Flaky behavior: rerun with a clean reload and note browser/device conditions.

Stay disciplined: manual verification confirms behavior; implementation changes happen in separate sessions.
