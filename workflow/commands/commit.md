# Commit Changes

You package work for the active portfolio repo (`career-portfolio` or `ai-portfolio`): create clean git commits and update `.documents/CHANGELOG.md`. Keep `workflow/README.md` + `workflow/tooling.config.json` handy for repo paths and tool fallbacks.

---

## Process (Overview)
1) **Think about what changed**  
2) **Plan your commit(s)**  
3) **Present your plan to the user (confirm)**  
4) **Execute upon confirmation**  
5) **Update `.documents/CHANGELOG.md` (confirm version title, then commit)**

> 🔐 **Policy guardrails**  
> - Do **not** add co-authors or tool attributions.  
> - Commits are authored solely by the user.  
> - Write commit messages as if the user wrote them.  
> - Never use `git add -A` or `git add .` — always stage **specific files**.
> - Do **not** consider the flow complete until `.documents/CHANGELOG.md` is updated and committed (unless the user explicitly says to skip changelog updates).

---

## 1) Think About What Changed
- Review conversation history to understand intent and outcomes.
- Inspect the repo state:
  ```bash
  git status
  git diff
  ```
- Decide if changes should be **one commit** or **multiple atomic commits** tied to the active ticket/plan in `.documents/.tickets` or `.documents/.plans`.

**Checklist**
- [ ] I understand the scope of changes.
- [ ] I know which files were modified and why.

---

## 2) Plan Your Commit(s)
- Group **related files** together into logical commits.
- Draft **imperative** commit messages that explain **why** (not only what).
  - Conventional Commits style is encouraged (`feat:`, `fix:`, `docs:`, `refactor:`, `perf:`, `build:`, `ci:`, `test:`).
- Keep commits **focused and atomic**.

**Checklist**
- [ ] Files grouped by logical concern.
- [ ] Commit subjects are imperative, concise, and meaningful.
- [ ] Bodies (if needed) explain why/how and any side effects.

---

## 3) Present Your Plan (Confirmation Required)
Share the plan before committing:
- List the **files** to stage for each commit.
- Provide the **exact commit message(s)**.
- Ask explicitly:  
  **“I plan to create [N] commit(s) with these changes. Shall I proceed?”**

**Example format**
```text
Commit 1
  Files:
    - index.html
    - script.js
  Message:
    feat(portfolio): improve project filtering interactions

Commit 2
  Files:
    - workflow/README.md
  Message:
    docs: align prompts with shared portfolio workflow
```

**Checklist**
- [ ] User has confirmed N commits and their messages.

---

## 4) Execute Upon Confirmation
Perform the exact staged adds and commits you proposed (no `-A`, no `.`):
```bash
git add path/to/fileA.ts path/to/fileB.ts
git commit -m "feat(scope): add X to enable Y because Z"

git add path/to/fileC.md
git commit -m "docs: update README with setup notes"
```
Show the result:
```bash
git log --oneline -n 5
```

**Checklist**
- [ ] Only intended files were staged.
- [ ] Commits created with the planned messages.
- [ ] Short log shown to the user.

---

## 5) Update `.documents/CHANGELOG.md` (Portfolio Release format; confirm title first)

**Target file:** `.documents/CHANGELOG.md`  
**Goal:** Add a new top entry using the shared Portfolio Release format and map bullets to the commits you just created.

### 5.1 Header Format & Bumps
- Header format:  
  ```text
  ## Portfolio Release <MAJOR>.<MINOR> — <YYYY-MM-DD>
  ```
- Default **patch** bump: increment `<MINOR>` by 1 (e.g., `Beta 1.0 → 1.1 → 1.2`).
- Larger release: increment `<MAJOR>` and reset `<MINOR>=0` (e.g., `Beta 1.4 → Beta 2.0`).
- Always confirm with the user which bump applies and the exact header text before editing.

### 5.2 Bootstrap If Missing
```bash
mkdir -p .documents
cat > .documents/CHANGELOG.md <<'EOF_CHANGELOG'
# Changelog

All notable changes to this project will be documented here.
Entries follow Keep a Changelog conventions and the Portfolio Release version style.
Dates are in YYYY-MM-DD, newest entries go on top.

EOF_CHANGELOG
```

### 5.3 Compute the Next Title
Use the highest MVP version even if the file is out of order:
```bash
LAST_TITLE=$(grep -E '^## Portfolio Release [0-9]+\.[0-9]+' .documents/CHANGELOG.md | sort -V -k4,4 | tail -n1)
DATE=$(date +"%Y-%m-%d")

if [ -z "$LAST_TITLE" ]; then
  MAJOR=1
  MINOR=0
else
  MAJOR=$(echo "$LAST_TITLE" | awk '{print $4}' | cut -d'.' -f1)
  MINOR=$(echo "$LAST_TITLE" | awk '{print $4}' | cut -d'.' -f2)
fi

NEXT_TITLE="Portfolio Release ${MAJOR}.$((MINOR+1))"
echo "Proposed NEXT_TITLE: $NEXT_TITLE — $DATE"
```
If the user requests a larger bump:
```bash
NEXT_TITLE="Portfolio Release $((MAJOR+1)).0"
```

### 5.4 Sections & Bullets
- Prefer Keep a Changelog sections and the ones already used in this repo (Added, Changed, Fixed, Docs, Tooling, Tickets, etc.). Skip empty sections.
- Map Conventional Commit types to sections: `feat`→Added, `fix`→Fixed, `refactor`→Changed, `docs`→Docs, `perf`→Performance, `build`→Build, `ci`→CI, `test`→Test.
- Bullets are **imperative**, concise, and include the “why” when not obvious.
- Append ticket/plan provenance inline, mirroring existing entries:  
  `(Ticket: TICKET-####-slug-YYYY-MM-DD, Plan: PLAN-####-slug-YYYY-MM-DD | direct request)`.  
  If uncertain, ask the user before finalizing.

### 5.5 Entry Placement
- Prepend the new version block at the **top** so the latest MVP is first.
- If older entries are out of order, reorder so newest → oldest before saving.

### 5.6 Choose Entry Mode
- **Per-Commit**: create a new version header per commit (default if unspecified).
- **Batch**: one version header summarizing the commits you just made.
Ask which mode to use if not stated.

### 5.7 Template (Prepend at Top)
```markdown
## Portfolio Release X.Y — YYYY-MM-DD

### Added
- feat(scope): summary + why (Ticket: ..., Plan: ...)

### Changed
- refactor(scope): summary + why (Ticket: ..., Plan: ...)

### Fixed
- fix(scope): summary + why (Ticket: ..., Plan: ...)

### Docs
- docs(scope): documentation updates (Ticket: ..., Plan: ...)

### Tooling
- build(scope): tooling updates (Ticket: ..., Plan: ...)

### Tickets
- ticket(scope): ticket hygiene (Ticket: ..., Plan: ...)

#### Commit details
- `HASH` — **subject**  
  *Files*: path/one.ts, path/two.tsx  
  *Notes*: short why/impact/testing
```
Remove empty sections before saving.

### 5.8 Handy Commands
```bash
# Show last N commit subjects + hashes (the ones you just created)
git log -n 5 --pretty=format:'%h %s'

# Files changed in a specific commit
git show --name-only --pretty=format:'' <HASH> | sed '/^$/d'
```

---

## Mandatory Finalization
If a changelog update is the only file modified after feature/docs commits, create a final changelog commit:
```bash
git add .documents/CHANGELOG.md
git commit -m "docs(changelog): update Portfolio Release X.Y"
```

Before ending the command, verify:
```bash
git status --short
```
If output is not empty, explain why and ask whether to include remaining files in a follow-up commit.
