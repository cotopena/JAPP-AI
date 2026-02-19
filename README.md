# Job Application AI

This repo keeps a base resume and generates a clean, repeatable structure for each job application, with a central tracker for status and follow-ups.

## Quick Start

Run the helper script and answer the prompts:

```
python3 scripts/new_application.py
```

Or pass arguments directly:

```
python3 scripts/new_application.py \
  --company "Example Corp" \
  --position "Senior Sales Manager" \
  --job-description-file "/path/to/job_description.md" \
  --status "Applied" \
  --applied-date "2026-02-19" \
  --next-action "Follow up with recruiter in 5 business days"
```

Fully non-interactive run (useful for repeatable workflows):

```
python3 scripts/new_application.py \
  --non-interactive \
  --company "Example Corp" \
  --position "Senior Sales Manager" \
  --job-description-file "/path/to/job_description.md" \
  --status "Drafting" \
  --skip-questions
```

## What Gets Created

For each application, the script creates:

```
applications/
  Company Name/
    Position Title/
      Augusto_Pena_{Company}_{Position}_Resume.md
      Augusto_Pena_{Company}_{Position}_Cover_Letter.md
      Job_Description_{Company}_{Position}.md
      Application_Notes_{Company}_{Position}.md
```

The script also creates or updates:
- `tracking/application_tracker.csv` (status, applied date, response state, next action, folder path)

## Core Files

- `Augusto_Pena_Resume.md` is the base resume that gets copied for each role.
- `experience_bank.md` is the full experience inventory to pull from when tailoring.
- `trd_analyst.md` is a reusable writeup for the January 2022 local-first AI Analyst prototype.
- `templates/` contains reusable templates for cover letters and notes.
- `scripts/new_application.py` creates the folder and files.
- `tracking/application_tracker.csv` is the main pipeline tracker.
- `tracking/communication_log.csv` stores inbound/outbound company communication history.

## Useful Flags

- `--dry-run`: Preview what would be created, updated, or skipped without writing files.
- `--force`: Overwrite generated files if they already exist.
- `--non-interactive`: Disable prompts and require all needed values through flags.
- `--base-dir`: Override the output root (default: `applications/`).
- `--tracker-file`: Override tracker CSV path (default: `tracking/application_tracker.csv`).
- `--skip-tracker-update`: Generate files without modifying tracker CSV.
- `--status`: Set or update tracker status (for example `Drafting`, `Applied`, `Interview`).
- `--applied-date`: Set applied date in `YYYY-MM-DD` format.
- `--next-action`: Set next follow-up action in tracker.
- `--experience-bank`: Choose a different experience bank file for notes auto-match.
- `--max-matches`: Control how many matched bullets are inserted into notes.
- `--no-auto-match`: Skip job-description keyword matching against the experience bank.

## Suggested Workflow

1. Paste the job description and run `scripts/new_application.py`.
2. Review `Application_Notes_*.md`, including the status snapshot and communication log section.
3. Tailor the copied resume and cover letter for the role.
4. When you apply, update `tracking/application_tracker.csv` (`status`, `date_applied`, `next_action`).
5. When companies respond, append to `tracking/communication_log.csv` and update `response_state` in `tracking/application_tracker.csv`.

## Isolated Career Portfolio

- `career-portfolio/` contains a standalone static website for interactive career trajectory and project showcases.
- It is intentionally isolated from application-generation scripts and tracking files.
- Run locally with:

```bash
cd "/Users/coto/Documents/Job Application AI/career-portfolio"
python3 -m http.server 8080
```
