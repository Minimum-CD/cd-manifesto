---
title: Starting the Journey
description: Suggested improvement paths
weight: 1
draft: false
---

So, where do we start? It's a bad idea to go from "we can't safely commit changes to the trunk" to "deploy every change to production immediately" in one step. It's a journey that requires methodically solving problems in the context of your organization. Here we will discuss some of the common challenges that frequently need to be overcome.

## Defining Deployable & Releasable

What things must be true before we can release changes? What must be true before we can deploy changes? We need to look at those as two different problems to solve and solve each of them. Don't get stuck on a long-term project defining this. You won't think of everything on the first pass. Also, some things on your list may just be process scars and not something that's actually required.

Some common examples:

- No critical or blocker code smells
- No known security issues
- All acceptance tests passing
- Meets performance thresholds
- Meets reliability thresholds
- etc.

You may have some others on the list that as you start implementing will come into conflict with the goals:

- Documentation for Change Advisory Board (CAB) in place
- Pull request reviewed by first and second-level reviewers

Every process we add needs to add value. There's obvious value in doing performance testing unless we are demanding performance at a level that isn't required for the use case. However, before we define CAB documentation as required for "deployable", why does that process exist? One common reason for that meeting is a compliance rule for "two sets of eyes on every change". However, that can be validated by automation without the need to bundle changes and wait for a meeting.

{{%alert info%}}
We wanted to investigate the impact of change approval processes on software delivery performance. Thus, we asked about four possible scenarios:

- All production changes must be approved by an external body (such as a manager or CAB).
- Only high-risk changes, such as database changes, require approval.
- We rely on peer review to manage changes.
- We have no change approval process.

The results were surprising. We found that approval only for high-risk changes was not correlated with software delivery performance. Teams that reported no approval process or used peer review achieved higher software delivery performance. Finally, teams that required approval by an external body achieved lower performance.
{{%/alert%}}

Excerpt from *Accelerate* by Nicole Forsgren Ph.D., Jez Humble & Gene Kim

## Solving the Challenge of CI

The first challenge for the team is [continuous integration](https://www.martinfowler.com/articles/continuousIntegration.html). CD requires CI and CI is very effective at uncovering most of the problems many teams have that impact quality. Martin Fowler has an [excellent blog post on introducing CI](https://www.martinfowler.com/articles/continuousIntegration.html#IntroducingContinuousIntegration) into the workflow. Over the years, we've seen many common problems that teams have.

You may find more. Notice that tooling is rarely the problem. Always, "why can't we deliver working changes to the trunk today?", is the roadmap of problems to solve.  

### Code review takes too long / has too many approvers

Having more than one reviewer on a PR is a process smell for issues with the quality process. If one reviewer isn't enough, ask why. Those are defects. Code review, if we aren't pair/mob programming, should be minutes of effort, not hours. The changeset should be small, include all expected tests, and most of the heavy lifting of traditional code review should be automated with linters and formatters. The code review process adds drag to the process that encourages larger changes. We want to keep changes small. Focus on improving the flow of communication to reduce drag.

- Worst: Code reviews are done solo and comments are sent back to the developer. This adds the most drag.
- Less bad: The reviewer and author meet to review and correct issues. There is still a wait time for that meeting, but it is more efficient.
- Best: [Pair programming](https://martinfowler.com/bliki/PairProgramming.html) builds code review into the flow.

### Tests are deferred or skipped

We must treat tests as first-class citizens. They are more important than the code we are testing. They cannot be an afterthought and we need to make sure we are using them to increase our confidence rather than meeting some arbitrary ["coverage metric"](https://dojoconsortium.org/metrics/code-coverage/). We don't need all of the legacy code to be 100% tested, or even 1% tested to start CI. We need to commit to "we will never push untested changes." Timelines are irrelevant if we deliver things on time that are broken.

### The team lacks knowledge on how to write tests for CI

Dig into testing. [Learn effective test patterns](https://bdfinst.medium.com/5-minute-devops-testing-101-4698b6464172). Many people start testing implementation and then struggle to keep tests current as implementation changes. Avoid implementation testing. Test behaviors. If we cannot refactor code without changing the test then we are testing incorrectly. Focus on BDD to define tests and TDD to implement tests. People often push back on TDD, but that is most commonly because they never learned how to do it correctly. BDD was created to help. Lean in.

There are layers of tests in a properly architected suite of CI tests. The [*xUnit Test Patterns*](http://xunitpatterns.com/) book is a great place to start.

Teams are not good at testing initially for the same reason they aren't good at any other skill on day 1. It takes time. Start now.

### Individual tasks are too big

CI means we are integrating partially completed features continuously. TDD helps us learn how to decompose tasks into very small, releasable changes that do not break existing behaviors. However, the initial habit is often to wait to integrate changes until they are "complete". This results in large change-sets that are more difficult to code review. This makes code review take more time, requires more re-work, and reduces the ability of the reviewer to spot problems. [Evolutionary coding methods](../minimumcd/ci/#recommended-practices) allows the release of incomplete features until they are ready and allow us to drive down the size of changes. By focusing as a team to decompose tasks into hours of work rather than days and using engineering techniques to control release, we have improved clarity, smaller change-sets, and higher quality.

### Stories are too big & lack testable acceptance criteria

Real test-driven development begins with the team's conversation about the story. It's common for teams to be handed stories and expected to "estimate" and code them. That negatively impacts quality because the team lacks the information required to deliver a good outcome. Instead, an unrefined story should be the start of the conversation about product goals, implementation, and validation.

[Work decomposition](https://dojoconsortium.org/docs/work-decomposition/work-breakdown/) & testing are fundamental skills for CI This is best done by focusing on [Behavior Driven Development](https://dojoconsortium.org/docs/work-decomposition/behavior-driven-development/) instead of "story format". We need acceptance criteria that drive testing so we have declarative statements about exactly how the change should behave. Beyond providing the required clarity, it also reduces the cognitive load of writing tests, improves teamwork, and gives us natural segments to "slice" so we can reduce stories to 1-2 days of effort. This also protects us from changing priorities forcing incomplete work to be "parked"; another major contributor to poor quality.

### The team uses a push system for work

A team never assigns work. A team works together to deliver the highest priority on the backlog. If there is a process where work is assigned at the beginning of an iteration then each person only focuses on their assigned work rather than team goals. This negatively impacts everything in our workflow. Everyone on the team should be invested in everything the team does. That makes work decomposition, code review, testing, and everything else much more effective.

## Replace Manual With automation

Using our definitions for "deployable" and "releasable", we need to start replacing manual verification with automated. This takes time. We need to change workflows too. For example, some things are manual today that will need to be manual forever. None of those things should be verifying rules or checklists. We can automate those.

User Acceptance Testing is a common pre-release activity. However, we can usually replace that with continuous usability testing, exploratory testing, and frequent demo. All of these should be happening parallel to delivery, not as stage gates. In some cases, there are regulatory reasons why UAT exists as a stage gate. However, we need to keep in mind that anything that adds drag will increase batch size, reduce feedback, and increase defect creation rates. How can we optimize that UAT process to make it smaller and more frequent to reduce this risk?

Relentlessly improve and replace processes with automation. Keep pushing down the size of releases to uncover more challenges to solve. This process creates a snowball effect where we are uncovering and mitigating problems in our processes that impact quality while automating manual steps that take time away from development. This in turn gives us more time to focus on the product goals and additional delivery flow improvements. The outcomes of this are dramatic improvements to the team culture, engineering excellence, and business goals.

A very good case study for this is [Gary Gruver's work at HP Laserjet](https://itrevolution.com/the-amazing-devops-transformation-of-the-hp-laserjet-firmware-team-gary-gruver/)

<!-- markdownlint-disable-next-line no-trailing-punctuation -->
## TEST!

This cannot be stressed enough. The purpose of the pipeline is to fully validate that an artifact is production worthy or to reject it. Do not run towards daily delivery without first building confidence in your ability to detect failure. Move fast validation to the desktop and execute it again when trying to merge code to the trunk and again whenever changes are made to the trunk.

Testing is not limited to functional testing. We need to test for security, compliance, and everything else that is needed to validate the artifact in our context.

Set error budgets and do not exceed them. If we are pushing features and our error budget is broken, we need to focus on hardening our pipelines. When things break in production, we harden our pipelines. When we find an edge case in exploratory testing, we harden the pipeline. Our primary goal is to build efficient and effective quality gates. Only then can we move quickly.

## Additional Resources

- [Engineering the Digital Transformation](https://www.amazon.com/Engineering-Digital-Transformation-Gary-Gruver/dp/1543975267) - Gary Gruver
- [Continuous Delivery](https://continuousdelivery.com/) - Dave Farley & Jez Humble
- [Continuous Delivery Pipelines](https://www.amazon.com/Continuous-Delivery-Pipelines-Better-Software/dp/B096TTQHYM) - Dave Farley
- [Dojo Consortium Playbooks](https://dojoconsortium.org/) - Enterprise Dojo Consortium
- [5 Minute DevOps: Testing 101](https://bdfinst.medium.com/5-minute-devops-testing-101-4698b6464172)
