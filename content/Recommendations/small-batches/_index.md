---
title: Work in Small Batches
description: 'Learn how to work in small batches for faster feedback and reduced risk. Expert guidance on BDD, acceptance test-driven development (ATDD), story slicing, technical decomposition, and daily code integration for continuous delivery teams.'
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

**-- _Accelerate_ by Nicole Forsgren Ph.D., Jez Humble & Gene Kim**

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

BDD helps achieve daily integration by breaking implementation into testable increments. Each acceptance criterion
becomes a series of small, testable changes that can be implemented using acceptance-test driven development:

**Scenario**: Clock out after minimum time

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

After using BDD to define clear behaviors, each task should be sliced **vertically**, not horizontally. A vertical slice
delivers complete functionality across all necessary technical layers to deliver a response to a request.

## Technical Decomposition

The same BDD process used for story slicing applies to technical decomposition at the service, module, and function level. This enables daily integration while building complex features.

### Acceptance Test-Driven Development (ATDD)

ATDD is the practice of writing executable acceptance tests **before** writing implementation code. Each small change follows this workflow:

**ATDD Workflow (Red-Green-Refactor):**

1. **Write the acceptance test** (in Gherkin or your test framework)
2. **Run the test** - it should fail (RED) because the behavior doesn't exist yet
3. **Write minimal code** to make the test pass
4. **Run the test** - it should now pass (GREEN)
5. **Refactor** if needed while keeping the test green
6. **Commit to trunk** with passing tests

**Key Benefits:**

- Forces clarity about what "done" means before coding
- Provides immediate feedback when implementation is complete
- Creates living documentation of system behavior
- Prevents scope creep and over-engineering
- Ensures every commit has test coverage

### Service-Level Decomposition Example

When decomposing work for a service or API, use the same BDD approach to define testable increments:

**Scenario**: Add order history endpoint

**Day 1, Commit 1: Database query capability**

```gherkin
Given a customer with order ID "12345" exists in the database
When I query orders by customer ID
Then I receive order record with ID "12345"
  And I receive order total of "$45.99"
  And I receive order date
```

**ATDD Implementation:**

1. Write integration test (fails - RED)
2. Create database query function
3. Test passes (GREEN)
4. Commit to trunk

**Day 1, Commit 2: Service layer mapping**

```gherkin
Given order records exist in the database
When the service retrieves an order
Then the order is mapped to the API response format
  And includes customerId, orderId, total, date, status
```

**ATDD Implementation:**

1. Write service layer test (fails - RED)
2. Create mapping function
3. Test passes (GREEN)
4. Commit to trunk

**Day 2, Commit 1: API endpoint (not connected to routes)**

```gherkin
Given the order service exists
When GET /api/orders/12345 is called
Then response status is 200
  And response body contains order details
  And response time is < 500ms
```

**ATDD Implementation:**

1. Write API contract test (fails - RED)
2. Create endpoint handler (not yet exposed in routes)
3. Test passes (GREEN)
4. Commit to trunk

**Day 2, Commit 2: Connect to routing (feature goes live)**

```gherkin
Given the API endpoint exists
When the endpoint is added to the routing table
Then GET /api/orders/:id is publicly accessible
  And authentication is enforced
  And rate limiting is applied
```

**ATDD Implementation:**

1. Write routing integration test (fails - RED)
2. Add route configuration and middleware
3. Test passes (GREEN)
4. Commit to trunk - **Feature now live**

### Module-Level Decomposition

For complex modules, break down into testable behaviors at the function level:

**Example: Payment processing module**

Instead of committing an entire payment module at once, decompose into daily commits:

**Day 1:**

- Payment validation (amount > 0, currency valid, card not expired)
- Test: `validatePaymentRequest()` rejects invalid inputs

**Day 2:**

- Payment gateway adapter interface
- Test: Mock adapter responds to payment requests

**Day 3:**

- Retry logic for failed payments
- Test: Payment retries with exponential backoff

**Day 4:**

- Payment event logging
- Test: All payment attempts are logged with transaction ID

**Day 5:**

- Connect payment module to checkout flow
- Test: End-to-end checkout with payment succeeds

Each commit has passing tests, doesn't break existing functionality, and can be integrated to trunk.

### Contract Testing for API Changes

When changes affect API contracts (interfaces between services), define the contract as executable tests:

```gherkin
# API contract test for order service
Given the order service is running
When I request GET /api/orders/12345
Then the response status is 200
  And the response includes orderId
  And the response includes customerId
  And the response includes total
  And the response includes status
  And the response time is < 500ms
```

**ATDD Implementation:**

1. Write contract test defining the API behavior (fails - RED)
2. Implement the API endpoint to satisfy the contract
3. Contract test passes (GREEN)
4. Commit to trunk

Any changes to the API contract should be reflected as modified contract tests, integrated to trunk with passing tests.

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
