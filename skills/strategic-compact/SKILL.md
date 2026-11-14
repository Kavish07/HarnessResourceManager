---
name: strategic-compact
description: Judge whether now is a good moment to suggest a manual /compact — a phase boundary (research finished, milestone shipped, about to switch to an unrelated task) rather than whatever point auto-compaction happens to land on. Use when a task phase just completed, or the paired hook signals a tool-call threshold.
tags: [meta, context]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Strategic Compact

Auto-compaction fires at an arbitrary point — sometimes mid-task, discarding context you still need. Compacting on purpose at a phase boundary instead keeps the summary cheap to produce and safe to make, because nothing important is still in flight.

## Good moments to suggest it

- Exploration/research just finished and an implementation plan is written down — the research detail can go, the plan can't.
- A milestone just shipped (tests green, reviewed, committed) — the next phase doesn't need the debugging trail that got you there.
- About to switch to an unrelated task or area — stale context from the last one is dead weight, not help.

## Bad moments

Mid-implementation, mid-debugging, or any point where you're still reasoning about details from three steps ago. Compacting there risks losing exactly the thread you need to finish.

## How to suggest it

Say what phase just closed and why this is a safe cut point, then let the user decide — this skill (and its paired hook, which tracks tool-call volume as a coarse proxy) tells them *when* a boundary looks right, never forces *whether* to compact.

## Related

If the project also uses a memory-persistence hook, that's what should carry anything worth keeping across the compaction itself — this skill only decides timing.
