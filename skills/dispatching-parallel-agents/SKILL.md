---
name: dispatching-parallel-agents
description: Fan out two or more independent investigations or fixes to separate subagents in one batch instead of working them one at a time. Use when facing multiple unrelated failures or tasks that share no state and don't depend on each other's results.
tags: [workflow, subagents]
harnesses:
  claude-code: native
  cursor: unknown
  codex: unknown
---

# Dispatching Parallel Agents

Investigating unrelated failures one after another wastes wall-clock time for no quality gain: each investigation is self-contained, so nothing is learned by doing them in sequence. Dispatch one subagent per independent problem domain and let them run concurrently instead.

## When this applies

Use it when every one of these holds:
- There are two or more problems (failing tests in different files, broken subsystems, unrelated tasks).
- Each one can be understood and fixed without context from the others.
- They don't touch the same files or shared state, so the agents can't interfere with each other.

Don't use it when the failures might share a root cause (fixing one could fix the others), when you need a single coherent picture of system state before acting, or when the tasks would edit overlapping files.

## The pattern

1. **Group by independent domain**, not by surface symptom. Three failing test files that all come from one broken shared dependency are one domain, not three.
2. **Give each subagent a narrow, self-contained brief**: the specific scope (one file or subsystem), the goal, an explicit instruction not to touch anything outside that scope, and what to report back. Subagents start with none of your session's history — construct what they need, don't assume they inherit it.
3. **Issue all the dispatches in the same turn.** Agents launched across separate turns run sequentially; agents launched together in one batch run in parallel. This is also what keeps your own context small: the investigation detail lives in each subagent's isolated context, and only the summary comes back to you.
4. **Integrate afterward**: read each report, resolve any overlap or conflicting changes, and run the full verification once everything is merged — a single subagent passing in isolation doesn't guarantee the combination still works.
