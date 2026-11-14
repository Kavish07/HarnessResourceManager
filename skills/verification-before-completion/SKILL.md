---
name: verification-before-completion
description: Never claim work is done, fixed, or passing without having just run the actual verification command and read its full output. Use before saying anything is complete, before committing, and before opening a pull request.
tags: [workflow]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Verification Before Completion

A completion claim without fresh evidence is a guess dressed up as a fact. Before saying tests pass, a build succeeds, or a bug is fixed, the command that proves it must have actually run in this session, with its output actually read — not assumed from a previous run, not inferred from "the code looks right."

## The gate, every time

1. **Identify** the exact command that would prove the claim.
2. **Run it now, in full** — not a narrower check that resembles it.
3. **Read the whole output**: exit code, failure count, actual messages — not just the last line.
4. **Only if the output confirms it**, make the claim, and state it with the evidence attached ("12/12 tests pass"), not as a bare assertion.

If the output doesn't confirm the claim, say what the output actually shows. Skipping any of these four steps and stating success anyway is not an approximation of verifying — it's just asserting.

## What each kind of claim actually requires

| Claim | Requires | Does not establish it |
|---|---|---|
| Tests pass | This run's output: 0 failures | A previous run, "should still pass" |
| Linter clean | This run's output: 0 errors | A partial check, extrapolating from one file |
| Build succeeds | Exit code 0 from the build | Linter passing, logs "looking fine" |
| Bug is fixed | The original symptom's exact repro, re-run, now passing | The code was changed and looks right |
| Regression test is real | Red → green cycle actually observed (fails without the fix, passes with it) | The test passes once, in its final state |
| A dispatched agent finished | Your own diff/output review of what it actually changed | The agent's own "done" report, taken at face value |

## Phrasing to catch yourself on

Treat any of these, mid-sentence, as a stop sign: "should work now," "probably fine," "looks correct," expressing satisfaction ("done!", "perfect!") before the command has run, or reaching for a push/commit/PR before verification happened. None of "I'm confident," "just this once," or "I'm low on time" substitute for running the command — confidence and fatigue aren't evidence either way.

## Regression tests specifically need the full cycle

Writing a test that currently passes doesn't prove it would have caught the bug. Confirm the cycle: write the test, run it against the fix (passes), temporarily revert the fix, run it again (must fail), restore the fix, run it once more (passes). A test that never failed without the fix isn't verified to test anything.
