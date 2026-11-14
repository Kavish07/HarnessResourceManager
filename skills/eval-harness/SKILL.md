---
name: eval-harness
description: Write and run evals (capability evals for new behavior, regression evals for existing behavior) with an explicit grader, before trusting that a change to agent-facing behavior (a skill, a prompt, an agent persona) actually works. Use when asked to eval, test, or verify a skill/prompt/agent change, or before claiming one is ready.
tags: [meta, testing, eval]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Eval Harness

Treat an eval as the unit test for a change to agent behavior: written before (or immediately after) the change, and re-run on every later edit to catch regressions, not just a one-time manual check.

## Two kinds of eval

**Capability eval** — does the agent now do something it couldn't do, or do reliably, before? State the task, the explicit success criteria as a checklist, and the expected output shape. Run it `k` times if the behavior has any variance, and report pass@k, not a single anecdote.

**Regression eval** — does an existing capability still work after this change? Keep a small fixed set of these per skill/agent/prompt that matters, and re-run the whole set, not just the one you think the change touches — regressions hide in behavior you weren't thinking about.

## Grading

Pick the cheapest grader that's actually reliable for the claim being tested:
- **Code-based**: a deterministic check (a file contains an expected pattern, a command exits 0, a test suite passes). Prefer this whenever the success criterion is mechanical.
- **Model-based**: have a model score an open-ended output against stated criteria, with its reasoning shown, when the output can't be checked mechanically (tone, structure, whether an explanation is actually correct).
- **Human**: flag for the user's own judgment when the stakes are high enough, or the criterion is subjective enough, that neither of the above is trustworthy alone.

## Rule

An eval that always passes regardless of the change isn't testing anything — if you can't construct an input that would make it fail, it's not a real eval. Write the failing case first when that's feasible, the same discipline as a code test.

## Report

The evals run, pass/fail (or pass@k) per one, and which grader was used for each — not just a final verdict.
