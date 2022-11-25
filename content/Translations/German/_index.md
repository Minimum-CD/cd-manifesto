---
title: Minimum Viable CD
description: ""
weight: 1
---

{{% notice %}}
"Continuous delivery improves both delivery performance and quality, and also helps improve culture and reduce burnout and deployment pain."

-- Das Mindset von DevOps. Accelerate: 24 Schlüsselkompetenzen, um leistungsstarke Technologieunternehmen zu entwickeln und zu skalieren
{{% /notice %}}

![MinimumCD](/images/minimumCD-logo-hex.png?height=150px)

Minimum Viable CD

"Kontinuierliche Lieferung verbessert sowohl die Lieferleistung als auch die Qualität und trägt außerdem zur Verbesserung der Unternehmenskultur und zur Verringerung von Burnout und Lieferungsschmerzen bei.

- Accelerate: Die Wissenschaft von schlanker Software und DevOps: Aufbau und Skalierung hochleistungsfähiger Technologieorganisationen

MinimumCD

Wir, [die Unterzeichner](#signatories), sind der Meinung, dass eine Minimale Definition von Continuous Delivery (CD) erforderlich ist, um den Ablauf der Software-Lieferung zu verbessern und die oben genannten Ergebnisse zu erzielen. Obwohl unsere Kontexte unterschiedlich sein mögen, gibt es universelle Praktiken, die allen Situationen und Teams gemeinsam sind. Indem wir diese definieren, können wir:

- neue Praktiker auf konsistente Art und Weise einführen
- die technischen Praktiken, die CD ausmachen, diskutieren
- uns gegenseitig helfen, unsere derzeitigen Fähigkeiten zu verbessern

Nur wenn wir Kernpraktiken umsetzen, können wir die Vorteile von Continuous Delivery für uns nutzen.

Die untenstehenden Praktiken sind das Minimum, ein Ausgangspunkt. Das erwartete Ergebnis ist eine kontinuierliche Verbesserung der Geschwindigkeit, Qualität und Sicherheit der Lieferpipeline.

## Kontinuierliche Lieferung

Continuous Delivery (kontinuierlice Lieferung) ist die technische Disziplin, bei der alle Änderungen auf sichere Weise in einem stets gleichen Verfahren bereitgestellt werden. CD deckt ein breites Spektrum von Aktivitäten ab, je nach den Besonderheiten des Liefergegenstandes. Es gibt jedoch bestimmte Verhaltensweisen und Fähigkeiten, die in jedem Kontext erfüllt sein müssen, um als "kontinuierliche Lieferung" zu gelten.

Die für CD erforderlichen Mindestaktivitäten sind:

    Kontinuierliche Integration verwenden
    Die Anwendungspipeline ist die einzige Möglichkeit zur Lieferung in einer beliebigen Umgebung.
    Die Pipeline entscheidet über die Freigabefähigkeit von Änderungen, ihr Urteil ist endgültig
    Die von der Pipeline erstellten Artefakte entsprechen immer der Definition der Organisation für "deployable".
    Unveränderliche Artefakte. Keine menschlichen Änderungen nach der Übergabe.
    Alle Arbeiten an Features werden eingestellt, wenn die Pipeline rot ist.
    Produktionsähnliche Testumgebung
    Rollback bei Bedarf
    Anwendungskonfiguration wird mit dem Artefakt ausgeliefert

Kontinuierliche Integration

Bei der kontinuierlichen Integration wird die Arbeit sehr häufig in den Stamm der Versionskontrolle integriert und überprüft, ob die Arbeit nach bestem Wissen und Gewissen freigegeben werden kann.

Die für CI erforderlichen Mindestaktivitäten sind:

    Trunk-basierte Entwicklung
    Die Arbeit wird mindestens täglich in den Stamm integriert
    Die Arbeit wird vor dem Zusammenführen mit dem Stamm automatisch getestet.
    Die Arbeit wird beim Merge automatisch mit anderen Arbeiten getestet
    Alle Arbeiten an Features werden gestoppt, wenn der Build rot ist.
    Neue Arbeiten machen die gelieferten Arbeiten nicht kaputt

Trunk-basierte Entwicklung

Die trunk-basierte Entwicklung ist das Verzweigungsmuster, das erforderlich ist, um die Definition von CI zu erfüllen. Es verhindert, dass Arbeit verloren geht, das Risiko der Korruption bei der Lösung von Merge-Konflikten besteht und auch die Verschwendung von Bewegungen reduziert wird, die die Batchgröße erhöht.

    Die für TBD erforderlichen Mindestaktivitäten sind:
        Alle Änderungen werden in den Stamm integriert.
        Wenn Zweige aus dem Stamm verwendet werden:
            Sie stammen aus dem Stamm
            Sie werden wieder in den Stamm integriert
            Sie sind kurzlebig und werden nach dem Merge entfernt.

Warum haben wir das gebaut?

Für Hintergrundinformationen zu Minimum CD und Antworten auf andere häufige Fragen, lesen Sie bitte die FAQs.
Die Reise beginnen

Haben Sie Fragen, wo Sie anfangen sollen? Sehen Sie sich einige Empfehlungen an.
Beitragen

Möchten Sie eine Übersetzung, bewährte Verfahren, Vorschläge oder einen Erfahrungsbericht einreichen?

Lesen Sie unsere Richtlinien für Beiträge.

Übersetzt mit www.DeepL.com/Translator (kostenlose Version)

We, [the undersigned](#signatories), believe that a minimal definition of continuous delivery (CD) is required to improve the flow of delivery and achieve the outcomes above. While our contexts may be different, there are universal practices common in all. By defining them we can:

- Introduce new practitioners in a consistent way
- Discuss engineering practices that comprise CD
- Help each other improve current capabilities

Only by implementing core practices do we begin to see the benefits of continuous delivery.

The practices below are the minimum, a starting point. Continuous improvement of the speed, quality, and safety of the delivery pipeline is the expected outcome.

---

## Continuous Delivery

CD is the engineering discipline of delivering all changes in a standard way safely. It covers a broad spectrum of activities depending on what is being delivered. However, there are behaviors and abilities that must be met in every context to qualify as "continuous delivery"

The minimum activities required for CD are:

- Use [Continuous integration](#continuous-integration)
- The [application
  pipeline](https://www.informit.com/articles/article.aspx?p=1621865&seqNum=2#:~:text=%EE%94%80Buy-,What%20Is%20a%20Deployment%20Pipeline%3F,-At%20an%20abstract)
  is the only way to deploy to any environment.
- The pipeline decides the releasability of changes, its verdict is [definitive](../faq/#why-should-the-pipeline-be-definitive-for-deploy)
- Artifacts created by the pipeline always meet the organization's [definition of deployable](../faq/#what-do-we-mean-by-definition-of-deployable)
- [Immutable artifact](./immutable). No human changes after commit.
- All feature work stops when the pipeline is red
- Production-like test environment
- Rollback on-demand
- [Application configuration](../faq/#what-is-application-configuration) deploys with artifact

## Continuous Integration

CI is the activity of very frequently integrating work to the trunk of version control and verifying that the work is, to the best of our knowledge, releasable.

The minimum activities required for CI are:

- [Trunk-based development](#trunk-based-development)
- Work integrates to the trunk at a minimum daily
- Work has automated testing before merge to trunk
- Work is tested with other work automatically on merge
- All feature work stops when the build is red
- New work does not break delivered work

## Trunk-based Development

[Trunk-based development](./tbd) is the branching pattern required to meet the definition
of CI. It prevents lost work, the risk of corruption that comes from merge conflict resolution, and also reduces movement
waste that increases batch size.

- The minimum activities required for TBD are:
  - All changes integrate into the trunk
  - If branches from the trunk are used:
    - They originate from the trunk
    - They re-integrate to the trunk
    - They are short-lived and removed after the merge

## Why did we build this?

For background on Minimum CD and answers to other common questions, please [read the FAQs](../faq).

## Starting the Journey

Questions on where to start? Check out some [recommendations](../journey).

## Contributing

Do you want to submit a translation, good practices, suggestions, or an experience report?

Read our [contribution guidelines](https://github.com/Minimum-CD/cd-manifesto/blob/master/CONTRIBUTING.md).

{{< contributors >}}

## Signatories

{{< signatures >}}
