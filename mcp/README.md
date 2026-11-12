# MCP servers

Each server lives at `mcp/<name>.json`:

```json
{
  "name": "example",
  "description": "What it connects to.",
  "tags": ["category"],
  "harnesses": {
    "claude-code": "native",
    "cursor": "native",
    "codex": "shim"
  },
  "command": "npx",
  "args": ["-y", "example-mcp-server"]
}
```

Claude Code and Cursor both read a `mcpServers`-shaped JSON object directly. Codex wants the same fields in `config.toml` under `[mcp_servers.<name>]` — that's the one shim `scripts/bootstrap.js` needs to write.

Empty for now — nothing has been promoted here yet.
