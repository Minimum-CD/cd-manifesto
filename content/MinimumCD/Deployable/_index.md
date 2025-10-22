---
title: Definition of Deployable
description: Define clear deployment standards with automated quality gates. Learn how to establish your definition of deployable with security, testing, and compliance checks in your CI/CD pipeline.
weight: 4
draft: false
type: docs
---

## Definition

The "definition of deployable" is your organization's agreed-upon set of non-negotiable quality criteria that every artifact must pass before it can be deployed to any environment. This definition should be **automated, enforced by the pipeline, and treated as the authoritative verdict** on whether a change is ready for deployment.

Key principles:

1. **Pipeline is definitive**: If the pipeline passes, the artifact is deployable—no exceptions
2. **Automated validation**: All criteria are checked automatically, not manually
3. **Consistent across environments**: The same standards apply whether deploying to test or production
4. **Fails fast**: The pipeline rejects artifacts that don't meet the standard immediately

## Why This Matters

Without a clear, automated definition of deployable, teams face:

- **Inconsistent quality standards**: Different people have different opinions on "ready"
- **Manual gatekeeping**: Deployment approvals become bottlenecks
- **Surprise failures**: Issues that should have been caught earlier appear in production
- **Blame culture**: Unclear accountability when problems arise
- **Deployment fear**: Uncertainty about readiness causes risk aversion

A strong definition of deployable creates:

- **Confidence**: Everyone trusts that pipeline-approved artifacts are safe
- **Speed**: No waiting for manual approvals or meetings
- **Clarity**: Unambiguous standards for the entire team
- **Accountability**: The pipeline (and the team that maintains it) owns quality

## What Should Be in Your Definition

Your definition of deployable should include automated checks for:

### Security

- Static security scans (SAST) pass
- Dependency vulnerability scans show no critical issues
- Secrets are not embedded in code
- Authentication/authorization tests pass

### Functionality

- All unit tests pass
- Integration tests pass
- End-to-end tests pass
- Regression tests pass
- Business logic behaves as expected

### Compliance

- Code meets regulatory requirements
- Audit trails are in place
- Required documentation is generated
- Compliance tests pass

### Performance

- Response time meets thresholds
- Resource usage is within acceptable limits
- Load tests pass
- No memory leaks detected

### Reliability

- Error rates are within acceptable bounds
- Circuit breakers and retries work correctly
- Graceful degradation is in place
- Health checks pass

### Code Quality

- Code style/linting checks pass
- Code coverage meets minimum threshold
- Static analysis shows no critical issues
- Technical debt is within acceptable limits

## Example Implementations

### Anti-Pattern: Manual Approval Process

```text
Developer: "I think this is ready to deploy"
QA: "Let me manually test it again"
Manager: "Looks good, but wait for the CAB meeting Thursday"
Ops: "We need to review the deployment plan first"
```

**Problem**: Manual steps delay feedback, introduce inconsistency, and reduce confidence.

### Good Pattern: Automated Pipeline Gates

```yaml
# .github/workflows/cd-pipeline.yml
name: CD Pipeline

on: [push]

jobs:
  validate-deployable:
    steps:
      - name: Run unit tests
        run: npm test

      - name: Run security scan
        run: npm audit --audit-level=high

      - name: Run integration tests
        run: npm run test:integration

      - name: Check code coverage
        run: npm run test:coverage -- --threshold=80

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Performance tests
        run: npm run test:perf

      - name: Build artifact
        if: success()
        run: npm run build

      - name: Mark as deployable
        if: success()
        run: echo "Artifact meets definition of deployable"
```

**Benefit**: Every commit is automatically validated against all criteria. If it passes, it's deployable.

## What is Improved

- **Removes bottlenecks**: No waiting for manual approval meetings
- **Increases quality**: Automated checks catch more issues than manual reviews
- **Reduces cycle time**: Deployable artifacts are identified in minutes, not days
- **Improves collaboration**: Shared understanding of quality standards
- **Enables continuous delivery**: Trust in the pipeline makes frequent deployments safe
- **Reduces stress**: Clear criteria eliminate guesswork and blame

## Common Patterns

### Progressive Quality Gates

Structure your pipeline to fail fast on quick checks, then run expensive tests:

```text
Stage 1: Fast Feedback (< 5 min)
  ├─ Linting
  ├─ Unit tests
  └─ Security scan

Stage 2: Integration (< 15 min)
  ├─ Integration tests
  ├─ Database migrations
  └─ API contract tests

Stage 3: Comprehensive (< 30 min)
  ├─ E2E tests
  ├─ Performance tests
  └─ Compliance checks
```

### Context-Specific Definitions

Some criteria may vary by context:

```yaml
# Base definition (always required)
base_deployable:
  - unit_tests: pass
  - security_scan: pass
  - code_coverage: >= 80%

# Production-specific (additional requirements)
production_deployable:
  - load_tests: pass
  - disaster_recovery_tested: true
  - runbook_updated: true

# Feature branch (relaxed for experimentation)
feature_deployable:
  - unit_tests: pass
  - security_scan: no_critical
```

### Error Budget Approach

Use error budgets to balance speed and reliability:

```yaml
definition_of_deployable:
  error_budget_remaining: > 0
  slo_compliance: >= 99.9%
  recent_incidents: < 2 per week
```

If error budget is exhausted, focus shifts to reliability work instead of new features.

## FAQ

### Who decides what goes in the definition of deployable?

The entire team—developers, QA, operations, security, and product—should collaboratively define these standards. It should reflect genuine risks and requirements, not arbitrary bureaucracy.

### What if the pipeline passes but we find a bug in production?

This indicates a gap in your definition of deployable. Add a test to catch that class of bug in the future. The definition should evolve based on production learnings.

### Can we skip pipeline checks for "urgent" hotfixes?

No. If the pipeline can't validate a hotfix quickly enough, that's a problem with your pipeline, not your process. Fix the pipeline, don't bypass it. Bypassing quality checks for "urgent" changes is how critical bugs reach production.

### How strict should our definition be?

Strict enough to prevent production incidents, but not so strict that it becomes a bottleneck. If your pipeline rejects 90% of commits, your standards may be too rigid. If production incidents are frequent, your standards may be too lax.

### Should manual testing be part of the definition?

Manual exploratory testing is valuable for discovering edge cases, but it should **inform** the definition, not **be** the definition. Automate the validations that result from manual testing discoveries.

### What about things we can't test automatically?

Some requirements (like UX polish or accessibility) are harder to automate fully. For these:

1. Automate what you can (e.g., accessibility checkers, visual regression tests)
2. Make manual checks lightweight and concurrent, not blockers
3. Continuously work to automate more

## Health Metrics

- **Pipeline pass rate**: Should be 70-90% (too high = tests too lax, too low = tests too strict)
- **Pipeline execution time**: Should be < 30 minutes for full validation
- **Production incident rate**: Should decrease over time as definition improves
- **Manual override rate**: Should be near zero (manual overrides indicate broken process)

## Additional Resources

- [Dave Farley: Real Example of a Deployment Pipeline in the Fintech Industry](https://www.youtube.com/watch?v=bHKHdp4H-8w)
- [Continuous Delivery: The Deployment Pipeline](https://www.informit.com/articles/article.aspx?p=1621865)
- [Accelerate: Building Quality In](https://itrevolution.com/articles/accelerate-book/) - Nicole Forsgren, Jez Humble, Gene Kim
- [Site Reliability Engineering: Implementing SLOs](https://sre.google/workbook/implementing-slos/)
