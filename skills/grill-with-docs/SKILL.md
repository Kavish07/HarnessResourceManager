---
name: grill-with-docs
description: A relentless interview to sharpen a plan or design, which also creates docs (ADR's and glossary) as we go.
disable-model-invocation: true
tags: [planning, docs]
harnesses:
  claude-code: native
  cursor: native
  codex: native
  antigravity: unknown
---

Call the Skill tool twice, for "grilling" and "domain-modeling".

> **Gap:** this repo has "grilling" (see `skills/grilling`) but not "domain-modeling" — that one was excluded as hardcoded to its source project's own data model. Write a generic "domain-modeling" skill before relying on this one, or it will fail to find the second call.
