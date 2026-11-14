---
name: observability-triage
description: Triage production errors in an observability/logging backend without rediscovering the same dead ends every time — verified query recipes, counting gotchas, and a maintained known-noise list. Use when asked to review production logs, count errors or crashes, compare error rates between periods, or investigate a prod error spike.
tags: [sdlc, observability]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Observability triage

Query the project's error/log backend for production issues, count them correctly, and skip the noise that's already been investigated to a dead end.

## Verify the query shape once, then reuse it

Logging/observability APIs are usually stricter than they look — a filter that silently returns every log line instead of just invocations, a percentile name that has to be spelled a specific way, a group-by that caps at far fewer rows than the limit you passed. The first time you build a query for "count by outcome" or "errors grouped by message," verify its shape against a known result, then keep that exact shape as a reusable recipe instead of reconstructing it from memory each time. Note explicitly what a wrong-looking result would mean (a missing filter, not zero events).

## Counting gotchas worth assuming until proven otherwise

- **Grouped results are often capped far below the limit you passed, and unsorted.** A group missing from the top N is not the same as zero — add an explicit filter for the case you care about rather than hoping it survives the cap, and sort client-side.
- **One failure can fan out into many log lines.** A crash that kills every in-flight request at the same instant looks like many independent errors; cluster by timestamp before reading the count as user impact.
- **A timestamp-prefixed message fragments "group by message".** If a log line carries a per-event prefix, grouping by raw message text undercounts badly — sample events and merge client-side.
- **Deploys are not always instant or automatic.** Confirm what code and what version is actually live on the environment you're querying before concluding a fix landed or didn't.

## Known noise: maintain it, don't re-litigate it

Keep a short list of log patterns that have already been investigated and found to be expected noise with no real fix available. Each entry needs:

- an **identify-by** marker specific enough that you won't mis-flag a real new issue as this old one (an exact message, a fingerprint, a specific combination of fields),
- **why it's unfixable** — the actual mechanism, not "seems transient,"
- a **real-signal condition** — the one way this same pattern would stop being noise and start mattering (a sustained rate rise not explained by the usual cause, a different field combination).

Apply the list without re-investigating matching entries. Add to it only after confirming there's no first-party fix available, and keep the real-signal condition honest — a list nobody can ever re-trigger is a list that's hiding a real problem.

## Runtime vs. app-level noise

Before investigating any unfamiliar error, work out whether the error came from the application's own code path or from the runtime/platform itself (a client disconnecting mid-request, a sandbox reaping a process). The latter usually has no call site to grep for and no fix available at the app layer — look for a sibling signal (did the paired request actually complete normally?) to tell the two apart before spending time on it.
