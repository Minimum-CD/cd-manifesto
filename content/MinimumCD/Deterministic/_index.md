---
title: Deterministic Pipeline
description: The pipeline decides the releasability of changes, its verdict is definitive
weight: 5
draft: false
type: docs
---

## Definition

A deterministic pipeline produces **consistent, repeatable results**. Given the same inputs (code, configuration, dependencies), the pipeline will always produce the same outputs and reach the same pass/fail verdict. The pipeline's decision on whether a change is releasable is **definitive**—if it passes, deploy it; if it fails, fix it.

Key principles:

1. **Repeatable**: Running the pipeline twice with identical inputs produces identical results
2. **Authoritative**: The pipeline is the final arbiter of quality, not humans
3. **Immutable**: No manual changes to artifacts or environments between pipeline stages
4. **Trustworthy**: Teams trust the pipeline's verdict without second-guessing

## Why This Matters

Non-deterministic pipelines create serious problems:

- **False confidence**: Tests pass inconsistently, hiding real issues
- **Wasted time**: Debugging "flaky" tests instead of delivering value
- **Trust erosion**: Teams stop trusting the pipeline and add manual gates
- **Slow feedback**: Re-running tests to "see if they pass this time"
- **Quality degradation**: Real failures get dismissed as "just flaky tests"

Deterministic pipelines provide:

- **Confidence**: Pipeline results are reliable and meaningful
- **Speed**: No need to re-run tests or wait for manual verification
- **Clarity**: Pass means deploy, fail means fix—no ambiguity
- **Quality**: Every failure represents a real issue that must be addressed

## What Makes a Pipeline Deterministic

### Version Control Everything

All pipeline inputs must be version controlled:

- **Source code** (obviously)
- **Infrastructure as code** (Terraform, CloudFormation, etc.)
- **Pipeline definitions** (GitHub Actions, Jenkins files, etc.)
- **Test data** (fixtures, mocks, seeds)
- **Configuration** (app config, test config)
- **Dependency lockfiles** (package-lock.json, Gemfile.lock, go.sum, Cargo.lock, poetry.lock, etc.)
- **Build scripts** (Make, npm scripts, etc.)

**Critical:** Always commit lockfiles to version control. This ensures every pipeline run uses identical dependency versions.

### Eliminate Environmental Variance

The pipeline must control its environment:

- **Container-based builds**: Use Docker with specific image tags (e.g., `node:18.17.1`, never `node:latest`)
- **Isolated test environments**: Each pipeline run gets a clean, isolated environment
- **Exact dependency versions**: Always use lockfiles (`package-lock.json`, `go.sum`, etc.) and install with `--frozen-lockfile` or equivalent
- **Controlled timing**: Don't rely on wall-clock time or race conditions
- **Deterministic randomness**: Seed random number generators for reproducibility

**Recommended Practice:** Never use floating version tags like `latest`, `stable`, or version ranges like `^1.2.3`. Always pin to exact versions.

### Remove Human Intervention

Manual steps break determinism:

- **No manual approvals** in the critical path (use post-deployment verification instead)
- **No manual environment setup** (automate environment provisioning)
- **No manual artifact modifications** (artifacts are immutable after build)
- **No manual test data manipulation** (generate or restore from version control)

### Fix Flaky Tests Immediately

Flaky tests destroy determinism:

- **All feature work stops** when tests become flaky
- **Root cause and fix** flaky tests immediately—don't just retry
- **Quarantine pattern**: Move flaky tests to quarantine, fix them, then restore
- **Monitor flakiness**: Track test stability metrics

## Example Implementations

### Anti-Pattern: Non-Deterministic Pipeline

```yaml
# Bad: Uses floating versions
dependencies:
  nodejs: "latest"
  postgres: "14"  # No minor/patch version

# Bad: Relies on external state
test:
  - curl https://api.example.com/test-data
  - run_tests --use-production-data

# Bad: Time-dependent tests
test('shows current date', () => {
  expect(getDate()).toBe(new Date())  # Fails at midnight!
})

# Bad: Manual steps
deploy:
  - echo "Manually verify staging before approving"
  - wait_for_approval
```

**Problem**: Results vary based on when the pipeline runs, what's in production, which dependency versions are "latest," and human availability.

### Good Pattern: Deterministic Pipeline

```yaml
# Good: Pinned versions
dependencies:
  nodejs: "18.17.1"
  postgres: "14.9"

# Good: Version-controlled test data
test:
  - docker-compose up -d
  - ./scripts/seed-test-data.sh  # From version control
  - npm run test

# Good: Deterministic time handling
test('shows date', () => {
  const mockDate = new Date('2024-01-15')
  jest.useFakeTimers().setSystemTime(mockDate)
  expect(getDate()).toBe(mockDate)
})

# Good: Automated verification
deploy:
  - deploy_to_staging
  - run_smoke_tests
  - if: smoke_tests_pass
    deploy_to_production
```

**Benefit**: Same inputs always produce same outputs. Pipeline results are trustworthy and reproducible.

## What is Improved

- **Quality increases**: Real issues are never dismissed as "flaky tests"
- **Speed increases**: No time wasted on test reruns or manual verification
- **Trust increases**: Teams rely on the pipeline instead of adding manual gates
- **Debugging improves**: Failures are reproducible, making root cause analysis easier
- **Collaboration improves**: Shared confidence in the pipeline reduces friction
- **Delivery improves**: Faster, more reliable path from commit to production

## Common Patterns

### Immutable Build Containers

Use specific container images for builds:

```dockerfile
# Dockerfile.build - version controlled
FROM node:18.17.1-alpine3.18

RUN apk add --no-cache \
    python3=3.11.5-r0 \
    make=4.4.1-r1

WORKDIR /app
COPY package-lock.json .
RUN npm ci --frozen-lockfile
```

### Hermetic Test Environments

Isolate each test run:

```yaml
# GitHub Actions
jobs:
  test:
    runs-on: ubuntu-22.04
    services:
      postgres:
        image: postgres:14.9
        env:
          POSTGRES_DB: testdb
          POSTGRES_PASSWORD: testpass
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm test
      # Each workflow run gets a fresh database
```

### Dependency Lock Files (Recommended Practice)

**Always use dependency lockfiles** - this is essential for deterministic builds:

```json
// package-lock.json (ALWAYS commit to version control)
{
  "dependencies": {
    "express": {
      "version": "4.18.2",
      "resolved": "https://registry.npmjs.org/express/-/express-4.18.2.tgz",
      "integrity": "sha512-5/PsL6iGPdfQ/..."
    }
  }
}
```

**Install with frozen lockfile:**

```bash
# npm
npm ci --frozen-lockfile

# yarn
yarn install --frozen-lockfile

# pnpm
pnpm install --frozen-lockfile

# Go
go mod download  # uses go.sum for verification

# Python (pip)
pip install -r requirements.txt --require-hashes

# Python (poetry)
poetry install --no-update

# Ruby
bundle install --frozen
```

**Never:**

- Use `npm install` in CI (use `npm ci` instead)
- Add lockfiles to `.gitignore`
- Use version ranges in production dependencies (`^`, `~`, `>=`)
- Rely on "latest" tags for any dependency

### Quarantine for Flaky Tests

Temporarily isolate flaky tests:

```javascript
// tests/quarantine/flaky-test.spec.js
describe.skip('Quarantined: Flaky Test', () => {
  // This test is quarantined due to flakiness
  // GitHub Issue: #1234
  // Will be fixed and restored by: 2024-02-01
  it('should work consistently', () => {
    // Test code
  })
})
```

## FAQ

### What if a test is occasionally flaky but hard to reproduce?

This is still a problem. Flaky tests indicate either:

1. A real bug in your code (race conditions, etc.)
2. A problem with your test (dependencies on external state)

Both need to be fixed. Quarantine the test, investigate thoroughly, and fix the root cause.

### Can we use retries to handle flaky tests?

Retries mask problems rather than fixing them. A test that passes on retry is **hiding a failure**, not succeeding. Fix the flakiness instead of retrying.

### What about tests that depend on external services?

Use test doubles (mocks, stubs, fakes) for external dependencies. If you must test against real external services, use contract tests and ensure those services are version-controlled and deterministic too.

### How do we handle tests that involve randomness?

Seed your random number generators with a fixed seed in tests:

```javascript
// Deterministic randomness
const rng = new Random(12345)  // Fixed seed
const result = shuffle(array, rng)
expect(result).toEqual([3, 1, 4, 2])  // Predictable
```

### What if our deployment requires manual verification?

Manual verification can happen **after** deployment, not before. Deploy automatically based on pipeline results, then verify. If verification fails, roll back automatically.

### Should the pipeline ever be non-deterministic?

There are rare cases where controlled non-determinism is useful (chaos engineering, fuzz testing), but these should be:

1. Explicitly designed and documented
2. Separate from the core deployment pipeline
3. Reproducible via saved seeds/inputs

## Health Metrics

- **Test flakiness rate**: Should be < 1% (ideally 0%)
- **Pipeline consistency**: Same commit should pass/fail consistently across runs
- **Time to fix flaky tests**: Should be < 1 day
- **Manual override rate**: Should be near zero

## Additional Resources

- [Martin Fowler: Eradicating Non-Determinism in Tests](https://martinfowler.com/articles/nonDeterminism.html)
- [Google Testing Blog: Just Say No to More End-to-End Tests](https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html)
- [Dave Farley: The Problem with Flaky Tests](https://www.youtube.com/watch?v=hmk1h40s_iA)
- [Continuous Delivery: Deployment Pipeline Best Practices](https://continuousdelivery.com/foundations/test-automation/)
