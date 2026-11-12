# Historias de usuario

## HU-01: Reservar fecha, horario y pasajeros

Fuente: `docs/arquitectura-base-reserva-transporte.md`, sección "3. Reservar".

### Historia

**Como** turista que visita la Región de Los Ríos,
**quiero** elegir la fecha, el horario de salida y la cantidad de pasajeros de una ruta, viendo el precio total mientras elijo,
**para** asegurar mi cupo sabiendo cuánto voy a pagar antes de dejar mis datos de contacto.

### Qué queda ambiguo en la descripción actual

**Fecha**
1. ¿El límite de 90 días incluye el día 90? ¿Se cuenta desde hoy?
2. ¿Qué hora manda para decidir qué es "hoy": la del teléfono o la de Chile? Un turista extranjero puede tener el teléfono en otra zona horaria.
3. El input nativo permite escribir una fecha a mano en algunos navegadores. ¿Qué pasa si se escribe una fecha pasada o fuera de rango?
4. ¿Hay días sin salidas (por clima, feriados, un día de descanso)? No se menciona.

**Horario**
5. ¿Cuándo un horario "ya pasó": a la hora exacta de salida o con un margen antes (por ejemplo, 30 minutos para llegar al muelle)?
6. Si el usuario elige un horario y después cambia la fecha a hoy, y ese horario ya pasó, ¿se deselecciona solo?
7. Si hoy ya pasaron todos los horarios, ¿se muestra algún mensaje o solo se ven todos deshabilitados?

**Pasajeros**
8. El máximo depende de los cupos "del horario elegido", pero antes de elegir horario no hay horario. ¿Cuál es el máximo en ese momento?
9. Si el usuario sube a 15 pasajeros y luego elige un horario con menos cupos, ¿se ajusta el número hacia abajo? Con el mock actual todos los horarios tienen 20, pero la regla debería estar escrita.
10. ¿El selector es con botones + y −, un campo para escribir, o ambos?

**Precio**
11. ¿Qué precio se muestra al entrar, antes de elegir nada? ¿$0, el de 1 pasajero, o nada?

**Navegación**
12. Las selecciones se conservan al volver desde Datos de contacto. ¿Y si el usuario va a la pestaña Reservas y vuelve, o elige otra ruta desde Inicio? ¿Se mantienen o parten de cero?

**Fuera de alcance, pero aparece en el boceto**
13. El boceto muestra "Adultos ($25.000 c/u)" y "Martes despejado" (clima). La arquitectura dice que no hay tipos de pasajero y no habla de clima. Se sigue la arquitectura.

### Supuestos propuestos

Para no frenar la construcción, se proponen estos supuestos. Si alguno no calza, se corrige aquí antes de construir.

- **Hoy y la hora actual** se toman del reloj del dispositivo.
- **Rango de fechas:** desde hoy hasta hoy + 90 días, ambos incluidos.
- **Horario pasado:** un horario de hoy se deshabilita cuando la hora actual es igual o posterior a la hora de salida. Sin margen.
- **Cambio de fecha:** si el horario elegido queda deshabilitado con la nueva fecha, se deselecciona.
- **Pasajeros:** botones − y +, valor inicial 1. Sin horario elegido, el máximo es `cuposPorHorario` de la ruta. Si el valor supera el máximo del horario elegido, se ajusta al máximo.
- **Precio inicial:** se muestra el total para 1 pasajero ($25.000 en la ruta de ejemplo).
- **Conservar selecciones:** se conservan mientras el usuario esté reservando la misma ruta (volver desde Datos de contacto, o ir a Reservas y volver). Si entra a Reservar desde otra ruta, parte de cero.
- **Sin salidas en el día:** si hoy ya pasaron todos los horarios, se ven todos deshabilitados y el usuario puede elegir otra fecha. Sin mensaje extra.

### Criterios de aceptación

**CA-1. Rango de fechas**
Dado que estoy en Reservar,
cuando abro el calendario de fecha,
entonces solo puedo elegir desde hoy hasta hoy + 90 días (ambos incluidos), y si ingreso una fecha fuera de ese rango no queda como fecha válida y "Continuar" sigue deshabilitado.

**CA-2. Horarios ya pasados**
Dado que elegí la fecha de hoy y son las 13:30,
cuando miro los chips de horario de una ruta con salidas 10:00, 13:00 y 16:00,
entonces 10:00 y 13:00 aparecen deshabilitados y no se pueden seleccionar, y 16:00 sí se puede. Si elijo cualquier otra fecha, los tres están habilitados.

**CA-3. Límites de pasajeros**
Dado que elegí un horario con 20 cupos,
cuando uso el selector de pasajeros,
entonces parte en 1, el botón − está deshabilitado en 1 y el botón + está deshabilitado en 20.

**CA-4. Precio total en vivo**
Dado que la ruta cuesta $25.000 por persona,
cuando cambio la cantidad de pasajeros a 3,
entonces el total muestra `$75.000` de inmediato, en CLP, con punto de miles, sin decimales y sin desglose. Al entrar a la pantalla, el total muestra `$25.000`.

**CA-5. Habilitación de "Continuar"**
Dado que estoy en Reservar,
cuando no he elegido fecha u horario,
entonces "Continuar" (ancho 100%) está deshabilitado. Cuando elijo una fecha válida y un horario habilitado, se habilita y me lleva a Datos de contacto.

**CA-6. Selecciones conservadas al volver**
Dado que elegí fecha, horario y 4 pasajeros y pasé a Datos de contacto,
cuando vuelvo atrás a Reservar,
entonces la fecha, el horario, los 4 pasajeros y el total siguen tal como los dejé.
