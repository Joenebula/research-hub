---
name: research-data-privacy
description: Use whenever building or changing anything that stores, sends, exports or deletes personal data in Research Hub — people, consents, uploads, transcripts, survey answers, emails, AI calls, logs, retention and erasure jobs, exports, or adding a new outside service. UK GDPR context; Joe often acts as a processor for client controllers.
---

# Research data privacy

This is not legal advice. It sets the rules the code follows so Joe can meet his obligations. When a rule here would block something Joe asks for, say so and ask; don't quietly work around it.

For UK legal background (UK GDPR, PECR, cookies) see `.claude/skills/accessible-survey-forms/references/compliance.md`.

**Known transfer:** the Claude API has no UK/EU processing option (inference `us` or `global`, stored data in the US). Keep this recorded in `docs/sub-processors.md` with the transfer mechanism. The analysis adapter must be able to switch to an EU/UK-region provider (Bedrock / Google Cloud) per project.

## Rules for code

1. **New outside service = update `docs/sub-processors.md` first**: name, purpose, data sent, region, retention, link to their terms. Check the region in their current docs.
2. **Personal data never in logs**: no names, emails, answers, transcript text, tokens, file names that include names. Log IDs.
3. **AI calls get pseudonyms.** Replace known names (project people, organisations, client, Joe's extra list) and mask emails, phone numbers and postcodes before sending (spec §5.6). Never send the people table.
4. **Delete means delete.** No soft delete on personal data. Deleting a database row also deletes its storage files (same job, checked).
5. **Erasure** (`deletePerson(personId, options)`):
   - preview first: counts of what goes
   - removes person, consents, invites, emails, responses, answers, task data, evidence about them, segment links
   - group sessions: per session either blank their segments' text or delete the session (Joe chooses)
   - deletes files where they're the only participant
   - re-runs confidence for affected findings
   - writes `audit_log` entry: action `person_erased`, no personal details
   - must be covered by an end-to-end test that checks nothing remains (database + storage)
6. **Access request**: `exportPerson(personId)` → zip of JSON + their files. Logged.
7. **Retention job** (daily): warns 14 days before `delete_after`; deletes on the day; logs counts only.
7a. **Outside copies**: delete audio and transcripts at the transcription provider via its API once fetched. State the backup roll-over period in consent wording.
7b. **Adults only** in Stage 1 (18+ confirmation on consent).
8. **Consent checks**: before sending invites, before uploading audio/video for a person, before screen recording (Stage 2). Missing consent = warning with an override reason that's logged.
9. **Exports anonymised by default.** Real names only if Joe switches it on per report; that choice is logged.
10. **Tokens hashed** at rest; signed file URLs short-lived.
11. **People records** carry `contact_source` and `lawful_basis`. Projects that may involve health or disability data are flagged for a DPIA.
12. **No arrays of IDs** for links — join tables with cascades, so erasure leaves nothing behind.

## Consent wording

- Templates in `/lib/consent/templates`, versioned. Plain English.
- Must say: who's running it, for whom (controller), what's collected, what it's used for, AI processing and transcription (by whom, where), how long it's kept, how to withdraw, contact.
- Store `wording_version` with each consent.

## Open-link anonymous surveys

- Don't ask for name or email unless needed. If not asked, response has no `person_id`.
- Don't store IP addresses beyond what rate limiting needs short term.
