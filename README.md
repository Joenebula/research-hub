# Research Hub — build pack

Everything Claude Code needs to build Stage 1 of Research Hub.

## What's in here

| File | What it is |
|------|------------|
| `CLAUDE.md` | Standing instructions Claude Code reads every session |
| `docs/01-implementation-map.md` | Milestones, order, what "done" means |
| `docs/02-implementation-spec.md` | The detail: data, flows, question types, analysis, accessibility, privacy, security |
| `docs/03-verification.md` | The checks run on the map and spec, what was found, what was fixed, what's still open |
| `docs/04-skills-plan.md` | Skills you have, what to update, what's new |
| `.claude/skills/accessible-survey-forms/` | New skill: survey accessibility patterns and tests |
| `.claude/skills/research-analysis/` | New skill: how the analysis engine must behave |
| `.claude/skills/research-data-privacy/` | New skill: personal data rules |
| `.claude/skills/prototype-task-tracking/` | New skill: Figma and image prototype tracking |
| `.claude/skills/mydesignskill/`, `frontend-design/`, `ux-copy/` | Copies of your existing skills so Claude Code can use them in the repo (mydesignskill has the form-control border exception added) |

## How to start

1. Make an empty folder, e.g. `Documents/research-hub`. Unzip this pack into it so `CLAUDE.md` sits at the top.
2. Open that folder in Claude Code (desktop app or VS Code).
3. Before building, decide the open items in `docs/03-verification.md` → "Questions for Joe", and check the defaults in spec §0.
4. First prompt:

> Read CLAUDE.md and the docs folder. Don't write any code yet. Tell me back, in plain English and under 15 lines, what you're going to do in M0, what accounts and keys I need to set up, and any questions. Then wait.

5. After that, work milestone by milestone. At the end of each one, ask Claude Code to walk you through checking the "Done when" for it.

## Accounts you'll need for M0

- Supabase (London region)
- Vercel
- A worker host (Railway, Render or Fly — Claude Code will suggest one in M0.2)
- Anthropic API key
- AssemblyAI (or the transcription service chosen in M0.4)
- Email sending service + access to your domain's DNS
- Figma: an OAuth app for the Embed API, and a personal access token
- GitHub (for the code)
