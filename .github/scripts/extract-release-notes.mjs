// Prints the CHANGELOG.md section of one version — used as the GitHub release notes.
//
// Usage: node .github/scripts/extract-release-notes.mjs 1.2.0

import { readFileSync } from 'node:fs';

const version = process.argv[2];
const lines = readFileSync('CHANGELOG.md', 'utf8').split('\n');

const start = lines.findIndex((line) => line.startsWith(`## [${version}]`));
if (start === -1) {
  console.error(`::error::CHANGELOG.md has no "## [${version}]" section.`);
  process.exit(1);
}

const afterHeading = lines.slice(start + 1);
const nextSection = afterHeading.findIndex((line) => line.startsWith('## ['));
const section = nextSection === -1 ? afterHeading : afterHeading.slice(0, nextSection);

console.log(section.join('\n').trim());
