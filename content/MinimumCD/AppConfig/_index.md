---
title: Application Configuration
description: Application configuration deploys with artifact
weight: 5
draft: false
type: docs
---

## Definition

Application configuration defines the internal behavior of your application and is **bundled with the artifact**. It does not vary between environments. This is distinct from environment configuration (secrets, URLs, credentials) which varies by deployment.

We embrace [The Twelve-Factor App config](https://12factor.net/config) definitions:

- **Application Configuration**: Internal to the app, does NOT vary by environment (feature flags, business rules, UI themes, default settings)
- **Environment Configuration**: Varies by deployment (database URLs, API keys, service endpoints, credentials)

Application configuration should be:

1. **Version controlled** with the source code
2. **Deployed as part of the immutable artifact**
3. **Testable** in the CI pipeline
4. **Unchangeable** after the artifact is built

## Why This Matters

Separating application configuration from environment configuration provides several critical benefits:

- **Immutability**: The artifact tested in staging is identical to what runs in production
- **Traceability**: You can trace any behavior back to a specific commit
- **Testability**: Application behavior can be validated in the pipeline before deployment
- **Reliability**: No configuration drift between environments caused by manual changes

## Example Implementations

### ❌ Anti-Pattern: External Application Config

```yaml
# Stored in external config service, modified after build
feature_flags:
  new_checkout_flow: true
  payment_processor: "stripe"
business_rules:
  max_cart_items: 100
  discount_threshold: 50.00
```

**Problem**: Changes to this config after build mean the artifact behavior is untested and unpredictable.

### ✅ Good Pattern: Bundled Application Config

```yaml
# config/application.yml - bundled with artifact
feature_flags:
  new_checkout_flow: true
  payment_processor: "stripe"
business_rules:
  max_cart_items: 100
  discount_threshold: 50.00
```

```yaml
# Environment-specific - injected at runtime via env vars
environment:
  database_url: ${DATABASE_URL}
  stripe_api_key: ${STRIPE_API_KEY}
  log_level: ${LOG_LEVEL}
```

**Benefit**: Application behavior is locked at build time; only environment-specific values change.

## What is Improved

- **Confidence in testing**: When the pipeline passes, you know the exact behavior that will run in production
- **Faster rollback**: Rolling back an artifact rolls back all application configuration changes
- **Audit trail**: Every configuration change is in version control with commit history
- **Reduced deployment risk**: No surprises from configuration changes made outside the pipeline
- **Better collaboration**: Developers, QA, and operations all see the same configuration

## Common Patterns

### Feature Flags (Dynamic Release Control)

Application config can include feature flags that are evaluated at runtime:

```json
{
  "features": {
    "new_dashboard": {
      "enabled": true,
      "rollout_percentage": 25
    }
  }
}
```

This config is bundled with the artifact. The feature flag system reads it to control feature visibility without code changes.

### Business Rules

```yaml
validation_rules:
  password_min_length: 12
  session_timeout_minutes: 30
  max_login_attempts: 5
```

These rules should be tested in the pipeline and deployed with the code.

### Service Discovery

```yaml
# Application config - service relationships
services:
  payment_service_name: "payment-api"
  user_service_name: "user-api"

# Environment config - actual endpoints (injected)
service_mesh_url: ${SERVICE_MESH_URL}
```

## FAQ

### How do I change application config for a specific environment?

You shouldn't. If behavior needs to vary by environment, it's environment configuration (injected via environment variables or secrets management). Application configuration is the same everywhere.

### What if I need to hotfix a config value in production?

If it's truly application configuration, make the change in code, commit it, let the pipeline validate it, and deploy the new artifact. Hotfixing config outside the pipeline defeats the purpose of immutable artifacts.

### Can feature flags be application configuration?

Yes! Feature flag **definitions** and **default states** are application config. The **evaluation logic** reads this bundled config. However, if you use a dynamic feature flag service that changes flags without redeployment, those remote overrides are environment-specific concerns.

### What about config that changes frequently?

If it changes frequently enough that redeploying is impractical, it might be **data**, not configuration. Consider whether it belongs in a database or content management system instead.

### How do I test application configuration changes?

The same way you test code changes:

1. Commit the config change to version control
2. CI builds the artifact with the new config
3. Automated tests validate the behavior
4. Deploy the artifact through all environments

## Health Metrics

- **Configuration drift incidents**: Should be zero (config is immutable with artifact)
- **Config-related rollbacks**: Track how often config changes cause rollbacks
- **Time to config change**: From commit to production should match your deployment cycle time

## Additional Resources

- [The Twelve-Factor App: Config](https://12factor.net/config)
- [Continuous Delivery: Configuration Management](https://continuousdelivery.com/foundations/configuration-management/)
- [Feature Toggles (Feature Flags)](https://martinfowler.com/articles/feature-toggles.html) - Martin Fowler
- [Immutable Infrastructure](https://www.hashicorp.com/resources/what-is-mutable-vs-immutable-infrastructure) - Understanding immutability principles
