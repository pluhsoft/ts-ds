# Changelog

All notable changes to this project are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Release process moved to Git Flow: `develop` → `release/X.Y.Z` → `main` → npm, with an automatic backmerge into `develop` (#38).
- The published package contains only the build output; it has no runtime dependencies.
- Node.js 24 and current versions of TypeScript, Vitest and Prettier are used for development.

## [1.0.32] - 2026-05-02

Last version published by the previous automatic release process.
