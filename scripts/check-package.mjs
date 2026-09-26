#!/usr/bin/env node
// Verifies what `npm publish` would ship:
// - the package has no runtime dependencies (installing ts-ds pulls nothing else);
// - the tarball contains only the build output and package metadata.

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const errors = [];
const pkg = JSON.parse(readFileSync('package.json', 'utf8'));

for (const field of [
  'dependencies',
  'peerDependencies',
  'optionalDependencies',
  'bundleDependencies',
]) {
  const names = Object.keys(pkg[field] ?? {});
  if (names.length > 0) errors.push(`"${field}" must be empty, found: ${names.join(', ')}`);
}

const [pack] = JSON.parse(
  execFileSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'], { encoding: 'utf8' }),
);
const files = pack.files.map((file) => file.path);
const allowed = /^(build\/.+|package\.json|README\.md|LICENSE|CHANGELOG\.md)$/;

for (const file of files) {
  if (!allowed.test(file)) errors.push(`unexpected file in package: ${file}`);
  if (/\.test\.(js|d\.ts)/.test(file)) errors.push(`test file in package: ${file}`);
}
for (const required of [pkg.main, pkg.types]) {
  if (!files.includes(required))
    errors.push(`missing entry point: ${required} (run npm run build first)`);
}

if (errors.length > 0) {
  errors.forEach((error) => console.error(`✖ ${error}`));
  process.exit(1);
}
console.log(
  `✔ ${pack.name}@${pack.version}: ${files.length} files, ${pack.size} bytes, no runtime dependencies.`,
);
