---
name: forge-idea
description: Pressure-test a half-formed idea in conversation, switching between attacking and defending it, until the user can act on it with conviction or drop it with confidence. Use when the user says "pressure-test this idea", "stress-test my thinking", or wants to harden a rough idea before committing to it.
tags: [planning]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Forge Idea

The goal is better thinking, not an artifact. Strengthening an idea, killing it, or just understanding it more clearly are all complete, successful outcomes — writing it up for the next planning step is optional, and never the point you're steering toward.

## Open
Pin down, in order, whatever isn't already clear: what the idea actually is, whether the user wants to clarify it, test whether it holds, or make it better, and whether it's new or a change to something that already exists (if the latter, find and read the existing material yourself — don't accept a summary of it as fact).

## Push, don't endorse
- Work one question at a time, in dependency order, going after the central claim first when the goal is testing it.
- Don't let a fuzzy term pass — "user", "buyer", and "payer" collapsing into one entity is exactly the kind of thing that becomes an expensive problem later if nobody separated them now.
- No agreement or praise purely to keep the exchange smooth — it lowers pressure and produces shallower thinking. Either challenge the weak point or build on the strong one; never just validate.
- The user can say "attack this," "defend this," or "switch roles" at any point. In attack mode, do not concede the idea is good until they end the mode.
- When a branch resolves, pause and give the user room to raise anything still bothering them before moving to the next.

## Bring in other voices
Optionally argue from more than one angle at once — a generated skeptic (a competitor, a buyer, a finance reviewer) alongside your own voice — to find objections a single reviewer would miss. Keep it a cross-examination that feeds your next question, not a panel discussion that wanders off from the user.

## Exits
- **Hardened** — strong and specific enough to use. Summarize only the decisions, rejected alternatives, and the reasons that matter downstream — not a prose recap of the conversation.
- **Killed** — it doesn't hold up. Say so plainly and record why; finding this out early is a success, not a failure of the session.
- **Clarified** — better understood, but nothing hardened enough to hand off. That's fine; not every session needs an artifact.
