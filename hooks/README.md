# Hooks

Each hook lives at `hooks/<name>/hook.json`:

```json
{
  "name": "example",
  "description": "What it does and when it fires.",
  "tags": ["category"],
  "harnesses": {
    "claude-code": "native",
    "cursor": "shim",
    "codex": "shim"
  },
  "event": "PreToolUse",
  "command": "scripts/example.sh"
}
```

Event names and matcher syntax differ per harness (see root README) — this JSON is Claude Code's shape; exporting to another harness means hand-translating the event/matcher, not a mechanical copy.

Empty for now — nothing has been promoted here yet.
