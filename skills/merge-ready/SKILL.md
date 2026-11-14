---
name: merge-ready
description: Get a branch ready for someone else's final review — check it for security, simplicity, and resource-abuse risk, fix what's real, get checks passing, and open or update the PR. Use whenever the user says a feature, fix, or branch should be "merge ready", or appends this to a build request ("build X and make it merge-ready").
tags: [sdlc, review]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Merge-ready

Get this branch ready for the maintainer's final review. If you were also asked to build something, build it first.

Fetch and merge the base branch if this one is behind. Review everything on the branch against it, including uncommitted and untracked files. Make sure you understand every product decision and behavior change, not just the diff's shape.

Ask, in order:

- **Is it secure?**
- **Is it as simple as it can be?** What can be deleted or simplified given the branch's end state? Did an unlikely edge case lead to overengineering? Prefer deleting code to defending it.
- **Does it use its libraries/APIs idiomatically?** Watch for code that reinvents what a dependency already does, works around a limit it doesn't actually have, or pays for more than it needs.
- **Is there a real way to abuse cost or access** — getting a paid feature, extra quota, or a provider call for free? Ignore a theoretical leak nobody would bother exploiting.

Beyond that, review however you think best — work out which parts could do the most damage if wrong, and spend your time there.

Fix what's real. Commit as you go. Get the project's checks and tests passing locally before pushing; treat that local pass as standing in for CI, don't wait on the remote run to tell you the same thing.

Open or update the PR against the base branch, written for a reader who won't read the whole diff (see the `review-brief`/`simple-issue-description` skills for that shape). Put anything you left to the maintainer's judgment in its own clearly labeled section.

Never merge it yourself. The maintainer reviews last.
