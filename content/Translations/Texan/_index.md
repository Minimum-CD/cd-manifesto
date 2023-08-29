---
title: Texan
description: "The bare minimum for makin' work suck less"
weight: 3
---


{{% notice %}}
"Continuous delivery improves both delivery performance and quality, and also helps improve culture and reduce burnout and deployment pain."

-- Accelerate: The Science of Lean Software and DevOps: Building and Scaling High Performing Technology Organizations
{{% /notice %}}

![MinimumCD](/images/minimumCD-logo-hex.png?height=150px)

We, [the undersigned](#signatories), reckon that parin' down continuous delivery (CD) to its core is required if we
wanna improve the flow of delivery and achieve the outcomes above. While our contexts may vary, there are universal
practices common in all. By defining 'em, we can:

- Introduce new practitioners in a consistent way
- Discuss engineering practices that make up CD
- Help each other get better at doin' it

Only by implementin' core practices do we begin to see the benefits of continuous delivery.

The practices below are the bare minimum, a startin' point. Continuous improvement of the speed, quality, and safety of
the delivery pipeline is the expected outcome. If all y'all do is automate some things then bless your heart, ain't nothing gettin' better.

---

## Continuous Delivery

CD is the engineering discipline of deliverin' all changes in a standard way safely. How you do it depends on what's bein' delivered. However, there are things you gotta do in every context to qualify as "Continuous Delivery"

The minimum activities required for CD are:

- Use [Continuous Integration](#continuous-integration)
- The [application
  pipeline](https://www.informit.com/articles/article.aspx?p=1621865&seqNum=2#:~:text=%EE%94%80Buy-,What%20Is%20a%20Deployment%20Pipeline%3F,-At%20an%20abstract)
  is the only way to deploy to any environment
- The pipeline decides the releasability of changes. [Whatever it says, goes](../../faq/#why-should-the-pipeline-be-definitive-for-deploy)
- Artifacts created by the pipeline always meet the organization's [definition of deployable](../../faq/#what-do-we-mean-by-definition-of-deployable)
- [Immutable artifact](../../minimumcd/immutable/) (no human changes after commit)
- All feature work stops when the pipeline is red
- Production-like test environment
- Rollback on-demand
- [Application configuration](../../faq/#what-is-application-configuration) deploys with artifact

## Continuous Integration

CI is the activity of mighty frequently integratin' work to the trunk of version control and verifyin' that the work is,
best we can tell, releasable.

The bare minimums for CI are:

- [Trunk-based development](#trunk-based-development)
- Work integrates into the trunk at least daily
- Y'all automated the testin' before mergin'
- Work is tested with other work automagically on merge
- All feature work stops when the build halts and catches fire
- New work does not mess up delivered work

## Trunk-based Development

[Trunk-based development](../../minimumcd/tbd/) is the branchin' pattern we need to meet the definition
of CI. It prevents lost work, the risk of corruption that comes from conflictin' changes, and reduces back-and-forth
commiseratin' that makes changes bigger.

The minimum activities required for TBD are:

- Everythin' integrates into the trunk
- If branches from the trunk are used:
  - They start at the trunk
  - They end at the trunk
  - Like mayflies, they should die within a day
  
## Why'd we build this?

We wrote that down along with some other stuff to [help y'all out](../../faq/).

## Headin' Down the Trail

Wanna know where to start? Check out some [ideas](../../journey/) that've worked for us.

## Contributin'

Do you want to submit a translation, good practices, suggestions, or talk about what's worked for you?

Read our [contribution guidelines](https://github.com/Minimum-CD/cd-manifesto/blob/master/CONTRIBUTING.md).

## Contributors

{{< contributors >}}

## Signatories

{{< signatures >}}
