# Agents

Each subagent lives at `agents/<name>.md` with YAML frontmatter:

```yaml
---
name: example
description: What it does and when to use it.
tags: [category]
harnesses:
  claude-code: native
  cursor: native
  codex: shim      # Codex wants TOML, not Markdown — needs conversion
---
```

Empty for now — nothing has been promoted here yet.
