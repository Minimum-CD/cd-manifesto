---
title: Rollback On-demand
description: Ability to roll back a release on-demand
weight: 5
draft: false
type: docs
---

## Definition

Rollback on-demand means the ability to **quickly and safely revert to a previous working version** of your application at any time, without requiring special approval, manual intervention, or complex procedures. It should be as simple and reliable as deploying forward.

Key principles:

1. **Fast**: Rollback completes in minutes, not hours
2. **Automated**: No manual steps or special procedures
3. **Safe**: Rollback is validated just like forward deployment
4. **Simple**: Single command or button click initiates rollback
5. **Tested**: Rollback mechanism is regularly tested, not just used in emergencies

## Why This Matters

Without reliable rollback capability:

- **Fear of deployment**: Teams avoid deploying because failures are hard to recover from
- **Long incident resolution**: Hours wasted debugging instead of immediately reverting
- **Customer impact**: Users suffer while teams scramble to fix issues
- **Pressure to "fix forward"**: Teams rush incomplete fixes instead of safely rolling back
- **Deployment delays**: Risk aversion slows down release cycles

With reliable rollback:

- **Deployment confidence**: Knowing you can roll back reduces fear
- **Fast recovery**: Minutes to restore service instead of hours
- **Reduced risk**: Bad deployments have minimal customer impact
- **Better decisions**: Teams can safely experiment and learn
- **Higher deployment frequency**: Confidence enables more frequent releases

## What "Rollback On-demand" Means

### Rollback is a Deployment

Rolling back means deploying a **previous artifact version** through your standard pipeline:

```text
Current: v1.2.3 (has bug)
  ↓
Trigger rollback to v1.2.2
  ↓
Pipeline deploys artifact v1.2.2
  ↓
Service restored
```

Not this:

```text
Current: v1.2.3 (has bug)
  ↓
SSH into servers
  ↓
Manually revert code changes
  ↓
Restart services
  ↓
Hope it works
```

### Rollback is Tested

Rollback mechanisms should be tested regularly, not just during incidents:

- **Practice rollbacks** during non-critical times
- **Include rollback tests** in your pipeline
- **Time your rollback** to ensure it meets SLAs
- **Verify rollback** doesn't break anything

### Rollback is Fast

Rollback should be faster than forward deployment:

- **Skip build stage** (artifact already exists)
- **Skip test stage** (artifact was already tested)
- **Go straight to deployment** with previous artifact

Target: **< 5 minutes** from rollback decision to service restored.

### Rollback is Safe

Rollback should:

- Deploy through the same pipeline (not a manual process)
- Run smoke tests to verify the rollback worked
- Update monitoring and alerts
- Maintain audit trail

## Example Implementations

### Anti-Pattern: Manual Rollback Process

```text
1. Identify the problem (10 minutes)
2. Find someone with production access (15 minutes)
3. SSH into each server (5 minutes)
4. Find the previous version files (10 minutes)
5. Stop the service (2 minutes)
6. Copy old files (5 minutes)
7. Restart the service (3 minutes)
8. Hope nothing else broke (???)

Total: ~50 minutes + stress + risk
```

**Problem**: Slow, manual, error-prone, no validation.

### Good Pattern: Automated Rollback

```yaml
# .github/workflows/rollback.yml
name: Rollback

on:
  workflow_dispatch:
    inputs:
      version:
        description: 'Version to roll back to'
        required: true
        type: string

jobs:
  rollback:
    runs-on: ubuntu-latest
    steps:
      - name: Validate version exists
        run: |
          docker manifest inspect app:${{ inputs.version }}

      - name: Deploy previous version
        run: |
          kubectl set image deployment/app \
            app=app:${{ inputs.version }}
          kubectl rollout status deployment/app

      - name: Run smoke tests
        run: |
          npm run smoke-test:production

      - name: Notify team
        if: success()
        run: |
          slack-notify "Rolled back to ${{ inputs.version }}"

      - name: Rollback failed
        if: failure()
        run: |
          slack-notify "Rollback to ${{ inputs.version }} failed!"
```

**Usage**:

```bash
# Single command to roll back
gh workflow run rollback.yml -f version=v1.2.2

# Total time: ~3 minutes
```

**Benefit**: Fast, automated, validated, audited.

## What is Improved

- **Mean Time To Recovery (MTTR)**: Drops from hours to minutes
- **Deployment frequency**: Increases due to reduced risk
- **Team confidence**: Higher willingness to deploy
- **Customer satisfaction**: Faster incident resolution
- **Learning**: Teams can safely experiment
- **On-call burden**: Reduced stress for on-call engineers

## Common Patterns

### Blue-Green Deployment

Maintain two identical environments:

```text
Blue (current): v1.2.3
Green (idle): v1.2.2

Issue detected
  ↓
Switch traffic to Green (v1.2.2)
  ↓
Instant rollback (< 30 seconds)
```

### Canary Rollback

Roll back gradually:

```text
Deploy v1.2.3 to 10% of servers
  ↓
Issue detected in monitoring
  ↓
Automatically roll back 10% to v1.2.2
  ↓
Issue contained, minimal impact
```

### Feature Flag Rollback

Disable problematic features without redeploying:

```javascript
// Feature flag controls new feature
if (featureFlags.isEnabled('new-checkout')) {
  return renderNewCheckout()
}
return renderOldCheckout()

// Rollback: Toggle flag off via config
// No deployment needed, instant effect
```

### Database-Safe Rollback

Design schema changes to support rollback:

```sql
-- Good: Additive change
ALTER TABLE users ADD COLUMN phone VARCHAR(20);
-- Old code ignores new column
-- New code uses new column
-- Rolling back code doesn't break

-- Bad: Breaking change
ALTER TABLE users DROP COLUMN email;
-- Old code breaks if email is removed
-- Rollback requires schema rollback (risky!)
```

Use **expand-contract pattern**:

1. **Expand**: Add new column (both versions work)
2. **Migrate**: Start using new column
3. **Contract**: Remove old column (later, when safe)

### Artifact Registry Retention

Keep previous artifacts available:

```yaml
# Docker registry retention policy
artifact_retention:
  keep_last_n_versions: 10
  keep_production_versions: forever
  cleanup_after: 90_days
```

Ensures you can always roll back to recent versions.

## FAQ

### How far back should we be able to roll back?

Minimum: **Last 3-5 production releases**. Ideally: Any production release from the past 30-90 days. Balance storage costs with rollback flexibility.

### What if the database schema changed?

Design schema changes to be **backward-compatible**:
- Use expand-contract pattern
- Make schema changes in separate deployment from code changes
- Test that old code works with new schema

### What if we need to roll back the database too?

Database rollbacks are risky. Instead:
1. Design schema changes to support rollback (backward compatibility)
2. Use feature flags to disable code using new schema
3. If absolutely necessary, have tested database rollback scripts

### Should rollback require approval?

For production: On-call engineer should be empowered to roll back immediately without approval. Speed of recovery is critical. Post-rollback review is appropriate, but don't delay the rollback.

### How do we test rollback?

1. **Practice regularly**: Perform rollback drills during low-traffic periods
2. **Automate testing**: Include rollback in your pipeline tests
3. **Use staging**: Test rollback in staging before production deployments
4. **Chaos engineering**: Randomly trigger rollbacks to ensure they work

### What if rollback fails?

Have a **rollback-of-rollback** plan:
1. Roll forward to the next known-good version
2. Use feature flags to disable problematic features
3. Have out-of-band deployment method (last resort)

But if rollback is regularly tested, failures should be rare.

### How long should rollback take?

**Target: < 5 minutes** from decision to service restored.

Breakdown:
- Trigger: < 30 seconds
- Deploy: 2-3 minutes
- Verify: 1-2 minutes

### What about configuration changes?

Configuration should be versioned with the artifact. Rolling back the artifact rolls back the configuration. See [Application Configuration](/minimumcd/appconfig/).

## Health Metrics

- **Rollback success rate**: Should be > 99%
- **Mean Time To Rollback (MTTR)**: Should be < 5 minutes
- **Rollback test frequency**: At least monthly
- **Rollback usage**: Track how often rollback is used (helps justify investment)
- **Failed rollback incidents**: Should be nearly zero

## Additional Resources

- [Site Reliability Engineering: Release Engineering](https://sre.google/sre-book/release-engineering/)
- [Martin Fowler: Blue-Green Deployment](https://martinfowler.com/bliki/BlueGreenDeployment.html)
- [Martin Fowler: Canary Release](https://martinfowler.com/bliki/CanaryRelease.html)
- [Dave Farley: Rollback and Roll Forward](https://www.youtube.com/watch?v=5VEbIH8WUtk)
- [Refactoring Databases: Evolutionary Database Design](https://databaserefactoring.com/) - Scott Ambler, Pramod Sadalage
