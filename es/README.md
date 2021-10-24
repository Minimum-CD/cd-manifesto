# Minimum Viable Continuous Delivery

> "La entrega continua mejora el rendimiento de entrega y la calidad también ayda a mejorar la cultura, reduce el agotamiento y el dolor de la implementación."

-- Accelerate (Unofficial translation)

Nosotros, los abajo firmantes, creemos que se requiere una definición mínima de entrega continua (CD por sus siglas en inglés) para mejorar el flujo de entrega. Si bien nuestros contextos pueden ser diferentes, existen prácticas universales. Al definirlos podemos:

- Introducir a los nuevos profesionales de forma coherente
- Discutir las prácticas de ingeniería que abarca CD
- Ayudarse mutuamente a mejorar las capacidades actuales

Solo mediante la implementación de prácticas básicas comenzamos a ver los beneficios de CD.

Las siguientes prácticas son el requerimiento mínimo, un punto de partida. El resultado esperado es la mejora continua de la velocidad, la calidad y la seguridad de el pipeline. 

---

## Entrega Continua

La Entrega Continua (CD) es la disciplina de ingeniería que consiste en realizar todos los cambios de forma estándar y segura. Cubre un amplio espectro de actividades dependiendo de lo que se entregue. Sin embargo, hay comportamientos y habilidades que deben cumplirse en todos los contextos para calificar como "entrega continua".

Las actividades mínimas requeridas para la entrega continua son:

- [Integración continua](#integración-continua).
- El [pipeline de la aplicación](https://www.informit.com/articles/article.aspx?p=1621865&seqNum=2#:~:text=%EE%94%80Buy-,What%20Is%20a%20Deployment%20Pipeline%3F,-At%20an%20abstract) es la unica forma de  implementar cambios en producción.
- El pipeline decide la posibilidad de publicación de los cambios, su veredicto es [definitivo](../faq.md#why-should-the-pipeline-be-definitive-for-deploy).
- Los artefactos creados por el pipeline siempre cumplen con la [definición de implementable](../faq.md#what-do-we-mean-by-definition-of-deployable).
- [Artefacto inmutable](../faq#what-is-an-immutable-artifact). No hay cambios hechos por personas después de la confirmación.
- Todo el trabajo de funciones se detiene cuando el pipeline está en rojo.
- Entorno de prueba similar a Producción.
- Revertir bajo demanda.
- [Configuración de la aplicación](../faq.md#what-is-application-configuration) se implementa junto con el artefacto.

## Integración Continua

Integración continua (CI por sus siglas en inglés) es la actividad de integrar muy frecuentemente el trabajo a la rama principal del controlador de versiones y verificar que el trabajo sea, según nuestro leal saber y entender, liberable.

Las actividades mínimas requeridas para CI son:

- [Desarrollo basado en rama principal](https://trunkbaseddevelopment.com/)
- El trabajo se integra al tronco pricipal al menos ua vez al día
- El trabajo tiene pruebas automatizadas antes de fusionarse con el tronco
- El trabajo se prueba con otro trabajo automáticamente despues de ser incorporado
- Todo el trabajo de funciones se detiene cuando el build esta en estaro rojo
- El trabajo nuevo no quiebra el trabajo entregado 

## Desarrollo Basado en Tronco

[Desarrollo Basado en Tronco](https://trunkbaseddevelopment.com/) (TBD por sus siglas en inglés) es el patrón de ramificación requerido para cumplir con la definición de CI. Previene el trabajo perdido, el riesgo de corrupción que proviene de la resolución de conflictos fusionados, y también reduce los residuo causados por el movimiento que aumentan el volumen de los cambios.

- Las actividades mínimas requeridas para TBD son:
   - Todos los cambios se integran en el tronco
   - Si se utilizan ramas del tronco:
     - Se originan en el tronco
     - Se reintegran al tronco
     - Son de corta duración y se eliminan después de ser reintegrados con el tronco.

## Más allá de los mínimos

El Mínimo CD no es el primer paso en un modelo de madurez. Sin embargo, sigue siendo el mínimo básico sobre el que se deben construir muchas más prácticas según corresponda a su contexto. Para ayudar en el trayecto para ir más allá del Mínimo CD, mantenemos una lista de recursos que se enfocan en la Entrega Continua que hemos encontrado muy útil en nuestros propios viajes.

Estos contienen los conceptos básicos, pero también los conocimientos necesarios para convertirse en una organización de CD "Elite". Son específicos para resolver el problema de "¿por qué no podemos ir a producción hoy?"

[Lea la lista](../referencias.md) 

## ¿Por qué construimos esto?

Para obtener más información sobre el CD mínimo y respuestas a otras preguntas comunes, [lea las preguntas frecuentes](../faq.md).

Los signatarios han firmado la [versión original en inglés](../README.md/#sigatories) y la lista actual de nombres se publica solo con esa versión.

## Traducción

Esta traducción es un esfuerzo de la comunidad para ayudar a transmitir esta información más allá de las barrera lingüísticas. Los firmantes mismos no pueden confirmar la exactitud de la traducción.

Traducido de la versión del documento: _8ee5abb_, _2021-10-24_
