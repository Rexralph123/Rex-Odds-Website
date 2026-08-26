# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

```
Rex-Odds-Website
├─ .oxlintrc.json
├─ Backend
├─ Frontend
│  └─ src
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.svg
│  └─ icons.svg
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  ├─ hero.png
│  │  ├─ react.svg
│  │  └─ vite.svg
│  ├─ index.css
│  ├─ main.jsx
│  └─ pages
│     └─ home.jsx
└─ vite.config.js

```
```
Rex-Odds-Website
├─ .oxlintrc.json
├─ Backend
├─ Frontend
│  └─ src
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.svg
│  └─ icons.svg
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  ├─ hero.png
│  │  ├─ react.svg
│  │  └─ vite.svg
│  ├─ index.css
│  ├─ main.jsx
│  └─ pages
│     └─ home.jsx
└─ vite.config.js

```



/* ============================================================================
   REXODDS — Football Prediction Membership Platform
   ----------------------------------------------------------------------------
   This is a SINGLE-FILE artifact standing in for the multi-file structure
   described in the brief. Section markers below correspond to where each
   piece would live in a real project:

     services/auth.js        -> AuthProvider + useAuth()        (mocked)
     services/subscriptions  -> useAuth().subscription          (mocked)
     services/predictions.js -> PREDICTIONS mock + helpers      (mocked)
     lib/supabase.js         -> SUPABASE CONFIG PLACEHOLDER     (stubbed)
     services/payments.js    -> PAYSTACK CONFIG PLACEHOLDER     (stubbed)
     components/*            -> components defined below
     pages/*                 -> page components defined below
     admin/*                 -> AdminDashboard section below

   Nothing here talks to a real backend. Auth, subscription status, and
   payment are held in-memory (React state) and clearly marked so a real
   Supabase + Paystack integration can be dropped in without redesigning
   the UI. Per the brief: no pretending these are production-secure.
   ============================================================================ */