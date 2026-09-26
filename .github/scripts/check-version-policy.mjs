// Version policy for pull requests (see CONTRIBUTING.md → "Version control").
//
// Into main:    only release/X.Y.Z or hotfix/X.Y.Z; the version equals X.Y.Z, is newer than
//               main and npm, the tag vX.Y.Z does not exist, CHANGELOG.md has a "## [X.Y.Z]" section.
// Into develop: the version must not change, except from main, release/* or hotfix/*.
//
// Usage (in CI): BASE_REF=main HEAD_REF=release/1.2.0 node .github/scripts/check-version-policy.mjs

import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const baseBranch = process.env.BASE_REF;
const headBranch = process.env.HEAD_REF;

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const version = pkg.version;
const baseVersion = JSON.parse(sh(`git show origin/${baseBranch}:package.json`)).version;

console.log(`${headBranch} (${version}) → ${baseBranch} (${baseVersion})`);

if (baseBranch === 'main') {
  checkReleaseIntoMain();
} else if (baseBranch === 'develop') {
  checkIntoDevelop();
}

console.log('✔ Version policy passed.');

function checkReleaseIntoMain() {
  const match = headBranch.match(/^(release|hotfix)\/(\d+\.\d+\.\d+)$/);
  if (!match) {
    fail('Only release/X.Y.Z and hotfix/X.Y.Z branches can be merged into main.');
  }

  const branchVersion = match[2];
  if (version !== branchVersion) {
    fail(`package.json version ${version} does not match the branch ${headBranch}.`);
  }

  if (!isNewer(version, baseVersion)) {
    fail(`${version} must be greater than the version on main (${baseVersion}).`);
  }

  const npmVersion = publishedVersion(pkg.name);
  if (npmVersion && !isNewer(version, npmVersion)) {
    fail(`${version} must be greater than the version on npm (${npmVersion}).`);
  }

  if (sh(`git ls-remote --tags origin refs/tags/v${version}`) !== '') {
    fail(`Tag v${version} already exists.`);
  }

  const changelog = readFileSync('CHANGELOG.md', 'utf8');
  if (!changelog.includes(`\n## [${version}]`)) {
    fail(`CHANGELOG.md has no "## [${version}]" section.`);
  }
}

function checkIntoDevelop() {
  const bringsRelease = /^(main|release\/.+|hotfix\/.+)$/.test(headBranch);
  if (!bringsRelease && version !== baseVersion) {
    fail(
      `Version changed ${baseVersion} → ${version}. ` +
        'Versions are changed only in release/* or hotfix/* branches.',
    );
  }
}

/** True when version `a` is greater than version `b` (both "X.Y.Z"). */
function isNewer(a, b) {
  const [a1, a2, a3] = a.split('.').map(Number);
  const [b1, b2, b3] = b.split('.').map(Number);
  return a1 !== b1 ? a1 > b1 : a2 !== b2 ? a2 > b2 : a3 > b3;
}

/** Latest version of the package on npm, or null if it has never been published. */
function publishedVersion(name) {
  try {
    return sh(`npm view ${name} version`);
  } catch {
    return null;
  }
}

function sh(command) {
  return execSync(command, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
}

function fail(message) {
  console.error(`::error::${message}`);
  process.exit(1);
}
