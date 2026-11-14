---
name: verify-local-mcp
description: Verify a newly added or changed MCP server end to end against a local dev instance — protocol-level correctness first, then a headless-agent consumer probe that tests tool ergonomics (descriptions, schemas, output size, errors) without a human manually driving an MCP client. Use after adding or changing MCP tools, or when asked to check that an MCP server "works" or "is ergonomic".
tags: [mcp, testing]
harnesses:
  claude-code: native
  cursor: unknown
  codex: unknown
---

# Verify a local MCP server

Two layers, in order. The protocol layer proves the server behaves correctly. The consumer layer proves an agent that has never seen the server's code can actually use its tools well. They catch different bugs — protocol testing catches wrong shapes and edge cases; the consumer probe catches ergonomics failures (oversized responses, confusing schemas, errors with no fix hint) that a spec-correct server can still have. Do both.

## 1. Protocol smoke test

Talk to the server directly with raw JSON-RPC (`tools/list`, then `tools/call` for each changed tool). Test the happy path and at least one edge case per changed tool: an empty result, an invalid input, and — for any long-running/async tool — the full lifecycle including resuming from whatever handle it returns. After changing a tool's input or output schema, make sure any client cache of the old tool list gets refreshed before you call it again; a stale schema can make a client reject a valid result.

## 2. Consumer probe — the ergonomics test

Spawn a separate, headless agent session connected to the server as a real MCP client, pointed at a natural task that a real user would ask — never name the tool. Whether the model finds and uses the right tool from its description alone *is* the test. Ask it to report two things: the task result, and a critique of the MCP surface as a first-time consumer — were the descriptions enough to pick the right tool without trial and error, were any schemas confusing, was anything about the output size or shape surprising, were errors actionable?

Use a mid-tier model as the probe — if it navigates the tools cold, a weaker client likely can too.

## 3. Act on the feedback

- **Tool selection**: if the probe retried or picked the wrong tool first, sharpen the description's "use this when / not this" sentence.
- **Schemas**: any constraint the server enforces silently (units, required rounding, a default) belongs in the schema's own description, not just in docs — prefer coercing an input over rejecting it when you can.
- **Output size**: trim provider/database rows to just what that tool's job needs; point to a separate single-entity tool for the full shape.
- **Errors**: must be actionable and keep any recovery handle (a resumable task id) in the message, not just an upstream error string.

## 4. Iterate

Fix findings, re-verify the changed behavior cheaply via raw protocol calls, then re-run the full consumer probe once per round — it re-tests tool selection and flow, not just the one fix. When done, fold any real quirks you discovered into code comments or tests so the next person doesn't rediscover them the same way.
