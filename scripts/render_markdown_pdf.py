#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
import sys
import tempfile
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
STYLE_DIR = ROOT / "templates" / "pdf"
DEFAULT_STYLE_BY_PROFILE = {
    "resume": STYLE_DIR / "resume.css",
    "cv": STYLE_DIR / "cv.css",
}


@dataclass
class LintIssue:
    line: int
    message: str
    text: str


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Render markdown files to consistent PDF output."
    )
    parser.add_argument(
        "inputs",
        nargs="+",
        help="One or more markdown files to render.",
    )
    parser.add_argument(
        "--output",
        help="Output PDF path. Only valid with a single input.",
    )
    parser.add_argument(
        "--profile",
        choices=["resume", "cv", "auto"],
        default="auto",
        help="Style profile to apply. Default infers profile from filename.",
    )
    parser.add_argument(
        "--css",
        help="Override CSS file path (optional).",
    )
    parser.add_argument(
        "--allow-issues",
        action="store_true",
        help="Render even if lint issues are found.",
    )
    parser.add_argument(
        "--keep-html",
        action="store_true",
        help="Keep generated HTML next to markdown source.",
    )
    return parser.parse_args()


def infer_profile(path: Path) -> str:
    stem = path.stem.lower()
    if "cv" in stem:
        return "cv"
    return "resume"


def lint_markdown(markdown_text: str) -> list[LintIssue]:
    issues: list[LintIssue] = []
    bullet_heading_pattern = re.compile(r"^\s*[-*+]\s*#\S")
    bad_nbsp_pattern = re.compile(r"\u00a0")

    for idx, raw_line in enumerate(markdown_text.splitlines(), start=1):
        if bullet_heading_pattern.search(raw_line):
            issues.append(
                LintIssue(
                    line=idx,
                    message="Bullet starts with '#', which renders as an oversized heading.",
                    text=raw_line.strip(),
                )
            )
        if "\t" in raw_line:
            issues.append(
                LintIssue(
                    line=idx,
                    message="Tab character found; tabs can cause inconsistent wrapping.",
                    text=raw_line.strip(),
                )
            )
        if bad_nbsp_pattern.search(raw_line):
            issues.append(
                LintIssue(
                    line=idx,
                    message="Non-breaking space found; pasted characters can cause layout drift.",
                    text=raw_line.strip(),
                )
            )
    return issues


def wrap_role_headers(html_body: str) -> str:
    pattern = (
        r"(<h3>.*?</h3>\s*<p>.*?\|\s*\d{2}/\d{4}\s*-\s*(?:Present|\d{2}/\d{4}).*?</p>)"
    )
    return re.sub(
        pattern,
        r'<div class="role-head">\1</div>',
        html_body,
        flags=re.DOTALL,
    )


def build_html(markdown_text: str, css_text: str, title: str, profile: str) -> str:
    try:
        import markdown  # type: ignore
    except Exception as exc:
        raise RuntimeError(
            "Missing dependency: markdown. Install with "
            "`pip install -r scripts/requirements_pdf.txt`."
        ) from exc

    body = markdown.markdown(
        markdown_text,
        extensions=["extra", "tables", "sane_lists", "nl2br"],
        output_format="html5",
    )
    body = wrap_role_headers(body)
    return f"""<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title}</title>
  <style>{css_text}</style>
</head>
<body class="doc doc--{profile}">
  <main class="doc-main">
{body}
  </main>
</body>
</html>
"""


def render_pdf(html_path: Path, pdf_path: Path) -> None:
    try:
        from playwright.sync_api import sync_playwright  # type: ignore
    except Exception as exc:
        raise RuntimeError(
            "Missing dependency: playwright. Install with "
            "`pip install -r scripts/requirements_pdf.txt` and then "
            "`python -m playwright install chromium`."
        ) from exc

    try:
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch()
            page = browser.new_page()
            page.goto(html_path.as_uri(), wait_until="networkidle")
            page.pdf(
                path=str(pdf_path),
                format="Letter",
                margin={
                    "top": "0.35in",
                    "right": "0.35in",
                    "bottom": "0.35in",
                    "left": "0.35in",
                },
                print_background=True,
            )
            browser.close()
    except Exception as exc:
        raise RuntimeError(
            "Playwright could not render PDF. Ensure Chromium is installed with "
            "`python -m playwright install chromium`."
        ) from exc


def resolve_output_path(input_path: Path, output_arg: str | None) -> Path:
    if output_arg:
        return Path(output_arg).expanduser().resolve()
    return input_path.with_suffix(".pdf")


def resolve_css_path(profile: str, css_arg: str | None) -> Path:
    if css_arg:
        css_path = Path(css_arg).expanduser().resolve()
        if not css_path.exists():
            raise FileNotFoundError(f"CSS file not found: {css_path}")
        return css_path
    css_path = DEFAULT_STYLE_BY_PROFILE[profile]
    if not css_path.exists():
        raise FileNotFoundError(f"Default CSS file not found: {css_path}")
    return css_path


def main() -> int:
    args = parse_args()

    if args.output and len(args.inputs) > 1:
        print("--output can only be used with a single input file.")
        return 1

    had_error = False

    for input_arg in args.inputs:
        input_path = Path(input_arg).expanduser().resolve()
        if not input_path.exists():
            print(f"Input file not found: {input_path}")
            had_error = True
            continue
        if input_path.suffix.lower() not in {".md", ".markdown"}:
            print(f"Input must be markdown: {input_path}")
            had_error = True
            continue

        profile = infer_profile(input_path) if args.profile == "auto" else args.profile

        markdown_text = input_path.read_text(encoding="utf-8")
        lint_issues = lint_markdown(markdown_text)
        if lint_issues:
            print(f"\nLint issues in {input_path}:")
            for issue in lint_issues:
                print(f"  - line {issue.line}: {issue.message}")
                print(f"    {issue.text}")
            if not args.allow_issues:
                print("Fix lint issues or re-run with --allow-issues.")
                had_error = True
                continue

        try:
            css_path = resolve_css_path(profile, args.css)
            css_text = css_path.read_text(encoding="utf-8")
            html = build_html(
                markdown_text=markdown_text,
                css_text=css_text,
                title=input_path.stem.replace("_", " "),
                profile=profile,
            )
        except (RuntimeError, FileNotFoundError) as exc:
            print(f"Failed: {input_path}\n  {exc}")
            had_error = True
            continue

        output_pdf = resolve_output_path(input_path, args.output)
        output_pdf.parent.mkdir(parents=True, exist_ok=True)

        temp_html_path: Path | None = None
        if args.keep_html:
            html_path = input_path.with_suffix(".html")
            html_path.write_text(html, encoding="utf-8")
        else:
            temp_file = tempfile.NamedTemporaryFile(suffix=".html", delete=False)
            temp_file.close()
            temp_html_path = Path(temp_file.name)
            temp_html_path.write_text(html, encoding="utf-8")
            html_path = temp_html_path

        try:
            render_pdf(html_path, output_pdf)
            print(f"Rendered: {output_pdf}")
        except RuntimeError as exc:
            print(f"Failed: {input_path}\n  {exc}")
            had_error = True
        finally:
            if temp_html_path and temp_html_path.exists():
                temp_html_path.unlink()

    return 1 if had_error else 0


if __name__ == "__main__":
    sys.exit(main())
