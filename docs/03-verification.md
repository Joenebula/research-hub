# Verification

Two checks were run on 31 October 2026:

1. **Map check** (by me, against everything we discussed). Gaps found and fixed in the map: CSV import of your email list, recruitment notes ("last took part", do-not-contact), sending from your own domain with SPF/DKIM/DMARC, survey close dates and response limits, open-link spam protection without a CAPTCHA, incentive records, accessibility checks on the admin app from the start rather than only at the end.
2. **Independent review** of map and spec by a separate agent that hadn't seen them being written, checking coverage, consistency, facts and feasibility. 25 findings. Results below.

---

## Review findings and what happened

| # | Severity | Finding | Status |
|---|----------|---------|--------|
| 1 | Must | Spec relied on skills Claude Code can't see in the repo | **Fixed** — your design, front-end and copy skills copied into `.claude/skills/`; accessibility references copied into the survey skill. (`CLAUDE.md` was already there.) |
| 2 | Must | Claude API has no UK/EU processing — inference is US or global, stored data US | **Fixed** — verified on Anthropic's docs. Stated plainly in spec D5 and §10; transfer to be recorded; adapter can switch to Bedrock/Google Cloud in an EU/UK region. **Your decision needed — Q1.** |
| 3 | Must | Names spoken in transcripts would reach the AI and reports | **Fixed** — spec §5.6: names replaced before AI, names check before export, manual redact tool |
| 4 | Must | Hosting gaps: pg-boss connection type, Supabase Free limits, Vercel Hobby not for commercial use | **Fixed** — spec D1–D3; cost sheet added to M0 |
| 5 | Must | ID arrays would break deletion | **Fixed** — join tables with cascades; rule added: no ID arrays |
| 6 | Should | Confidence bands overlapped; contradictions ignored | **Fixed** — order of rules set; contested evidence drops a band |
| 7 | Should | Quote matching too vague for Claude Code | **Fixed** — exact steps, measure and worked examples (now test fixtures) |
| 8 | Should | Prefilling personal data behind forwardable links; silent overwrites | **Fixed** — prefill only fields you mark safe; changes queued for your review |
| 9 | Should | Map's accessibility gate weaker than spec's | **Fixed** — map points to spec §9.4 |
| 10 | Should | Unclear which tasks work without JavaScript | **Fixed** — first-click and image hotspot tasks work without it; only Figma needs it |
| 11 | Should | Misclicks would be double-counted | **Fixed** — one per press/release pair; confirm in spike M0.6 |
| 12 | Should | Figma embed URL, iframe title, timer start missing | **Fixed** |
| 13 | Should | Pinned task wording breaks at 320 px / 400% zoom | **Fixed** — collapsible panel on small screens |
| 14 | Should | Short file links would break long video playback and transcription | **Fixed** |
| 15 | Should | Copies at the transcription service and in backups not covered by deletion | **Fixed** |
| 16 | Should | No rule on children | **Fixed** — adults only in Stage 1; under-18s parked |
| 17 | Should | No record of where contacts came from or lawful basis | **Fixed** |
| 18 | Should | Email accessibility under-specified | **Fixed** |
| 19 | Should | Survey versioning rule inconsistent between map and spec | **Fixed** — one rule, results combine by question |
| 20 | Consider | HEIC images, older office formats, transcript export formats | **Fixed** — HEIC checked in M0; older formats get a clear "save as" message; sample exports become tests |
| 21 | Consider | Keyboard first-click labels could give the answer away | **Fixed** — neutral labels |
| 22 | Consider | Some Stage 1 items over-built | **Partly** — AI file matching moved to an M2 stretch; Word export and "leading wording" warnings moved out; voice control testing at M3 and M5 only. Kept four-format thinking down to PDF, CSV, Markdown. |
| 23 | Consider | Upload sizes inconsistent; Docker and ffmpeg on Windows not mentioned | **Fixed** |
| 24 | Consider | "User interaction notes" not defined | **Fixed** — observations, behaviours and session summary, shown together on the session page |
| 25 | Consider | No clickjacking protection on survey pages; plan features unconfirmed | **Fixed** — `frame-ancestors 'none'`; plan features confirmed in M0.1 |

## Confirmed correct by the review

- WCAG 2.2 criteria and levels in the spec (2.4.11, 2.5.7, 2.5.8, 3.2.6, 3.3.7, 3.3.8; 4.1.1 removed)
- GOV.UK form patterns cited
- Figma Embed API events, controls and setup
- Supabase London region and resumable uploads; AssemblyAI EU endpoint; Vercel London region
- Claude model IDs

## Not yet verified (checked during M0)

- pg-boss behaviour with Supabase
- Whether Postmark or Resend offers EU processing
- Supabase Pro backup and session-timeout features
- HEIC support in the image library
- Every AssemblyAI feature on its EU endpoint
- Which UK/EU regions carry the Claude models on Bedrock / Google Cloud

## Still open — questions for Joe

1. **AI processing location.** Analysis via the Claude API runs in the US or globally. Is that OK for your usual clients (recorded as a transfer, names stripped first), or do you want the UK/EU-region route set up from the start? It adds setup work in M0.
2. **Live interviews.** Stage 1 assumes you run calls in Teams/Zoom and upload recordings or transcripts after. Right?
3. **Prototypes.** Mostly Figma, or coded? If coded matters soon, HTML prototype tracking may need to move up from Stage 2.
4. **Survey branding.** Do surveys need each client's logo and colour, or just yours?
5. **Running costs.** Vercel Pro and Supabase Pro are needed for client work. Happy with that, before usage costs?
6. **Name.** "Research Hub" is a placeholder.
