import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(await readFile(path.join(root, 'extension.json'), 'utf8'));
const required = [
  'payload/agents/AGENTS.md',
  'payload/app/index.ts',
  'payload/app/supacharger-ext-installation-report.config.ts',
  'payload/docs/INSTALL.md',
];

async function files(directory, prefix = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  const result = [];
  for (const entry of entries) {
    const relative = path.posix.join(prefix, entry.name);
    if (entry.isDirectory()) result.push(...(await files(path.join(directory, entry.name), relative)));
    else if (entry.isFile()) result.push(relative);
    else throw new Error(`Unsupported payload entry: ${relative}`);
  }
  return result;
}

if (
  manifest.schemaVersion !== 3 ||
  manifest.name !== 'supacharger-ext-installation-report' ||
  manifest.id !== 'installation-report'
) {
  throw new Error('Invalid extension identity');
}
const declared = manifest.files.map((file) => file.source).sort();
const actual = (await files(path.join(root, 'payload'), 'payload')).sort();
if (JSON.stringify(declared) !== JSON.stringify(actual)) throw new Error('Manifest must cover the payload exactly');
for (const source of required) {
  if (!declared.includes(source) || !(await stat(path.join(root, source))).isFile())
    throw new Error(`Missing required payload: ${source}`);
}
const config = manifest.files.find((file) => file.source === required[2]);
if (config?.kind !== 'config') throw new Error('Extension configuration must be developer-owned');
console.log(`Validated ${manifest.name} ${manifest.version} (${declared.length} files)`);
