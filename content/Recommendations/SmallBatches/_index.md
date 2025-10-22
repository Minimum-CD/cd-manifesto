---
title: Work in Small Batches
description: Specific advice for an often misunderstood principle of continuous delivery.
weight: 1
type: docs
---

We need to reduce batch size because smaller batches of work are easier to verify, they tend to fail small, we are less likely to suffer from sunk-cost fallacy, we amplify feedback loops, etc. How small should they be? As small as we can make them to get production feedback on what we are trying to learn. Working to reduce batch size acts as a forcing function for exposing and removing hidden waste in upstream processes. There are several batch sizes we are trying to reduce.

### Deploy More Often

How often are we delivering changes to the end user? A common mistake is to only deploy completed features. It is far better to deploy something as soon as the pipeline certifies a change will not break the end-user. This could be as small as some tested code that won't be used until several other small changes are delivered.

There are two common arguments against increasing deploy frequency. The first is a misunderstanding of "valuable". "We don't want to deliver incomplete features because the customer can't use them so we aren't delivering any value."

There are more stakeholders requiring value than the end-user. One of those is the product team. We are reducing the level of inventory waste in our flow and getting rapid feedback that we haven't broken existing behaviors with the new change. This gives us feedback on our quality gates and also lowers the risks of delivering a production fix.

The second objection is "our customers don't want changes that frequently."  

This comes from a misunderstanding of what CD is for. Yes, we can deliver features with continuous delivery. However, a primary purpose of CD is production support. When production has an incident or we have a new zero-day vulnerability, they **do** want changes that frequently to resolve those problems. Can we? By improving delivery frequency, we are continuously verifying that we can still deliver those fixes safely.

### Commit Smaller Changes

{{% alert %}}
"Following our principle of working in small batches and building quality in, high-performing teams keep branches short-lived (less than one day's work) and integrate them into trunk/master frequently. Each change triggers a build process that includes running unit tests. If any part of this process fails, developers fix it immediately."

**-- *Accelerate* by Nicole Forsgren Ph.D., Jez Humble & Gene Kim**

{{% /alert %}}

How small is small? One change a day is big. Smaller than that. These are not feature complete changes. They are small, tested changes that can be delivered to production if certified by the pipeline.

Solving the problems required to meet the [definition of CI](/#continuous-integration) is foundational for the efforts to improve the organization. It is very effective at uncovering that we need to improve testing, learn how to use evolutionary coding practices, understand trunk-based development, learn to decompose work better, and learn how to work as a team better. It's also effective at shining a light on upstream issues.

### Refine Smaller Stories

How small is small? It's typical for teams who have only been taught Scrum to refine work until it can "fit in the sprint." Therefore, 5 to 10 day stories are very common. It's also very common for those to take 10 to 15 days to actually be delivered due to the lack of clarity in the stories. To resolve this, we shrink the time box for a story and then fix everything that prevents us from staying within that time box.

In 2012, Paul Hammant, author of "Trunk-Based Development and Branch by Abstraction" made the following suggestion:

{{% alert %}}
"Story sizes should average as close to one day as possible. If they don't, your Agile project is going to be harder for nearly everyone involved. If your average is significantly greater than that one day, then change something until you get there."

-- **[Call to Arms: Average Story Size of One Day](https://paulhammant.com/2012/04/24/call-to-arms-average-story-sizes-of-one-day/)**
{{% /alert %}}

This may sound unachievable, but we have seen how effective this is in the enterprise Dojos. A primary workflow for Dojos is the "hyper-sprint". A hyper-sprint lasts for 2.5 days and includes refining work, doing the work, delivering the work, and retrospecting on how to do it better next time. Teams fail for a few weeks but then learn the skills and teamwork required to slice stories into much thinner value increments with fully testable acceptance criteria and deliver them as a team. Coding moves from exploration to implementation and quality feedback and throughput accelerate. It's very common for a team's throughput to double in 6-8 weeks with the right guidance. Again, this acts as a forcing function for uncovering and removing upstream impediments with missing product information, external hard dependencies with other teams, Change Advisory Board compliance theater, or other organizational issues.

## How to Decompose Work

### Start with Behavior-Driven Development (BDD)

[Behavior-Driven Development](https://dojoconsortium.org/docs/work-decomposition/behavior-driven-development/) is the collaborative process where we discuss the intent and behaviors of a feature and document the understanding in a declarative, testable way. BDD is the foundation for both decomposing stories AND breaking work into very small changes for daily integration.

**BDD is not a technology or automated tool** - it is the process of defining behavior. Teams can then automate tests for those behaviors.

#### Writing Testable Acceptance Criteria

Use the **Given-When-Then** format (Gherkin language) to express behaviors in "Arrange, Act, Assert" that all stakeholders understand:

```gherkin
Given [initial context/state]
When [action/event occurs]
Then [expected outcome]
```

**Example - User Story: "As a user, I want to clock out"**

```gherkin
Scenario: Clock out after minimum time
  Given I am clocked in
    And I have been clocked in for more than 5 minutes
  When I enter my associate number
  Then I will be clocked out
    And I will be notified of the time
```

These testable acceptance criteria should be the **Definition of Done** for a user story.

#### Using BDD to Decompose Stories

If a story has more than 6 acceptance criteria, it can probably be split. Each scenario represents a potential smaller story:

**Large story: "User can clock in and out"**

Split into smaller stories using scenarios:
```
Story 1: Clock out after minimum time
  Given I am clocked in for more than 5 minutes
  When I enter my associate number
  Then I will be clocked out

Story 2: Prevent early clock out
  Given I am clocked in for less than 5 minutes
  When I enter my associate number
  Then I will see an error message

Story 3: Clock in with validation
  Given I am clocked out
  When I enter a valid associate number
  Then I will be clocked in
```

Each story has clear, testable acceptance criteria that can be completed in 1-2 days.

#### Using BDD for Technical Decomposition

BDD helps achieve daily integration by breaking implementation into testable increments. Each acceptance criterion becomes a series of small, testable changes:

**Scenario**: Clock out after minimum time

**Technical decomposition for daily commits:**

Day 1, Commit 1:
```gherkin
Given a user record exists in the database
When I query by associate number
Then I can retrieve the clock-in time
```

Day 1, Commit 2:
```gherkin
Given I can retrieve clock-in time
When I calculate elapsed time
Then I can determine if 5 minutes have passed
```

Day 2, Commit 1:
```gherkin
Given I can determine elapsed time
When elapsed time > 5 minutes
Then I can update the record with clock-out time
```

Day 2, Commit 2:
```gherkin
Given I can update clock-out time
When clock-out succeeds
Then I can generate a notification message
```

Each commit:
- Has a passing test
- Doesn't break existing functionality
- Can be integrated to trunk
- Moves incrementally toward the complete feature

**Key principle**: No acceptance test should contain more than 10 conditions. Scenarios should be focused on a specific function and should not attempt to describe multiple behaviors.

### Vertical Slicing

After using BDD to define clear behaviors, stories should be sliced **vertically**, not horizontally. A vertical slice delivers complete functionality across all necessary technical layers.

**Vertical slice (correct):**
```
Story: "User can view their order history"
- Includes: UI, API, service layer, database query
- Delivers: Complete, working feature users can interact with
- Result: Deployable value increment
```

**Horizontal slice (incorrect):**
```
Story 1: "Build order history UI"
Story 2: "Build order history API"
Story 3: "Build order history database query"
- Problem: None are independently deployable
- Problem: No value until all three are complete
- Problem: Creates dependencies between stories
```

**Key principle**: Stories should be sliced vertically, aligned such that they fulfill a consumer request without requiring another story being deployed.

### INVEST Criteria

After slicing, stories should still meet the **INVEST** criteria:

- **Independent**: Self-contained with no inherent dependencies on other stories
- **Negotiable**: Implementation details are open to discussion
- **Valuable**: Delivers value to end-users or stakeholders
- **Estimable**: Team can estimate the size reasonably
- **Small**: Manageable and completable within 1-2 days
- **Testable**: Has clear acceptance criteria (use BDD!)

Stories that don't meet INVEST criteria should be refined further or sliced differently.

### Story Slicing Patterns

#### 1. Workflow Steps

Split by steps in a user workflow:

```
Large story: "User can purchase a product"

Sliced:
- User can add product to cart
- User can view cart
- User can proceed to checkout
- User can enter payment information
- User can complete purchase
```

#### 2. Happy Path First

Start with the simplest path, add complexity later:

```
Large story: "User can search for products"

Sliced:
- User can search by exact product name
- User can search with partial matches
- User can filter search results
- User can sort search results
- User can search with advanced filters
```

#### 3. Simple/Complex Variations

Implement simple cases first:

```
Large story: "Calculate shipping costs"

Sliced:
- Calculate shipping for domestic orders
- Calculate shipping for international orders
- Apply shipping discounts
- Handle expedited shipping
```

#### 4. Major Effort

Defer large technical work:

```
Large story: "Migrate user data to new schema"

Sliced:
- Support reading from both old and new schemas
- Migrate user authentication data
- Migrate user profile data
- Migrate user preferences
- Remove old schema support
```

#### 5. Data Variations

Handle different data types progressively:

```
Large story: "Support file attachments"

Sliced:
- Support image attachments
- Support PDF attachments
- Support document attachments
- Support video attachments
```

### Anti-Patterns to Avoid

**Don't slice by technical layer:**
- WRONG: "Frontend story" + "Backend story" + "Database story"
- RIGHT: One story delivering complete functionality

**Don't slice by activity:**
- WRONG: "Design story" + "Implementation story" + "Testing story"
- RIGHT: One story including all activities

**Don't create dependent stories:**
- WRONG: "Story B can't start until Story A is deployed"
- RIGHT: Each story is independently deployable

**Don't lose testability:**
- WRONG: "Refactor database layer" (no testable user behavior)
- RIGHT: "Improve search performance to < 2 seconds" (measurable outcome)

### Working Within a Vertical Slice

While stories should be sliced vertically, multiple developers can work the story with each developer picking up a task that represents a layer of the slice. The key is that the story isn't considered "done" until all layers are complete and the feature is deployable.

## Resources to Help

- [Work Decomposition - DevOps Dojo Consortium](https://dojoconsortium.org/docs/work-decomposition/)
- [Story Slicing - DevOps Dojo Consortium](https://dojoconsortium.org/docs/work-decomposition/story-slicing/)
- [Work Breakdown - DevOps Dojo Consortium](https://dojoconsortium.org/docs/work-decomposition/work-breakdown/)
- [Behavior-Driven Development - DevOps Dojo Consortium](https://dojoconsortium.org/docs/work-decomposition/behavior-driven-development/)
- [The Humanizing Work Guide to Splitting User Stories](https://www.humanizingwork.com/the-humanizing-work-guide-to-splitting-user-stories/)
- [Call to Arms: Average Story Size of One Day - Paul Hammant](https://paulhammant.com/2012/04/24/call-to-arms-average-story-sizes-of-one-day/)
