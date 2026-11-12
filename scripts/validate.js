// Fails loudly on a malformed resource instead of letting it get silently
// skipped (we watched the `skills` CLI skip a broken SKILL.md with just a warning).
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const ROOT = path.join(__dirname, '..');
let errors = [];

function checkFields(file, data) {
  if (!data.name) errors.push(`${file}: missing "name"`);
  if (!data.description) errors.push(`${file}: missing "description"`);
}

function checkMarkdownDir(dir, nested) {
  const base = path.join(ROOT, dir);
  if (!fs.existsSync(base)) return;
  for (const entry of fs.readdirSync(base, { withFileTypes: true })) {
    const file = nested
      ? path.join(base, entry.name, 'SKILL.md')
      : entry.name.endsWith('.md') && entry.name !== 'README.md' && path.join(base, entry.name);
    if (!file || !fs.existsSync(file)) continue;
    try {
      const { data } = matter(fs.readFileSync(file, 'utf8'));
      checkFields(path.relative(ROOT, file), data);
    } catch (e) {
      errors.push(`${path.relative(ROOT, file)}: YAML parse error — ${e.message}`);
    }
  }
}

function checkJsonDir(dir, fileName) {
  const base = path.join(ROOT, dir);
  if (!fs.existsSync(base)) return;
  for (const entry of fs.readdirSync(base, { withFileTypes: true })) {
    let file;
    if (entry.isDirectory() && fileName) file = path.join(base, entry.name, fileName);
    else if (!entry.isDirectory() && entry.name.endsWith('.json')) file = path.join(base, entry.name);
    if (!file || !fs.existsSync(file)) continue;
    try {
      const data = JSON.parse(fs.readFileSync(file, 'utf8'));
      checkFields(path.relative(ROOT, file), data);
    } catch (e) {
      errors.push(`${path.relative(ROOT, file)}: JSON parse error — ${e.message}`);
    }
  }
}

checkMarkdownDir('skills', true);
checkMarkdownDir('agents', false);
checkJsonDir('hooks', 'hook.json');
checkJsonDir('mcp', null);

if (errors.length) {
  console.error('Validation failed:\n' + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}
console.log('All resources valid.');
