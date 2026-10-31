# Research Hub — Implementation map

Working name: **Research Hub**. Rename any time; nothing depends on it.

This is the order things get built in, what each piece depends on, and what "done" looks like at each step. The detail for each piece is in `02-implementation-spec.md`.

---

## What Stage 1 is

Stage 1 is everything needed to run a real study from start to finish, on your own:

1. Set up a project with research questions
2. Add people (users, clients, stakeholders)
3. Bring in evidence: typed notes, transcripts, documents, images, audio, video, in bulk if needed
4. Build an accessible survey, including prototype and first-click tasks
5. Send it to people with their own link, track who's done it, chase the rest
6. Analyse everything together, check and fix the results, and answer the research questions
7. Search across it all and export a report

Anything not on that list is Stage 2 or later (see the end of this file).

---

## The shape of it

```
                ┌──────────────────────── ADMIN APP (you, signed in) ───────────────────────┐
                │                                                                           │
  People list ──┤  Projects ── Research questions ── Discussion guides                      │
                │     │                                                                     │
                │     ├── Sessions (interview, workshop, client meeting, survey response…)  │
                │     │      └── Sources (files, transcripts, notes)                         │
                │     │             └── Segments (who said what, when)                       │
                │     │                    └── Evidence (quotes, observations) ── Tags       │
                │     │                                                                     │
                │     ├── Surveys ── Questions ── Prototype tasks                            │
                │     │      └── Invites (unique links) ── Responses ── Task events          │
                │     │                                                                     │
                │     └── Findings / Themes ── linked to evidence ── answer research Qs      │
                │                                                                           │
                └───────────────────────────────────────────────────────────────────────────┘
                                │                                   ▲
                       unique link by email                  answers + task events
                                ▼                                   │
                ┌──────────── PUBLIC SURVEY PAGES (participants, no login) ────────────────┐
                │  Consent → questions → prototype tasks → thank you                         │
                │  WCAG 2.2 AA, works without JavaScript except prototype tasks               │
                └───────────────────────────────────────────────────────────────────────────┘

  Background jobs: file processing · transcription · analysis · email sending · retention clean-up
  Outside services: database + file storage (UK), transcription (EU), Claude API (US/global — see spec §10), email
```

---

## Milestones

Each milestone ends with something you can actually use. Don't start the next one until the current one passes its checks.

### M0 — Foundations and spikes (do first, small)

Purpose: prove the risky bits work before building on them.

| # | Item | Done when |
|---|------|-----------|
| 0.1 | Repo, stack, hosting (Vercel Pro, Supabase Pro London), auth with two-factor, Docker Desktop for local database | You can sign in on Mac and Windows, nothing else. `docs/costs.md` filled in and checked by Joe. |
| 0.2 | Background job runner | A test job runs, retries on failure, and shows status |
| 0.3 | File storage with resumable uploads; HEIC image reading checked | A 5 GB video uploads over a flaky connection and resumes; an iPhone HEIC photo converts |
| 0.4 | **Spike:** transcription with speaker labels, EU/UK processing | A 30-min UK-accented interview comes back with speakers and timestamps; you judge the accuracy acceptable |
| 0.5 | **Spike:** Claude analysis on one transcript (made-up or fully anonymised) | Quotes come back word-for-word (checked by code), tagged, with themes. Also check which UK/EU regions offer the models via Bedrock or Google Cloud, for clients who need it. |
| 0.6 | **Spike:** Figma prototype embed with events | Screen changes and clicks are captured from a real prototype on the survey domain; how press vs release shows in the click event is confirmed; whether click positions come through is noted |
| 0.7 | Accessibility test rig | Automated checks (axe) run in the test suite; manual screen reader checklist exists |
| 0.8 | Privacy baseline | Sub-processor list, data-flow note, retention defaults, DPIA template in the repo |

If 0.4, 0.5 or 0.6 fail, stop and rethink that part before M1. These are the three things most likely to cause pain.

### M1 — Projects, people, text in, analysis out

Depends on: M0.

- Projects (name, client, dates, status, research questions, retention period)
- People list (central), with attributes (role, organisation, experience, device, custom fields) and consent records
- Import people from CSV (your email list), with duplicate check on email
- Recruitment notes per person: last time they took part, how many studies, "do not contact" flag
- Add people to projects; per-project pseudonym ("P4") generated
- Sessions (type, date, people present, notes)
- Discussion guides per project, linkable to sessions
- Add sources to a session: typed notes, pasted text, transcript files (.txt, .vtt, .srt, .docx, Teams/Zoom/Otter exports)
- Text extraction and splitting into segments with speaker and time
- Speaker mapping ("Speaker 2" → a person)
- Analysis job: names replaced first (spec §5.6), then evidence extraction, tagging (your tags first, then suggested), session summary and "user interaction notes" (observations and behaviours)
- Client meeting mode: decisions, actions, requirements, risks
- Review screen: accept, edit, reject, merge evidence and tags
- Project themes and findings, with confidence (how many people, how many sessions)
- Answers per research question, each linked to evidence
- Basic search across the project
- Manual redact tool on transcripts

**Done when:** you can take three real transcripts, get findings that answer your research questions, fix the ones that are wrong, and click from any finding back to the exact quote and person.

### M2 — Files of all kinds, audio, video, bulk upload

Depends on: M1.

- Documents: PDF, Word, PowerPoint, Excel/CSV, plain text, Markdown
- Images: whiteboard photos, sticky notes, screenshots (text read and described)
- Audio and video: audio pulled out of video, transcribed with speaker labels
- Media player on the session with transcript synced to playback
- Bulk upload: many files or a zip, into a project
- Filename rules (optional) and zip folder names to suggest session and person, review screen to confirm
- Stretch, only once the rest of M2 works: AI guesses session and people from file content
- Processing queue with status per file (waiting, processing, done, failed, needs checking) and retry
- Duplicate detection (same file uploaded twice)
- Older formats (.doc, .ppt, .key, .pages etc.) flagged with a clear "save as" message

**Done when:** you drop in a zip of 30 mixed files from a workshop, confirm the matching in one screen, and everything ends up in the right session, analysed.

### M3 — Surveys: build, send, collect

Depends on: M1 (people, projects). Can run in parallel with M2.

- Survey builder: sections/pages, question types (list in spec §6), required/optional, help text, reorder, preview as participant
- Consent screen built in and required
- Survey versioning: once responses exist, edits create a new version
- Public survey pages: WCAG 2.2 AA, mobile first, server-rendered, work without JavaScript (except Figma prototype tasks), save and resume
- Adults only in Stage 1: consent page includes an 18+ confirmation
- Distribution: unique link per invited person; optional open link for anonymous responses
- Email sending: invite, reminder, thank-you, from templates; unsubscribe
- Tracking: invited, started, completed, bounced; no open-tracking pixels by default
- Sending from your own domain, with the email records (SPF, DKIM, DMARC) set up so invites don't land in spam
- Close date and optional response limit per survey
- Open link protection without a CAPTCHA (hidden honeypot field, rate limits, one response per browser by default)
- Incentive record per person per study (offered, sent, declined) — a note, not payments
- Responses become sessions (type: survey response) linked to the person
- Results: per question counts and charts, matrix breakdowns, rating/NPS, open-text answers fed into analysis
- Filter results by participant attributes

**Done when:** the full accessibility check in spec §9.4 passes for the survey pages, and a test survey goes to 5 real people and their answers show up analysed alongside interview evidence.

### M4 — Prototype and first-click tasks

Depends on: M3. Uses the M0.6 spike.

- Question type: prototype task (Figma embed) with task wording, start screen, success screen(s), expected path, time limit (optional, off by default)
- Question type: first-click test (upload image, mark target areas)
- Question type: image hotspot prototype (upload screens, draw clickable areas, link them) — no Figma needed
- Tracking: outcome (direct success, indirect success, gave up, wrong end), time, path, misclicks, clicks per screen
- Results: success rates, time spread, common paths, drop-off screen, click maps (best effort for Figma, exact for images)
- Device recorded with each attempt
- First-click and image hotspot tasks work without JavaScript; Figma tasks need it
- Accessible alternative: every prototype task has "I can't do this task" and an optional describe-it text answer, and the survey states up front that it contains a visual task

**Done when:** a real Figma prototype test runs with 5 people and the results screen shows success, paths and drop-off that match what you saw them do, and spec §9.4 checks pass for the task pages.

### M5 — Reports, export, hardening

Depends on: M1–M4.

- Report builder: pick findings, quotes, charts; anonymised by default
- Names check before every export (spec §5.6)
- Export: PDF, CSV, Markdown (Word and slides in Stage 2)
- Search across all projects
- Retention: auto-delete after the project's retention period, with warning first
- Erasure: delete a person and everything about them, with a record that it was done
- Backups tested by an actual restore
- Security pass (spec §11), full accessibility re-audit of the admin app (it gets automated checks from M0 onwards; this is the full manual pass)

**Done when:** you could hand a client a report, and answer "where did this claim come from?" and "please delete my data" in under five minutes each.

---

## Dependency order (short version)

```
M0 ──► M1 ──┬──► M2 ──┐
            └──► M3 ──┴──► M4 ──► M5
```

M2 and M3 don't depend on each other. If you want to start running surveys sooner, do M3 before M2.

---

## Stage 2 and later (not in Stage 1)

Kept out on purpose. Each is useful, but each adds a lot of work.

- Think-aloud recording (screen + voice) during prototype tasks
- Video/audio clips and highlight reels
- Branching and skip logic in surveys
- A/B versions of prototypes
- Coded HTML prototypes with full click tracking
- Cross-project insight library
- Team logins, roles, client read-only views
- Live interview tools (booking, live transcript)
- Word and slides export
- AI matching in bulk upload (if not done as the M2 stretch)
- Converting older office formats (.doc, .ppt, .key, .pages)
- Research with under-18s
- Incentive payments
- Translations / multi-language surveys

---

## Biggest risks

| Risk | Why it matters | What we do about it |
|------|----------------|---------------------|
| Analysis makes up quotes | Destroys trust in every finding | Every quote checked word-for-word against the source by code, not by the model. Fails loudly. |
| Transcription poor on accents or crosstalk | Bad input, bad findings | M0.4 spike on real UK audio; speaker mapping and transcript editing in the UI |
| Figma click data patchy | Heatmaps wrong | M0.6 spike; screen-change data is reliable, click positions treated as best effort; image hotspot tests as the exact fallback |
| Survey accessibility slips | It's the main promise | Accessibility tests in CI from M0; manual audit is a gate for M3 |
| Client data held badly | Legal and reputational | UK hosting, sub-processor list, DPIA, retention and erasure built in, not added later |
| AI processing is outside the UK/EU | Some clients won't accept it | Names replaced before sending; transfer recorded; analysis adapter can switch to an EU/UK-region provider (spec D5) |
| Names slip into "anonymised" reports | Breaks trust with participants and clients | Names replaced before AI, names check before export, manual redact tool (spec §5.6) |
| Scope creep | Never ships | Stage 2 list above is the parking area |
