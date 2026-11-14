---
name: writing-skills
description: Write or edit a skill using the same discipline as test-driven development applied to documentation — see an agent fail without it, then write only what closes that gap. Use when creating a new skill, editing an existing one, or verifying a skill actually works before shipping it.
tags: [meta]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Writing Skills

A skill is production code for agent behavior, and it deserves the same discipline as any other code: see it fail before you write the fix. Write a skill before testing whether the failure it's meant to prevent actually happens, and you don't know if it teaches the right thing — you know it reads well to you, which is a different and weaker claim.

## When a skill is the right answer

Create one when the technique wasn't obvious even to you the first time, you'd reach for it again across projects, and it applies broadly rather than to this one codebase. Don't create one for a one-off solution, a standard practice already documented elsewhere, a project-specific convention (that belongs in the project's own instructions file instead), or anything mechanically enforceable — if a linter or a validation script can catch it, automate the check and save the skill for judgment calls a script can't make.

## The TDD mapping

Run skill-writing through the same red-green-refactor loop `tdd` describes for code: construct a pressure scenario and watch an agent handle it *without* the skill present (red — this is your baseline, and you need to see the actual failure, not assume it). Write the skill addressing exactly what that baseline got wrong. Run the same scenario again with the skill present (green). Then look for the next rationalization or loophole and close it (refactor), re-testing each time. Writing a skill without ever having watched the failure it claims to fix, or editing one without re-testing, isn't a faster version of this loop — it's skipping the loop and keeping the label.

## Match the test to the skill type

- **A rule or discipline** (something like `tdd` or `verification-before-completion`): test under pressure, not just comprehension — time pressure, sunk cost, combined stressors. Success is the agent holding the rule at maximum pressure, not reciting it when calm.
- **A how-to technique**: test by applying it to a new scenario it wasn't written against, including an edge case. Success is a correct application, not just an agent that can summarize the steps back.
- **A mental model or pattern**: test recognition (does the agent know when it applies) and restraint (does it know when it doesn't) separately — a pattern applied everywhere is as broken as one never applied.
- **Reference material** (API docs, command syntax): test retrieval — can the agent actually find and correctly use the relevant piece under a realistic question, not just a reader skimming it and nodding.

Don't skip this step because the skill "is obviously clear," because it's "just a reference," or because you're confident in it — clarity to the author and clarity to a different agent reading cold are not the same thing, and the gap only shows up under an actual test.

## Shape the guidance to the failure you saw

A prohibition ("don't do X") is the right tool when the baseline shows an agent that knows the rule and breaks it anyway under pressure — pair it with the specific rationalization you watched it use. It is the wrong tool when the baseline shows an agent that complies but produces the wrong shape of output (too long, missing a required part, buried in narration): there, state positively what the output *is* — its exact parts, in order — rather than listing what to avoid. An agent negotiating around a list of "don't"s under a competing pressure will often produce more of the unwanted thing than one given a positive shape to fill. Pick the form by looking at what actually went wrong in the baseline, not by habit.

## Keep the file small, split out what doesn't fit

```
skills/
  skill-name/
    SKILL.md            # required, everything a reader needs to start
    reference.md         # only for heavy material (100+ lines): deep API docs, long syntax references
    script.sh / tool.ts  # only for a genuinely reusable helper, not narrative
```

Keep principles, short code patterns (under ~50 lines), and everything else inline in `SKILL.md`. Split out a separate file only for heavy reference material or a reusable tool — not as a place to put things that just feel long. One excellent, complete, runnable example beats several mediocre or fill-in-the-blank ones; don't port the same example into five languages when one clear one makes the point.

## Write the description to trigger correctly, not to summarize

A skill's `description` states only when to use it — the triggering symptom or condition — never a summary of what it does step by step. An agent that reads a workflow summary in the description tends to follow that summary instead of opening the skill and reading the real thing, which defeats the purpose of writing it carefully.
