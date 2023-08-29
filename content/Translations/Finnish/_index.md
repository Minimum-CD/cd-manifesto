---
title: Suomi
description: "Vähäisin toimiva jatkuva toimittaminen"
weight: 3
---

## Vähäisin toimiva jatkuva toimittaminen

> "Continuous delivery improves both delivery performance and quality, and also helps improve culture and reduce burnout and deployment pain."

-- Accelerate

Me, [allekirjoittaneet](../../minimumcd/#signatories), uskomme, että jatkuvalle toimittamiselle (engl. continuous delivery, CD) tarvitaan määritelmä, jotta toimitusvirtaa voidaan parantaa. Riippumatta erilaisista olosuhteistamme, on olemassa yleispäteviä käytäntöjä. Määrittelemällä nämä käytännöt voimme:

- Perehdyttää uudet harjoittajat yhdenmukaisella tavalla
- Keskustella ohjelmistotuotannon käytännöistä, joista CD muodostuu
- Auttaa toisiamme kehittämään nykyisiä kyvykkyyksiä

Ainoastaan toteuttamalla ydinkäytännöt alamme nähdä jatkuvan toimittamisen hyödyt.

Alla olevat käytännöt ovat minimi, lähtötila. Käytäntöjen seuraamisesta on odotettavissa jatkuvasti kehittyvää nopeutta, laatua ja toimitusputken turvallisuutta.

---

## Jatkuva toimittaminen

Jatkuva toimittaminen (CD) on ohjelmistotuotannon toimintamalli, jolla kaikki muutokset toimitetaan samalla turvallisella tavalla. Siihen liittyy laaja joukko käytäntöjä, joiden toteuttaminen riippuu siitä, mitä ollaan toimittamassa. Tästä huolimatta on toimintaa ja kyvykkyyksiä, jotka täytyy toteuttaa kaikissa toimintaympäristöissä, jotta toimintaa voidaan kutsua "jatkuvaksi toimittamiseksi".

Jatkuvan toimittamisen minimivaatimukset ovat:

- [Jatkuva integraatio](#jatkuva-integraatio)
- [Sovelluksen toimitusputki](https://www.informit.com/articles/article.aspx?p=1621865&seqNum=2#:~:text=%EE%94%80Buy-,What%20Is%20a%20Deployment%20Pipeline%3F,-At%20an%20abstract)
  on ainoa tie tuotantoonvientiin.
- Toimitusputki määrää muutosten julkaisukelpoisuuden, sen lausunto on [ehdoton](../../faq/#why-should-the-pipeline-be-definitive-for-deploy)
- [Organisaation tuotantoonvientikelpoisen määritelmä täyttyy aina](https://www.youtube.com/watch?v=bHKHdp4H-8w)
- [Artifakti on muuttumaton](../../minimumcd/immutable/). Ei ihmisen tekemiä muutoksia versionhallintaan tallentamisen jälkeen.
- Kaikki uuskehitys loppuu, kun toimitusputki on punaisella
- Tuotannonkaltainen testiympäristö
- Tuotantoonviennin peruutus tarvittaessa
- [Sovelluksen konfiguraatio](../../faq/#what-is-application-configuration) viedään tuotantoon artifaktin kanssa

## Jatkuva integraatio

Jatkuva integraatio (CI) on toimintatapa, jossa työ integroidaan päähaaraan erittäin usein ja varmistetaan, että työ on - parhaan tietomme mukaan - julkaisukelpoista.

Jatkuvan integraation minimivaatimukset ovat:

- Päähaarassa kehittäminen ([Trunk-based development](../../minimumcd/tbd/))
- Työ integroidaan päähaaraan vähintään päivittäin
- Työ testataan automaattisesti ennen päähaaraan yhdistämistä
- Työ testataan muun työn kanssa automaattisesti haaroja yhdistettäessä
- Kaikki uuskehitys loppuu, kun integroimisputki on punaisella
- Uusi työ ei riko toimitettua työtä

## Päähaarassa kehittäminen (Trunk-based Development)

Päähaarassa kehittäminen eli [Trunk-based development](../../minimumcd/tbd/) on versionhallinnan haarauttamistapa, joka vaaditaan jatkuvan integraation määritelmään. Se estää työn katoamisen, työn korruptoitumisen haarojen yhdistämiseen liittyvissä konflikteissa ja vähentää liike-hukkaa, joka johtaa suuriin eräkokoihin.

Päähaarassa kehittämisen minimivaatimukset ovat:

- Kaikki muutokset integroidaan päähaaraan
- Jos päähaarasta otetaan lisää haaroja, ne:
  - Haarautuvat päähaarasta
  - Integroituvat uudelleen päähaaraan
  - Ovat lyhytikäisiä ja poistetaan päähaaraan yhdistämisen jälkeen

## Vähimmästä eteenpäin

Minimi-CD ei ole ensimmäinen askel kypsyysmallissa. Siitä huolimatta se on vähäisin taso, jonka päälle muita tarkoituksenmukaisia toimintoja on ympäristöstäsi riippuen syytä rakentaa. Auttaaksesi tielläsi lähtötilanteesta eteenpäin, ylläpidämme listaa lähteistä, jotka keskittyvät jatkuvan toimittamiseen ja joista on ollut meille apua omilla matkoillamme.

Näistä lähteistä löytyy sekä perusasiat että tiedot, joilla voi tulla "eliitti"-CD-organisaatioksi. Ne keskittyvät ratkaisemaan ongelman: "Miksei me voida mennä tuotantoon tänään?"

[Lue lista](../../references/).

## Miksi teimme tämän?

Lisää taustatietoa Minimi-CD:stä ja vastauksia yleisimpiin kysymyksiin löytyy [usein kysytyistä kysymyksistä](../../faq/).

## Haluatko osallistua tai allekirjoittaa?

Lue [osallistumisohje](https://github.com/Minimum-CD/cd-manifesto/blob/master/CONTRIBUTING.md).

## Allekirjoittajat

Allekirjoittajat ovat allekirjoittaneet [englanninkielisen alkuperäisdokumentin](../../minimumcd/#signatories) ja ajantasainen nimilista julkaistaan ainoastaan sen yhteydessä.

## Käännös

Tämä on yhteisön tuottama käännös, jotta tämä tieto kulkisi yli kielimuurien. Allekirjoittaneet eivät itse voi vahvistaa tämän käännöksen oikeellisuutta.

Käännetty dokumenttiversiosta: ab846ca, 2021-10-16
