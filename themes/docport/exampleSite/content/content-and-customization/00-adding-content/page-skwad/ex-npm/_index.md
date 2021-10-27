---
description: Quick test
hidden: true
hide:
- header
- nextpage
- nav
- breadcrumb

title: Vulnérabilité NPM
weight: 9

skwad:
  url: "https://localhost:5555/"
  mode: "api"
  spaceName: "NPMvuln" 
---

Bonjour,

Une vulnérabilité présente dans les outils de gestion de dépendance de NodeJS (YARN et NPM) permet à 
un agent malveillant de prendre le contrôle à distance sur la compilation de nos applications.

* La vulnérabilité corrompt les librairies utilisées sur les projets JavaScript (Angular, VueJS, NodeJS....)
* Les versions impactées sont les suivantes :
	* YARN : 1.21 et antérieur
	* NPM : 6.13.3 et antérieur

{{%expand "Cliquez ici pour en savoir plus"%}}
{{%panel color="info" header="ressources externes"%}}
* http://
* http://

Cette vulnérabilité a été communiquée aux équipes sécurité puis XXX Xxxx.
{{%/panel%}}
{{%/expand%}}

{{%notice success%}}
La procédure ci dessous 
* vous permet de vérifier si votre poste de travail est vulnérable 
* permettra à l'équipe de sécurité opérationnelle d'ajuster le plan d'action d
de traitement de la vulnérabilité.
{{%/notice %}}

## Vous
**Quel est votre adresse email ?**
{{<c/text "email*" >}}xxxxxxx@xxxx.com{{</c/text >}}


## Vérifiez la présence de la vulnérabilité sur votre poste de travail
Les 2 commandes windows suivantes sont à taper dans un invite de commande windows 

{{%expand "Cliquez ici pour savoir comment ouvrir un invite de commande windows (cmd.exe)"%}}
* Appuyer sur les touches Windows+R
* Tapper `CMD`, puis sur la touche [Entrée].
* Une fois la console ouverte, tappez les 2 commandes décrites ci dessous 
{{%/expand%}}

.

### Tappez `yarn version` dans l'invite de commande windows

```win
C:\> yarn version
```
**Quels est le résultat de la commande `yarn version` ?**
{{<c/choices yarn_cmd_output >}}
    * (notfound) j'ai un message comme " ```Yarn n'est pas reconnu en tant que commande interne.....``` "
    * (version) un numéro de version est affiché, comme " ```yarn version 1.2.3``` "
    * (rien) rien du tout, il ne se passe rien 
{{</c/choices>}}

{{<c/show `{yarn_cmd_output} == 'notfound'` >}}
{{%notice success%}}
**👌    &nbsp;&nbsp;yarn ne semble pas etre installé sur votre poste de travail, aucun risque !** \
Continuez à suivre la procédure pour vérifier le dernier composant : `npm`. 
{{%/notice%}}
{{</c/show>}}

{{<c/show `{yarn_cmd_output} == 'version'` >}}
**Quelle version est affichée ?**
{{<c/choices yarn_version >}}
    * (vulnerable) inférieur à la version `1.21.0`, par example `1.10.154` 
    * (ok) supérieur ou exactement la version `1.21.0`
    * (unknow) Je ne sais pas dire  
{{</c/choices>}}
{{</c/show>}}

{{<c/show `{yarn_version} == 'unknow'` >}}
**Renseignez ici la version qui vous est affichée**
{{<c/text "yarn_version_unknow" >}}v1.2.3{{</c/text >}}
{{</c/show>}}

{{<c/show `{yarn_version} == 'vulnerable'` >}}
{{<c/hidden "warn_yarn_vulnerability" "true">}}
{{</c/show>}}

{{<c/show `{yarn_version} == 'ok'` >}}
{{%notice success%}}
**👌    &nbsp;&nbsp;votre version de yarn ne contient par la vulnérabilité !** \
Continuez à suivre la procédure pour vérifier le dernier composant : `npm`. 
{{%/notice%}}
{{</c/show>}}

{{<c/show `{yarn_version} == 'unknow' || {yarn_cmd_output} == 'rien'` >}}
{{%notice info%}}
**😢    &nbsp;&nbsp;On vous recontacte directement pour vous aider !** \
Continuez à suivre la procédure pour vérifier le dernier composant : `npm`. 
{{%/notice%}}
{{</c/show>}}
.

### Tappez `npm version` dans l'invite de commande windows

```win
C:\> npm version
```
**Quels est le résultat de la commande `npm version` ?**
{{<c/choices npm_cmd_output >}}
    * (notfound) j'ai un message comme " ```npm n'est pas reconnu en tant que commande interne.....``` "
    * (version) un numéro de version est affiché, comme " ```npm version 1.2.3``` "
    * (rien) rien du tout, il ne se passe rien 
{{</c/choices>}}

{{<c/show `{npm_cmd_output} == 'notfound'` >}}
{{%notice success%}}
**👌    &nbsp;&nbsp;npm ne semble pas etre installé sur votre poste de travail, aucun risque !**
{{%/notice%}}
{{</c/show>}}

{{<c/show `{npm_cmd_output} == 'version'` >}}
**Quelle version est affichée ?**
{{<c/choices npm_version >}}
    * (vulnerable) inférieur à la version `6.13.3`, par example `4.73.3` 
    * (ok) supérieur ou exactement la version `6.13.3`
    * (unknow) Je ne sais pas dire
{{</c/choices>}}
{{</c/show>}}



{{<c/show `{npm_version} == 'vulnerable'` >}}
{{<c/hidden "warn_npm_vulnerability" "true">}}
{{</c/show>}}

{{<c/show `{npm_version} == 'ok'` >}}
{{%notice success%}}
**👌    &nbsp;&nbsp;votre version de npm ne contient par la vulnérabilité !**
{{%/notice%}}
{{</c/show>}}

{{<c/show `{npm_version} == 'unknow'` >}}
**Renseignez ici la version qui vous est affichée**
{{<c/text "npm_version_unknow" >}}v1.2.3{{</c/text >}}
{{</c/show>}}

{{<c/show `{npm_version} == 'unknow' || {npm_cmd_output} == 'rien'` >}}
{{%notice info%}}
**😢    &nbsp;&nbsp;On vous recontacte directement pour vous aider !**
{{%/notice%}}
{{</c/show>}}


{{<c/show `{npm_cmd_output} == "notfound" || {npm_version} == "ok"` >}}
{{<c/show `{yarn_cmd_output} == "notfound" || {yarn_version} == "ok"` >}}
{{%alert success%}}
**Votre poste de travail ne présente pas la vulnérabilité recherchée** - Vous pouvez terminer cette procédure en utilisant le bouton ci dessous
{{%/alert%}}
{{</c/show>}}
{{</c/show>}}


{{<c/show `{npm_cmd_output}!= '' && ({npm_version} == "vulnerable" || {yarn_version} == "vulnerable")` >}}

{{%alert danger%}}
**Attention - poste de travail vulnérable**
 
Votre poste de travail contient une version vulnérable d'un ou plusieurs composants nodejs

Corrigez la vulnérabilité en mettant à jour nodejs avec une version corrigée.
Vous trouverez ci dessous la liste des versions mineures minimum de nodeJS contenant la correction.
{{%/alert%}}


## Corrigez la vulnérabilité

**Quelle version de nodeJS avez vous ?**\
_Pour connaitre votre version de node actuelle, tappez `node --version` dans l'invite de commande windows._
{{<c/choices node_version >}}
    * (8) version 8 majeure, exemple `v8.4.23`  
    * (10) version 10 majeure, exemple `v10.4.23`
    * (12) version 12 majeure, exemple `v12.4.23`
    * (13) version 13 majeure, exemple `v13.4.23`
    * (autre) une autre version
{{</c/choices>}}

{{<c/show `{node_version} == 'autre'` >}}
**Renseignez ici la version qui vous est affichée**
{{<c/text "node_node_other" >}}v14.2.3{{</c/text >}}
{{</c/show>}}

{{<c/show `{node_node_other} != ''` >}}
{{%notice info%}}
**👌    &nbsp;&nbsp;On vous recontacte directement pour vous aider !**
{{%/notice%}}
{{</c/show>}}

{{<c/show `{node_version} != '' && {node_version} != 'autre'` >}}
{{%notice primary%}}
**Mettez à jour nodejs**
{{<c/show `{node_version} == '8'` >}} nodejs v8, à partir de la version **8.17.0** corrige npm et yarn{{</c/show>}}
{{<c/show `{node_version} == '10'` >}} nodejs v10, à partir de la version **10.18.0** corrige npm et yarn{{</c/show>}}
{{<c/show `{node_version} == '12'` >}} nodejs v12, à partir de la version **12.14.0** corrige npm et yarn{{</c/show>}}
{{<c/show `{node_version} == '13'` >}} nodejs v13, à partir de la version **13.4.0** corrige npm et yarn{{</c/show>}}
{{%/notice%}}


**Avez vous mis à jour nodeJS dans la version minimale corrigée ?**
{{<c/choices node_updated >}}
    * (yes) C'est fait.
    * (no) Je le ferai plus tard.
{{</c/choices>}}
{{</c/show>}}

{{</c/show>}}


{{<c/show `{npm_version} != "" && {yarn_version} != ""` >}}
## Recommandation PRI|SMS - Architecture technique 

{{%alert info%}}
**La version v12.15.0** de nodeJS est la version la plus courante disponible sur les runners d'intégration continue. 
{{%/alert%}}
{{</c/show>}}



## Un commentaire ? (forme et/ou fond)
{{<c/text "comment" multi />}}