#!/usr/bin/env python3
import argparse
from collections import Counter
from datetime import date
from pathlib import Path
import re
import shutil
import sys
from string import Template

ROOT = Path(__file__).resolve().parents[1]
TEMPLATES_DIR = ROOT / "templates"
DEFAULT_EXPERIENCE_BANK = ROOT / "experience_bank.md"

STOPWORDS = {
    "a",
    "an",
    "and",
    "are",
    "as",
    "at",
    "be",
    "by",
    "for",
    "from",
    "has",
    "have",
    "if",
    "in",
    "into",
    "is",
    "it",
    "its",
    "of",
    "on",
    "or",
    "that",
    "the",
    "their",
    "this",
    "to",
    "with",
    "you",
    "your",
    "we",
    "our",
    "will",
    "can",
    "ability",
    "about",
    "across",
    "all",
    "also",
    "any",
    "based",
    "both",
    "candidate",
    "candidates",
    "company",
    "day",
    "each",
    "ensure",
    "excellent",
    "experience",
    "high",
    "including",
    "job",
    "knowledge",
    "level",
    "looking",
    "must",
    "need",
    "new",
    "other",
    "preferred",
    "required",
    "requirements",
    "role",
    "strong",
    "team",
    "work",
    "working",
}


def normalize_word(word: str) -> str:
    if word.isupper() or word.isdigit():
        return word
    return word[:1].upper() + word[1:]


def slugify(text: str) -> str:
    parts = re.findall(r"[A-Za-z0-9]+", text)
    if not parts:
        return "Unknown"
    return "".join(normalize_word(part) for part in parts)


def safe_dir_name(text: str) -> str:
    cleaned = re.sub(r'[\\/:*?"<>|]+', "-", text.strip())
    cleaned = re.sub(r"\s+", " ", cleaned)
    return cleaned or "Unknown"


def prompt_non_empty(prompt: str) -> str:
    while True:
        value = input(prompt).strip()
        if value:
            return value
        print("Please enter a value.")


def prompt_optional_multiline(prompt: str) -> str:
    print(prompt)
    print("Finish by entering a single line with EOF")
    lines = []
    while True:
        line = input()
        if line.strip() == "EOF":
            break
        lines.append(line)
    return "\n".join(lines).strip()


def read_text_file(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def load_template(name: str) -> str:
    template_path = TEMPLATES_DIR / name
    if not template_path.exists():
        return ""
    return template_path.read_text(encoding="utf-8")


def file_action(path: Path, force: bool) -> str:
    if path.exists():
        return "update" if force else "skip"
    return "create"


def extract_keywords(text: str) -> list[str]:
    tokens = re.findall(r"[A-Za-z0-9]+", text.lower())
    filtered = []
    for token in tokens:
        if token in STOPWORDS:
            continue
        if token.isdigit():
            continue
        if len(token) < 2:
            continue
        filtered.append(token)
    return filtered


def parse_experience_bank(path: Path) -> list[tuple[str, str]]:
    section = "General"
    entries = []
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if line.startswith("## "):
            section = line[3:].strip() or "General"
            continue
        if not line.startswith("- "):
            continue
        bullet = line[2:].strip()
        if not bullet or bullet == "-":
            continue
        if bullet.lower().startswith("additional details"):
            continue
        entries.append((section, bullet))
    return entries


def build_experience_matches(
    job_description: str, experience_bank_path: Path, max_matches: int
) -> tuple[list[str], list[tuple[str, str]]]:
    job_keywords = extract_keywords(job_description)
    if not job_keywords:
        return [], []

    keyword_counts = Counter(job_keywords)
    keyword_set = set(keyword_counts.keys())
    scored_entries = []

    for section, bullet in parse_experience_bank(experience_bank_path):
        bullet_tokens = set(extract_keywords(bullet))
        overlap = bullet_tokens.intersection(keyword_set)
        if not overlap:
            continue
        score = sum(keyword_counts[token] for token in overlap) + (0.1 * len(overlap))
        if any(char.isdigit() for char in bullet):
            score += 0.2
        scored_entries.append((score, section, bullet))

    scored_entries.sort(key=lambda item: (-item[0], item[1], item[2]))

    matches = []
    seen_bullets = set()
    for _, section, bullet in scored_entries:
        if bullet in seen_bullets:
            continue
        seen_bullets.add(bullet)
        matches.append((section, bullet))
        if len(matches) >= max_matches:
            break

    priority_keywords = [keyword for keyword, _ in keyword_counts.most_common(12)]
    return priority_keywords, matches


def format_keywords(keywords: list[str]) -> str:
    if not keywords:
        return "- Add role-specific keywords from the posting."
    return "\n".join(f"- {keyword}" for keyword in keywords)


def format_matches(matches: list[tuple[str, str]]) -> str:
    if not matches:
        return "- Add matching bullets from experience_bank.md."
    return "\n".join(f"- [{section}] {bullet}" for section, bullet in matches)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Create a new application folder with resume, cover letter, and notes."
    )
    parser.add_argument("--company", help="Company name")
    parser.add_argument("--position", help="Position title")
    parser.add_argument(
        "--job-description-file",
        help="Path to a job description file (markdown or text)",
    )
    parser.add_argument(
        "--job-description-text",
        help="Inline job description text (overrides interactive prompt)",
    )
    parser.add_argument(
        "--resume-source",
        default=str(ROOT / "Augusto_Pena_Resume.md"),
        help="Path to the base resume markdown",
    )
    parser.add_argument(
        "--base-dir",
        default=str(ROOT),
        help="Base directory for new company folders",
    )
    parser.add_argument(
        "--skip-questions",
        action="store_true",
        help="Skip optional prompts for extra details",
    )
    parser.add_argument(
        "--non-interactive",
        action="store_true",
        help="Do not prompt for input; fail when required values are missing",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Overwrite generated files if they already exist",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Preview actions without writing files",
    )
    parser.add_argument(
        "--experience-bank",
        default=str(DEFAULT_EXPERIENCE_BANK),
        help="Path to the experience bank markdown used for notes auto-matching",
    )
    parser.add_argument(
        "--max-matches",
        type=int,
        default=6,
        help="Maximum number of auto-matched experience bullets in notes",
    )
    parser.add_argument(
        "--no-auto-match",
        action="store_true",
        help="Disable notes auto-matching from the experience bank",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()

    if args.max_matches < 1:
        print("--max-matches must be at least 1")
        return 1

    if args.company:
        company = args.company
    elif args.non_interactive:
        print("Missing required argument: --company (non-interactive mode).")
        return 1
    else:
        company = prompt_non_empty("Company name: ")

    if args.position:
        position = args.position
    elif args.non_interactive:
        print("Missing required argument: --position (non-interactive mode).")
        return 1
    else:
        position = prompt_non_empty("Position title: ")

    job_description = ""
    if args.job_description_text:
        job_description = args.job_description_text.strip()
    elif args.job_description_file:
        job_description_path = Path(args.job_description_file).expanduser()
        if not job_description_path.exists():
            print(f"Job description file not found: {job_description_path}")
            return 1
        job_description = read_text_file(job_description_path).strip()
    elif args.non_interactive:
        job_description = ""
    else:
        path_input = input("Job description file path (leave blank to paste): ").strip()
        if path_input:
            job_description_path = Path(path_input).expanduser()
            if not job_description_path.exists():
                print(f"Job description file not found: {job_description_path}")
                return 1
            job_description = read_text_file(job_description_path).strip()
        else:
            job_description = prompt_optional_multiline(
                "Paste the job description."
            )

    extra_experience = ""
    hiring_manager = "Hiring Team"
    company_address = "[Company Address]"

    if not args.skip_questions and not args.non_interactive:
        extra_flag = input(
            "Add extra experience not on the resume? (y/n): "
        ).strip().lower()
        if extra_flag in {"y", "yes"}:
            extra_experience = prompt_optional_multiline(
                "Paste extra experience details."
            )

        hm_input = input(
            "Hiring manager or team name (leave blank for 'Hiring Team'): "
        ).strip()
        if hm_input:
            hiring_manager = hm_input

        addr_input = input("Company address (leave blank to keep placeholder): ").strip()
        if addr_input:
            company_address = addr_input

    company_dir = safe_dir_name(company)
    position_dir = safe_dir_name(position)
    company_slug = slugify(company)
    position_slug = slugify(position)

    target_dir = Path(args.base_dir).expanduser() / company_dir / position_dir
    target_dir_exists = target_dir.exists()
    if not args.dry_run:
        target_dir.mkdir(parents=True, exist_ok=True)

    resume_source = Path(args.resume_source).expanduser()
    if not resume_source.exists():
        print(f"Base resume not found: {resume_source}")
        return 1

    resume_name = f"Augusto_Pena_{company_slug}_{position_slug}_Resume.md"
    cover_name = f"Augusto_Pena_{company_slug}_{position_slug}_Cover_Letter.md"
    job_name = f"Job_Description_{company_slug}_{position_slug}.md"
    notes_name = f"Application_Notes_{company_slug}_{position_slug}.md"

    created_files = []
    updated_files = []
    skipped_files = []

    def record_action(action: str, path: Path) -> None:
        if action == "create":
            created_files.append(path)
        elif action == "update":
            updated_files.append(path)
        else:
            skipped_files.append(path)

    def maybe_write_text(path: Path, content: str) -> None:
        action = file_action(path, args.force)
        if not args.dry_run and action != "skip":
            path.write_text(content, encoding="utf-8")
        record_action(action, path)

    def maybe_copy_file(source: Path, destination: Path) -> None:
        action = file_action(destination, args.force)
        if not args.dry_run and action != "skip":
            shutil.copyfile(source, destination)
        record_action(action, destination)

    resume_path = target_dir / resume_name
    maybe_copy_file(resume_source, resume_path)

    job_description_content = job_description or "Add job description here."
    job_path = target_dir / job_name
    maybe_write_text(job_path, job_description_content)

    priority_keywords = format_keywords([])
    matched_experience = format_matches([])
    if not args.no_auto_match and job_description.strip():
        experience_bank_path = Path(args.experience_bank).expanduser()
        if experience_bank_path.exists():
            keywords, matches = build_experience_matches(
                job_description=job_description,
                experience_bank_path=experience_bank_path,
                max_matches=args.max_matches,
            )
            priority_keywords = format_keywords(keywords)
            matched_experience = format_matches(matches)
        else:
            print(
                f"Warning: experience bank not found for auto-match: {experience_bank_path}"
            )

    cover_template = load_template("cover_letter_template.md")
    if not cover_template:
        cover_template = (
            "${date}\n\n${company}\n${company_address}\n\n"
            "Re: ${position}\n\nDear ${salutation},\n\n"
            "[Write a focused, company-specific opening paragraph.]\n\n"
            "[Add 2-3 short paragraphs matching the job requirements.]\n\n"
            "[Close with a confident, polite call to action.]\n\n"
            "Sincerely,\nAugusto Pena\n"
        )

    cover_content = Template(cover_template).safe_substitute(
        date=date.today().strftime("%B %d, %Y"),
        company=company,
        company_address=company_address,
        position=position,
        salutation=hiring_manager,
    )

    cover_path = target_dir / cover_name
    maybe_write_text(cover_path, cover_content)

    notes_template = load_template("application_notes_template.md")
    if not notes_template:
        notes_template = (
            "# Application Notes\n\n"
            "Company: ${company}\n"
            "Position: ${position}\n"
            "Date: ${date}\n"
            "Job description file: ${job_file}\n\n"
            "## Role Summary\n- \n\n"
            "## Key Requirements\n- \n\n"
            "## Priority Keywords From Job Description\n${priority_keywords}\n\n"
            "## Matching Experience (from experience_bank.md)\n${matched_experience}\n\n"
            "## Extra Experience Not On Resume\n${extra_experience}\n\n"
            "## Questions to Ask\n- \n"
        )

    notes_content = Template(notes_template).safe_substitute(
        company=company,
        position=position,
        date=date.today().strftime("%B %d, %Y"),
        job_file=job_name,
        priority_keywords=priority_keywords,
        matched_experience=matched_experience,
        extra_experience=extra_experience or "- ",
    )

    notes_path = target_dir / notes_name
    maybe_write_text(notes_path, notes_content)

    if args.dry_run:
        print("Dry run summary:")
        if not target_dir_exists:
            print(f"  - Would create directory: {target_dir}")
    else:
        print("Execution summary:")
        if not target_dir_exists:
            print(f"  - Created directory: {target_dir}")

    created_label = "Would create" if args.dry_run else "Created"
    updated_label = "Would update" if args.dry_run else "Updated"
    skipped_label = "Would skip (already exists)" if args.dry_run else "Skipped (already exists)"

    if created_files:
        print(f"{created_label}:")
        for path in created_files:
            print(f"  - {path}")

    if updated_files:
        print(f"{updated_label}:")
        for path in updated_files:
            print(f"  - {path}")

    if skipped_files:
        print(f"{skipped_label}:")
        for path in skipped_files:
            print(f"  - {path}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
