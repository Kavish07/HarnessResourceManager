// Walks /skills, /agents, /hooks, /mcp and writes manifest.json — the single
// source of truth consumed by the static site. Re-run after adding/editing a resource.
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const ROOT = path.join(__dirname, '..');

function readMarkdownResources(type, dir) {
  const base = path.join(ROOT, dir);
  if (!fs.existsSync(base)) return [];
  return fs
    .readdirSync(base, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => {
      const skillFile = path.join(base, e.name, 'SKILL.md');
      if (!fs.existsSync(skillFile)) return null;
      const { data } = matter(fs.readFileSync(skillFile, 'utf8'));
      return toEntry(type, `${dir}/${e.name}`, data);
    })
    .filter(Boolean);
}

function readFlatMarkdownResources(type, dir) {
  const base = path.join(ROOT, dir);
  if (!fs.existsSync(base)) return [];
  return fs
    .readdirSync(base)
    .filter((f) => f.endsWith('.md') && f !== 'README.md')
    .map((f) => {
      const { data } = matter(fs.readFileSync(path.join(base, f), 'utf8'));
      return toEntry(type, `${dir}/${f}`, data);
    });
}

function readJsonResources(type, dir, fileName) {
  const base = path.join(ROOT, dir);
  if (!fs.existsSync(base)) return [];
  return fs
    .readdirSync(base, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => {
      const file = path.join(base, e.name, fileName);
      if (!fs.existsSync(file)) return null;
      const data = JSON.parse(fs.readFileSync(file, 'utf8'));
      return toEntry(type, `${dir}/${e.name}`, data);
    })
    .filter(Boolean);
}

function readFlatJsonResources(type, dir) {
  const base = path.join(ROOT, dir);
  if (!fs.existsSync(base)) return [];
  return fs
    .readdirSync(base)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      const data = JSON.parse(fs.readFileSync(path.join(base, f), 'utf8'));
      return toEntry(type, `${dir}/${f}`, data);
    });
}

function toEntry(type, resourcePath, data) {
  return {
    type,
    name: data.name,
    description: data.description,
    path: resourcePath,
    tags: data.tags || [],
    harnesses: data.harnesses || {
      'claude-code': 'unknown',
      cursor: 'unknown',
      codex: 'unknown',
    },
  };
}

const manifest = [
  ...readMarkdownResources('skill', 'skills'),
  ...readFlatMarkdownResources('agent', 'agents'),
  ...readJsonResources('hook', 'hooks', 'hook.json'),
  ...readFlatJsonResources('mcp', 'mcp'),
];

fs.writeFileSync(path.join(ROOT, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`Wrote manifest.json with ${manifest.length} resource(s).`);
