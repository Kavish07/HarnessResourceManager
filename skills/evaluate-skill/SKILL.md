---
name: evaluate-skill
description: Test a candidate skill or prompt edit empirically by running it in fresh, isolated agent sessions and scoring what they produce against a rubric. Use when editing a skill and you need evidence the new instructions produce better output, not just a cleaner file.
tags: [meta, skills, evaluation]
harnesses:
  claude-code: native
  cursor: unknown
  codex: unknown
---

# Evaluate a skill

A skill edit is only as good as the output it produces. Judging that by re-reading the file is judging the wrong artifact — run it.

## Isolation rules

- **Instructions**: frozen copies only. Point the session at a snapshot of the candidate skill, never at the working tree you're still editing.
- **Conversation**: a brand-new session per run. Never resume or fork a prior one — carried-over context is exactly what you're trying to rule out.
- **Task data**: seed each run with nothing but a neutral task brief. Never give the session prior reports, a reference answer, or your own notes about what a good result looks like.
- **Prompt**: the same neutral task for every variant being compared. Don't name the expected findings or the rubric inside the prompt.

This is isolation for a clean comparison, not a security boundary — sessions can still share whatever account, cache, or provider limits the real environment has.

## Compare, don't eyeball

Run at least two sessions on the case you're tuning for, plus one holdout case with a different shape, so an instruction that happens to fit one example doesn't pass as fixed. Keep every run, including failures — don't cherry-pick the best of several and call the edit done.

Score each output against a short rubric before reading its reasoning trace, then read the trace to classify any miss as a discovery gap, a tool-use gap, a reasoning gap, or a reporting gap. A rubric worth keeping has few dimensions, each with one or two sentences on what a strong result looks like — weight coverage, evidence/diagnosis, prioritization, calibration (no claims the evidence can't support), and communication.

## What tends to actually move the needle

- **Instruction length hurts past a point.** A long skill full of caveats often performs worse than a short one with a fixed process. Add a step, not a warning.
- **Force the comparison step.** Sessions that wrote a shortlist before committing to an answer keep better judgment than ones that draft straight from raw research.
- **Show the rejected candidates.** A "what else we considered" section in the output is what keeps a real finding from disappearing when the result gets summarized.
- **One sample lies.** Anything that can vary run-to-run should be checked twice before being trusted as the output's claim.

## Report

What changed in the skill, what the comparison runs showed (including the holdout), and whether the edit is worth keeping as-is, worth another round, or worth reverting.
