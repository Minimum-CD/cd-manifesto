---
title: Deutsch
description: "Minimale nutzbare kontinuierliche Lieferung"
weight: 3
---

{{% notice %}}

"Kontinuierliche Lieferung vebessert die Geschwindigkeit und Qualität der Auslieferung, und hilft zugleich die Kultur zu verbessern, Burnout und Mühsal in der Entwicklung zu vermeiden."

-- Das Mindset von DevOps. Accelerate: 24 Schlüsselkompetenzen, um leistungsstarke Technologieunternehmen zu entwickeln und zu skalieren
{{% /notice %}}

![MinimumCD](/images/minimumCD-logo-hex.png?height=150px)

Minimum Viable CD

"Kontinuierliche Lieferung verbessert sowohl die Lieferleistung als auch die Qualität und trägt außerdem zur Verbesserung der Unternehmenskultur und zur Verringerung von Burnout und Lieferungsschmerzen bei.

- Accelerate: Die Wissenschaft von schlanker Software und DevOps: Aufbau und Skalierung hochleistungsfähiger Technologieorganisationen

MinimumCD

Wir, [die Unterzeichner](#unterzeichner), sind der Meinung, dass eine Minimale Definition von Continuous Delivery (CD) erforderlich ist, um den Ablauf der Software-Lieferung zu verbessern und die oben genannten Ergebnisse zu erzielen. Obwohl unsere Kontexte unterschiedlich sein mögen, gibt es universelle Praktiken, die allen Situationen und Teams gemeinsam sind. Indem wir diese definieren, können wir:

- neue Praktiker auf konsistente Art und Weise einführen
- die technischen Praktiken, die CD ausmachen, diskutieren
- uns gegenseitig helfen, unsere derzeitigen Fähigkeiten zu verbessern

Nur wenn wir Kernpraktiken umsetzen, können wir die Vorteile von Continuous Delivery für uns nutzen.

Die untenstehenden Praktiken sind das Minimum, ein Ausgangspunkt. Das erwartete Ergebnis ist eine kontinuierliche Verbesserung der Geschwindigkeit, Qualität und Sicherheit der Lieferpipeline.

## Kontinuierliche Lieferung

Kontinuierliche Lieferung (_Continuous Delivery_, _CD_) ist die technische Disziplin, bei der alle Änderungen auf sichere Weise in einem stets gleichen Verfahren bereitgestellt werden. CD deckt ein breites Spektrum von Aktivitäten ab, je nach den Besonderheiten des Liefergegenstandes. Es gibt jedoch bestimmte Verhaltensweisen und Fähigkeiten, die in jedem Kontext erfüllt sein müssen, um als "kontinuierliche Lieferung" zu gelten.

Die für CD erforderlichen Mindestaktivitäten sind:

- [Kontinuierliche Integration](#kontinuierliche-integration) verwenden
- Die [Anwendungspipeline](https://www.informit.com/articles/article.aspx?p=1621865&seqNum=2#:~:text=%EE%94%80Buy-,What%20Is%20a%20Deployment%20Pipeline%3F,-At%20an%20abstract) ist die einzige Möglichkeit zur Lieferung in einer beliebigen Umgebung.
- Die Pipeline entscheidet über die Freigabefähigkeit von Änderungen, ihr Urteil ist [endgültig](../../faq/#why-should-the-pipeline-be-definitive-for-deploy)
- Die von der Pipeline erstellten Artefakte entsprechen immer der der organisationseigenen ["Definition für deploybar"](../../faq/#what-do-we-mean-by-definition-of-deployable).
- [Unveränderliche Artefakte](../../minimumcd/immutable/). Keine menschlichen Änderungen nach der Übergabe an cas CD-System.
- Jegliche Arbeiten an Features werden eingestellt, wenn die Pipeline defekt ist.
- Produktionsähnliche Testumgebung
- Rollback bei Bedarf
- [Anwendungskonfiguration](../../faq/#what-is-application-configuration) wird gemeinsam mit dem Artefakt ausgeliefert

## Kontinuierliche Integration

Bei der kontinuierlichen Integration (_continuous integration_, _CI_) wird die Arbeit sehr häufig in den Stamm (_trunk_) der Versionskontrolle integriert und überprüft, ob die Arbeit nach bestem Wissen und Gewissen freigegeben werden kann.

Die für CI erforderlichen Mindestaktivitäten sind:

- [Trunk-basierte Entwicklung](#trunk-basierte-entwicklung)
- Die Arbeit wird mindestens täglich in den Stamm integriert
- Die Arbeit wird vor dem Zusammenführen mit dem Trunk automatisch getestet.
- Die Arbeit wird beim Merge automatisch mit anderen Arbeiten getestet
- Alle Arbeiten an Features werden gestoppt, wenn der Build defekt ist.
- Neue Arbeiten machen die bereits gelieferten Arbeiten nicht kaputt

## Trunk-basierte Entwicklung

Die [trunk-basierte Entwicklung](../../minimumcd/tbd/) ist das branching Modell, das erforderlich ist, um die Definition von CI zu erfüllen. Es verhindert den Verlust von Arbeit, das Risiko von verfälschtem oder defektem Code bei der Lösung von Merge-Konflikten besteht und auch die (Lean-) Verschwendung durch Bewegung, die die Batchgröße erhöht.

- Die für TBD erforderlichen Mindestaktivitäten sind:
  - Alle Änderungen werden in den Stamm integriert.
  - Wenn Zweige aus dem Stamm verwendet werden:
    - Sie stammen aus dem Stamm
    - Sie werden wieder in den Stamm integriert
    - Sie sind kurzlebig und werden nach dem Merge entfernt.

## Warum haben wir das gebaut?

Für Hintergrundinformationen zu Minimum CD und Antworten auf andere häufige Fragen, lesen Sie bitte die [FAQs](../../faq/).

## Die Reise beginnen

Haben Sie Fragen, wo Sie anfangen sollen? Sehen Sie sich einige [Empfehlungen](../../journey/) an.

## Beitragen

Möchten Sie eine Übersetzung, Best Practices, Vorschläge oder einen Erfahrungsbericht einreichen?

Lesen Sie unsere [Richtlinien für Beiträge](https://github.com/Minimum-CD/cd-manifesto/blob/master/CONTRIBUTING.md)

## Mitwirkende

{{< contributors >}}

## Unterzeichner

{{< signatures >}}
