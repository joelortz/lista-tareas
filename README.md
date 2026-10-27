# Lista de Tareas — MVC con TypeScript

Aplicación para gestionar tareas personales, construida con el patrón **Modelo-Vista-Controlador (MVC)** en **TypeScript**, sin frameworks ni librerías externas.

## Mejoras del Parcial 2

Sobre la base del Laboratorio #2 (registrar, listar, buscar, eliminar), se agregaron:

- **Prioridad por tarea** (alta/media/baja), seleccionable al crear o editar, visible en cada tarjeta como una etiqueta de color.
- **Fecha límite**, con un campo de tipo fecha en el formulario.
- **Tareas vencidas en rojo** (reto adicional): si una tarea no está completada y su fecha límite ya pasó, su tarjeta se resalta con un borde rojo y el título en rojo oscuro. Una tarea completada nunca se marca como vencida, aunque la fecha haya pasado.
- **Editar tareas existentes**: el botón "Editar" carga los datos de la tarea en el formulario y cambia el texto del botón principal a "Actualizar tarea". Al enviar, actualiza la tarea en vez de crear una nueva.
- **Ordenar** por título, fecha límite o prioridad, mediante un `<select>` que se combina con el filtro y la búsqueda activos.
- **Filtro por estado**: todas, pendientes o completadas.
- **Marcar como completada/pendiente**, con un botón que alterna el estado de cada tarea.
- **Contador de tareas pendientes**, actualizado en tiempo real.
- **Persistencia con `localStorage`** a través de una clase `StorageService` dedicada, que separa el guardado del resto del Model.

## Funcionalidades del Lab (base)

- Registrar tareas con título y descripción (la descripción es opcional).
- Listar tareas en tarjetas.
- Buscar tareas por título, en tiempo real.
- Eliminar tareas con ventana de confirmación del navegador.
- Validación: el título es obligatorio; si está vacío, se muestra un mensaje de error.

## Arquitectura

El proyecto sigue MVC estrictamente:

- **Model** (`src/models/`): `Task.ts` define la forma de los datos. `TaskModel.ts` contiene toda la lógica de negocio: agregar, listar, eliminar, buscar, filtrar, ordenar, actualizar, alternar estado y calcular si una tarea está vencida. Delega el guardado en `StorageService`.
- **View** (`src/views/`): `TaskView.ts` no contiene lógica de negocio. Solo lee el formulario, dibuja las tarjetas (incluyendo si están vencidas, dato que recibe ya calculado del Controller) y escucha eventos del DOM, delegando cada acción del usuario a una función que le pasa el Controller.
- **Controller** (`src/controllers/`): `TaskController.ts` conecta Model y View. Mantiene el estado actual de búsqueda, filtro y orden, y los combina en un único método `refresh()` cada vez que algo cambia.
- **Service** (`src/services/`): `StorageService.ts` encapsula el acceso a `localStorage`.

src/
├── models/
│ ├── Task.ts
│ └── TaskModel.ts
├── views/
│ └── TaskView.ts
├── controllers/
│ └── TaskController.ts
├── services/
│ └── StorageService.ts
├── styles/
│ └── styles.css
└── main.ts


## Decisiones técnicas

- **Imports con extensión `.js`**: como el proyecto corre con módulos nativos del navegador (`<script type="module">`), sin empaquetador, los imports entre archivos `.ts` deben escribirse con extensión `.js`.
- **Descripción opcional**: el campo existe siempre en la interfaz `Task` como `string`, pero el formulario no lo exige.
- **Fecha como `string`**: se guarda en formato `AAAA-MM-DD`, igual que lo entrega un `<input type="date">`. Esto permite comparar fechas como texto directamente (por ejemplo para ordenar o detectar vencidas), porque ese formato ordena correctamente de forma alfabética.
- **Modo edición sin duplicar formularios**: en vez de un formulario aparte para editar, se reutiliza el mismo formulario de agregar. La Vista guarda el `id` de la tarea en edición (`editingId`); si es `null`, el envío crea una tarea nueva, si tiene un valor, actualiza esa tarea.
- **Controller centraliza el estado de la lista visible**: búsqueda, filtro de estado y orden se guardan como propiedades del Controller y se combinan en `refresh()`, en vez de que cada acción redibuje la lista de forma aislada.

## Cómo ejecutar

```bash
npm install
npx tsc
```

Luego abrir `index.html` con una extensión de servidor local (como Live Server de VS Code).