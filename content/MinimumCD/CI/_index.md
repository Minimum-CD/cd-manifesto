---
title: Continuous Integration
description: Start here
weight: 1
---

## Definition

While CI depends on tooling, the team workflow and working agreement is more important.

1. We will work as a team to define work with [testable acceptance criteria](https://dojoconsortium.org/docs/work-decomposition/behavior-driven-development/). Those acceptance critera will drive our testing efforts.
2. No work will be committed to version control unless accompanied by all required tests.
3. Work committed to version control may not be "feature complete", but it must not break existing work.
4. All work begins from the trunk and integrates to the trunk at least daily.
5. If the CI server detects an error, the team stops feature work and collaborates to fix the build. We should not create more unverified change without the ability to receive quality feedback from the CI server.

## FAQ

### "How do I complete a large feature in less than a day?"

You probably don't. However, there are several strategies available for making evolutionary changes that build toward the complete feature. See [Recommended practices](#recommended-practices).

### "What tests should run during CI?"

Our goal is to detect issues as early as possible. Any functional tests that can be executed without deploying the application should be run. This includes, but is not limited to:

- Static code quality
- Static security scans
- [Functional tests](https://martinfowler.com/articles/practical-test-pyramid.html) that do not require external services.

### What code coverage level is needed before we can do CI?

You don't need any tests in existing code to begin. You need to test new code without exception.

### What code coverage percentage should we have?

"I'm confident". Are you confident you've covered enough positive and negative cases to make you confident?

### What code coverage percentage should we set as a standard for our team?

"We will not go lower than the current level of code coverage." However, if the team is not committed to a disciplined quality process to the extent that delivery dates are never seen as an excuse, the this could incentivize fake tests to meet the coverage minimum.

### What code coverage percentage should we set as a standard for all teams?

We shouldn't. Code coverage minimum mandates incentivize fake tests that hide the fact that code is not tested. It is better to have no tests than to have fake tests.

## Recommended practices

Evolutionary coding methods:

- [Branch by abstraction](https://www.branchbyabstraction.com/) is a good process for replacing existing new behaviors or frameworks with something new while constantly delivering. Also a good pattern to use for A/B testing
- [Feature flags](https://martinfowler.com/articles/feature-toggles.html) can be temporary tools for feature release management or permanant tools for enabling behaviors for different personas. They can also be controlled with application configuration or dynamically with logic.

## Common problems discovered

CI requires a lot of teamwork to function correctly. If the team currently uses a "push" workflow where work is assigned instead of a "pull" workflow where the next most important work is picked up by the next available teammate, then CI will be very difficult. Teamwork suffers because everyone is focused on their individual "assignments" rather than team goals.

We need to [break down work better](https://dojoconsortium.org/docs/work-decomposition/work-breakdown/). We should have a "Definition of Ready" that requires every story and task has a testable description of "done" before any work starts.

Testing is a common struggle. Many teams either do not test or know a little about basic unit testing. Testing implementation instead of behavior is another common issue. Teams will need to improve the efficient and effectiveness of their tests and build a suite of various types of tests with the goal of moving deection as close to creation ae possible.


## Health Metrics

- **Commits/Day/Developer**: How frequently are we as a team integrating code to the trunk each day. "Good" is 1 or more per day per dev. Never compare individuals. this is a team average.
- **Development cycle time**: The time from when work begin to being completed. "Good" is less than 2 days on average.
- **Defect rate**: Critical backpressure metric to ensure speed does not overtake quality and vice versa.
