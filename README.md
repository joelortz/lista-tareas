# Lista de Tareas — MVC con TypeScript

Aplicación para gestionar tareas personales, construida con el patrón **Modelo-Vista-Controlador (MVC)** en **TypeScript**, sin frameworks ni librerías externas.

##  Mejoras del Parcial 2

Sobre la base del Laboratorio #2 (registrar, listar, buscar, eliminar), se agregaron:

- **Prioridad por tarea** (alta/media/baja), seleccionable al crear la tarea y visible en cada tarjeta.
- **Filtro por estado**: todas, pendientes o completadas, mediante un `<select>` que redibuja la lista sin recargar la página.
- **Contador de tareas pendientes**, actualizado en tiempo real cada vez que se agrega o elimina una tarea.
- **Persistencia con `localStorage`** a través de una clase `StorageService` dedicada, que separa la lógica de guardado del resto del Model. Las tareas sobreviven a recargar la página.

##  Funcionalidades del Lab (base)

- Registrar tareas con título y descripción (la descripción es opcional).
- Listar tareas en tarjetas.
- Buscar tareas por título, en tiempo real.
- Eliminar tareas con ventana de confirmación del navegador.
- Validación: el título es obligatorio; si está vacío, se muestra un mensaje de error.

##  Arquitectura

El proyecto sigue MVC estrictamente:

- **Model** (`src/models/`): `Task.ts` define la forma de los datos. `TaskModel.ts` contiene la lógica de negocio: agregar, listar, eliminar, buscar y filtrar tareas, y delega el guardado en `StorageService`.
- **View** (`src/views/`): `TaskView.ts` no contiene lógica de negocio. Solo lee el formulario, dibuja las tarjetas y escucha eventos del DOM, delegando cada acción del usuario a una función que le pasa el Controller.
- **Controller** (`src/controllers/`): `TaskController.ts` conecta Model y View. Valida los datos antes de pasarlos al Model y decide qué debe redibujar la View después de cada cambio.
- **Service** (`src/services/`): `StorageService.ts` encapsula el acceso a `localStorage`, para que si el mecanismo de guardado cambiara en el futuro (por ejemplo a una API), solo este archivo necesitaría modificarse.

src/
├── models/
│   ├── Task.ts
│   └── TaskModel.ts
├── views/
│   └── TaskView.ts
├── controllers/
│   └── TaskController.ts
├── services/
│   └── StorageService.ts
├── styles/
│   └── styles.css
└── main.ts

##  Decisiones técnicas

- **Imports con extensión `.js`**: como el proyecto corre con módulos nativos del navegador (`<script type="module">`), sin empaquetador (Vite, Webpack), los imports entre archivos `.ts` deben escribirse con extensión `.js` (por ejemplo `import { Task } from './Task.js'`), porque así es como el navegador los resuelve una vez compilados.
- **Descripción opcional**: el campo existe siempre en la interfaz `Task` como `string` (no `string | undefined`), pero el formulario no lo exige. Si el usuario no escribe nada, se guarda como texto vacío.
- **`verbatimModuleSyntax`**: los imports que solo traen una interfaz (como `Task`) usan `import type`, porque la interfaz no existe en el JavaScript compilado, solo sirve para revisar tipos en desarrollo.

##  Cómo ejecutar

```bash
npm install
npx tsc
```

Luego abrir `index.html` con una extensión de servidor local (como Live Server de VS Code).

##  Próximos pasos

Quedan pendientes de los requerimientos del Parcial 2: fecha límite, edición de tareas existentes, ordenamiento por prioridad o fecha, y marcar tareas vencidas en rojo.
