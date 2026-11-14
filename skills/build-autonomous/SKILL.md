---
name: build-autonomous
description: Implement one story, feature, or bug fix end to end without interactive back-and-forth — plan, code, review, verify, then report status — for use by an orchestrator or when no one is present to ask. Use when invoked headlessly or by another automated process, not for an interactive session.
tags: [sdlc]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Build (Autonomous)

Same four stages as `build-planning` — plan, code, review, verify — run without pausing to ask anything. Every blank that would normally be a question becomes a logged, explicit assumption instead.

## Differences from the interactive version
- **No clarifying questions.** Where the interactive flow would ask, infer the most reasonable reading and record it as an assumption rather than guessing silently.
- **No pause for approval between stages.** Run plan → code → review → verify straight through; the output is a report to read afterward, not a conversation to steer during.
- **A blocker halts, it doesn't guess past itself.** If something is genuinely ambiguous enough that any guess risks building the wrong thing (conflicting requirements, a missing dependency with no reasonable default), stop and report the blocker rather than picking an arbitrary direction and continuing.

## Verify still means verify
Headless doesn't relax the verification bar: run the actual tests, read the actual output, and report a failure as a failure. Never report success you didn't just observe.

## Report
One structured status at the end: what was implemented, every assumption made (so a human can review them later), what was verified and how, and any blocker that stopped the run short — never a bare "done" with no detail to check it against.
