---
name: writing-plans
description: Write an implementation plan precise enough for an engineer who has never seen this codebase or spec to execute task-by-task. Use once a spec or requirements exist for a multi-step change, before writing any code.
tags: [planning]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Writing Plans

Write for an implementer who writes fine idiomatic code once they know the exact interface and the exact test, but who cannot read your mind. The plan's only job is to record what they can't know on their own: which files, which names and signatures, which exact values from the spec, and which test proves each task is done. Everything they could reasonably decide themselves belongs to them, not the plan.

## Scope first

If the spec actually covers multiple independent subsystems, split it into one plan per subsystem before writing tasks — each plan should produce working, testable software on its own. A single sprawling plan across unrelated subsystems is a sign the splitting didn't happen earlier.

## Lock in the file structure before the tasks

Decide which files get created or modified and what each owns before decomposing into tasks — this is where the real design decisions get made, not an afterthought once tasks exist.

- One clear responsibility per file; files that change together should live together, split by responsibility rather than by technical layer.
- In an existing codebase, follow its existing file-size conventions — don't unilaterally restructure, but a plan that touches an already-unwieldy file can reasonably include splitting it.

## Size tasks correctly

A task is the smallest unit that carries its own test cycle and is worth a fresh reviewer's attention. Fold setup, config, and scaffolding into the task whose deliverable needs it rather than giving them their own task; split only where a reviewer could sensibly approve one task while rejecting its neighbor. Every task ends with something independently testable.

## What the plan document needs

A header stating the goal in one sentence, the architecture in two or three, the key technologies involved, and a pointer to the spec it implements (the plan argues from the spec — carry the link, don't restate the spec's content). Also worth stating once, up front, rather than repeating per task:

- **Global constraints** the spec sets project-wide (version floors, naming rules, platform requirements) — exact values, copied from the spec, that apply to every task implicitly.
- **A short review-focus list**: the handful of input classes or edge cases the spec implies but that no single task's own tests would naturally exercise (a reasonable user's expectation the spec doesn't literally spell out). Write this once while the spec is in front of you, then route each item to the task whose code owns it.

Each task then needs: the exact files it creates or modifies (with line ranges for existing files), what it consumes from earlier tasks and what later tasks will consume from it (exact signatures — a task's implementer sees only their own task, so this is how they learn the neighboring names and types), and a step-by-step cycle: write the failing test with the spec's exact values in it, run it and confirm it fails, implement the signature the test calls, run it and confirm it passes, commit.

## What makes a step well-formed

A step is done when it leaves exactly one reasonable thing to write — that's the whole bar: unambiguous, not necessarily complete. A test step is the test's name and assertions, in code, with the spec's exact values. A code step is the exact signature, its file, and whatever exact value the spec pins — the implementer writes the body unless the spec fixes exact copy or the body is an algorithm the signature alone doesn't determine. A verification step is the command and the output that means success. A reference to another task points at that task's own interface block instead of repeating its code.

A plan longer than the code it describes has written the code instead of planning it — that's over-specification, not thoroughness. And a line that decides nothing ("handle edge cases," "add appropriate validation," "TBD") isn't a lighter version of a real step — it's a missing one, and it will be read as permission to improvise exactly where the plan was supposed to remove the need to.
