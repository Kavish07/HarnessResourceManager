---
name: simple-issue-description
description: Turn a rough bug report, feature request, support note, or pull request into a short, plain-language issue focused on the problem and desired behavior. Use when asked to simplify an issue, explain what a PR is for, write the issue for a PR, or strip implementation detail out of a report.
tags: [sdlc, writing]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Simple issue description

Write an issue a maintainer can understand in under a minute: what someone experiences, and what should happen instead.

## Workflow

1. Read the supplied notes, conversation, issue, PR description, or diff. In a PR, also check spec/design-doc/README changes — they often state the intent better than the description does.
2. Identify the concrete problem. Name who or what is affected when the source makes that clear.
3. Describe the desired behavior without prescribing an implementation.
4. Keep only the context that helps someone understand or reproduce the problem.
5. From a PR or diff, describe the problem the change solves, not the files or code it touches.
6. Draft immediately unless the problem and desired behavior can't be determined — then ask one short clarifying question instead.

One issue per problem. If the source bundles several unrelated problems, draft the most significant one and list the others in one line each, telling the author to split them.

If the source adds a capability rather than fixing a misbehavior, don't stage its absence as a bug — describe what a user can't do today and the experience of the new capability. Don't invent user impact or reproduction steps the source doesn't support; if the source only shows cleanup or a possible code smell, say that plainly instead of manufacturing an issue. If the source fixes a security weakness that isn't already public, don't draft a public issue describing it — suggest reporting it privately instead.

## Writing rules

Plain language, short sentences, under 200 words unless reproduction genuinely needs more. Lead with behavior, not code or the proposed fix — a one-sentence plain-language cause is fine when the symptom needs it to make sense. Keep a technical detail only when it's necessary to reproduce or understand the problem. Preserve real evidence (error text, screenshots, links). Use the source's own level of certainty — "can" or "appears to," not a confirmed bug, when the source describes a risk rather than an observed failure. Don't mention that AI wrote it.

## Output format

```markdown
# <Short title describing the problem or desired outcome>

## TL;DR

<One or two sentences: what happens now, what should happen instead.>

## What is happening?

<Current behavior in plain language, with a concrete example if available.>

## What should happen?

<Desired behavior, without proposing how to build it.>

## Extra context

<Optional: reproduction steps, error text, links, constraints. Omit if there's nothing useful to add.>
```
