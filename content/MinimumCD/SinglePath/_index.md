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

Multiple deployment paths create serious risks:

- **Quality issues**: Bypassing the pipeline bypasses quality checks
- **Configuration drift**: Manual deployments create inconsistencies between environments
- **Security vulnerabilities**: Undocumented changes escape security review
- **Debugging nightmares**: "What's actually running in production?"
- **Compliance violations**: Audit trails break when changes bypass the pipeline
- **Lost confidence**: Teams lose trust in the pipeline and resort to manual interventions

A single deployment path provides:

- **Reliability**: Every deployment is validated the same way
- **Traceability**: Clear audit trail from commit to production
- **Consistency**: Environments stay in sync
- **Speed**: Automated deployments are faster than manual
- **Safety**: Quality gates are never bypassed

## What "Single Path" Means

### All Environments Use the Pipeline

The same pipeline deploys to every environment:

```text
Commit → Pipeline → Dev → Test → Staging → Production
```

Not this:

```text
Commit → Pipeline → Dev
Commit → Manual deploy → Test
Commit → Different process → Staging
Hotfix → SSH to prod → Production ❌
```

### Hotfixes Use the Pipeline

Even urgent changes flow through the pipeline:

```text
Critical bug discovered
  ↓
Create hotfix commit
  ↓
Pipeline validates (fast-tracked if needed)
  ↓
Automated deployment to production
  ↓
Verify fix
```

### Rollbacks Use the Pipeline

Rolling back means deploying a previous artifact through the pipeline:

```text
Issue detected in production
  ↓
Trigger pipeline with previous artifact version
  ↓
Pipeline deploys previous artifact
  ↓
Service restored
```

### No Manual Deployments

These are anti-patterns:

- ❌ SSH into server and copy files
- ❌ Upload through FTP/SFTP
- ❌ Run scripts directly on production servers
- ❌ Use separate "emergency deployment" process
- ❌ Manual database changes in production

## Example Implementations

### ❌ Anti-Pattern: Multiple Deployment Paths

```text
Normal deployments:
  Developer → Push to Git → Pipeline → Staging

Hotfixes:
  Developer → SSH to prod → Apply patch directly

Database changes:
  DBA → SQL client → Run scripts manually

Configuration:
  Ops → Edit config files on server → Restart service
```

**Problem**: No consistency, no audit trail, no validation. Production becomes a mystery box.

### ✅ Good Pattern: Single Pipeline for Everything

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

## What is Improved

- **Quality**: All changes are validated before deployment
- **Speed**: Automated deployment is faster than manual intervention
- **Reliability**: Consistent process reduces errors
- **Auditability**: Complete history of what was deployed when and by whom
- **Security**: All changes go through security validation
- **Confidence**: Teams trust that production matches what was tested
- **Recovery**: Rollbacks are as reliable as forward deployments

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

### Feature Flags for Hotfixes

Use feature flags to quickly disable problematic features:

```javascript
// Application code
if (featureFlags.newCheckout) {
  return renderNewCheckout()
}
return renderOldCheckout()

// Hotfix: Deploy new artifact with flag toggled off
// No code changes needed—just config change through pipeline
```

### Fast-Track Pipeline for Emergencies

Keep the same path, but optimize for speed:

```yaml
deploy-hotfix:
  if: github.event.inputs.hotfix == 'true'
  steps:
    - run: npm test -- --fast  # Run critical tests only
    - run: npm run build
    - run: deploy --target=production --skip-staging
    - run: smoke-test --production
```

### Database Migrations in Pipeline

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

### Configuration Through Pipeline

Configuration changes deploy through the same pipeline:

```yaml
# config/production.yml (version controlled)
feature_flags:
  new_checkout: false  # Disabled for hotfix

# Pipeline deploys new artifact with updated config
```

## FAQ

### What if the pipeline is broken and we need to deploy a critical fix?

Fix the pipeline first. If your pipeline is so fragile that it can't deploy critical fixes, that's a pipeline problem, not a process problem. Invest in pipeline reliability.

### What about emergency hotfixes that can't wait for the full pipeline?

The pipeline should be fast enough to handle emergencies. If it's not, optimize the pipeline. A "fast-track" mode that skips some tests is acceptable, but it must still be the **same pipeline**, not a separate manual process.

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

### How do we roll back if the pipeline is slow?

Rollbacks should be faster than forward deployments:
- Deploy a previous artifact (already built and tested)
- Skip build and test stages
- Go straight to deployment stage

```bash
# Trigger rollback via pipeline
gh workflow run deploy.yml -f version=v1.2.2 -f rollback=true
```

### What about database rollbacks?

Database changes should be:
1. **Backward-compatible** (new code works with old schema)
2. **Forward-deployable** (migrations are additive)
3. **Automated** (migrations run in pipeline)

This allows rolling back application code without rolling back schema.

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
