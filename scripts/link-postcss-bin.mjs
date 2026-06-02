// Hugo execs the `postcss` binary directly and rejects anything whose shebang
// is not Node (`binary "postcss" is not a Node.js script`). pnpm writes
// node_modules/.bin/postcss as a `#!/bin/sh` cmd-shim — not a Node script —
// so Hugo's PostCSS step (Docsy's CSS pipeline) fails. node-linker=hoisted
// fixes module *resolution* but not the shim format.
//
// This replaces that one shim with an npm-style symlink to the real
// postcss-cli entrypoint (which has a `#!/usr/bin/env node` shebang). Runs as
// postinstall so every `pnpm install` self-heals — in CI and locally.
// No-op on platforms without symlink support or when postcss-cli is absent.
import { existsSync, lstatSync, rmSync, symlinkSync } from 'node:fs'

const bin = 'node_modules/.bin/postcss'
const target = '../postcss-cli/index.js' // relative to node_modules/.bin

if (!existsSync('node_modules/postcss-cli/index.js')) {
  process.exit(0) // postcss-cli not installed (e.g. --prod) — nothing to do
}

try {
  if (existsSync(bin) || lstatSync(bin, { throwIfNoEntry: false })) {
    rmSync(bin, { force: true })
  }
  symlinkSync(target, bin)
} catch (err) {
  // Don't fail install on platforms that disallow symlinks (e.g. Windows
  // without privileges); the build will surface a clear error there instead.
  console.warn(`link-postcss-bin: could not symlink ${bin}: ${err.message}`)
}
