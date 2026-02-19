# Tracking Files

Use these files to keep your pipeline and communication history in one place.

## Files
- `application_tracker.csv`: one row per company/position with status, applied date, response state, and next action.
- `communication_log.csv`: one row per inbound or outbound message (email, LinkedIn, phone, etc.).

## Status Suggestions
- `Drafting`: preparing tailored resume/cover letter.
- `Applied`: application submitted.
- `Interview`: interview stages in progress.
- `Offer`: offer received.
- `Closed`: role ended/rejected/withdrawn.
- `Unknown`: migrated historical entry that still needs details.

## Typical Update Flow
1. Update `application_tracker.csv` after each application submission.
2. Add a row to `communication_log.csv` whenever a recruiter or company replies.
3. Update `response_state`, `last_response_date`, and `next_action` in `application_tracker.csv`.
