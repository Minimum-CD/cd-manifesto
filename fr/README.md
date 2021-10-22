# Le minimum vital pour du Déploiement Continu

> "Le déploiement continu améliore à la fois la vitesse de délivrabilité et la qualité, mais participe également à améliorer la culture et à réduire l'épuisement et la difficulté des déploiements."

-- Accélérer

Nous, [les signataires](#signatories), estimons qu'une définition minimale du Déploiement Continu (DC) est requise afin d'améliorer les flux de livraisons. Bien que chaque contexte soit unique, il y a des pratiques universelles. En les définissant, nous pouvons :

- Présenter les choses aux nouveaux arrivants de manière cohérente
- Discuter des pratiques d'ingénierie qui composent le DC
- S'entraider pour améliorer nos compétences actuelles

Ce n'est qu'en mettant en œuvre des pratiques fondamentales spécifiques qu'il est possible de commencer à voir les avantages de la livraison continue.

Les pratiques ci-dessous sont le minimum, un point de départ. L'amélioration continue de la vitesse, de la qualité et de la sécurité du pipeline de livraison en sont le résultat attendu.

---

## Déploiement Continu

Le Déploiement Continu est la discipline d'ingénierie qui consiste à délivrer tous les changements de manière standard, 
en toute sécurité. Il couvre un large éventail d'activités en fonction de ce qui est livré. 
Cependant, il existe des comportements et des compétences qui doivent être mises en oeuvres dans tous les contextes 
pour être qualifiés de « livraison continue »

Les activités minimales requises pour le Déploiement Continu sont :

- [L'intégration continue](#continuous-integration)
- Le [tunnel de déploiement](https://www.informit.com/articles/article.aspx?p=1621865&seqNum=2#:~:text=%EE%94%80Buy-,What%20Is%20a%20Deployment%20Pipeline%3F,-At%20an%20abstract)
  est le seul chemin qui permet de déployer en production.
- Le tunnel décide de la diffusion des modifications, son verdict est [définitif](./faq.md#why-should-the-pipeline-be-definitive-for-deploy)
- Les artefacts créés par le tunnel répondent toujours à la [définition de Déployable](https://www.youtube.com/watch?v=bHKHdp4H-8w) de l'organisation
- [L'artefact ne change jamais](./faq#what-is-an-immutable-artifact). Il n'y a aucun changement humain après le commit.
- Toutes les fonctionnalités s'arrêtent lorsque le pipeline est rouge
- L'environnement de test ressemble à l'environnement de production
- On peut revenir en arrière (rollback) à la demande
- [La configuration de l'application](./faq.md#what-is-application-configuration) est déployée par l'artefact 

## Intégration Continue

L'Intégration Continue consiste à intégrer, très fréquemment, un travail donné au tronc principal du 
dépôt de code, et à vérifier que ce travail est, à notre connaissance, propre à être livré.

Les activités minimales requises pour CI sont :

- [Le développement à branche unique](https://trunkbaseddevelopment.com/)
- Le travail est intégré au tronc commun au moins chaque jour
- Le travail est testé automatiquement avec d'être fusionné au tronc commun
- Le travail est testé avec celui des autres automatiquement lors de la fusion
- Toutes les fonctionnalités s'arrêtent lorsque le build est rouge
- Le nouveau travail ne casse pas le travail existant

## Le développement à branche unique (TBD)

[Le développement à branche unique](https://trunkbaseddevelopment.com/) est le modèle de branche requis pour répondre à la définition d'Intégration Continue.
Il évite la perte de travail, le risque de corruption qui provient des résolutions de conflits lors des fusions, et 
réduit également le gaspillage d'énergie induit par la taille des lots/



- Les activités minimales requises pour TBA sont :
  - Tous les changements sont intégrés dans le tronc commun
  - Si des branches du tronc commun sont utilisés :
    - Elles sont issues du tronc commun
    - Elles se réintègrent au tronc commun
    - Elles sont de courte durée et supprimées après la fusion

## Au-delà des minimums

Le Déploiement Continu Minimal n'est pas la première étape d'un modèle de maturité. 
Cependant, cela reste le strict minimum sur lequel de nombreuses autres pratiques devraient être construites en fonction de votre contexte.
Afin de vous aider à dépasser ce Déploiement Continu Minimal, nous tenons à jour une liste de ressources axées sur la 
livraison continue, que nous que nous avons trouvées très utiles dans nos propres expériences.

Ces ressources contiennent les bases, mais aussi les connaissances nécessaires pour devenir une organisation de Déploiement Continue "d'élite".
Elles sont dédiées à la résolution du problème « pourquoi ne pouvons-nous pas passer en production aujourd'hui ? »

[Lire la liste](./references.md).

## Pourquoi avons-nous construit ce manifeste ?

Pour plus d'informations sur Déploiement Continu Minimal et des réponses à d'autres questions courantes, [veuillez lire la FAQ](./faq.md).
For more background on Minimum CD and answers to other common questions, please .

## Traductions

- [Anglais](https://github.com/Minimum-CD/cd-manifesto/blob/master/README.md)
- [Finlandais](https://github.com/Minimum-CD/cd-manifesto/blob/master/fi/README.md)

## Vous souhaitez contribuer ou devenir signataire ?

Les signataires ont signé le [document original en anglais](../#signatories), et la liste des noms sera tenue à jour uniquement sur celui-ci.

## Traduction

Cette traduction est produite par la communauté pour obtenir ces informations au-delà des barrières linguistiques. Les signataires eux-mêmes ne peuvent confirmer l'exactitude de cette traduction.

Traduit de la version : 206a173, 2021-10-20
