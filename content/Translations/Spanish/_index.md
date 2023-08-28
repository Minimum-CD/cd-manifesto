---
title: Español
description: "Entrega Continua Mínima Viable"
weight: 3
---

## Entrega Continua Mínima Viable

{{% notice %}}
"La entrega continua mejora tanto el rendimiento como la calidad de la entrega, y también ayuda a mejorar la cultura y a reducir el agotamiento y el dolor del despliegue."

-- Accelerate: The Science of Lean Software and DevOps: Building and Scaling High Performing Technology Organizations (Traducción no oficial)
{{% /notice %}}

Nosotros, [los abajo firmantes](../../minimumcd/#signatories), creemos que se requiere una definición mínima de entrega continua (CD por sus siglas en inglés) para mejorar el flujo de entrega y lograr los resultados anteriores. Si bien nuestros contextos pueden ser diferentes, existen prácticas universales. Al definirlos podemos:

- Introducir a los nuevos profesionales de forma coherente
- Discutir las prácticas de ingeniería que abarca CD
- Ayudarnos mutuamente a mejorar las capacidades actuales

Solo mediante la implementación de prácticas básicas comenzamos a ver los beneficios de la entrega continua.

Las prácticas mencionadas a continuación son el mínimo, un punto de partida. La mejora continua de la velocidad, calidad y seguridad del pipeline de entrega es el resultado esperado.

---

## Entrega Continua

CD es la disciplina de ingeniería que consiste en realizar todos los cambios de manera estándar y segura. Cubre un amplio espectro de actividades dependiendo de lo que se esté entregando. Sin embargo, hay comportamientos y habilidades que deben cumplirse en todos los contextos para calificar como "entrega continua".

Las actividades mínimas requeridas para CD son:

- [Integración continua](#integración-continua).
- El [pipeline de la aplicación](https://www.informit.com/articles/article.aspx?p=1621865&seqNum=2#:~:text=%EE%94%80Buy-,What%20Is%20a%20Deployment%20Pipeline%3F,-At%20an%20abstract) es el único camino para desplegar en producción.
- El pipeline decide la posibilidad de entrega de los cambios, el veredicto es [definitivo](../../faq/#why-should-the-pipeline-be-definitive-for-deploy).
- Los artefactos creados por el pipeline siempre cumplen los requisitos de [definición de desplegable](../../faq/#what-do-we-mean-by-definition-of-deployable) de la organización.
- [Artefacto inalterable](../../minimumcd/immutable/). No hay cambios hechos por personas después de la confirmación.
- Todo el trabajo de funcionalidades se detiene cuando el pipeline está en rojo
- Entorno de prueba similar a producción
- Revertir bajo demanda.
- La [configuración de la aplicación](../../faq/#what-is-application-configuration) se despliega con el artefacto.

## Integración Continua

Integración continua (CI por sus siglas en inglés) es la actividad de integrar muy frecuentemente el trabajo a la rama principal del control de versiones y verificar que el trabajo sea, según nuestro leal saber y entender, entregable.

Las actividades mínimas requeridas para CI son:

- [Desarrollo basado en rama principal](../../minimumcd/tbd/)
- El trabajo se integra a la rama principal como mínimo cada día
- El trabajo tiene pruebas automatizadas antes de fusionarse con la rama principal
- El trabajo se prueba con otro trabajo automáticamente al fusionarse
- Todo el trabajo de funcionalidades se detiene cuando el construcción está en rojo
- El trabajo nuevo no rompe el trabajo entregado

## Desarrollo Basado en Rama Principal

[Desarrollo Basado en Rama Principal](../../minimumcd/tbd/) (TBD por sus siglas en inglés) es el patrón de ramificación requerido para cumplir con la definición de CI. Previene el trabajo perdido, el riesgo de corrupción que proviene de la resolución de conflictos fusionados, y también reduce el desperdicio de movimiento que incrementan el volumen de cambios.

- Las actividades mínimas requeridas para TBD son:
  - Todos los cambios se integran en la rama principal
  - Si se utilizan ramas desde la rama principal:
    - Se originan en la rama principal
    - Se reintegran la rama principal
    - Son de corta duración y se eliminan después de ser funsionadas con la rama principal.

## ¿Por qué construimos esto?

Para obtener más información sobre el CD mínimo y respuestas a otras preguntas comunes, por favor [lea las preguntas más frecuentes](../../faq/).

## ¿Quieres contribuir?

Lee nuestra [pauta de contribución](https://github.com/Minimum-CD/cd-manifesto/blob/master/CONTRIBUTING.md).

## Firmantes

Los firmantes avalan la [versión original en inglés](../../minimumcd/#signatories) y la lista actual de nombres solo se publica con esa versión.

## Traducción

Esta traducción es un esfuerzo de la comunidad para ayudar a transmitir esta información más allá de las barreras lingüísticas. Los firmantes mismos no pueden confirmar la exactitud de la traducción.

Traducido de la versión del documento: _dfc3ab8_, _2021-11-04_
