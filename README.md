# vite-react

Web application archetype built with [Vite](https://vite.dev), [React 19](https://react.dev) and TypeScript. It includes routing, data fetching, Tailwind styling, linting/formatting with Biome, testing with Vitest, and a deployment pipeline to Cloudflare Pages.

## Stack

| Category         | Tool                                                                        |
| ---------------- | --------------------------------------------------------------------------- |
| Bundler / Dev    | [Vite 8](https://vite.dev) + [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) |
| UI               | [React 19](https://react.dev) with [React Compiler](https://react.dev/learn/react-compiler) |
| Routing          | [React Router 8](https://reactrouter.com)                                   |
| Data fetching    | [TanStack Query 5](https://tanstack.com/query)                              |
| Styling          | [Tailwind CSS 4](https://tailwindcss.com) (`@tailwindcss/vite`) + Sass      |
| Lint / Format    | [Biome 2](https://biomejs.dev)                                              |
| Testing          | [Vitest 5](https://vitest.dev) + [Testing Library](https://testing-library.com) + jsdom |
| Language         | [TypeScript 7](https://www.typescriptlang.org)                              |
| Deployment       | [Cloudflare Pages](https://pages.cloudflare.com) via GitHub Actions         |

## Requirements

- [Node.js](https://nodejs.org) 24
- [pnpm](https://pnpm.io)

## Getting started

This repository uses a [Git submodule](.gitmodules) for the shared configuration (`shared/config`), so clone with `--recurse-submodules`:

```bash
git clone --recurse-submodules <repo-url>
cd vite-react
pnpm install
```

If you already cloned without the submodules:

```bash
git submodule update --init --recursive
```

## Scripts

Defined in [`package.json`](package.json):

| Script                  | Description                                              |
| ----------------------- | -------------------------------------------------------- |
| `pnpm dev`              | Starts the development server with HMR.                  |
| `pnpm build`            | Type-checks (`tsc -b`) and generates the production build.|
| `pnpm preview`          | Serves the production build locally.                     |
| `pnpm lint`             | Type-checks and runs Biome over `src`.                   |
| `pnpm test`             | Runs the test suite once.                                |
| `pnpm test:watch`       | Runs the tests in watch mode.                            |
| `pnpm test:coverage`    | Generates the coverage report.                           |

## Project structure

```
.
├── index.html              # Entry HTML with bootstrap loader
├── vite.config.ts          # Vite and Vitest configuration
├── biome.json              # Biome configuration (extends shared/config)
├── tsconfig*.json          # TypeScript references (app and spec)
├── global.d.ts             # Global types
├── public/                 # Static assets (favicon, fonts)
├── shared/config/          # Submodule with shared configuration
└── src/
    ├── main.tsx            # Entry point: Query and Router providers
    ├── layouts/
    │   └── root.tsx        # Root layout with navigation and loading state
    ├── pages/
    │   ├── __root.ts       # Router definition (createBrowserRouter)
    │   ├── home/           # Index page
    │   ├── lazy/           # Lazily loaded page (code splitting)
    │   └── 404/            # Not found page / ErrorBoundary
    ├── shared/
    │   └── components/
    │       └── loader/     # Reusable loading indicator
    ├── styles/             # index.css imports fonts, theme and tailwind
    └── test-setup.ts       # Vitest setup (jest-dom)
```

### Import aliases

Configured in [`vite.config.ts`](vite.config.ts) and [`tsconfig.json`](tsconfig.json):

| Alias       | Path        |
| ----------- | ----------- |
| `@/*`       | `src/*`     |
| `@public/*` | `public/*`  |
| `@shared/*` | `shared/*`  |

## Routing

The router is declared in [`src/pages/__root.ts`](src/pages/__root.ts) using React Router's `createBrowserRouter`. The `RootLayout` ([`src/layouts/root.tsx`](src/layouts/root.tsx)) wraps the child routes, shows a `LoaderComponent` while `navigation.state === 'loading'`, and renders the `Outlet`. The `/lazy` route is loaded lazily with a dynamic `import()` and uses `HydrateFallback` for the loading state. `NotFoundPage` acts as the `ErrorBoundary`.

## Data fetching

[`src/main.tsx`](src/main.tsx) mounts the app inside a TanStack Query `QueryClientProvider`, alongside the `RouterProvider`. The tree renders in `StrictMode` and logs errors (`onCaughtError`, `onRecoverableError`, `onUncaughtError`) to the console.

## React Compiler

The [React Compiler](https://react.dev/learn/react-compiler) is enabled through the Babel plugin in [`vite.config.ts`](vite.config.ts):

```ts
plugins: [react(), babel({ presets: [reactCompilerPreset()] }), tailwindcss()]
```

> Note: the compiler impacts Vite dev and build performance.

## Styling

Tailwind CSS 4 is integrated via `@tailwindcss/vite`. Styles are orchestrated from [`src/styles/index.css`](src/styles/index.css), which imports `fonts.css`, `theme.css` and `tailwind.css`. The entry HTML includes a full-screen loader while the bundle loads.

## Testing

Vitest is configured in [`vite.config.ts`](vite.config.ts) with the `jsdom` environment, `globals` enabled, and `setupFiles` pointing to [`src/test-setup.ts`](src/test-setup.ts). Coverage uses the `istanbul` provider, includes `src/**/*.{ts,tsx}`, and excludes `main.tsx`, the `*.spec` files, and the setup. Tests live next to the code in `*.spec.tsx` files.

```bash
pnpm test           # single run
pnpm test:watch     # watch mode
pnpm test:coverage  # coverage report
```

## Lint and format

[Biome](https://biomejs.dev) handles linting and formatting. The configuration in [`biome.json`](biome.json) extends `shared/config/_biome.json` and defines the import order by groups (vitest, react, packages, internal aliases, and relative paths). `pnpm lint` runs `tsc -b` followed by `biome check src`.

## Deployment

The workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs manually (`workflow_dispatch`), letting you choose the Cloudflare Pages branch (`main` or `preview`). The pipeline chains the jobs **lint → test → build → publish**, checks out with submodules, installs with pnpm on Node 24, and publishes with `cloudflare/wrangler-action`.

Environment variables used by the build (defined as repository *vars*/*secrets*):

| Variable                   | Source                       |
| -------------------------- | ---------------------------- |
| `VITE_APP_NAME`            | `vars.PUBLIC_APP_NAME`       |
| `VITE_GITHUB_WORKFLOW_SHA` | `github.sha`                 |
| `VITE_API_URL`             | `vars.PUBLIC_API_URL`        |
| `VITE_WS_URL`              | `vars.PUBLIC_WS_URL`         |
| `SITE`                     | `vars.SITE_URL`              |

Required secrets: `ACCESS_TOKEN`, `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`. Additional vars: `BASE_PATH`, `CLOUDFLARE_PROJECT_NAME`.
