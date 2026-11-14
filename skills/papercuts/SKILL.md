---
name: papercuts
description: Log genuine, recurring repository friction (confusing setup, a flaky script, a misleading error, a non-obvious gotcha) to a running friction log without derailing the current task. Also use to review, deduplicate, and resolve existing entries. Never log the agent's own sandbox/permission errors, shell mistakes, transient flakiness, or third-party quirks the repo can't fix.
tags: [sdlc, maintenance]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Papercuts

Capture small friction the moment you hit it, without derailing the task you were doing. Aggregated entries show where the repo needs sanding down — the bar is that a *different* contributor would hit the same thing, and the *repository itself* can do something about it.

## The two-question test

Log it only if both are true:

1. **Reproducible for anyone** — a different person, on a fresh checkout, would hit the same friction. Not specific to your sandbox, shell config, network, or a one-time hiccup.
2. **Fixable in the repo** — a change to its code, config, scripts, or docs would prevent or reduce it.

If either answer is "no," push through it and move on. Do not log:

- your environment's own failures (sandbox permission errors, blocked network, missing system tools),
- your own shell/command mistakes,
- transient flakiness that succeeded on retry with no repo-side cause,
- a third-party tool's limitation the repo can't change — unless you're logging a repo-side workaround for it,
- correctness bugs (fix those now, or track as real work) or what you accomplished (that belongs in your task summary, not here),
- anything sensitive: secrets, credentials, personal data, raw payloads.

Ask "is this the repo, or is this me?" — only the former is a papercut.

## Log it

1. Search the friction log for an equivalent entry first; don't duplicate.
2. Append one line: a UTC timestamp, a short agent label, and the friction with the smallest useful fix or workaround — one or two sentences, lead with the friction, not with what you were doing.
3. Keep going on the original task. Don't expand a papercut into unrelated work.

## Review or resolve

Only do a broad review when explicitly asked. For a review request, inspect and recommend; don't edit the log or implement fixes unless also asked to.

For an authorized cleanup: re-run the two-question test on every open entry and flag ones that fail it as noise; deduplicate and group related entries; check whether each survivor still reproduces; prioritize current impact against the cost of fixing it, preferring an existing command or a short doc fix over new tooling. Move genuinely-resolved entries to a resolved section with the fixing commit, rather than deleting history — but do remove entries that never belonged (step one's noise).
