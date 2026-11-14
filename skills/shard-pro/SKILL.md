---
name: shard-pro
description: Decide whether a long document needs splitting for agents to navigate cheaply, and if so split it without losing or altering any content. Use when the user says a document is too long for agents to read, asks for a table of contents so agents can find things, or wants a long doc turned into a navigable set of files.
tags: [documentation]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Shard Pro

The reader of the result may only see the first couple hundred lines of whatever file it opens before deciding what to open next. From what it sees there, it has to be able to tell where any given fact actually lives. Nothing in the source may be lost or reworded on the way — you decide where to cut and what to name things; the cutting itself must be mechanical and checkable against the original.

## Decide the outcome
1. **Leave it alone** if the document is short enough that an agent can just read it whole for little cost (a rough guideline: well under 50,000 characters).
2. **Contents list** (stays one file, gains a detailed section index near the top) when the document has to stay a single file (exported as one PDF/Word doc, uploaded to a tool that takes one path, usually read straight through for validation), or its sections lean on each other so heavily that no split would leave pieces that read on their own.
3. **Faithful split** (cut into several files plus a map, nothing lost) otherwise — when it's long, gets edited piecemeal going forward, and doesn't need to stay one file.

State which outcome you're picking and why in one line before doing it; if the user asked for a specific outcome and these criteria point elsewhere, say so and let them choose.

## If splitting
- Keep each resulting file to a reasonable, self-contained size (a rough guideline: a few KB to a few tens of KB) — a shorter piece on one clear subject beats a larger one that joins two unrelated topics.
- Never cut inside a table, a step list, or a diagram.
- Name each piece for what it covers, not for its position (`refund-policy.md`, not `section-3.md`) — unless the source itself uses stable identifiers callers already search for, in which case keep those too.
- Preserve the original as a reference copy before cutting, so any split can be verified against it and redone if the cut was wrong.
- Give each piece a short one-line summary a later reader can scan to tell whether it's the one they need.

## Check before reporting
Confirm every piece together reconstructs the original with nothing missing or reworded, and that any internal cross-references were updated to point at the new file names.

## Report
The outcome chosen and why, where the result lives, and any links or references the split broke that need the user's attention.
