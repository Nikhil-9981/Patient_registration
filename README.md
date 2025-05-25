# Patient Registration App

A frontend-only patient registration application that uses [PGlite](https://pglite.dev/) (PostgreSQL compiled to WebAssembly) for local storage, real-time multi-tab synchronization, and a decorator-based mini-ORM built from scratch.

## Features

* **Register new patients** via a simple form (ID, Name, Age).
* **List all patients** in real time in the same tab and across multiple tabs.
* **Local storage** persisted in IndexedDB using PGlite (no backend required).
* **Decorator-driven ORM**: `@Entity`/`@Column`, automatic schema generation.
* **CRUD repository layer** with parameterized SQL queries.
* **ElectricSQL sync plugin** for multi-tab live updates.

## Tech Stack

* **Framework:** React + TypeScript (Vite)
* **Storage:** PGlite (@electric-sql/pglite, pglite-sync, pglite-react)
* **ORM:** Custom decorator-based layer (no external ORM)
* **Bundler:** Vite

## Prerequisites

* Node.js (>=16)
* npm or yarn

## Setup & Local Development

1. **Clone the repo**

   ```bash
   git clone <repo-url>
   cd patient-reg-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or `yarn`
   ```

3. **Run the dev server**

   ```bash
   npm run dev
   ```

4. **Open** your browser at `http://localhost:5173`

## Project Structure

```
patient-reg-app/
├── src/
│   ├── db.ts             # PGlite.create + schema sync + sync plugin
│   ├── entities/         # Decorated entity classes
│   │   └── Patient.ts
│   ├── orm/
│   │   ├── metadata.ts   # In-memory metadata registry
│   │   ├── decorators.ts # @Entity & @Column decorators
│   │   ├── schema.ts     # Auto-generate tables from metadata
│   │   └── repository.ts # CRUD functions
│   ├── components/
│   │   ├── AddPatientForm.tsx
│   │   └── PatientsList.tsx
│   ├── App.tsx           # Main UI
│   └── main.tsx          # Entrypoint (imports db + App)
├── vite.config.ts        # Vite config (optimizeDeps exclude)
├── tsconfig.app.json
└── README.md
```

## Usage

* Register a patient by entering an **ID**, **Name**, and optional **Age**.
* The patient list updates immediately and persists across refreshes.
* Open a second tab to see real-time synchronization as you add patients.

## Challenges Faced

1. **WASM bundle bundling**: Had to exclude `@electric-sql/pglite` from Vite pre-bundling to avoid invalid FS bundle size errors.
2. **Decorator metadata**: Configuring TypeScript (`experimentalDecorators` + `emitDecoratorMetadata`) in a multi-`tsconfig` setup.
3. **Circular imports**: Refactored `syncSchema` to accept the DB instance to break a cycle between `db.ts` and `schema.ts`.
4. **Postgres syntax**: Switched from `?` placeholders to `$1`, `$2`, ... in PGlite’s PostgreSQL environment.

## Deployment

To deploy the app (Vercel / Netlify):

1. Push your code to GitHub (public repo).
2. Connect the repo to Vercel or Netlify and set the build command to:

   ```bash
   npm run build
   ```
3. Set the publish directory to `dist` (for Vite) or the default.
4. Deploy.

Share the public URL here once it’s live.
