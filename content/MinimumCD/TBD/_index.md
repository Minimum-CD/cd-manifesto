---
title: Trunk Based Development
description: Death of merge hell
weight: 1
---

{{%alert info%}}

"Trunk-based development has been shown to be a predictor of high performance in software development and delivery. It is characterized by fewer than three active branches in a code repository; branches and forks having very short lifetimes (e.g., less than a day) before being merged into master; and application teams rarely or never having "code lock" periods when no one can check in code or do pull requests due to merging conflicts, code freezes, or stabilization phases."

{{%/alert%}}

Excerpt from *Accelerate* by Nicole Forsgren Ph.D., Jez Humble & Gene Kim

## Definition

TBD is a team workflow where changes are integrated into the trunk with no intermediate integration (Develop, Test, etc.) branch. The two common workflows are [making changes directly to the trunk](https://trunkbaseddevelopment.com/#trunk-based-development-for-smaller-teams) or using [very short-lived branches](https://trunkbaseddevelopment.com/#scaled-trunk-based-development) that branch from the trunk and integrate back into the trunk.

It is important to note that release branches are an intermediate step that some chose on their path to continuous delivery while improving their quality processes in the pipeline. True CD releases from the trunk.

## What is Improved

- **Smaller changes**: TBD emphasizes small, frequent changes that are easier for the team to review and more resistant to impactful merge conflicts. Conflicts become rare and trivial.
- **We must test**: TBD requires us to implement tests as part of the development process.
- **Better teamwork**: We need to work more closely as a team. This has many positive impacts, not least we will be more focused on getting the team's highest priority done. We will stop starting and start finishing work.
- **Better work definition**: Small changes require us to decompose the work into a level of detail that helps uncover things that lack clarity or do not make sense. This provides much earlier feedback on potential quality issues.
- **Replaces process with engineering**: Instead of creating a process where we control the release of features with branches, we can control the release of features with engineering techniques called [evolutionary coding methods](../../minimumcd/ci/#recommended-practices). These techniques have additional benefits related to stability that cannot be found when replaced by process.
- **Reduces risk**: There are two risks with long-lived branches that happen frequently. First, the change will not integrate cleanly and the merge conflicts result in broken or lost features. Second, the branch will be abandoned. This is usually because of the first reason. Sometimes because all of the knowledge about what is in that branch resides in the mind of someone who decided to leave before it was integrated.
