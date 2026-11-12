# Harness Resource Manager

Personal library of reusable AI-coding-agent config — skills, agents, hooks,
MCP servers — plus a stack picker, published as a static site.

Claude Code's native `.claude/` shape is the canonical source format: Cursor
and Codex CLI already read `skills/` and `agents/` files directly, so there's
no translation layer for those. Hooks and MCP servers diverge more and get
hand-written per harness instead (see `hooks/README.md`, `mcp/README.md`).

## Layout

- `skills/`, `agents/`, `hooks/`, `mcp/` — the actual resources, one folder/file per entry.
- `bundles.json` — named groups of resources (e.g. `planning`) installed together.
- `stack-picker/stacks.json` — the stack profiles shown on the stack-picker page.
- `manifest.json` — generated from the four resource folders; don't hand-edit it.
- `scripts/generate-manifest.js` — rebuilds `manifest.json`. Run after adding/editing a resource.
- `scripts/validate.js` — fails loudly on malformed frontmatter/JSON. Runs in CI.
- `scripts/bootstrap.js` — installs a bundle into another project: `node scripts/bootstrap.js <target-dir> --bundle planning --harness claude-code`.
- `index.html` / `stack-picker.html` — the two pages of the static site (plain HTML/CSS/JS, no build step, no framework).

## Using a single skill elsewhere

Once this repo is on GitHub, install one skill into any project the normal way:

```
npx skills add <owner>/harness-resource-manager --skill grill-me
```

## Adding a resource

1. Drop the file(s) into `skills/<name>/SKILL.md`, `agents/<name>.md`, `hooks/<name>/hook.json`, or `mcp/<name>.json`.
2. Give it `name`, `description`, `tags`, and a `harnesses` compatibility map.
3. `npm run validate && npm run build:manifest`, then commit `manifest.json`.

## Primary vs. best-effort harnesses

Claude Code is the primary/canonical target. Cursor and Codex CLI are
well-supported for skills/agents/MCP, with Codex needing a TOML shim for
agents/hooks/MCP. Tracked harnesses: `claude-code`, `cursor`, `codex`.
