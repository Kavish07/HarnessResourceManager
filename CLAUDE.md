# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A personal library of reusable AI-coding-agent config (skills, agents, hooks, MCP servers) plus a
stack picker, published as a static site with no build step (plain HTML/CSS/JS). Claude Code's native
`.claude/` shape is the canonical source format — Cursor and Codex CLI already read `skills/` and
`agents/` files directly, so there is no translation layer for those. Hooks and MCP servers diverge
more across harnesses and are hand-written per harness instead (see `hooks/README.md`, `mcp/README.md`).
Tracked harnesses are `claude-code` (primary/canonical), `cursor`, and `codex` (needs a TOML shim for
agents/hooks/MCP).

## Commands

```
npm run validate        # fails loudly on malformed frontmatter/JSON across skills/agents/hooks/mcp
npm run build:manifest  # regenerates manifest.json from the four resource folders — run after adding/editing a resource
npm run bootstrap       # node scripts/bootstrap.js <target-dir> --bundle <name> --harness claude-code|cursor|codex
```

There is no test suite and no build step for the site itself. To preview the static site locally,
serve the repo root with any static file server (e.g. `npx serve .`) and open `index.html` or
`harness.html`.

CI (`.github/workflows/ci.yml`) runs `npm run validate`, then `npm run build:manifest` and fails if
`manifest.json` changed — i.e. a resource was added/edited without regenerating and committing the
manifest.

## Architecture

**`manifest.json` is generated, never hand-edited.** `scripts/generate-manifest.js` walks
`skills/<name>/SKILL.md`, `agents/<name>.md`, `hooks/<name>/hook.json`, and `mcp/<name>.json`, reading
each resource's frontmatter (`name`, `description`, `tags`, `harnesses`) into one flat array. The static
site (`configs.js`) fetches this manifest at runtime to render and filter the config library — there is
no server-side rendering. Every resource's `harnesses` map should list compatibility per tracked harness
(`native` / `shim` / `unknown`), since that's what renders as badges in the UI and is the output of the
"which harnesses actually support this" judgment call that has to be made by hand per resource.

**Exporting a resource into another project has two separate mechanisms**, because they cover different
resource types:
- Skills: the third-party `skills` CLI (`npx skills add <owner>/harness-resource-manager --skill <name>`,
  works once this repo is pushed to GitHub) — it doesn't know about agents, hooks, or MCP.
- Everything else (and local/pre-publish bundles): `scripts/bootstrap.js`, which reads `bundles.json`
  (named groups of resources) and copies files into a target project's `.claude/`, `.cursor/`, or
  `.codex/` tree per the harness's own folder convention. It only copies skills and agents (same
  Markdown shape across harnesses) — hooks and MCP need per-harness event/TOML translation that isn't
  automated yet, by design (see the `shortcut:` comment at the top of `scripts/bootstrap.js`).

**`.agents/` and `.claude/` are gitignored** — they're the *installed* copies produced by the `skills`
CLI (tracked via `skills-lock.json`), analogous to `node_modules/`. The actual source of truth for this
repo's own skills/agents lives in the top-level `skills/` and `agents/` folders; the gitignored copies
are what makes them active in *this* Claude Code session and are regenerable with
`npx skills experimental_install`.

**The site is two independent pages sharing `app.js` and `styles.css`:**
- `index.html` — stacks the stack picker (`stacks.js`, filtering `stack-picker/stacks.json`, hand-maintained
  and not generated; seeded only with stacks actually in use, not a hypothetical catalog) above the config
  library (`configs.js`, browsing/filtering the generated `manifest.json`). The two scripts run independently
  against separate DOM ids on the same page — there's no cross-filtering between a chosen stack and the
  resource list below it.
- `harness.html` — a large, mostly self-contained interactive guide (not wired into `app.js`'s i18n
  system structurally, but it does read/write the same `hrm-lang` localStorage key so language choice
  stays in sync across pages). Its own i18n works by duplicating every data block into `_FR`/`_EN`
  suffixed pairs (`CORE_FR`/`CORE_EN`, `FACES_FR`/`FACES_EN`, etc.) with an `applyLang()` function that
  swaps which set of `let`-bound globals the render functions read from, rather than templating strings
  per call site.

`app.js` provides a small shared `HRM` object (language load/toggle, `data-i18n` text substitution) that
`configs.js` and `stacks.js` both depend on; each page's own script listens for the `hrm:langchange`
event to re-render its dynamic content when the language toggle fires.

**`docs/harnais-demo.html` is not this project's file** — it appeared during development from unrelated,
separate work in this same repo and should be left untouched; it is not the same content as the
`harness.html` at the repo root (that one is referenced by the site nav and actively maintained
here).
