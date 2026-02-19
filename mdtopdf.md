# mdtopdf

Single command to render markdown files into consistent, professional PDFs.

## Command

From repo root:

```bash
./mdtopdf "/absolute/path/to/file.md"
```

From any directory:

```bash
"/Users/coto/Documents/Job Application AI/mdtopdf" "/absolute/path/to/file.md"
```

## One-Time Setup

```bash
cd "/Users/coto/Documents/Job Application AI"
./mdtopdf --setup
```

This creates `.venv-pdf`, installs pinned dependencies, and installs Chromium for Playwright.

## Standard Usage

Auto-select style from filename:

```bash
./mdtopdf "/absolute/path/to/file.md" --profile auto
```

Auto mode behavior:
- Filenames containing `cv` -> `cv` style
- Filenames containing `cover` -> `cover` style
- Everything else -> `resume` style

Force resume style:

```bash
./mdtopdf "/absolute/path/to/resume.md" --profile resume
```

Force CV style:

```bash
./mdtopdf "/absolute/path/to/cv.md" --profile cv
```

Force cover letter style:

```bash
./mdtopdf "/absolute/path/to/cover_letter.md" --profile cover
```

Render multiple files in one call:

```bash
./mdtopdf "/abs/resume.md" "/abs/cv.md" --profile auto
```

## Output Rules

- Output PDF is written next to the markdown file with the same base name.
- Example: `My_Resume.md` -> `My_Resume.pdf`
- Use `--output "/path/custom.pdf"` only with a single input file.

## Consistency and Quality Rules

The command enforces consistency with:

- Pinned dependencies: `scripts/requirements_pdf.txt`
- Fixed renderer: `scripts/render_markdown_pdf.py`
- Versioned style presets:
  - `templates/pdf/resume.css`
  - `templates/pdf/cv.css`
  - `templates/pdf/cover.css`
- Preflight lint checks that fail fast for common markdown traps.

## Styling Controls

To change the look globally, edit:

- Resume style: `templates/pdf/resume.css`
- CV style: `templates/pdf/cv.css`
- Cover letter style: `templates/pdf/cover.css`

Recommended changes for consistent output:

- Keep base font between `10pt` and `11pt`
- Keep line height between `1.3` and `1.4`
- Keep page margins at `0.35in` to `0.5in`
- Keep section headings uppercase and visually distinct
- Keep role heading + date blocks non-breaking

## Common Pitfall (Already Guarded)

This fails lint by default:

```md
- #1 Sales Rep (2017), Company
```

Use this instead:

```md
- Top Sales Rep (2017), Company
```

If you intentionally want to bypass lint:

```bash
./mdtopdf "/absolute/path/to/file.md" --allow-issues
```

## Troubleshooting

If command says PDF environment is missing:

```bash
./mdtopdf --setup
```

If setup already exists but something looks broken:

```bash
rm -rf "/Users/coto/Documents/Job Application AI/.venv-pdf"
./mdtopdf --setup
```
