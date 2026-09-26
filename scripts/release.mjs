#!/usr/bin/env node
// Release tooling for the Git Flow described in CONTRIBUTING.md.
// Only Node.js built-ins are used so the script works without extra dependencies.
//
//   node scripts/release.mjs start <patch|minor|major|X.Y.Z> [--hotfix]
//   node scripts/release.mjs check          (CI: version policy for pull requests)
//   node scripts/release.mjs notes <X.Y.Z>  (prints the CHANGELOG section of a version)

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const CHANGELOG = 'CHANGELOG.md';
const VERSION_RE = /^(\d+)\.(\d+)\.(\d+)$/;
const RELEASE_BRANCH_RE = /^(release|hotfix)\/(\d+\.\d+\.\d+)$/;

function run(cmd, args, options = {}) {
  return (execFileSync(cmd, args, { encoding: 'utf8', ...options }) ?? '').trim();
}

function fail(message) {
  console.error(`✖ ${message}`);
  process.exit(1);
}

function readPackage(ref) {
  const text = ref
    ? run('git', ['show', `${ref}:package.json`])
    : readFileSync('package.json', 'utf8');
  return JSON.parse(text);
}

function parse(version) {
  const match = VERSION_RE.exec(version ?? '');
  return match ? match.slice(1).map(Number) : null;
}

function compare(a, b) {
  const [pa, pb] = [parse(a), parse(b)];
  for (let i = 0; i < 3; i += 1) {
    if (pa[i] !== pb[i]) return pa[i] - pb[i];
  }
  return 0;
}

function bump(version, kind) {
  if (parse(kind)) return kind;
  const [major, minor, patch] = parse(version);
  switch (kind) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    default:
      return fail(`Unknown bump "${kind}". Use patch, minor, major or X.Y.Z.`);
  }
}

function npmLatest(name) {
  try {
    return run('npm', ['view', name, 'version'], { stdio: ['ignore', 'pipe', 'ignore'] }) || null;
  } catch {
    return null; // not published yet
  }
}

function tagExists(tag) {
  return run('git', ['ls-remote', '--tags', 'origin', `refs/tags/${tag}`]) !== '';
}

function changelogSection(version) {
  const lines = readFileSync(CHANGELOG, 'utf8').split('\n');
  const start = lines.findIndex((line) => line.startsWith(`## [${version}]`));
  if (start === -1) return null;
  const rest = lines.slice(start + 1);
  const end = rest.findIndex((line) => line.startsWith('## ['));
  return rest
    .slice(0, end === -1 ? undefined : end)
    .join('\n')
    .trim();
}

function start([kind, ...flags]) {
  if (!kind) fail('Usage: npm run release:start -- <patch|minor|major|X.Y.Z> [--hotfix]');
  const hotfix = flags.includes('--hotfix');
  const base = hotfix ? 'main' : 'develop';

  if (run('git', ['status', '--porcelain'])) fail('Working tree is not clean.');
  run('git', ['fetch', 'origin', base, '--tags'], { stdio: 'inherit' });

  const current = readPackage(`origin/${base}`).version;
  const version = bump(current, kind);
  if (compare(version, current) <= 0) fail(`${version} must be greater than ${current}.`);

  const branch = `${hotfix ? 'hotfix' : 'release'}/${version}`;
  run('git', ['switch', '-c', branch, `origin/${base}`], { stdio: 'inherit' });
  run('npm', ['version', version, '--no-git-tag-version'], { stdio: 'inherit' });

  const date = new Date().toISOString().slice(0, 10);
  const changelog = readFileSync(CHANGELOG, 'utf8');
  if (!changelog.includes('## [Unreleased]'))
    fail(`${CHANGELOG} has no "## [Unreleased]" section.`);
  writeFileSync(
    CHANGELOG,
    changelog.replace('## [Unreleased]', `## [Unreleased]\n\n## [${version}] - ${date}`),
  );

  run('git', ['add', 'package.json', 'package-lock.json', CHANGELOG]);
  run('git', ['commit', '-m', `chore(release): ${version}`], { stdio: 'inherit' });
  console.log(
    `\n✔ Branch ${branch} is ready. Review ${CHANGELOG}, then:\n  git push -u origin ${branch}\n  and open a pull request into main.`,
  );
}

function check() {
  const baseRef = process.env.BASE_REF;
  const headRef = process.env.HEAD_REF;
  if (!baseRef || !headRef) fail('BASE_REF and HEAD_REF must be set.');

  const pkg = readPackage();
  const baseVersion = readPackage(`origin/${baseRef}`).version;
  console.log(`${headRef} (${pkg.version}) → ${baseRef} (${baseVersion})`);

  if (baseRef === 'main') {
    const match = RELEASE_BRANCH_RE.exec(headRef);
    if (!match) fail('Only release/X.Y.Z and hotfix/X.Y.Z branches can be merged into main.');
    const version = match[2];
    if (pkg.version !== version)
      fail(`package.json version ${pkg.version} does not match branch ${headRef}.`);
    if (compare(version, baseVersion) <= 0)
      fail(`${version} must be greater than main (${baseVersion}).`);
    const published = npmLatest(pkg.name);
    if (published && compare(version, published) <= 0)
      fail(`${version} must be greater than npm (${published}).`);
    if (tagExists(`v${version}`)) fail(`Tag v${version} already exists.`);
    if (!changelogSection(version)) fail(`${CHANGELOG} has no "## [${version}]" section.`);
  } else if (baseRef === 'develop') {
    const releaseLike = headRef === 'main' || RELEASE_BRANCH_RE.test(headRef);
    if (!releaseLike && pkg.version !== baseVersion) {
      fail(
        `Version changed ${baseVersion} → ${pkg.version}. Versions are bumped only in release/* or hotfix/* branches.`,
      );
    }
  }
  console.log('✔ Version policy passed.');
}

function notes([version]) {
  const section = version && changelogSection(version);
  if (!section) fail(`${CHANGELOG} has no "## [${version}]" section.`);
  console.log(section);
}

const [command, ...args] = process.argv.slice(2);
const commands = { start, check, notes };
if (!commands[command]) fail('Usage: release.mjs <start|check|notes> ...');
commands[command](args);
