---
title: Work in Small Batches
description: Specific advice for an often misunderstood principle of continuous delivery.
weight: 1
---

We need to reduce batch size because smaller batches of work are easier to verify, they tend to fail small, we are less likely to suffer from sunk-cost fallacy, we amplify feedback loops, etc. How small should they be? As small as we can make them to get production feedback on what we are trying to learn. Working to reduce batch size acts as a forcing function for exposing and removing hidden waste in upstream processes. There are several batch sizes we are trying to reduce.

### Deploy More Often

How often we are delivering changes to the end user? A common mistake is to only deploy completed features. It is far better to deploy something as soon as the pipeline certifies a change will not break the end-user. This could be as small as some tested code that won't be used until several other small changes are delivered.

There are two common arguments against increasing deploy frequency. The first is a misunderstanding of "valuable". "We don't want to deliver incomplete features because the customer can't use them so we aren't delivering any value."

There are more stakeholders requiring value than the end-user. One of those is the product team. We are reducing the level of inventory waste in our flow and getting rapid feedback that we haven't broken existing behaviors with the new change. This gives us feedback on our quality gates and also lowers the risks of delivering a production fix.

The second objection is, "our customers don't want changes that frequently."  

This comes from a misunderstanding of what CD is for. Yes, we can deliver features with continuous delivery. However, a primary purpose of CD is production support. When production has an incident or we have a new zero-day vulnerability, they **do** want changes that frequently to resolve those problems. Can we? By improving delivery frequency, we are continuously verifying that we can still deliver those fixes safely.

### Commit Smaller Changes

{{% notice %}}
"Following our principle of working in small batches and building quality in, high-performing teams keep branches short-lived (less than one day's work) and integrate them into trunk/master frequently. Each change triggers a build process that includes running unit tests. If any part of this process fails, developers fix it immediately."

-- Accelerate: Forsgren, et al
{{% /notice %}}

How small is small? One change a day is big. Smaller than that. These are not feature complete changes. They are small, tested changes that can be delivered to production if certified by the pipeline.

Solving the problems required to meet the [definition of CI](../../minimumcd/#continuous-integration) is foundational for the efforts to improve the organization. It is very effective at uncovering that we need to improve testing, learn how to use evolutionary coding practices, understand trunk-based development, learn to decompose work better, and learn how to work as a team better. It's also effective at shining a light on upstream issues.

### Refine Smaller Stories

How small is small? It's typical for teams who have only been taught Scrum to refine work until it can "fit in the sprint." Therefore, 5 to 10 day stories are very common. It's also very common for those to take 10 to 15 days to actually be delivered due to the lack of clarity in the stories. To resolve this, we shrink the timebox for a story then fix everything that prevents us from staying within that time box.

In 2012, Paul Hammant, author of "Trunk-Based Development and Branch by Abstraction" made the following suggestion:

{{% notice %}}
"Story sizes should average as close to one day as possible. If they don't, your Agile project is going to be harder for nearly everyone involved. If your average is significantly greater than that one day, then change something until you get there."

-- [Call to Arms: Average Story Size of One Day](https://paulhammant.com/2012/04/24/call-to-arms-average-story-sizes-of-one-day/)
{{% /notice %}}

This may sound unachievable, but we have seen how effective this is in the enterprise Dojos. A primary workflow for Dojos is the "hyper-sprint". A hyper-sprint lasts for 2.5 days and includes refining work, doing the work, delivering the work, and retrospecting on how to do it better next time. Teams fail for a few weeks but then learn the skills and teamwork required to slice stories into much thinner value increments with fully testable acceptance criteria and deliver them as a team. Coding moves from exploration to implementation and quality feedback and throughput accelerate. It's very common for a team's throughput to double in 6-8 weeks with the right guidance. Again, this acts as a forcing function for uncovering and removing upstream impediments with missing product information, external hard dependencies with other teams, Change Advisory Board compliance theater, or other organizational issues.

## Resources to Help

(Coming Soon)
