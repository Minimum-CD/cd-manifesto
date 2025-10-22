---
title: Continuous Integration
description: Continuous integration requires daily code integration to trunk with automated testing. Learn CI best practices, testing strategies, and team workflows that improve software quality and delivery speed.
weight: 2
type: docs
---

## Definition

Continuous Integration (CI) is the activity of each developer integrating work to the trunk of version control at least daily and verifying that the work is, to the best of our knowledge, releasable.

CI is not just about tooling—it's fundamentally about team workflow and working agreements.

### The minimum activities required for CI

1. [Trunk-based development](/minimumcd/tbd/) - all work integrates to trunk
2. Work integrates to trunk at a minimum daily (each developer, every day)
3. Work has automated testing before merge to trunk
4. Work is tested with other work automatically on merge
5. All feature work stops when the build is red
6. New work does not break delivered work

## Why This Matters

### Without CI, Teams Experience

- **Integration hell**: Weeks or months of painful merge conflicts
- **Late defect detection**: Bugs found after they're expensive to fix
- **Reduced collaboration**: Developers work in isolation, losing context
- **Deployment fear**: Large batches of untested changes create risk
- **Slower delivery**: Time wasted on merge conflicts and rework
- **Quality erosion**: Without rapid feedback, technical debt accumulates

### With CI, Teams Achieve

- **Rapid feedback**: Know within minutes if changes broke something
- **Smaller changes**: Daily integration forces better work breakdown
- **Better collaboration**: Team shares ownership of the codebase
- **Lower risk**: Small, tested changes are easier to diagnose and fix
- **Faster delivery**: No integration delays blocking deployment
- **Higher quality**: Continuous testing catches issues early

## Team Working Agreements

While CI depends on tooling, the team workflow and working agreement are more important:

1. **Define testable work**: Work includes [testable acceptance criteria](https://dojoconsortium.org/docs/work-decomposition/behavior-driven-development/) that drive testing efforts
2. **Tests accompany commits**: No work committed to version control without required tests
3. **Incremental progress**: Committed work may not be "feature complete", but must not break existing work
4. **Trunk-based workflow**: All work begins from trunk and integrates to trunk at least daily
5. **Team commitment**: If CI detects an error, the team stops feature work and collaborates to fix the build

## Example Implementations

### Anti-Pattern: Feature Branch Workflow Without CI

```text
Developer A: feature-branch-1 (3 weeks of work)
Developer B: feature-branch-2 (2 weeks of work)
Developer C: feature-branch-3 (4 weeks of work)

Week 4: Merge conflicts, integration issues, broken tests
Week 5: Still fixing integration problems
Week 6: Finally stabilized, but lost 2 weeks to integration
```

**Problems:**

- Long-lived branches accumulate merge conflicts
- Integration issues discovered late
- No early feedback on compatibility
- Large batches of untested changes
- Team blocked while resolving conflicts

### Good Pattern: Continuous Integration to Trunk

```yaml
# .github/workflows/ci.yml
name: Continuous Integration

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm test

      - name: Run integration tests
        run: npm run test:integration

      - name: Code quality checks
        run: npm run lint

      - name: Security scan
        run: npm audit

      - name: Build application
        run: npm run build

  notify-on-failure:
    needs: test
    if: failure()
    runs-on: ubuntu-latest
    steps:
      - name: Notify team
        run: |
          echo "Build failed - stop feature work and fix!"
          # Send Slack/email notification
```

**Benefits:**

- Changes tested within minutes
- Team gets immediate feedback
- Small changes are easy to debug
- Integration is never a surprise
- Quality maintained continuously

## Evolutionary Coding Practices

To integrate code daily while building large features, use these patterns:

### Branch by Abstraction

Gradually replace existing behavior while continuously integrating:

```javascript
// Step 1: Create abstraction (integrate to trunk)
class PaymentProcessor {
  process(payment) {
    return this.implementation.process(payment)
  }
}

// Step 2: Add new implementation alongside old (integrate to trunk)
class StripePaymentProcessor {
  process(payment) {
    // New Stripe implementation
  }
}

// Step 3: Switch implementations (integrate to trunk)
const processor = useNewStripe
  ? new StripePaymentProcessor()
  : new LegacyProcessor()

// Step 4: Remove old implementation (integrate to trunk)
```

### Feature Flags

Control feature visibility without blocking integration:

```javascript
// Incomplete feature integrated to trunk, hidden behind flag
if (featureFlags.newCheckout) {
  return renderNewCheckout()  // Work in progress
}
return renderOldCheckout()  // Stable existing feature

// Team can continue integrating newCheckout code daily
// Feature revealed when complete by toggling flag
```

### Connect Last

Build complete features, connect them in final commit:

```javascript
// Commits 1-10: Build new checkout components (all tested, all integrated)
function CheckoutStep1() { /* tested, working */ }
function CheckoutStep2() { /* tested, working */ }
function CheckoutStep3() { /* tested, working */ }

// Commit 11: Wire up to UI (final integration)
<Route path="/checkout" component={CheckoutStep1} />
```

For detailed guidance on when to use each pattern, see [Feature Flags](/recommendations/featureflags/).

## What Tests Should Run

### Pre-Merge (Fast Feedback)

Run before code merges to trunk:

- **Unit tests**: Test individual components in isolation
- **Linting**: Code style and quality checks
- **Static security scans**: SAST tools checking for vulnerabilities
- **Dependency audits**: Known vulnerabilities in dependencies

**Goal**: Complete in < 10 minutes

### Post-Merge (Comprehensive Validation)

Run after code merges to trunk:

- **Integration tests**: Test component interactions
- **Functional tests**: Test user-facing behavior
- **Performance tests**: Ensure no regressions
- **Security tests**: Dynamic security analysis

**Goal**: Complete in < 30 minutes

### What About Deployment Testing?

Tests requiring deployment (end-to-end, smoke tests) are part of the [deployment pipeline](/minimumcd/singlepath/), not CI.

## What is Improved

### Teamwork

CI requires strong teamwork to function correctly. Key improvements:

- **Pull workflow**: Team picks next important work instead of working from assignments
- **Code review cadence**: Quick reviews (< 4 hours) keep work flowing
- **Pair programming**: Real-time collaboration eliminates review delays
- **Shared ownership**: Everyone maintains the codebase together
- **Team goals over individual tasks**: Focus shifts from "my work" to "our progress"

**Anti-pattern**: "Push" workflow where work is assigned creates silos and delays.

### Work Breakdown

CI forces better work decomposition:

- **Definition of Ready**: Every story has testable acceptance criteria before work starts
- **Small batches**: If the team can complete work in < 2 days, it's refined enough
- **Vertical slicing**: Each change delivers a thin, tested slice of functionality
- **Incremental delivery**: Features built incrementally, each step integrated daily

See [Work Breakdown](https://dojoconsortium.org/docs/work-decomposition/work-breakdown/) for detailed guidance.

### Testing

CI requires a shift in testing approach:

**From**: Writing tests after code is "complete"
**To**: Writing tests before/during coding (TDD/BDD)

**From**: Testing implementation details
**To**: Testing behavior and outcomes

**From**: Manual testing before deployment
**To**: Automated testing on every commit

**From**: Separate QA phase
**To**: Quality built into development

CI teams build a comprehensive test suite with the goal of detecting issues as close to creation as possible. See [Behavior-Driven Development](https://dojoconsortium.org/docs/work-decomposition/behavior-driven-development/).

## Common Challenges

### "What are the main problems to overcome?"

1. **Poor teamwork**: Usually driven by assigning work instead of using a pull system
2. **Lack of testable acceptance criteria**: Made worse by individual assignments instead of team goals. [BDD](https://dojoconsortium.org/docs/work-decomposition/behavior-driven-development/) provides declarative functional tests everyone understands
3. **Lack of evolutionary coding knowledge**: "I can't commit until the feature is complete!" Use branch by abstraction, feature flags, or plan changes so the last change integrates the feature

### "How do I complete a large feature in less than a day?"

You probably don't complete it in a day, but you integrate progress every day. See [Evolutionary Coding Practices](#evolutionary-coding-practices) for detailed patterns and code examples.

### "What code coverage level is needed before we can do CI?"

You don't need tests in existing code to begin CI. You need to test **new code without exception**.

**Starting point**: "We will not go lower than the current level of code coverage."

### "What code coverage percentage should we have?"

"I'm confident." Are you confident you've covered enough positive and negative cases?

**Better question**: "Do we trust our tests?" Test coverage percentage doesn't indicate test quality.

### "Should we set a code coverage standard for all teams?"

No. Code coverage mandates incentivize meaningless tests that hide the fact that code is not tested.

**It is better to have no tests than to have tests you do not trust.**

Instead: Focus on test quality, behavior coverage, and team discipline. See [Code Coverage](https://dojoconsortium.org/docs/metrics/code-coverage/) for detailed guidance.

## Health Metrics

### Commits per Day per Developer

**What**: How frequently the team integrates code to trunk
**Good**: 1 or more per developer per day (team average)
**Important**: Never compare individuals—this is a team metric

### Development Cycle Time

**What**: Time from when work begins to completion
**Good**: Less than 2 days on average
**Indicates**: Effective work breakdown and CI practice

### Build Success Rate

**What**: Percentage of trunk builds that pass
**Good**: > 95%
**Indicates**: Quality of pre-merge testing and team discipline

### Time to Fix Broken Build

**What**: How quickly team resolves build failures
**Good**: < 1 hour
**Indicates**: Team commitment to "stop and fix"

### Defect Rate

**What**: Critical guardrail metric to ensure speed doesn't overtake quality
**Good**: Stable or decreasing as CI improves
**Indicates**: CI is improving quality, not just speed

## Additional Resources

- [Continuous Integration on Martin Fowler's site](https://martinfowler.com/articles/continuousIntegration.html)
- [Accelerate: Technical Practices](https://itrevolution.com/articles/accelerate-book/) - Nicole Forsgren, Jez Humble, Gene Kim
- [The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html) - Martin Fowler
- [Branch By Abstraction](https://www.branchbyabstraction.com/)
- [Feature Toggles](https://martinfowler.com/articles/feature-toggles.html) - Martin Fowler
- [Behavior-Driven Development](https://dojoconsortium.org/docs/work-decomposition/behavior-driven-development/) - DevOps Dojo Consortium
