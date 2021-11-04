---
title: Español
description: "Mínima Entrega Continua Viable"
weight: 3
---

## Mínima Entrega Continua Viable

{{% notice %}}
"La entrega continua mejora tanto, el rendimiento de entrega como la calidad además ayuda a mejorar la cultura, reduce el agotamiento y la dificultad de la implementación."

-- Accelerate: The Science of Lean Software and DevOps: Building and Scaling High Performing Technology Organizations (Traducción no oficial)
{{% /notice %}}


Nosotros, [los abajo firmantes](../../minimumcd/signatures/), creemos que se requiere una definición mínima de entrega continua (CD por sus siglas en inglés) para mejorar el flujo de entrega y lograr el resultado mencionado. Si bien nuestros contextos pueden ser diferentes, existen prácticas universales. Al definirlos podemos:

- Introducir a los nuevos profesionales de manera específica y clara
- Hablar sobre las prácticas de ingeniería que abarca CD
- Ayudarnos mutuamente a mejorar las capacidades actuales

Solo mediante la implementación de prácticas básicas podemos ver los beneficios de CD.

Las prácticas mencionadas a continuación son el requerimiento mínimo, el punto de partida. El resultado esperado es la mejora continua en la velocidad, la calidad y la seguridad del pipeline. 

---

## Entrega Continua

La Entrega Continua (CD) es la disciplina de ingeniería que consiste en realizar todos los cambios de manera estandarizada y segura. Cubre un amplio espectro de actividades dependiendo de lo que se esté entregando. Sin embargo, hay comportamientos y habilidades que deben cumplirse en cada contexto para calificar como "entrega continua".

Las actividades mínimas requeridas para la entrega continua son:

- [Integración continua](#integración-continua).
- El [pipeline de la aplicación](https://www.informit.com/articles/article.aspx?p=1621865&seqNum=2#:~:text=%EE%94%80Buy-,What%20Is%20a%20Deployment%20Pipeline%3F,-At%20an%20abstract) es la única manera de  implementar cambios en Producción.
- El pipeline determina la posibilidad de aplicar los cambios de los cambios, el veredicto es [definitivo](../../faq/#why-should-the-pipeline-be-definitive-for-deploy).
- Los dispositivos creados por el pipeline siempre cumplen con la [definición de implementable](../../faq/#what-do-we-mean-by-definition-of-deployable).
- [Dispositivo inalterable](../../faq/#what-is-an-immutable-artifact). No hay cambios hechos por personas después de la confirmación.
- Todo el trabajo sobre funcionalidad se detiene cuando el pipeline está en rojo. La prioridad en el momento es restaurar el pipeline. 
- El Ambiente de prueba similar a Producción.
- Revertir bajo demanda.
- La [configuración de la aplicación](../../faq/#what-is-application-configuration) se implementa junto con el dispositivo.

## Integración Continua

Integración continua (CI por sus siglas en inglés) es la actividad de integrar muy frecuentemente el trabajo a la rama principal del controlador de versiones y verificar que el trabajo que entregamos sea nuestra mejor versión existente, según nuestro leal saber y entender, implementable.

Las actividades mínimas requeridas para CI son:

- [Desarrollo basado en rama principal](https://trunkbaseddevelopment.com/)
- El trabajo se integra al tronco principal como mínimo una vez al día
- El trabajo tiene pruebas automatizadas antes de fusionarse con el tronco
- El trabajo se prueba con otro trabajo automáticamente después de ser incorporado
- Todo el trabajo de funciones se detiene cuando el pipeline está en estado rojo
- El trabajo nuevo no quiebra el trabajo ya entregado 

## Desarrollo Basado en Tronco

[Desarrollo Basado en Tronco](https://trunkbaseddevelopment.com/) (TBD por sus siglas en inglés) es el patrón de ramificación requerido para cumplir con la definición de CI. Previene el trabajo perdido, el riesgo de corrupción que proviene de la resolución de conflictos fusionados, y también reduce los residuos causados por el movimiento que aumentan el volumen de los cambios.

- Las actividades mínimas requeridas para TBD son:
   - Todos los cambios se integran en el tronco
   - Si se utilizan ramas del tronco:
     - Se originan en el tronco
     - Se reintegran al tronco
     - Son de corta duración y se eliminan después de ser reintegrados con el tronco.

## ¿Por qué construimos esto?

Para obtener más información sobre el CD mínimo y respuestas a otras preguntas comunes, [lea las preguntas más  frecuentes](../../faq).

## ¿Quieres contribuir?

Lee la [pauta de contribución](https://github.com/Minimum-CD/cd-manifesto/blob/master/CONTRIBUTING.md).

## Firmantes

Los firmantes avalan la [versión original en inglés](../../minimumcd#signatories) y la lista actual de nombres se publica solo con esa versión.

## Traducción

Esta traducción es un esfuerzo de la comunidad para ayudar a transmitir esta información más allá de las barreras lingüísticas. Los firmantes mismos no pueden confirmar la exactitud de la traducción.

Traducido de la versión del documento: _dfc3ab8_, _2021-11-04_
