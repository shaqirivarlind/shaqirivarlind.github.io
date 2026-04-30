# shaqirivarlind.github.io — CV / Portfolio (Nuxt 4)

CV + portfolio website built with **Nuxt 4 (Vue 3)** and **Vuetify**. Content is stored as versioned JSON datasets under `src/content/` (this repo treats those files as the source of truth).

## What this app does

- **Landing / portfolio sections**: person summary, companies, projects, capabilities, skills, contact.
- **Resume page**: print-friendly layout for generating a PDF.
- **Project details**: dedicated view for a project with richer context.

## How it works (architecture)

- **Rendering**: client-side app (`ssr: false`).
- **Data**: the UI loads structured JSON from `src/content/` into stores and renders sections from that state.
- **Design approach**: “content-first” — updating data should not require touching UI code in most cases.

## Tech stack

- **Framework**: Nuxt 4 (Vue 3), TypeScript, `ssr: false`
- **UI**: Vuetify + Material Design Icons
- **State**: Pinia (`@pinia/nuxt`)
- **Forms/validation utilities**: Vee-Validate + Zod
- **Utilities**: Day.js, UUID

## Repo layout

```text
src/
  content/                # CV datasets (source of truth)
  features/               # feature-oriented UI components
  components/views/       # page-level views (home, resume, project)
public/                   # static assets served as-is
```

## Content datasets (`src/content/`)

The site reads structured JSON from `src/content/`:

- `person.json`: name, role, bio, contacts, languages
- `companies.json`, `clients.json`
- `skills.json`, `capabilities.json`
- `projects.json`
- `roles.json`
- `experiences.json`: ties company + date range + roles
- `education.json`, `certificates.json`, `recommendations.json`
- `meta.json`: dataset metadata (version, last updated)

### Entity relationships (important)

Core hierarchy:

```text
Experience (company + date range)
  └─ Role[]         (title, type, achievements)
       └─ Project[] (skills, client, images)
```

Practical rule: create “leaf” entities first (companies/skills/projects), then reference them from roles and experiences.

## Local development

Install:

```bash
npm install
```

Run:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Preview the build:

```bash
npm run preview
```

## Deployment

- This app is a **client-rendered SPA** (`ssr: false`).
- For static hosting, run:

```bash
npm run generate
```

Nuxt 4 typically outputs static files under `.output/public`.

## Updating CV data

1. Update JSON under `src/content/`
2. Run locally to verify
3. Commit only content changes

```bash
git diff src/content/
git add src/content/
git commit -m "Update CV data"
git push
```
