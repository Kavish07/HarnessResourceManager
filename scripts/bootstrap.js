// Installs a named bundle (bundles.json) into a target project, per harness.
// shortcut: only copies skills + agents (same Markdown shape across claude-code/cursor/codex/antigravity
// per the harness research); hooks and MCP need per-harness event/TOML translation that nothing
// here has been exercised against yet. Upgrade when a real hook or MCP entry needs exporting.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const DEST = {
  'claude-code': { skills: '.claude/skills', agents: '.claude/agents' },
  cursor: { skills: '.cursor/skills', agents: '.cursor/agents' },
  codex: { skills: '.codex/skills', agents: '.codex/agents' },
  antigravity: { skills: '.agents/skills', agents: '.agents/agents' },
};

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function main() {
  const args = process.argv.slice(2);
  const target = args[0];
  const bundleName = args[args.indexOf('--bundle') + 1];
  const harness = args.includes('--harness') ? args[args.indexOf('--harness') + 1] : 'claude-code';

  if (!target || !bundleName) {
    console.error('Usage: node scripts/bootstrap.js <target-dir> --bundle <name> [--harness claude-code|cursor|codex|antigravity]');
    process.exit(1);
  }
  const dest = DEST[harness];
  if (!dest) {
    console.error(`Unknown harness "${harness}". Known: ${Object.keys(DEST).join(', ')}`);
    process.exit(1);
  }

  const bundles = JSON.parse(fs.readFileSync(path.join(ROOT, 'bundles.json'), 'utf8'));
  const bundle = bundles[bundleName];
  if (!bundle) {
    console.error(`Unknown bundle "${bundleName}". Known: ${Object.keys(bundles).join(', ')}`);
    process.exit(1);
  }

  for (const name of bundle.skills) {
    copyDir(path.join(ROOT, 'skills', name), path.join(target, dest.skills, name));
    console.log(`+ skill ${name} -> ${dest.skills}/${name}`);
  }
  for (const name of bundle.agents) {
    const src = path.join(ROOT, 'agents', `${name}.md`);
    if (harness === 'codex') {
      console.warn(`! agent ${name}: Codex wants TOML, not Markdown — copy skipped, do by hand`);
      continue;
    }
    fs.mkdirSync(path.join(target, dest.agents), { recursive: true });
    fs.copyFileSync(src, path.join(target, dest.agents, `${name}.md`));
    console.log(`+ agent ${name} -> ${dest.agents}/${name}.md`);
  }
  if (bundle.hooks.length || bundle.mcp.length) {
    console.warn(`! bundle "${bundleName}" has hooks/mcp entries — not automated yet, wire them in by hand (see hooks/README.md, mcp/README.md)`);
  }
}

main();
