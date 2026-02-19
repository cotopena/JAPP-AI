# Job Application AI

This repo keeps a base resume and generates a clean, repeatable folder structure for each job application.

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
  --job-description-file "/path/to/job_description.md"
```

Fully non-interactive run (useful for repeatable workflows):

```
python3 scripts/new_application.py \
  --non-interactive \
  --company "Example Corp" \
  --position "Senior Sales Manager" \
  --job-description-file "/path/to/job_description.md" \
  --skip-questions
```

## What Gets Created

For each application, the script creates:

```
Company Name/
  Position Title/
    Augusto_Pena_{Company}_{Position}_Resume.md
    Augusto_Pena_{Company}_{Position}_Cover_Letter.md
    Job_Description_{Company}_{Position}.md
    Application_Notes_{Company}_{Position}.md
```

## Core Files

- `Augusto_Pena_Resume.md` is the base resume that gets copied for each role.
- `experience_bank.md` is the full experience inventory to pull from when tailoring.
- `templates/` contains reusable templates for cover letters and notes.
- `scripts/new_application.py` creates the folder and files.

## Useful Flags

- `--dry-run`: Preview what would be created, updated, or skipped without writing files.
- `--force`: Overwrite generated files if they already exist.
- `--non-interactive`: Disable prompts and require all needed values through flags.
- `--experience-bank`: Choose a different experience bank file for notes auto-match.
- `--max-matches`: Control how many matched bullets are inserted into notes.
- `--no-auto-match`: Skip job-description keyword matching against the experience bank.

## Suggested Workflow

1. Paste the job description and run the script.
2. Review `Application_Notes_*.md`, especially the auto-filled keywords and matched experience bullets.
3. Fill gaps in notes using `experience_bank.md`.
4. Tailor the copied resume and cover letter for the role.
