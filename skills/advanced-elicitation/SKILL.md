---
name: advanced-elicitation
description: Push a draft off its first-answer bias using several independent critique methods at once, then propose one merged revision. Use when the user says "advanced elicitation", "push this further", or wants a draft, plan, or decision pressure-tested from multiple angles before committing to it.
tags: [planning, review]
harnesses:
  claude-code: native
  cursor: unknown
  codex: unknown
---

# Advanced Elicitation

A first draft is the most agreeable draft: centered, biased toward its own framing, biased toward adding rather than cutting. This pushes it off-center through several independent critiques, then merges what survives into one proposed revision the user accepts or rejects.

## Pick the target
The target is whatever the user or calling context points at — the last answer given, a specific section, a whole document. A one-line suggestion is a one-line target; don't drag the surrounding plan into the push with it.

## Choose the pushes
Run three, each from a different angle, unless the user named specific methods:
1. The critique aimed at the target's most likely weak spot (the part least examined, the assumption nobody stated).
2. A wildcard: a critique whose answer is genuinely hard to predict for this target (devil's advocate, a named stakeholder's objection, an incentive-and-abuse read).
3. An open push: push harder, consider alternatives, with no fixed method — reserved for a short target; a longer document gets a second targeted critique instead.

Say in one line what each push is aimed at before running it.

## Run the round
Each push gets a brief with only: the target (quoted if short, or its path/section), its purpose and intended reader, what's already settled and shouldn't be relitigated, and a response sized to the target (a handful of findings, each with a location, what's wrong or missing, and the proposed change). A push should not see the other pushes' output — that's what keeps the critiques independent instead of converging on each other's first idea.

Dispatch each push as an independent subagent when the harness supports it, so they run against the same version of the target without seeing each other. Without that, run them one at a time, each read fresh before writing, and say so.

## Merge
Compose one proposed revision from the findings. A finding dropped gets one line on why, so the user can rescue it if they disagree. A finding that rejects the target's premise is surfaced as a decision for the user, never silently folded into the revision.

## Present
One message: each push's headline finding, the revision as a numbered list of changes (location, before/after, which push drove it), anything set aside, and the choice — apply all, apply by number, reject, or push again in a named direction. Nothing in the target changes until the user accepts.
