---
title: Continuous Integration
description: Start here
weight: 2
---

## Definition

While CI depends on tooling, the team workflow and working agreement are more important.

1. We will work as a team to define work with [testable acceptance criteria](https://dojoconsortium.org/docs/work-decomposition/behavior-driven-development/). Those acceptance criteria will drive our testing efforts.
2. No work will be committed to version control unless accompanied by all required tests.
3. Work committed to version control may not be "feature complete", but it must not break existing work.
4. All work begins from the trunk and integrates into the trunk at least daily.
5. If the CI server detects an error, the team stops feature work and collaborates to fix the build. We should not create more unverified changes without the ability to receive quality feedback from the CI server.

## Recommended practices

Evolutionary coding methods:

- [Keystone Interfaces](https://martinfowler.com/bliki/KeystoneInterface.html) (A.K.A [Dark Launching](https://martinfowler.com/bliki/DarkLaunching.html)) lets you deploy some portion of the code to production without being visible or usable by end-users. It can also let you review metrics on how well the feature behaves performance-wise before making it accessible.
- [Branch by abstraction](https://www.branchbyabstraction.com/) is a good process for replacing existing new behaviors or frameworks with something new while constantly delivering. Also, a good pattern to use for A/B testing.
- [Feature flags](https://martinfowler.com/articles/feature-toggles.html) can be temporary tools for feature release management or permanent tools for enabling behaviors for different personas. They can also be controlled with application configuration or dynamically with logic.

## What is Improved

- **Teamwork:** CI requires a lot of teamwork to function correctly. If the team currently uses a "push" workflow where work is assigned instead of a "pull" workflow where the next most important work is picked up by the next available teammate, then CI will be very difficult. Teamwork suffers because everyone is focused on their individual "assignments" rather than team goals. Long delays in code review, large changesets, and excessive team process hurt outcomes. Find a cadence for code review to process them quickly and set some team norms on changeset size and collaboration. Pair programming is a good way to help address these problems quickly.
- **Work Breakdown:** We need to [break down work better](https://dojoconsortium.org/docs/work-decomposition/work-breakdown/). We should have a "Definition of Ready" that requires every story and task has a testable description of "done" before any work starts. A good rule of thumb is that if everyone agrees the team can complete that item in less than 2 days, it's refined enough for CI.
- **Testing:** This is a common struggle. It's common that teams either do not test or know little about basic unit testing. Testing implementation instead of behavior is another common issue. Teams will need to improve the efficiency and effectiveness of their tests and build a suite of various types of tests to move detection as close to creation as possible. CI requires falling passionately in love with testing, but that should be true of software engineering anyway.

## Health Metrics

- **Commits/Day/Developer**: How frequently are we as a team integrating code to the trunk each day? "Good" is 1 or more per day per dev. Never compare individuals. this is a team average.
- **Development cycle time**: The time from when work begins until it is delivered to the end-user. "Good" is less than 2 days on average.
- **Defect rate**: Critical backpressure metric to ensure speed does not overtake quality and vice versa.

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

"We will not go lower than the current level of code coverage." However, if the team is not committed to a disciplined quality process to the extent that delivery dates are never seen as an excuse, this could incentivize fake tests to meet the coverage minimum.

### What code coverage percentage should we set as a standard for all teams?

We shouldn't. Code coverage mandates incentivize meaningless tests that hide the fact that code is not tested. It is better to have no tests than to have tests you do not trust. See the [Dojo Consortium's info](https://dojoconsortium.org/metrics/code-coverage/) on this metric.
