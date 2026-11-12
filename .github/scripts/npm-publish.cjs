'use strict';

// Runs on a GitHub-hosted runner. No npm token, install or build step is needed for this SDK.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const REPO = 'sensorsdata/sa-sdk-javascript';
const REGISTRY = 'https://registry.npmjs.org/';
const VERSION = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/;

function run(command, args, cwd, allowFailure = false, live = false) {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8', stdio: live ? 'inherit' : 'pipe', maxBuffer: 20 * 1024 * 1024 });
  if (result.error) throw result.error;
  if (result.status !== 0 && !allowFailure) throw new Error(`${command} failed (${result.status}): ${result.stderr || result.stdout || ''}`);
  return result;
}

function copyArtifacts(source, destination) {
  fs.mkdirSync(destination, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const name = entry.name;
    if ((name.startsWith('.') && !['.npmignore', '.gitignore'].includes(name)) || name === 'node_modules' || name.endsWith('.tgz')) continue;
    assert(!entry.isSymbolicLink(), `Unexpected symlink: ${name}`);
    const from = path.join(source, name);
    const to = path.join(destination, name);
    if (entry.isDirectory()) copyArtifacts(from, to);
    else {
      assert(entry.isFile(), `Unexpected file type: ${name}`);
      fs.copyFileSync(from, to);
    }
  }
}

function validateTag(tag) {
  assert(typeof tag === 'string' && tag.startsWith('v') && VERSION.test(tag.slice(1)), 'Expected a version tag such as v1.28.2');
}

function preparePackage(source, temp, tag) {
  validateTag(tag);
  const snapshot = path.join(temp, 'package');
  copyArtifacts(source, snapshot);
  const pkg = JSON.parse(fs.readFileSync(path.join(snapshot, 'package.json'), 'utf8'));
  assert(pkg.name === 'sa-sdk-javascript' && !pkg.private, 'Unexpected npm package');
  assert.equal(`v${pkg.version}`, tag, 'Tag and package version differ');
  const repo = typeof pkg.repository === 'string' ? pkg.repository : pkg.repository?.url;
  assert([`git+https://github.com/${REPO}.git`, `https://github.com/${REPO}.git`].includes(repo), 'Unexpected repository URL');
  assert(!pkg.publishConfig?.registry || pkg.publishConfig.registry.replace(/\/$/, '') === REGISTRY.replace(/\/$/, ''), 'Unexpected publish registry');
  const prerelease = pkg.version.split('+')[0].includes('-');
  const npmTag = prerelease ? 'next' : 'latest';
  assert(!pkg.publishConfig?.tag || pkg.publishConfig.tag === npmTag, 'publishConfig.tag differs from the release channel');
  const changelog = fs.readFileSync(path.join(snapshot, 'CHANGELOG.md'), 'utf8');
  const heading = /^##[ \t]+\[?v?([^\s\]（(]+)/m.exec(changelog);
  assert.equal(heading?.[1], pkg.version, 'Latest changelog version differs');
  assert(typeof pkg.main === 'string' && !path.isAbsolute(pkg.main) && !pkg.main.split(/[\\/]/).includes('..'), 'Invalid main entry');
  const packed = JSON.parse(run('npm', ['pack', '--json', '--ignore-scripts', '--pack-destination', temp], snapshot).stdout)[0];
  assert(packed?.integrity && path.basename(packed.filename) === packed.filename, 'Invalid tarball metadata');
  assert(packed.files.some((file) => file.path === pkg.main.replace(/^\.\//, '')), 'Package main entry is missing');
  const tarball = path.join(temp, packed.filename);
  assert(fs.existsSync(tarball), 'Tarball was not created');
  return { pkg, packed, tarball, snapshot, npmTag };
}

function registryDist(pkg, cwd) {
  const result = run('npm', ['view', `${pkg.name}@${pkg.version}`, 'dist', '--json', `--registry=${REGISTRY}`, '--fetch-retries=0', '--fetch-timeout=30000'], cwd, true);
  if (result.status === 0) {
    const dist = JSON.parse(result.stdout);
    assert(dist?.integrity || dist?.shasum, 'Invalid registry metadata');
    return dist;
  }
  let error;
  try { error = JSON.parse(result.stdout).error; } catch { /* Network errors must stop the release. */ }
  assert.equal(error?.code, 'E404', `Cannot query npm: ${result.stderr || result.stdout}`);
  return null;
}

function verifyRelease(tag) {
  validateTag(tag);
  const release = JSON.parse(run('gh', ['api', `repos/${REPO}/releases/tags/${tag}`]).stdout);
  assert(release.tag_name === tag && !release.draft, 'An existing public GitHub Release is required');
}

function publish(source, tag) {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'sa-npm-publish-'));
  try {
    const { pkg, packed, tarball, snapshot, npmTag } = preparePackage(source, temp, tag);
    const existing = registryDist(pkg, snapshot);
    if (existing) {
      assert(existing.integrity ? existing.integrity === packed.integrity : existing.shasum === packed.shasum, 'This npm version exists with different contents');
      console.log(`${pkg.name}@${pkg.version} is already published with identical contents; skipping.`);
    } else {
      run('npm', ['publish', tarball, '--provenance', '--ignore-scripts', '--access=public', '--tag', npmTag, `--registry=${REGISTRY}`], snapshot, false, true);
      const uploaded = registryDist(pkg, snapshot);
      assert(uploaded?.integrity === packed.integrity, 'Published package integrity verification failed');
    }
    if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `Published [${pkg.name}@${pkg.version}](https://www.npmjs.com/package/${pkg.name}/v/${pkg.version}) from ${tag}.\n`);
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
}

if (require.main === module) {
  try {
    assert(process.env.GITHUB_ACTIONS === 'true' && process.env.GITHUB_REPOSITORY === REPO, 'Run this publisher through the configured GitHub Actions workflow');
    if (process.argv[2] === '--verify-release') verifyRelease(process.env.RELEASE_TAG);
    else publish(path.resolve(process.argv[2] || '.'), process.env.RELEASE_TAG);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { preparePackage, publish, verifyRelease, validateTag };
