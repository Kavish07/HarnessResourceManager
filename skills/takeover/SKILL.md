---
name: takeover
description: Take over someone else's open PR, branch, or agent thread and finish it, while keeping the original contributor's credit in the merged commit. Use when asked to take over, finish, adopt, or land someone else's PR, or when triage decides a contributor's PR should ship.
tags: [sdlc, review]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Takeover

Finish the original goal and keep the contributor's name on it. Don't defend their implementation just because it exists, and don't throw it away just because you'd have written it differently.

## Read it first

Read the PR, its review comments, the linked issue, and any later corrections. Treat the handoff as context, not proof — reproduce the bug or confirm the need yourself. If the underlying problem isn't real, stop and say so. Check whether the base branch already fixed it; if so, skip straight to closing the loop and still credit them if their PR shaped the fix.

## Bring it in, keep their commits

Fetch their branch, merge or rebase on top of current main, and keep their original commits intact — their authorship *is* the credit. Put your own fixes in separate commits on top. If you replace their code rather than build on it, add a commit whose message ends with a `Co-authored-by:` trailer using their real, verified identity — never a guessed email address.

## Finish it

Then follow the `merge-ready` skill: simplify, verify the real failure (not just a mock going green), get checks and tests passing, open the PR. In the description: first line names whose PR this takes over; say what you kept, what you changed, and why; list any expected co-author credits so the maintainer can check them before merging.

Never merge it yourself, and never close or comment on the original PR without the maintainer's go-ahead.

## Close the loop

After it's merged and the public history has synced, with the maintainer's go-ahead, comment on the original PR: thank the contributor, link the merged commit, say briefly what changed from their version and why, then close it.

## Report

What you inherited, what you changed, how you verified it, who's credited and how, and anything left for the maintainer's judgment.
