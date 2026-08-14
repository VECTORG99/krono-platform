> ⚠️ **Prototipo/Skeleton** — Este proyecto es un skeleton en desarrollo. Las funcionalidades documentadas están planificadas pero no implementadas.

# Krono Platform 🎓

Plataforma educativa inteligente con roles **Admin > Profesor > Estudiante**, diseñada para gestionar cursos con integración de IA que potencia el aprendizaje, la enseñanza y la gestión del conocimiento.

---

## ✨ Funcionalidades principales

### 👑 Administración
- Gestión completa de usuarios (CRUD con asignación de roles)
- Administración de cursos y asignación de profesores
- Configuración multi-proveedor de IA (OpenAI, Claude, Ollama)
- Panel de estadísticas globales y logs del sistema
- Monitoreo de actividad de la plataforma

### 👨‍🏫 Profesor
- Creación y edición de cursos, módulos y lecciones (contenido enriquecido)
- Diseño de evaluaciones: quizzes, exámenes, formularios
- **Corrección asistida por IA**: corrección semántica y ortográfica de respuestas abiertas
- **Feedback automático** generado por IA para entregas de estudiantes
- Revisión y calificación de entregas con sugerencias inteligentes
- Chat interactivo con estudiantes (con asistencia de IA)
- Generación automática de tests de estudio
- Importación/exportación bidireccional con **Obsidian**
- Dashboard analítico por curso

### 🧑‍🎓 Estudiante
- Exploración e inscripción a cursos
- Visualización de progreso académico
- **Evaluaciones asistidas por IA**: ayuda contextual durante quizzes y exámenes
- **Tests de estudio inteligentes**: generación dinámica de preguntas sobre cualquier tema
- **Chat interactivo** para resolver dudas con IA
- Retroalimentación detallada en entregas
- Material del curso enriquecido con enlaces cruzados
- Acceso a vaults de Obsidian sincronizados

### 🤖 Inteligencia Artificial (Multi-Proveedor)
Arquitectura extensible que soporta múltiples proveedores de IA configurable:

| Proveedor | Propósito principal |
|-----------|-------------------|
| **OpenAI (GPT-4o)** | Chat, corrección, generación de contenido |
| **Claude (Anthropic)** | Análisis profundo de textos largos, retroalimentación |
| **Ollama** | Modelos open-source locales (privacidad total) |

Capacidades de IA:
- **Corrección ortográfica y semántica** de textos, mensajes y correos
- **Retroalimentación automática** personalizada en entregas
- **Generación de preguntas de estudio** adaptativas
- **Chat contextual** con memoria del curso
- **Asistencia en tiempo real** durante evaluaciones

### 📝 Integración con Obsidian
Sincronización bidireccional con vaults de Obsidian:

- **Exportación**: Los materiales del curso (lecciones, guías, resúmenes) se exportan como archivos Markdown con frontmatter compatible con Obsidian, organizados por curso/módulo/lección.
- **Importación**: Escanea vaults existentes y sincroniza notas, detectando cambios por checksum. Las notas se vinculan a cursos como material complementario.
- **Wiki-links**: Soporte para `[[enlaces]]` entre notas de diferentes cursos, permitiendo cursos cruzados y descubrimiento de conocimiento interdisciplinario.

---

## 🏗️ Arquitectura del proyecto

```
krono-platform/
├── krono-api/                   # Backend Spring Boot 3.x (Java 21)
│   ├── src/main/java/com/krono/
│   │   ├── config/              # Seguridad, CORS, WebSocket, AI providers
│   │   ├── auth/                # JWT, autenticación, roles
│   │   ├── user/                # Gestión de usuarios
│   │   ├── course/              # Cursos, módulos, lecciones
│   │   ├── assessment/          # Evaluaciones y preguntas
│   │   ├── submission/          # Entregas y calificaciones
│   │   ├── chat/                # Chat en tiempo real (WebSocket)
│   │   ├── ai/                  # Abstracción multi-proveedor IA
│   │   │   ├── correction/      # Corrección semántica/ortográfica
│   │   │   ├── feedback/        # Retroalimentación automática
│   │   │   ├── study/           # Tests de estudio asistidos
│   │   │   └── chat/            # Chat con IA
│   │   ├── obsidian/            # Integración Obsidian
│   │   └── notification/        # Notificaciones
│   └── src/main/resources/
│       └── db/migration/        # Migraciones Flyway
│
├── krono-web/                   # Frontend React 19 + TypeScript + Vite
│   ├── src/
│   │   ├── components/          # Componentes reutilizables
│   │   │   ├── ui/              # Componentes base (botones, inputs, etc.)
│   │   │   ├── layout/          # Layouts por rol
│   │   │   ├── course/          # Componentes de curso
│   │   │   ├── assessment/      # Motor de quizzes/exámenes
│   │   │   ├── chat/            # Widget de chat
│   │   │   ├── ai/              # Widgets de IA
│   │   │   └── obsidian/        # Componentes de Obsidian
│   │   ├── pages/               # Páginas por rol
│   │   │   ├── admin/           # Panel de administración
│   │   │   ├── professor/       # Panel del profesor
│   │   │   └── student/         # Panel del estudiante
│   │   ├── hooks/               # Custom hooks
│   │   ├── services/            # Cliente API (Axios)
│   │   ├── stores/              # Estado global (Zustand)
│   │   └── types/               # Interfaces TypeScript
│   └── public/
│
├── docker-compose.yml           # Orquestación de servicios
└── .gitignore
```

---

## 🧠 Modelo de datos (PostgreSQL)

### Entidades principales

```
users (id, name, email, password_hash, role: ADMIN|PROFESSOR|STUDENT, avatar, created_at)
courses (id, title, description, code, professor_id, cover_image, status, created_at)
course_enrollments (user_id, course_id, enrolled_at)
modules (id, course_id, title, description, order_index)
lessons (id, module_id, title, content, content_type, order_index)

assessments (id, course_id, title, type: QUIZ|EXAM|FORM, config_json, due_date, max_attempts)
questions (id, assessment_id, text, type, options_json, correct_answer, points)
submissions (id, assessment_id, user_id, answers_json, score, ai_feedback_json, status, submitted_at)

chat_rooms (id, course_id, title, created_by)
chat_messages (id, room_id, user_id, content, ai_generated, created_at)

ai_provider_configs (id, name, provider_type, api_key_encrypted, model, base_url, is_active)
correction_rules (id, name, pattern, replacement, type, is_active)

obsidian_vaults (id, user_id, name, local_path, last_synced, is_active)
obsidian_notes (id, vault_id, relative_path, title, content, frontmatter_json, checksum, last_synced)
```

---

## 🛠️ Stack tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Backend | Spring Boot | 3.x |
| Lenguaje | Java | 21 LTS |
| Frontend | React + TypeScript | 19 |
| Build frontend | Vite | 6.x |
| Base de datos | PostgreSQL | 16 |
| Migraciones | Flyway | 10.x |
| Autenticación | Spring Security + JWT | - |
| Tiempo real | WebSocket (STOMP) | - |
| Documentación API | SpringDoc OpenAPI | - |
| Testing backend | JUnit 5 + Mockito | - |
| Testing frontend | Vitest + Playwright | - |
| Contenerización | Docker + Docker Compose | - |
| Estado frontend | Zustand | - |
| Estilos | TailwindCSS | 4.x |

---

## 🚀 Cómo empezar

### Prerrequisitos
- Java 21+
- Node.js 20+
- Docker y Docker Compose
- PostgreSQL 16 (o usar el contenedor Docker)

### Desarrollo local

```bash
# 1. Clonar el repositorio
git clone https://github.com/VECTORG99/krono-platform.git
cd krono-platform

# 2. Iniciar base de datos con Docker
docker compose up -d db

# 3. Iniciar backend
cd krono-api
./mvnw spring-boot:run

# 4. En otra terminal, iniciar frontend
cd krono-web
npm install
npm run dev
```

### Variables de entorno

```bash
# Backend (krono-api/.env)
DATABASE_URL=jdbc:postgresql://localhost:5432/krono
DATABASE_USERNAME=krono
DATABASE_PASSWORD=secret
JWT_SECRET=your-secret-key
OPENAI_API_KEY=sk-...
CLAUDE_API_KEY=sk-ant-...
OLLAMA_BASE_URL=http://localhost:11434
```

---

## 📐 Principios de diseño

- **Arquitectura hexagonal**: separación clara entre dominio, aplicación e infraestructura
- **API first**: definición de contratos REST antes de implementación
- **Multi-proveedor IA**: abstracción que permite cambiar de proveedor sin modificar lógica de negocio
- **Seguridad por capas**: JWT + roles + validaciones server-side
- **Sincronización eficiente**: detección de cambios por checksum en integración Obsidian
- **Responsive**: frontend adaptativo para desktop y tablet

---

## 📋 Fases de desarrollo

| Fase | Duración | Entregables |
|------|----------|-------------|
| **Fase 0** — Setup | Día 1 | Repositorio, Docker Compose, proyectos base, CI/CD |
| **Fase 1** — Auth y roles | Días 2-3 | Login JWT, registro, roles, layout por rol |
| **Fase 2** — Cursos | Días 4-7 | CRUD cursos, módulos, lecciones, inscripciones |
| **Fase 3** — Evaluaciones | Días 8-12 | Sistema de quizzes/exámenes, preguntas, entregas |
| **Fase 4** — IA | Días 13-18 | Abstracción proveedores, corrección, feedback, tests |
| **Fase 5** — Chat | Días 19-21 | Chat en tiempo real + IA para dudas |
| **Fase 6** — Obsidian | Días 22-25 | Integración bidireccional con vaults |
| **Fase 7** — Pulido | Días 26-30 | Dashboards, estadísticas, tests, deploy |

---

## 🤝 Contribución

*(Próximamente)*

---

## 📄 Licencia

*(Próximamente)*
