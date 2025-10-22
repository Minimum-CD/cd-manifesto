---
title: Only Path to Any Environment
description: The application pipeline is the only way to deploy to any environment
weight: 5
draft: false
type: docs
---

## Definition

The deployment pipeline is the **single, standardized path** for all changes to reach any environment—development, testing, staging, or production. No manual deployments, no side channels, no "quick fixes" bypassing the pipeline. If it's not deployed through the pipeline, it doesn't get deployed.

Key principles:

1. **Single path**: All deployments flow through the same pipeline
2. **No exceptions**: Even hotfixes and rollbacks go through the pipeline
3. **Automated**: Deployment is triggered automatically after pipeline validation
4. **Auditable**: Every deployment is tracked and traceable
5. **Consistent**: The same process deploys to all environments

## Why This Matters

### Multiple Deployment Paths Create Serious Risks

- **Quality issues**: Bypassing the pipeline bypasses quality checks
- **Configuration drift**: Manual deployments create inconsistencies between environments
- **Security vulnerabilities**: Undocumented changes escape security review
- **Debugging nightmares**: "What's actually running in production?"
- **Compliance violations**: Audit trails break when changes bypass the pipeline
- **Lost confidence**: Teams lose trust in the pipeline and resort to manual interventions

### A Single Deployment Path Provides

- **Reliability**: Every deployment is validated the same way
- **Traceability**: Clear audit trail from commit to production
- **Consistency**: Environments stay in sync
- **Speed**: Automated deployments are faster than manual
- **Safety**: Quality gates are never bypassed
- **Confidence**: Teams trust that production matches what was tested
- **Recovery**: Rollbacks are as reliable as forward deployments

## What "Single Path" Means

### One Merge Pattern for All Changes

{{% alert %}}
Use ONE consistent merge pattern for ALL types of changes—features, bugs, hotfixes, everything.
{{% /alert %}}

**Direct Trunk Integration: all work integrates directly to trunk using the same process.**

```text
trunk ← features
trunk ← bugfixes
trunk ← hotfixes
```

#### Anti-pattern Examples

1. Integration Branch

```text
trunk → integration ← features
```

This creates TWO merge structures instead of one:

1. When trunk changes → merge to integration branch immediately
2. When features change → merge to integration branch at least daily

The integration branch lives a parallel life to the trunk, acting as a temporary container for partially finished features. This attempts to "mimic" feature toggles to keep inactive features out of production.

##### Why This Violates Single-Path

- Creates multiple merge patterns (trunk→integration AND features→integration)
- Integration branch becomes a second "trunk" with different rules
- Adds complexity: "Is this change ready for integration or trunk?"
- Defeats the purpose: Use actual feature flags instead of mimicking them with branches
- Accumulates "given-up" features that stay unfinished forever
- Delays true integration: Features are integrated to integration branch but not to trunk

2. GitFlow (Multiple Long-Lived Branches)

```text
master (production)
  ↓
develop (integration)
  ↓
feature branches → develop
  ↓
release branches → master
  ↓
hotfix branches → master → develop
```

GitFlow creates MULTIPLE merge patterns depending on change type:

- Features: feature → develop → release → master
- Hotfixes: hotfix → master AND hotfix → develop
- Releases: develop → release → master

##### Why This Violates Single-Path

- Different types of changes follow different paths to production
- Multiple long-lived branches (master, develop, release) create merge complexity
- Hotfixes have a different path than features (bypassing develop)
- Release branches delay integration and create batch deployments
- Merge conflicts multiply across multiple integration points
- Violates continuous integration principle (changes don't integrate daily to trunk)
- Forces "release" to be a special event rather than continuous deployment

#### The Correct Approach: Trunk-Based Development with Integration Patterns

##### Option 1: Feature Flags

For incomplete features that need to be hidden:

```javascript
// Feature code lives in trunk, controlled by flags
if (featureFlags.newCheckout) {
  return renderNewCheckout()
}
return renderOldCheckout()
```

##### Option 2: Branch by Abstraction

For behavior changes:

```javascript
// Old behavior behind abstraction
class PaymentProcessor {
  process() {
    // Gradually replace implementation while maintaining interface
  }
}
```

##### Option 3: Connect Tests Last

For new features:

```javascript
// Build new feature code, integrate to trunk
// Connect to UI/API only in final commit
function newCheckoutFlow() {
  // Complete implementation ready
}

// Final commit: wire it up
<button onClick={newCheckoutFlow}>Checkout</button>
```

##### Option 4: Dark Launch

For new API routes:

```javascript
// New API route exists but isn't exposed
router.post('/api/v2/checkout', newCheckoutHandler)

// Final commit: update client to use new route
```

All code integrates to trunk using ONE merge pattern. Incomplete features are managed through these patterns, not through separate integration branches.

For guidance on when to use each pattern, see [Feature Flags](/recommendations/featureflags/).

### All Environments Use the Same Pipeline

The same pipeline deploys to every environment, including hotfixes and rollbacks:

```text
Commit → Pipeline → Dev → Test → Staging → Production
```

#### Anti-Patterns to Avoid

- SSH into server and copy files
- Upload through FTP/SFTP
- Run scripts directly on production servers
- Use separate "emergency deployment" process
- Manual database changes in production
- Different deployment processes for different environments

## Example Implementations

### Anti-Pattern: Multiple Deployment Paths

```text
Normal: Developer → Push to Git → Pipeline → Staging
Hotfix: Developer → SSH to prod → Apply patch directly
Database: DBA → SQL client → Run scripts manually
Config: Ops → Edit files on server → Restart service
```

**Problem**: No consistency, no audit trail, no validation. Production becomes a mystery box.

### Good Pattern: Single Pipeline for Everything

```yaml
# .github/workflows/deploy.yml
name: Deployment Pipeline

on:
  push:
    branches: [main]
  workflow_dispatch:  # Manual trigger for rollbacks

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm test
      - run: npm run lint
      - run: npm run security-scan

  build:
    needs: validate
    runs-on: ubuntu-latest
    steps:
      - run: npm run build
      - run: docker build -t app:${{ github.sha }} .
      - run: docker push app:${{ github.sha }}

  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: kubectl set image deployment/app app=app:${{ github.sha }}
      - run: kubectl rollout status deployment/app

  smoke-test:
    needs: deploy-staging
    runs-on: ubuntu-latest
    steps:
      - run: npm run smoke-test:staging

  deploy-production:
    needs: smoke-test
    runs-on: ubuntu-latest
    steps:
      - run: kubectl set image deployment/app app=app:${{ github.sha }}
      - run: kubectl rollout status deployment/app
```

**Benefit**: Every deployment—normal, hotfix, or rollback—uses this pipeline. Consistent, validated, traceable.

## Common Patterns

### Environment Promotion

Deploy the same artifact through progressive environments:

```text
Build Artifact (v1.2.3)
  ↓
Deploy to Dev → Validate
  ↓
Deploy to Test → Validate
  ↓
Deploy to Staging → Validate
  ↓
Deploy to Production
```

### Fast-Track Pipeline for Emergencies

Keep the same path, but optimize for speed when needed:

```yaml
deploy-hotfix:
  if: github.event.inputs.hotfix == 'true'
  steps:
    - run: npm test -- --fast  # Run critical tests only
    - run: npm run build
    - run: deploy --target=production --skip-staging
    - run: smoke-test --production
```

### Rollback via Pipeline

Rollbacks should be faster than forward deployments:

```bash
# Trigger rollback via pipeline (skips build/test, already validated)
gh workflow run deploy.yml -f version=v1.2.2 -f rollback=true
```

### Database Migrations

All database changes flow through the pipeline:

```yaml
deploy:
  steps:
    - name: Run database migrations
      run: |
        npm run db:migrate
        npm run db:validate
    - name: Deploy application
      run: kubectl apply -f deployment.yaml
    - name: Verify deployment
      run: kubectl rollout status deployment/app
```

#### Database Change Requirements

- **Backward-compatible** (new code works with old schema)
- **Forward-deployable** (migrations are additive)
- **Automated** (migrations run in pipeline)

This allows rolling back application code without rolling back schema.

## FAQ

### What if the pipeline is broken and we need to deploy a critical fix?

Fix the pipeline first. If your pipeline is so fragile that it can't deploy critical fixes, that's a pipeline problem, not a process problem. Invest in pipeline reliability.

### What about emergency hotfixes that can't wait for the full pipeline?

The pipeline should be fast enough to handle emergencies. If it's not, optimize the pipeline. A "fast-track" mode that skips some tests is acceptable (see Common Patterns above), but it must still be the **same pipeline**, not a separate manual process.

### Can we manually patch production "just this once"?

No. "Just this once" becomes "just this once again." Manual production changes always create problems. Commit the fix, push through the pipeline, deploy.

### What if deploying through the pipeline takes too long?

Optimize your pipeline:

1. Parallelize tests
2. Use faster test environments
3. Implement progressive deployment (canary, blue-green)
4. Cache dependencies
5. Optimize build times

A well-optimized pipeline should deploy to production in under 30 minutes.

### Can operators make manual changes for maintenance?

Infrastructure maintenance (patching servers, scaling resources) is separate from application deployment. However, application deployment must still only happen through the pipeline.

## Health Metrics

- **Pipeline deployment rate**: Should be 100% (all deployments go through pipeline)
- **Manual override rate**: Should be 0%
- **Hotfix pipeline time**: Should be < 30 minutes
- **Rollback success rate**: Should be > 99%
- **Deployment frequency**: Should increase over time as confidence grows

## Additional Resources

- [Continuous Delivery: The Deployment Pipeline](https://www.informit.com/articles/article.aspx?p=1621865)
- [Accelerate: Technical Practices](https://itrevolution.com/articles/accelerate-book/) - Nicole Forsgren, Jez Humble, Gene Kim
- [Dave Farley: Deployment Strategies](https://www.youtube.com/watch?v=9tRFKevUqXs)
- [Jez Humble: Why We Need Deployment Pipelines](https://www.youtube.com/watch?v=v4Ijkq6Myfc)
- [Site Reliability Engineering: Release Engineering](https://sre.google/sre-book/release-engineering/)
