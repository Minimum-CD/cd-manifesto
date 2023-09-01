---
title: Frequent Questions
description: FAQ
weight: 5
draft: false
---

## Why does this exist?

At the October 2021 DevOps Enterprise Summit, several of us met to discuss the problem of the consistent
misunderstanding of continuous delivery and decided to run an improvement experiment.

In the 2017 book "Accelerate", the authors observe that:

> "Continuous delivery improves both delivery performance and quality, and also helps improve culture and reduce burnout and deployment pain."

This observation was based on their experience and also on the information they'd collected from years of State of DevOps survey results. We have also observed these outcomes ourselves, but only when we properly use a core set of practices. When these practices are not used and an organization misunderstands or tries to cut corners, then the improvement outcomes do not materialize and they claim that CD is a fad or not a fit for their special case. Neither is true.

By establishing a baseline, we hope to provide a clear roadmap of core abilities that must be in place. If we ask ourselves, "why can't we do these things?" and then solve those problems, we should see the benefits that other organizations report.

## Who should sign?

If you are a practitioner and agree with this goal, feel free to submit a pull request to add yourself.

## What if I change my mind?

We do not want to hold anyone hostage. Our goal is to elevate the conversation by having a common language. You can either open an issue or submit a PR. We will promptly accept your update.

## How are updates made to the practices list?

The maintainers operate by consensus. We have a specific goal that any practice must be essential in every context to
make the list. If a practice isn't there, it either doesn't meet the absolute minimum standard in every context or
conflicts with one of the current practices. Creating a GitHub issue is the best way to suggest an update to a practice.

## Is this everything We need for CD?

Oh, gosh no! This is the barest of minimums.

## How can we use this to improve?

CD requires CI and CI requires Trunk-Based Development. Start at the bottom and work your way up. Ask yourself, "why
can't we do this yet?" Solving that problem is the engine of org improvement. We have not seen a single instance where
CD cannot apply. It just takes longer in some situations to solve the problems. It's worth it though. It improves everything.

## Why should the pipeline be definitive for deploy?

"If the pipeline says everything looks good, that should be enough - it forces the focus on what 'releasable' means." -
Dave Farley

## What is Application Configuration?

The term "Configuration" is overused and underdefined across the industry.  We embrace [The Twelve-Factor App
config](https://12factor.net/config) definitions where "config" is environment specific (varies by deployment) and
"application config" is internal to the app and does NOT vary by environment.

## What is an immutable artifact?

Central to CD is that we are validating the delivered artifact with the pipeline. It is built once and deployed to all
environments. A common anti-pattern is building an artifact for each environment. This is why trunk-based development is
so important. More can be found [here](../minimumcd/immutable/).

## What do we mean by "definition of deployable"?

For every organization, there should be non-negotiables in place for delivery. These may include security, compliance, stability, responsiveness, etc. The pipeline should be the final word for this. See Dave Farley's video [Real Example of a Deployment Pipeline in the Fintech Industry](https://www.youtube.com/watch?v=bHKHdp4H-8w))

## How do we differentiate between "deployment" and "release"?

A "deployment" is the technical act of copying software to a host environment and getting it ready for use.

A "release" makes a new feature available to users.

More can be found [here](https://www.davefarley.net/?p=333).

## How do we differentiate between "continuous delivery" and "continuous deployment"?

"Continuous delivery" means that you work so your software is always releasable.

"Continuous deployment" means that if your deployment pipeline passes, the change is automatically pushed to production.

Continuous deployment is a subset of continuous delivery.

See also Dave Farley's video on [The Difference Between Continuous Delivery & Continuous Deployment](https://www.youtube.com/watch?v=7SNbDWob6cI).
