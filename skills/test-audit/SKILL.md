---
name: test-audit
description: Gate new or changed tests at write time, and audit existing test suites for low-value, implementation-coupled, or duplicative tests and the test-only production seams that keep them alive. Use when asked to add tests, review tests, clean up a test suite, or when a change touches test files.
tags: [testing, sdlc]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Test audit

One value bar, two modes. **Authoring mode** gates every new or changed test at write time. **Audit mode** runs focused sweeps for tests that re-assert the source, duplicate stronger proof elsewhere, couple behavior to implementation, or keep a test-only production seam alive. Optimize for confidence, not for deletion count.

## Authoring gate

Before adding a test, answer these — a missing answer means don't add it yet:

1. What observable behavior or invariant does it protect?
2. What credible regression would make it fail?
3. Why doesn't existing coverage already catch that failure? Each contract has one primary owner, usually at the strongest boundary (a public interface, not a private helper) — another layer needs its own genuinely distinct risk to justify its own test. Prefer extending an existing table-driven case or shared fixture over a near-duplicate.
4. Does it need a production seam (an export, a flag, a wrapper) that no real caller needs? If yes, test at the real boundary instead — grep the whole repo for callers, not just the obvious directory.

Then check it against the junk patterns below; a match fails the gate unless you can name the independent contract it guards. A test that would break under behavior-preserving refactoring is asserting implementation, not behavior — move it to the owning boundary before landing it.

A regression test must fail on the pre-fix code for the actual reason, and pass after the fix. One that never demonstrably failed is proving the mock, not the fix.

## Junk patterns

- Assertion-free coverage probes.
- Self-comparisons, or an expected value produced by the same helper/renderer under test.
- Copied fixtures or inventories duplicated instead of shared.
- Exact source, import, or string greps standing in for real behavior.
- A private function tested in isolation when a real boundary already exercises it.
- Mocks that implement the exact behavior being asserted, or one mock standing in for genuinely different things.
- A negative-control test that passes for the wrong reason (a different guard denies it, or a path the code never actually reaches).
- Reset ceremony (`resetAllMocks`-style calls) repeated in every test without a comment on what module-level state actually needs it.
- A production class or constant redeclared inline in the test instead of imported from its real source.

## Value bar

A test earns its maintenance cost by protecting real behavior, a credible regression, or an independently meaningful contract (a public API shape, a migration, a security/auth boundary, a billing calculation). Before judging a candidate for deletion, read the complete test *and* its production owner, callers, and overlapping tests — not just the test file in isolation.

Keep: call-ordering tests when order is genuinely observable behavior; a retained test that fails on the current baseline (treat that as a possible real bug, not noise); source-level assertions that are the cheapest independent guard against a specific user-facing contract changing (a pinned list, a schema's shape) and that survive an identifier-only refactor.

Being static, slow, or implementation-shaped is not by itself a deletion reason — prove the test isn't the independent contract before removing it.

## Campaign mode (suite-wide prune, only when explicitly asked)

Split the suite into balanced slices by directory. One pass reviews read-only and writes a verdict per test (delete / merge / keep) with one-line evidence naming what would actually catch the regression. A second pass applies verdicts per slice, re-verifying each delete/merge against the source before acting, and reports anything risky back instead of guessing. Never remove behavior, only exports whose only remaining callers are tests. Run the full suite once at the end, plus a shuffled-order run — removing reset ceremony can surface order dependence that reset was silently masking.

## Validation

Run the owner and sibling tests narrowly first, then the full suite before calling it done. Report production-code and test-code line deltas separately.
