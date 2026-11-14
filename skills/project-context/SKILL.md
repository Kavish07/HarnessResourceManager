---
name: project-context
description: Set up, update, or audit a repository's agent-instructions file (CLAUDE.md/AGENTS.md) so it stays small, verified, and free of stale or duplicated rules. Also records an observed agent mistake as a new rule. Use when asked to set up project instructions for AI agents, refresh CLAUDE.md, or record a recurring mistake as a pitfall.
tags: [documentation]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Project Context

The user brings rules they want followed (governance, security, standards); the repository supplies the rest, verified against the actual code rather than assumed. Every write is shown to the user before it happens — this is conversational, never a silent edit.

## Open a ledger first
Before changing anything, list every existing instruction as one ledger entry: `retain`, `rewrite`, `relocate`, or `delete`, each with its reason and what an agent would get wrong without it. Existing instructions are the baseline being improved, not raw material to discard — a rewrite that quietly drops part of a rule is a deletion of that part, and gets listed as one.

A deletion needs a real ground (the thing it guarded no longer exists, it's provably false, it's superseded by an automated check, or it's a verified duplicate) — "unused lately" is not a ground on its own.

## Verify, don't assume
For every claim the file will make about what a command does or what a config enforces, read the actual script or config it's about — a claim a human could path-check without reading the code is a defect if left unverified. Ask the user only what no scan can answer: what agents keep getting wrong here, what's off-limits and why, what a project-specific term means.

## Show before writing
Present the complete proposed block together with the settled ledger — text alone hides what the user is giving up. Every deletion is itemized separately and needs its own approval; approving the whole block never implicitly approves a deletion resting on a weak ground.

## Recording a mistake
Capture an observed agent mistake as it happens — this is the only legitimate source for a new rule. One occurrence gets noted; a recurring or costly one earns an actual line, preferring a lint rule, hook, or CI check over a prose instruction wherever one would catch it mechanically.

## Report
What changed and why, what stayed the same, and anything flagged for a lint/CI check instead of a written rule.
