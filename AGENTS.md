# Repository Guidelines

## Project Structure & Module Organization
- Root files: `Augusto_Pena_Resume.md` (base resume), `experience_bank.md` (full experience inventory), and `README.md` (usage overview).
- Automation: `scripts/new_application.py` generates new application folders and files.
- Templates: `templates/cover_letter_template.md` and `templates/application_notes_template.md` provide reusable scaffolding.
- Applications: All application folders live under `applications/`. Each company has its own directory, with a position subfolder and tailored outputs. Example: `applications/Acme Corp/Senior Sales Manager/`.
- Tracking: Pipeline and communication tracking files live under `tracking/` (`application_tracker.csv`, `communication_log.csv`).

## Build, Test, and Development Commands
- `python3 scripts/new_application.py`: Interactive wizard to create a new application package.
- `python3 scripts/new_application.py --help`: View supported flags (company, position, job description file, etc.).
- No build step is required; this repo is a content and tooling workspace.

## Coding Style & Naming Conventions
- Markdown files use concise headings, short paragraphs, and bullet lists.
- File naming pattern for generated content:
  - `Augusto_Pena_{Company}_{Position}_Resume.md`
  - `Augusto_Pena_{Company}_{Position}_Cover_Letter.md`
  - `Job_Description_{Company}_{Position}.md`
  - `Application_Notes_{Company}_{Position}.md`
- Directory naming uses readable company and position names (avoid slashes and special characters).
- Prefer ASCII characters in filenames and content unless the source text requires otherwise.

## Testing Guidelines
- No automated tests are currently defined.
- If you add scripts or validation checks, document how to run them in `README.md`.

## Commit & Pull Request Guidelines
- Use short, imperative commit summaries (e.g., "Add application generator script").
- PRs should describe the job target, list updated files, and note any new templates or workflow changes.

## Security & Configuration Tips
- Job descriptions may contain sensitive or proprietary data. Store them only as needed and avoid sharing externally.
- Keep personal contact details consistent across resume and cover letter templates.

## Agent-Specific Workflow
- Start with the base resume, then tailor to the job description.
- Use `experience_bank.md` to add relevant achievements that may not appear on the base resume.
- When creating a new application, prefer the script to ensure consistent structure and naming.
