---
name: finishing-a-development-branch
description: Decide how to integrate finished work once implementation is done and tests pass — merge, PR, or leave as-is. Use when a feature branch or worktree is complete and ready to hand off, before merging or opening a pull request.
tags: [git, workflow]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Finishing a Development Branch

Closing out a branch is a fixed sequence: confirm it's actually done, work out what kind of workspace you're in, offer the integration choices that make sense for that workspace, execute the one picked, then clean up. Skipping straight to "I'll just merge it" skips the checks that make merging safe.

## 1. Verify before offering anything

Run the project's full test suite. If anything fails, stop here and report the failures — don't present integration options against a red suite. Only a green suite earns the next step.

## 2. Work out what kind of workspace this is

Check whether the current checkout is the main working copy or a linked worktree, and whether it's on a named branch or a detached HEAD. This changes both the menu you offer and how cleanup works afterward:

| Workspace | Menu | Cleanup |
|---|---|---|
| Plain checkout | Full 3-option menu | Nothing to clean up |
| Linked worktree, named branch | Full 3-option menu | Remove the worktree once the choice is executed |
| Linked worktree, detached HEAD | Reduced 2-option menu (merging a detached HEAD isn't meaningful) | Externally managed — leave it in place |

## 3. Confirm the base branch

The base is whatever this work actually forked from — usually visible from the branch's upstream or named in the plan/conversation. If it isn't obviously known, ask: "this branch split from `<best guess>` — correct?" before merging into it. Merging into the wrong base is expensive to undo; confirming costs one question.

## 4. Present the fixed menu, then wait

For a normal checkout or a named-branch worktree:

```
Implementation complete. What would you like to do?
1. Merge back to <base-branch> locally
2. Push and open a pull request
3. Keep the branch as-is
```

For a detached HEAD:

```
Implementation complete (detached HEAD, externally managed).
1. Push as a new branch and open a pull request
2. Keep as-is
```

Present it exactly like that — short, and limited to these options. The integration decision belongs to the user; wait for their answer rather than picking for them. Discarding the work entirely is not one of the menu options — only do that if the user explicitly asks for it afterward.

## 5. Execute, then clean up

Run the chosen option (merge locally, or push and open the PR), verify it actually succeeded before touching anything else, and only then remove a worktree that was created for this work. Never remove a worktree before confirming the merge or push landed.
