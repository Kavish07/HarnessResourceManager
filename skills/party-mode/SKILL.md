---
name: party-mode
description: Run a roundtable discussion between several distinct personas who genuinely disagree with each other, to surface angles a single reviewer would miss. Use when the user wants multiple perspectives on a decision or document, a simulated focus group, or a "roundtable" review.
tags: [planning, review]
harnesses:
  claude-code: native
  cursor: unknown
  codex: unknown
---

# Party Mode

The point of more than one voice is the collision between them, not a balanced survey. A panel that politely agrees with each other has wasted the exercise.

## Set the roster
Pick (or let the user name) 3-5 distinct personas relevant to the topic — e.g. a skeptical finance reviewer, an end user, a competitor, a domain expert. Give each a real, specific stance, not a generic "pro" and "con" pairing. If this project already has named agent personas (`architect`, `security-reviewer`, etc.), a persona can borrow one's actual expertise.

## Keep it a conversation, not a report
- Short turns, back-and-forth, genuine reactions — not each persona filing a memo in sequence.
- Let them disagree and leave it unresolved. The instinct to reconcile every voice into one tidy consensus is exactly what kills the exercise; resist it.
- Vary who's talking — don't let one voice dominate every round.
- Pull the user into it: a persona can address the user directly, challenge their framing, or ask them a question back.

## Running it
Default to voicing every persona yourself, inline, one mind behind every voice. Spawn an actual independent subagent per persona only when a branch genuinely needs reasoning that shouldn't be colored by one shared voice (a load-bearing disagreement, not ordinary back-and-forth) — and only when the harness supports running them independently.

## Wrapping up
End when the user signals they're done, not just because the opening question got one answer — a party is open-ended, not a single Q&A round. Close with the best takeaways and the decisions, if any, that the clash actually produced. Credit which persona raised which finding.
