// Installs the packed package into an empty project and uses it the way a user would:
// CommonJS `require`, ES module `import`, the `ts-ds/sort` subpath and TypeScript types.
//
// Usage: npm run build && node .github/scripts/smoke-test-package.mjs

import { execSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const root = resolve('.');
const project = mkdtempSync(join(tmpdir(), 'ts-ds-smoke-'));
const run = (command, cwd = project) => execSync(command, { cwd, stdio: 'inherit' });

try {
  const tarball = execSync(`npm pack --ignore-scripts --pack-destination "${project}"`, {
    cwd: root,
    encoding: 'utf8',
  })
    .trim()
    .split('\n')
    .pop();

  writeFileSync(join(project, 'package.json'), '{ "name": "smoke", "private": true }\n');
  run(`npm install --no-audit --no-fund "${join(project, tarball)}"`);
  run(`npm install --no-audit --no-fund typescript@${typescriptVersion()}`);

  writeFileSync(
    join(project, 'check.cjs'),
    `const assert = require('node:assert');
const { quickSort, sort } = require('ts-ds');
const { mergeSort } = require('ts-ds/sort');
const a = [3, 1, 2];
quickSort(a);
assert.deepStrictEqual(a, [1, 2, 3]);
const b = [2, 1];
mergeSort(b);
assert.deepStrictEqual(b, [1, 2]);
assert.strictEqual(typeof sort.heap, 'function');
console.log('✔ require');
`,
  );
  writeFileSync(
    join(project, 'check.mjs'),
    `import assert from 'node:assert';
import { quickSort, sort } from 'ts-ds';
import { countingSort } from 'ts-ds/sort';
const a = [3, 1, 2];
quickSort(a);
assert.deepStrictEqual(a, [1, 2, 3]);
const b = [2, -1];
countingSort(b);
assert.deepStrictEqual(b, [-1, 2]);
assert.strictEqual(typeof sort.heap, 'function');
console.log('✔ import');
`,
  );
  writeFileSync(
    join(project, 'check.ts'),
    `import { quickSort, type CompareFn } from 'ts-ds';
import { sort } from 'ts-ds/sort';
const byLength: CompareFn<string> = (a, b) => a.length - b.length;
const words = ['ccc', 'a', 'bb'];
quickSort(words, byLength);
sort.merge(words);
// @ts-expect-error sorting functions return void
const copy: string[] = quickSort(words);
`,
  );

  run('node check.cjs');
  run('node check.mjs');
  run('npx tsc --noEmit --strict --module nodenext --moduleResolution nodenext check.ts');
  console.log('✔ types');
} finally {
  rmSync(project, { recursive: true, force: true });
}

function typescriptVersion() {
  return execSync('node -p "require(\'typescript/package.json\').version"', {
    cwd: root,
    encoding: 'utf8',
  }).trim();
}
