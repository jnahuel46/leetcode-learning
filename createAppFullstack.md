# Code Challenge — Live Coding Guide
## React Vite + NestJS con Claude Code

---

## Antes de arrancar: mentalidad

El entrevistador ve tu pantalla en tiempo real. Lo que evalúa no es si terminás el feature — es cómo pensás, cómo dirigís la herramienta, y si podés explicar lo que hacés. Hablá mientras trabajás. Silencio + código es la peor señal.

---

## Setup de emergencia — memorizá esto

### Backend — NestJS

```bash
npm i -g @nestjs/cli
nest new backend --skip-git
cd backend
npm run start:dev
```

Estructura que genera Nest automáticamente:
```
backend/
  src/
    app.module.ts       ← módulo raíz
    app.controller.ts   ← controlador de ejemplo (podés borrarlo)
    app.service.ts      ← servicio de ejemplo
    main.ts             ← entry point, puerto 3000
```

Agregar CORS en `main.ts` (siempre lo vas a necesitar):
```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'http://localhost:5173' }); // puerto de Vite
  await app.listen(3000);
}
```

Crear un módulo nuevo (el patrón que vas a repetir):
```bash
nest generate module tasks
nest generate controller tasks
nest generate service tasks
```

### Backend — Express (alternativa más liviana)

Usá Express cuando el challenge no especifica el framework o querés menos boilerplate. Es más manual que NestJS pero más rápido de entender para el entrevistador.

```bash
mkdir backend && cd backend
npm init -y
npm install express cors
npm install -D typescript ts-node nodemon @types/express @types/cors @types/node
npx tsc --init
```

Agregar script en `package.json`:
```json
"scripts": {
  "dev": "nodemon --exec ts-node src/index.ts"
}
```

Estructura mínima (la creás a mano):
```
backend/
  src/
    index.ts          ← entry point, CORS, app.listen
    routes/
      tasks.ts        ← todas las rutas del recurso
    services/
      tasks.service.ts ← lógica de negocio
```

Entry point `src/index.ts`:
```typescript
import express from 'express';
import cors from 'cors';
import tasksRouter from './routes/tasks';

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use('/tasks', tasksRouter);

app.listen(3000, () => console.log('Server on port 3000'));
```

Patrón de rutas `src/routes/tasks.ts`:
```typescript
import { Router } from 'express';
import * as tasksService from '../services/tasks.service';

const router = Router();

router.get('/', (req, res) => {
  res.json(tasksService.findAll());
});

router.post('/', (req, res) => {
  const task = tasksService.create(req.body);
  res.status(201).json(task);
});

router.patch('/:id', (req, res) => {
  const task = tasksService.update(Number(req.params.id), req.body);
  if (!task) return res.status(404).json({ message: 'Not found' });
  res.json(task);
});

router.delete('/:id', (req, res) => {
  tasksService.remove(Number(req.params.id));
  res.status(204).send();
});

export default router;
```

Servicio en memoria `src/services/tasks.service.ts` (para el primer paso del challenge, sin DB):
```typescript
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

let tasks: Task[] = [];
let nextId = 1;

export const findAll = () => tasks;

export const create = (dto: { title: string }): Task => {
  const task = { id: nextId++, title: dto.title, completed: false };
  tasks.push(task);
  return task;
};

export const update = (id: number, dto: Partial<Task>): Task | undefined => {
  const task = tasks.find(t => t.id === id);
  if (!task) return undefined;
  Object.assign(task, dto);
  return task;
};

export const remove = (id: number) => {
  tasks = tasks.filter(t => t.id !== id);
};
```

### Base de datos con Express — Prisma (más simple que TypeORM)

```bash
npm install prisma @prisma/client
npx prisma init --datasource-provider sqlite
```

Definir schema en `prisma/schema.prisma`:
```prisma
model Task {
  id        Int      @id @default(autoincrement())
  title     String
  completed Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

```bash
npx prisma migrate dev --name init   # crea la DB y las tablas
```

Usar Prisma en el servicio:
```typescript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const findAll = () => prisma.task.findMany();
export const create = (dto: { title: string }) => prisma.task.create({ data: dto });
export const update = (id: number, dto: Partial<Task>) =>
  prisma.task.update({ where: { id }, data: dto });
export const remove = (id: number) => prisma.task.delete({ where: { id } });
```

### ¿NestJS o Express? — decidilo en los primeros 2 minutos

| | NestJS | Express |
|---|---|---|
| Setup | CLI genera todo | Manual, más código |
| Estructura | Impuesta (módulos) | Libre |
| Señal que da | "Conozco patrones enterprise" | "Entiendo los fundamentos" |
| Cuándo elegirlo | Si el enunciado lo pide o querés impresionar con estructura | Si querés velocidad o el entrevistador no especificó |

Decilo en voz alta: *"Voy a usar Express porque es más directo para un challenge de esta escala, aunque en producción preferiría NestJS por la estructura que impone."*

---

### Prompt de Claude Code para generar el backend Express completo

```
Create an Express + TypeScript backend for a task manager with:
- Entry point src/index.ts with CORS (origin: http://localhost:5173) and express.json()
- Routes in src/routes/tasks.ts: GET /tasks, POST /tasks, PATCH /tasks/:id, DELETE /tasks/:id
- Service in src/services/tasks.service.ts using Prisma
- Prisma schema with Task model: id (autoincrement), title (String), completed (Boolean default false), createdAt (DateTime default now)
- SQLite database
Keep it simple, no auth, no validation library.
```

---

### Frontend — React Vite

```bash
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
npm run dev   # corre en localhost:5173
```

Instalar lo mínimo útil:
```bash
npm install axios
```

### Base de datos — SQLite con TypeORM (el más rápido de levantar en un challenge)

```bash
npm install @nestjs/typeorm typeorm better-sqlite3
npm install -D @types/better-sqlite3
```

Configuración en `app.module.ts`:
```typescript
TypeOrmModule.forRoot({
  type: 'better-sqlite3',
  database: 'db.sqlite',
  autoLoadEntities: true,
  synchronize: true,   // crea las tablas automáticamente — solo para dev/challenge
})
```

> Si el entrevistador pide PostgreSQL: cambiar `type: 'better-sqlite3'` por `type: 'postgres'` y agregar host/port/user/password. La lógica de NestJS no cambia.

---

## El patrón NestJS que vas a repetir siempre

Todo en NestJS sigue la misma estructura: Module → Controller → Service → Entity. Entendé este ciclo y podés construir cualquier feature.

```
Request HTTP
    ↓
Controller  → recibe el request, valida con DTOs, llama al service
    ↓
Service     → lógica de negocio, llama al repository
    ↓
Repository  → interactúa con la DB (TypeORM lo genera automáticamente)
    ↓
Entity      → define la tabla
```

### Entity (define la tabla)
```typescript
@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  completed: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
```

### DTO (valida el input — instalá class-validator)
```bash
npm install class-validator class-transformer
```

```typescript
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
```

Activar validación global en `main.ts`:
```typescript
app.useGlobalPipes(new ValidationPipe());
```

### Controller
```typescript
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() { return this.tasksService.findAll(); }

  @Post()
  create(@Body() dto: CreateTaskDto) { return this.tasksService.create(dto); }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.tasksService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.tasksService.remove(+id); }
}
```

### Service
```typescript
@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private repo: Repository<Task>) {}

  findAll() { return this.repo.find(); }

  create(dto: CreateTaskDto) { return this.repo.save(this.repo.create(dto)); }

  async update(id: number, dto: UpdateTaskDto) {
    await this.repo.update(id, dto);
    return this.repo.findOneBy({ id });
  }

  remove(id: number) { return this.repo.delete(id); }
}
```

---

## Prompts efectivos para Claude Code en el challenge

### Para generar un módulo completo

```
Create a NestJS module called "tasks" with:
- Entity: id (auto), title (string), completed (boolean default false), createdAt
- DTOs: CreateTaskDto with class-validator, UpdateTaskDto (partial)
- Service: findAll, create, update (partial), remove using TypeORM repository
- Controller: GET /tasks, POST /tasks, PATCH /tasks/:id, DELETE /tasks/:id
- Register everything in TasksModule and import in AppModule
Use TypeORM with SQLite (better-sqlite3). Keep it simple, no auth.
```

### Para generar el frontend de un feature

```
Create a React component TaskList.tsx that:
- Fetches GET http://localhost:3000/tasks on mount with axios
- Displays tasks in a list with title and a checkbox for completed
- Has a form with a text input + submit button to POST a new task
- On checkbox change, sends PATCH /tasks/:id with { completed: boolean }
- Uses useState and useEffect only, no external state library
- TypeScript types matching: { id: number, title: string, completed: boolean }
```

### Para iterar sobre algo que ya existe

```
The current TasksService.findAll() returns all tasks. 
Modify it to accept an optional query param "completed" (boolean).
If provided, filter by that value. If not provided, return all.
Add the query param handling in the controller too.
```

---

## Ejemplo completo de challenge: Task Manager

### El enunciado típico

> "Construí una aplicación de gestión de tareas. El usuario puede ver una lista de tareas, crear nuevas, marcarlas como completadas y eliminarlas."

### Cómo atacarlo — orden de ejecución

**Fase 1 (sin IA, primeros 15-20 min): Estructura y contratos**

Antes de escribir código, decí en voz alta:

*"Voy a arrancar definiendo el contrato de la API — qué endpoints necesito y qué forma tienen los datos. Después levanto el backend, luego el frontend."*

Endpoints que necesitás:
```
GET    /tasks           → { id, title, completed, createdAt }[]
POST   /tasks           → body: { title }  → devuelve la task creada
PATCH  /tasks/:id       → body: { completed }  → devuelve la task actualizada
DELETE /tasks/:id       → 204 No Content
```

Orden de construcción:
1. Levantar NestJS con el setup mínimo
2. Crear el módulo tasks con Entity + Service + Controller
3. Verificar que los endpoints responden (con curl o Postman)
4. Levantar React Vite
5. Conectar frontend al backend
6. Hacer funcionar el happy path completo

**Fase 2 (con IA): Iteraciones**

El entrevistador va a agregar requisitos. Los más comunes:

---

### Iteración 1 — Filtros

*"Agregá la posibilidad de filtrar tareas por estado: todas, pendientes, completadas."*

Lo que cambia en el backend:
```typescript
// Controller
@Get()
findAll(@Query('status') status?: 'pending' | 'done') {
  return this.tasksService.findAll(status);
}

// Service
findAll(status?: string) {
  if (status === 'pending') return this.repo.findBy({ completed: false });
  if (status === 'done') return this.repo.findBy({ completed: true });
  return this.repo.find();
}
```

Lo que cambia en el frontend: tres botones (Todas / Pendientes / Completadas) que pasan el query param al fetch.

---

### Iteración 2 — Prioridad

*"Las tareas ahora tienen prioridad: low, medium, high."*

Lo que cambia:
- Agregar `priority: 'low' | 'medium' | 'high'` a la Entity
- Agregar al CreateTaskDto con `@IsIn(['low', 'medium', 'high'])`
- En el frontend: un select en el form

Cómo decirlo en voz alta:
*"Voy a agregar la columna a la entity. Con `synchronize: true` TypeORM actualiza la tabla automáticamente, así que no necesito correr una migración en este entorno."*

---

### Iteración 3 — Ordenamiento

*"Mostrá las tareas ordenadas por prioridad: high primero."*

```typescript
findAll() {
  return this.repo.find({
    order: {
      priority: 'DESC',   // high > medium > low alfabéticamente no funciona
    }
  });
}
```

Acá hay un gotcha: `high/medium/low` ordenados alfabéticamente no dan el resultado correcto. La respuesta senior es mencionarlo:

*"Ordenar por el string directamente no va a funcionar porque alfabéticamente 'low' viene antes que 'medium'. Tenemos dos opciones: guardar un número de prioridad (1/2/3) o hacer el ordenamiento en el servicio en memoria. Para este challenge lo hago en memoria para no cambiar el schema."*

```typescript
const priorityOrder = { high: 3, medium: 2, low: 1 };
const tasks = await this.repo.find();
return tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
```

---

### Iteración 4 — Búsqueda

*"Agregá un input de búsqueda que filtre por título."*

Backend:
```typescript
// Con TypeORM y Like
import { Like } from 'typeorm';

findAll(search?: string) {
  if (search) return this.repo.findBy({ title: Like(`%${search}%`) });
  return this.repo.find();
}
```

Frontend: input controlado con debounce de 300ms para no hacer un request por cada tecla.

---

### Iteración 5 — La que rompe tu diseño inicial (la más importante)

*"Ahora necesitamos que múltiples usuarios puedan tener sus propias listas. Cada tarea pertenece a un usuario."*

Esto es un cambio de schema. Cómo responder:

*"Esto implica agregar una relación ManyToOne entre Task y User. Voy a necesitar una entidad User, modificar Task para agregar el userId, y cambiar todos los endpoints para filtrar por usuario. ¿Querés que agregue autenticación real o simulamos el userId como un header por ahora para mantener el foco en la relación de datos?"*

Esa pregunta muestra pensamiento senior: identificás el impacto, proponés una solución pragmática y pedís claridad antes de escribir código.

---

## Señales que impresionan al entrevistador

**Hacer antes de que te pidan:**
- Validar inputs en el backend (class-validator)
- Manejar el caso de "task no encontrada" con una excepción clara (`NotFoundException`)
- Loading state en el frontend mientras carga
- No dejar el servidor crashear si falla un request

**Decir en voz alta:**
- *"Voy a agregar un NotFoundException acá por si el id no existe, en lugar de devolver null silenciosamente."*
- *"Este endpoint no tiene validación todavía — lo dejo marcado para la siguiente iteración."*
- *"Le voy a pedir a Claude que genere el boilerplate del DTO, pero voy a revisar que los decoradores sean correctos para nuestro caso."*

**Cuando algo no funciona:**
- No entrar en pánico silencioso. Decir: *"El endpoint devuelve 500 — voy a ver el log del servidor."*
- Leer el error antes de preguntarle a Claude. Si lo entendés, resolverlo solo. Si no, pedirle ayuda con contexto: *"Este error de TypeORM dice X, ¿qué significa en este contexto?"*

---

## Qué practicar hasta el día de la entrevista

### 1. El setup de memoria — cronometrado

Levantá NestJS + Vite desde cero sin mirar nada, en menos de 7 minutos. Hacelo 3 veces hasta que sea automático. El nerviosismo del live coding te come el 30% de la velocidad — si el setup es muscular no te afecta.

### 2. Las iteraciones más comunes fuera del task manager

Los challenges siempre giran alrededor de los mismos patrones. Practicá estos específicamente:

**Paginación** — aparece casi siempre en la segunda o tercera iteración:
```typescript
// Controller
@Get()
findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
  return this.tasksService.findAll(+page, +limit);
}

// Service
findAll(page: number, limit: number) {
  return this.repo.find({
    skip: (page - 1) * limit,
    take: limit,
    order: { createdAt: 'DESC' },
  });
}
```

**Autenticación simulada** — pasar un `userId` por header y filtrar datos por usuario. No JWT real, solo el concepto de ownership:
```typescript
// Controller
@Get()
findAll(@Headers('x-user-id') userId: string) {
  return this.tasksService.findByUser(+userId);
}

// Service
findByUser(userId: number) {
  return this.repo.findBy({ userId });
}
```

**Relaciones entre entidades** — una tarea pertenece a un proyecto. El patrón `@ManyToOne` / `@OneToMany` bajo presión:
```typescript
// En Task entity
@ManyToOne(() => Project, project => project.tasks)
project: Project;

@Column()
projectId: number;

// En Project entity
@OneToMany(() => Task, task => task.project)
tasks: Task[];
```

**Endpoint de agregación** — "dame el conteo de tareas por estado":
```typescript
async getStats() {
  const total = await this.repo.count();
  const completed = await this.repo.countBy({ completed: true });
  return { total, completed, pending: total - completed };
}
```

### 3. Leer errores de NestJS en voz alta

NestJS tiene errores verbosos. Practicá el hábito de leer el stack trace y decir en voz alta qué significa antes de buscar solución. En live coding el silencio mientras debuggeás es incómodo — narrarlo lo rompe.

Errores comunes que vas a ver:

| Error | Causa más probable |
|---|---|
| `Cannot GET /tasks` | Ruta mal definida o módulo no registrado en AppModule |
| `EntityMetadataNotFoundError` | Entity no agregada al `TypeOrmModule.forFeature([...])` |
| `ValidationPipe` no funciona | Falta `useGlobalPipes` en main.ts o falta `class-transformer` |
| CORS error en el browser | Falta `app.enableCors()` en main.ts |

### 4. Un mini proyecto diferente al task manager

Para que el día de la entrevista no te agarren con exactamente el mismo enunciado. La idea es que el patrón Module → Controller → Service → Entity lo hagas con un dominio diferente y veas que siempre es lo mismo.

Opciones simples:
- **Sistema de notas** — Note con título, contenido, tags. Filtrar por tag.
- **Lista de productos** — Product con nombre, precio, stock. Endpoint para decrementar stock.
- **Reservas simples** — Slot con fecha/hora, disponible/ocupado. Endpoint para reservar.

### 5. Practicar los prompts de Claude Code en voz alta

Antes de tipear un prompt, decilo en voz alta. Eso te obliga a ser específico — si no podés decirlo claramente, el prompt va a ser vago. El entrevistador escucha cómo le hablás a la herramienta.

### 6. El ejercicio de los 45 minutos

Abrí una terminal limpia, sin mirar ningún doc, y construí esto:

> API de notas: crear nota (título + contenido), listar todas, filtrar por título con query param, eliminar. Frontend con React: form para crear, lista para ver, input de búsqueda.

Si lo terminás en 45 minutos estás listo. Si te trabás, identificás exactamente qué repasar.

### Lo que NO vale la pena estudiar ahora

- JWT / autenticación completa — demasiado setup para un challenge de 1-2 horas
- WebSockets — poco probable en un CRUD iterativo
- Testing — casi nunca te piden escribir tests en live coding
- Docker — el entorno ya está dado

---

## Transaccionalidad: SQL vs NoSQL

Pregunta que puede aparecer en la parte teórica o cuando el entrevistador pregunta por qué elegiste la DB.

**Para transaccionalidad: SQL sin dudas.**

SQL fue diseñado con garantías ACID como base:

| Propiedad | Qué garantiza |
|---|---|
| **Atomicity** | La operación entera se ejecuta o no. Si falla en el medio, rollback automático |
| **Consistency** | La DB siempre queda en estado válido según constraints y foreign keys |
| **Isolation** | Transacciones concurrentes no se pisan entre sí |
| **Durability** | Una vez commiteado, el dato sobrevive a un crash |

**El caso clásico:** transferencia bancaria. Descontás $100 de la cuenta A y los acreditás en la cuenta B. Si el sistema cae entre esas dos operaciones, con una transacción SQL el rollback deja todo como estaba. Sin transacción, la cuenta A pierde $100 y la cuenta B no recibe nada.

**NoSQL y transaccionalidad**

La mayoría de las bases NoSQL (MongoDB, DynamoDB, Cassandra) priorizan disponibilidad y escalabilidad horizontal sobre consistencia fuerte — el teorema CAP. Tienen consistencia eventual: los datos *eventualmente* son consistentes entre nodos, pero hay una ventana donde pueden estar desincronizados.

MongoDB agregó transacciones multi-documento en la versión 4.0, y DynamoDB tiene transacciones limitadas, pero son más complejas de usar y no es su caso de uso natural.

**La regla para responder en entrevista**

- Relaciones entre datos + operaciones que afectan múltiples registros + consistencia crítica → **SQL**
- Volumen masivo + esquema flexible + escalabilidad horizontal + consistencia eventual aceptable → **NoSQL**

Si te preguntan "¿usarías NoSQL para un sistema de pagos?" la respuesta es no, y explicás con ACID por qué.

---

## Checklist antes de la entrevista

- [ ] Podés levantar NestJS desde cero en menos de 5 minutos sin buscar nada
- [ ] Podés levantar React Vite en menos de 2 minutos
- [ ] Sabés el ciclo Module → Controller → Service → Entity de memoria
- [ ] Tenés claro cómo hacer un fetch con axios y manejar el estado en React
- [ ] Practicaste el challenge de este documento una vez completo antes del día
- [ ] Tenés VS Code con Live Share instalado y configurado
- [ ] Claude Code instalado y funcionando en tu terminal