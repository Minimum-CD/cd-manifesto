---
title: Francais
description: "Le minimum viable de la Livraison Continue"
weight: 3
---

# Le minimum viable de la Livraison Continue

> "La livraison continue améliore à la fois les performances de livraison et la qualité, et participe également à améliorer la culture et à réduire l'épuisement et la difficulté des déploiements."

-- Accelerate

![MinimumCD](/images/minimumCD-logo-hex.png?height=150px)

Nous, [les signataires](../../minimumcd/#signatories), estimons qu'une définition minimale de la Livraison Continue (Continuous Delivery, CD) est requise afin d'améliorer les flux de livraisons. Bien que chaque contexte soit unique, il y a des pratiques universelles. En les définissant, nous pouvons&nbsp;:

- Présenter les choses aux nouveaux arrivants de manière cohérente
- Discuter des pratiques d'ingénierie qui composent le CD (Continuous Delivery)
- S'entraider pour améliorer nos capacités actuelles

Ce n'est qu'en mettant en œuvre des pratiques fondamentales qu'il est possible de commencer à voir les avantages de la livraison continue.

Les pratiques ci-dessous sont le minimum, un point de départ. L'amélioration continue de la vitesse, de la qualité et de la sécurité du pipeline de livraison en sont le résultat attendu.

---

## Livraison Continue

La Livraison Continue est la discipline d'ingénierie qui consiste à délivrer tous les changements de manière standard,
en toute sécurité. Il couvre un large éventail d'activités en fonction de ce qui est livré.
Cependant, il existe des comportements et des compétences qui doivent être mises en oeuvres dans tous les contextes
pour être qualifiés de « livraison continue »

Les activités minimales requises pour la Livraison Continue sont&nbsp;:

- [L'intégration continue](#intégration-continue)
- Le [pipeline de déploiement](https://www.informit.com/articles/article.aspx?p=1621865&seqNum=2#:~:text=%EE%94%80Buy-,What%20Is%20a%20Deployment%20Pipeline%3F,-At%20an%20abstract)
  est le seul chemin qui permet de déployer en production.
- Le pipeline décide de la diffusion des modifications, son verdict est [définitif](../../faq/#why-should-the-pipeline-be-definitive-for-deploy)
- Les artefacts créés par le pipeline répondent toujours à la [définition de Déployable](https://www.youtube.com/watch?v=bHKHdp4H-8w) de l'organisation
- [L'artefact ne change jamais](../../minimumcd/immutable/). Il n'y a aucun changement humain après le commit.
- Tous les travaux sur les fonctionnalités s'arrêtent lorsque le pipeline est rouge
- L'environnement de test est proche de l'environnement de production
- On peut revenir en arrière (rollback) à la demande
- [La configuration de l'application](../../faq/#what-is-application-configuration) est déployée avec l'artefact

## Intégration Continue

L'Intégration Continue consiste à intégrer, très fréquemment, un travail donné au tronc principal du
dépôt de code, et à vérifier que ce travail est, à notre connaissance, propre à être livré.

Les activités minimales requises pour CI sont&nbsp;:

- [Le développement basé sur un tronc commun](../../minimumcd/tbd/)
- Le travail est intégré au tronc commun au moins une fois par jour
- Le travail est testé automatiquement avec d'être fusionné au tronc commun
- Le travail est testé avec celui des autres automatiquement lors de la fusion
- Tous les travaux sur les fonctionnalités s'arrêtent lorsque le build est rouge
- Le nouveau travail ne casse pas le travail existant

## Le développement basé sur un tronc commun (Trunk-based Development, TBD)

[Le développement basé sur un tronc commun](../../minimumcd/tbd/) est le modèle de branche requis pour répondre à la définition d'Intégration Continue.
Il évite la perte de travail, le risque de corruption qui provient des résolutions de conflits lors des fusions, et
réduit également le gaspillage d'énergie induit par la taille des lots/

Les activités minimales requises pour le TBD sont&nbsp;:

- Tous les changements sont intégrés dans le tronc commun
- Si des branches partant du tronc commun sont utilisées&nbsp;:
  - Elles sont issues du tronc commun
  - Elles sont réintègrées au tronc commun
  - Elles sont de courte durée et supprimées après la fusion

## Pourquoi avons-nous construit ce manifeste ?

Pour plus d'informations sur la Livraison Continue Minimale et des réponses à d'autres questions courantes, [veuillez lire la FAQ](../../faq/).

## Vous souhaitez contribuer ou devenir signataire ?

Les signataires ont signé le [document original en anglais](../../minimumcd/#signatories), et la liste des noms sera tenue à jour uniquement sur celui-ci.

## Traduction

Cette traduction est produite par la communauté pour obtenir ces informations au-delà des barrières linguistiques. Les signataires eux-mêmes ne peuvent confirmer l'exactitude de cette traduction.

Traduit de la version: 35071d4, 2023-07-18
