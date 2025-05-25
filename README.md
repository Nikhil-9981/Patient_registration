# Patient Registration App

A frontend-only patient registration application that uses [PGlite](https://pglite.dev/) (PostgreSQL compiled to WebAssembly) for local storage, real-time multi-tab synchronization, and a decorator-based mini-ORM built from scratch.

---

## 🎯 Features

* **Register new patients** via a simple form (ID, Name, Age) with inline validation and error messages.
* **Edit & Delete** existing patients directly from the list.
* **Pagination** for large datasets (10 patients per page).
* **Real-time updates** across multiple tabs using ElectricSQL sync.
* **Local persistence** in IndexedDB so data survives refreshes and browser restarts.
* **Decorator-driven ORM**: `@Entity`/`@Column` → automatic schema generation.
* **CRUD repository layer** with parameterized SQL (\$1, \$2, etc.) to prevent injection.
* **Dark / Light mode toggle** with Tailwind CSS `dark:` utilities and localStorage.

---

## 🛠 Tech Stack

* **Framework:** React + TypeScript (Vite)
* **Styling:** Tailwind CSS + PostCSS (`@tailwindcss/postcss`)
* **Icons:** lucide-react
* **Storage:** PGlite (`@electric-sql/pglite`, `pglite-sync`, `pglite-react`)
* **ORM:** Custom decorators & metadata → schema sync
* **Bundler:** Vite
* **State & Forms:** React Hooks

---

## 🚀 Prerequisites

* Node.js (>=16)
* npm or yarn

---

## ⚙️ Setup & Local Development

1. **Clone the repo**

   ```bash
   git clone <repo-url>
   cd patient-reg-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or yarn
   ```

3. **Run the dev server**

   ```bash
   npm run dev
   ```

4. **Open** your browser at `http://localhost:5173`

---

## 📂 Project Structure

```
patient-reg-app/
├── src/
│   ├── db.ts               # PGlite.create + strict durability + schema sync + sync plugin
│   ├── entities/
│   │   └── Patient.ts      # Decorated entity class
│   ├── orm/
│   │   ├── metadata.ts     # In-memory metadata registry
│   │   ├── decorators.ts   # @Entity & @Column decorators
│   │   ├── schema.ts       # Auto-generate tables from metadata
│   │   └── repository.ts   # CRUD functions (add, getAll, update, delete)
│   ├── components/
│   │   ├── AddPatientForm.tsx   # Form with validation & error handling
│   │   ├── PatientsList.tsx     # List with edit, delete & pagination
│   │   └── DarkModeToggle.tsx   # Light / Dark mode switch
│   ├── App.tsx             # Main UI wiring form & list & pagination
│   └── main.tsx            # Entrypoint (imports index.css, db.ts, App)
├── index.html
├── tailwind.config.cjs     # Tailwind CSS config (darkMode: 'class')
├── postcss.config.cjs      # PostCSS config using @tailwindcss/postcss & autoprefixer
├── vite.config.ts          # Vite config (optimizeDeps exclude pglite)
├── tsconfig.app.json       # TS config with decorators enabled
└── README.md
```

---

## 📖 Usage

1. **Register** a patient by entering an **ID**, **Name**, and optional **Age** → click **Register Patient**.
2. **Inline errors** will appear if you leave required fields blank, use negative age, or duplicate an ID.
3. **Edit** or **Delete** any patient via the buttons next to their entry.
4. **Navigate pages** with Prev/Next or page-number buttons (10 per page).
5. **Toggle Dark/Light mode** via the sun/moon icon in the header.
6. **Open a second tab**—additions, edits, or deletions sync instantly via ElectricSQL.
7. **Refresh or close/reopen** your browser—data remains in IndexedDB and reloads on start.

---

## 🛠 Challenges Faced

1. **WASM bundling**: Excluded `@electric-sql/pglite` from Vite pre-bundling to avoid invalid bundle-size errors.
2. **Decorator metadata**: Configured TypeScript’s `experimentalDecorators` & `emitDecoratorMetadata` in a multi-tsconfig setup.
3. **Circular imports**: Refactored `syncSchema` to accept the DB instance, breaking the cycle between `db.ts` and `schema.ts`.
4. **Postgres syntax**: Switched from `?` placeholders to `$1`, `$2`, … for PGlite’s PostgreSQL-style parameter binding.
5. **IndexedDB flush**: Enabled strict durability (`relaxedDurability: false`) to force writes to IndexedDB immediately.

---

## 📦 Deployment

 .
2. **Connect** App has been deployed to Vercel :

 
3. **Deploy**  : https://patient-registration-teal.vercel.app/

---

Thank you for reviewing—feel free to reach out with any questions or feedback!
