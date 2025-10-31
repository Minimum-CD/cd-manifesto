---
title: Evolutionary Coding Practices
description: Learn how to integrate code daily while building large features using branch by abstraction, feature flags, and connect-last patterns.
weight: 1
type: docs
---

A core skill needed for CI is the ability to make code changes that are not complete features and integrate them to the
trunk without breaking existing behaviors. We never make big-bang changes. We make small changes that limit pour risk.
These are some of the most common methods.

## Branch by Abstraction

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
const processor = useNewStripe ? new StripePaymentProcessor() : new LegacyProcessor()

// Step 4: Remove old implementation (integrate to trunk)
```

## Feature Flags

Feature flags control feature visibility without blocking integration. However, they're often overused—many scenarios have better alternatives.

### When to use feature flags

- Large or high-risk changes needing gradual rollout
- Testing in production before full release (dark launch, beta testing)
- A/B testing and experimentation
- Customer-specific behavior or toggles
- Cross-team coordination requiring independent deployment

### When NOT to use feature flags

- New features that can connect to tests only, integrate in final commit
- Behavior changes (use branch by abstraction instead)
- New API routes (build route, expose as last change)
- Bug fixes or hotfixes (deploy immediately)
- Simple changes (standard deployment sufficient)

### Example usage

```javascript
// Incomplete feature integrated to trunk, hidden behind flag
if (featureFlags.newCheckout) {
  return renderNewCheckout() // Work in progress
}
return renderOldCheckout() // Stable existing feature

// Team can continue integrating newCheckout code daily
// Feature revealed when complete by toggling flag
```

For detailed decision guidance and implementation approaches, see [Feature Flags](/recommendations/feature-flags/).

## Connect Last

Build complete features, connect them in final commit:

```javascript
// Commits 1-10: Build new checkout components (all tested, all integrated)
function CheckoutStep1() {
  /* tested, working */
}
function CheckoutStep2() {
  /* tested, working */
}
function CheckoutStep3() {
  /* tested, working */
}

// Commit 11: Wire up to UI (final integration)
;<Route path="/checkout" component={CheckoutStep1} />
```

For detailed guidance on when to use each pattern, see [Feature Flags](/recommendations/feature-flags/).

## Why These Patterns Matter

These evolutionary coding practices enable teams to:

- **Integrate daily**: Break large features into small, safe changes
- **Reduce risk**: Each commit is tested and releasable
- **Maintain flow**: No waiting for features to complete before integrating
- **Improve collaboration**: Team shares ownership of evolving code
- **Enable rollback**: Easy to revert small changes if needed

## Common Questions

### "How do I complete a large feature in less than a day?"

You probably don't complete it in a day, but you integrate progress every day using these patterns. Each daily commit is tested, working, and doesn't break existing functionality.

### "Which pattern should I use?"

- **Connect Last**: Best for new features that don't affect existing code
- **Branch by Abstraction**: Best for replacing or modifying existing behavior
- **Feature Flags**: Best for gradual rollout, testing in production, or customer-specific features

### "Don't these patterns add complexity?"

Temporarily, yes. But this complexity is:

- **Intentional**: You control when and how it's introduced
- **Temporary**: Removed once the transition is complete
- **Safer**: Than long-lived branches with merge conflicts
- **Testable**: Each step can be verified independently

## Additional Resources

- [Branch By Abstraction](https://www.branchbyabstraction.com/)
- [Feature Toggles](https://martinfowler.com/articles/feature-toggles.html) - Martin Fowler
- [Feature Flags](/recommendations/feature-flags/) - Detailed implementation guidance
