---
title: Testing Strategies
description: Learn what tests should run in CI, when they should run, and how to optimize for fast feedback while maintaining comprehensive validation.
weight: 2
type: docs
---

A comprehensive testing strategy is essential for continuous integration. The key is balancing fast feedback with thorough validation by running different test types at different stages of the pipeline.

## Pre-Merge Testing (Fast Feedback)

Tests that run before code merges to trunk should provide rapid feedback to developers. The goal is to catch obvious issues quickly without blocking the integration workflow.

### What to Run

- **Static analysis**: Type checkers, linters, security scans
- **Unit tests**: Fast tests (preferably [sociable unit tests](#sociable-vs-solitary-unit-tests) with real in-process dependencies)
- **Dependency audits**: Known vulnerabilities in dependencies

### Performance Goal

Complete in < 10 minutes

### Why Speed Matters

Pre-merge tests create a feedback loop for developers. If these tests take too long, developers context-switch while waiting, multiple developers queue up, and the team slows down integration frequency.

Keep pre-merge tests focused on fast, deterministic checks that catch the most common issues.

## Post-Merge Testing (Comprehensive Validation)

After code merges to trunk, run the complete test suite to validate the integrated system.

### What to Run

- **All pre-merge tests**: Re-run for final validation
- **Integration tests**: Test component interactions with real dependencies
- **Functional tests**: Test user-facing behavior
- **Performance tests**: Validate response time and throughput requirements
- **Dynamic security tests**: Security analysis of running application

### Performance Goal

Complete in < 30 minutes

### Why Re-run Pre-merge Tests?

Pre-merge tests validate individual changes in isolation. Post-merge tests validate that the merge itself didn't introduce issues:

- Merge conflict resolutions may have introduced bugs
- Timing-dependent interactions between simultaneous merges
- Dependencies between changes merged around the same time
- Environment differences between local and CI

Running the full suite after merge provides a final safety check.

## What About Deployment Testing?

Tests that require deployment to an environment (end-to-end tests, smoke tests) belong in the [deployment pipeline](/minimumcd/single-path-to-production/), not in CI.

### Why Separate Deployment Testing

- CI validates code integration
- Deployment pipeline validates releasability
- Different performance requirements
- Different failure modes and remediation

Mixing these concerns leads to slow CI pipelines that discourage frequent integration.

## The Testing Trophy

The testing trophy model emphasizes **sociable unit tests** (testing units with their real collaborators) as the foundation of your test suite.

```
      /\
     /  \      Static Analysis
    /----\
   / E2E  \    End-to-end tests
  /--------\
 /Integration\ ← Most tests here (80%)
/------------\
/    Unit     \ Supporting layer
```

### Test Distribution

**Static analysis** (Foundation): Type checkers, linters, security scanners—catch errors before running code.

**Solitary unit tests** (Supporting—minimize these): Pure functions with no dependencies. Use sparingly.

**Sociable unit tests / Integration tests** (The bulk—80%): Test units with their real collaborators. This is where most of your tests should be.

**E2E tests** (Critical paths only): Complete user journeys. Use sparingly due to cost and brittleness.

### Sociable vs Solitary Unit Tests

**Terminology note**: What the testing trophy calls "integration tests" are more precisely **sociable unit tests** in [Martin Fowler's Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html#SociableAndSolitaryTests).

- **Solitary unit tests**: Test a unit in complete isolation with all dependencies mocked
- **Sociable unit tests** (recommended): Test a unit with its real collaborators and dependencies within the component
  under test while avoiding network boundaries.

**Prioritize sociable unit tests over solitary unit tests** because they:

- Catch real bugs in how components interact
- Are less brittle (don't break during refactoring)
- Test actual behavior rather than implementation details
- Provide higher confidence without significant speed penalty

For detailed examples and guidance, see:

- [Write tests. Not too many. Mostly integration.](https://kentcdodds.com/blog/write-tests) - Kent C. Dodds
- [The Testing Trophy and Testing Classifications](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications) - Kent C. Dodds
- [The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html) - Martin Fowler

## Test at the Right Level

### Decision Tree

1. **Is it pure logic with no dependencies?** → Solitary unit test
2. **Does it have collaborators/dependencies?** → Sociable unit test / Integration test (most code!)
3. **Does it cross system boundaries or require full deployment?** → E2E test (sparingly)

### Key Principle

Default to sociable unit tests (with real dependencies) over solitary unit tests (with mocks).

### When in Doubt

Choose sociable unit test. It will catch more real bugs than a solitary unit test with mocks.

## Deterministic Testing

All tests must be deterministic—producing the same result every time they run. Flaky tests destroy trust in the pipeline.

### Common Causes of Flaky Tests

- Race conditions and timing issues
- Shared state between tests
- External dependencies (networks, databases)
- Non-deterministic inputs (random data, current time)
- Environmental differences

### Solutions

- Mock external dependencies you don't control
- Clean up test data after each test
- Control time and randomness in tests
- Isolate test execution
- Fix or remove flaky tests immediately

For detailed guidance, see [Deterministic Tests](/minimumcd/deterministic/).

## Test Quality Over Coverage

**Test coverage percentage doesn't indicate test quality.**

Better questions than "What's our coverage percentage?":

- Do we trust our tests?
- Are we confident we've covered positive and negative cases?
- Do tests document expected behavior?
- Would tests catch regressions in critical paths?

### Coverage Mandates Are Harmful

Setting organization-wide coverage standards incentivizes meaningless tests that hide the fact that code isn't properly tested.

**It is better to have no tests than to have tests you do not trust.**

Instead of mandates:

- Focus on test quality and behavior coverage
- Build team discipline around testing
- Review tests as carefully as production code
- Make testing part of the definition of done

For detailed guidance, see [Code Coverage](https://dojoconsortium.org/docs/metrics/code-coverage/).

## Practical Recommendations for CI

### Building Your Test Suite

1. **Start with static analysis**: Type checkers, linters—catch errors before running code
2. **Write sociable unit tests as default**: Test with real dependencies (databases, state, etc.)
3. **Add solitary unit tests sparingly**: Only for pure functions with complex logic
4. **Add E2E tests strategically**: Critical user journeys and revenue paths only
5. **Avoid excessive mocking**: Mock only external services you don't control

### For CI Effectiveness

1. **Run static analysis first**: Instant feedback, zero runtime cost
2. **Run fast tests pre-merge**: Use in-memory databases, parallel execution
3. **Run comprehensive tests post-merge**: More realistic setup, longer running tests
4. **Run E2E tests post-merge**: Keep them out of the critical path
5. **Set time budgets**: Pre-merge < 10 min, post-merge < 30 min
6. **Quarantine flaky tests**: Fix or remove them immediately

### For Test Quality

1. **Test behavior from user's perspective**: Not implementation details
2. **Use real dependencies**: Catch real integration bugs
3. **One scenario per test**: Makes failures obvious and debugging fast
4. **Descriptive test names**: Should explain what behavior is being verified
5. **Independent tests**: No shared state, can run in any order

### Testing Anti-Patterns to Avoid

- **Don't mock everything**: Solitary unit tests with extensive mocking are brittle
- **Don't test implementation details**: Tests that break during refactoring provide no value
- **Don't write E2E for everything**: Too slow, too brittle—use sociable unit tests instead
- **Don't skip sociable unit tests**: This is where the bugs hide
- **Don't ignore flaky tests**: They destroy trust in your pipeline

## Starting Without Full Coverage

You don't need tests in existing code to begin CI. You need to test **new code without exception**.

**Starting point**: "We will not go lower than the current level of code coverage."

This approach:

- Allows teams to start CI immediately
- Prevents technical debt from growing
- Builds testing discipline incrementally
- Improves coverage over time

As you work in existing code:

- Add tests for code you modify
- Test new features completely
- Gradually improve coverage in active areas
- Don't mandate retrofitting tests to untouched code

## Additional Resources

### Testing Strategies

- [Write tests. Not too many. Mostly integration.](https://kentcdodds.com/blog/write-tests) - Kent C. Dodds (Testing Trophy)
- [The Testing Trophy and Testing Classifications](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications) - Kent C. Dodds
- [Static vs Unit vs Integration vs E2E Testing](https://kentcdodds.com/blog/static-vs-unit-vs-integration-vs-e2e-tests) - Kent C. Dodds
- [The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html) - Martin Fowler
- [Testing Strategies for Microservices](https://martinfowler.com/articles/microservice-testing/) - Martin Fowler (for distributed systems and service-oriented architectures)

### Testing Practices

- [Behavior-Driven Development](https://dojoconsortium.org/docs/work-decomposition/behavior-driven-development/) - DevOps Dojo Consortium
- [Deterministic Tests](/minimumcd/deterministic/)
- [Code Coverage](https://dojoconsortium.org/docs/metrics/code-coverage/) - DevOps Dojo Consortium
