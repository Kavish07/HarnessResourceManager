---
name: using-git-worktrees
description: Set up an isolated workspace before starting feature work, preferring a native worktree tool over manual git worktree management. Use before executing an implementation plan that should not touch the current branch's working copy.
tags: [git]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Using Git Worktrees

Work that might need to be abandoned or reviewed separately belongs in its own workspace, not the branch the user is actively looking at. Check whether isolation already exists before creating any, prefer whatever native mechanism the harness offers over manual git plumbing, and never create one without asking first.

## Step 1: Check whether you're already isolated

Before creating anything, check whether the current checkout is already a linked worktree rather than the main working copy. If it is, skip straight to project setup — don't create a second one. Watch for the one false positive: being inside a git submodule looks the same from this check but isn't a worktree at all, and should be treated as a normal checkout.

## Step 2: Ask before creating one

If you're in the normal working copy, ask for consent before creating a worktree — it protects the user's current branch, but it's still a workspace change they should approve: "Set up an isolated worktree for this?" Honor a preference already stated in the user's instructions without re-asking. If they decline, work in place and move to project setup.

## Step 3: Prefer a native mechanism

Check whether the harness already exposes a dedicated worktree or isolated-workspace tool (a dedicated tool, a `/worktree`-style command, a flag). If one exists, use it — it handles directory placement, branch creation, and cleanup together, and running raw `git worktree` commands alongside it creates state the native tool doesn't know about and can't clean up.

Only fall back to manual `git worktree add` when no native mechanism is available. If you do:

- Prefer an existing project-local worktree directory convention if one exists (commonly a hidden `.worktrees/` folder); otherwise default to one.
- Before creating anything inside the repository, confirm that directory is actually git-ignored — add it to `.gitignore` first if not. Committing worktree contents into the repo by accident is the exact failure this check prevents.
- If creation fails on a sandbox/permission error, say so plainly and continue in the current directory instead of forcing it.

## Step 4: Verify a clean baseline

Once the workspace exists (native or manual), install dependencies appropriate to the project and run its test suite before starting any implementation. Report clearly whether the baseline is green. A plan built on top of an already-failing baseline makes every later test result ambiguous — fail or ask before proceeding, don't assume the baseline is fine.
