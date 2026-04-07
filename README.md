# Aero DS

Aero DS is the design system and component library powering BirdAI. It contains all UI components, design tokens, theme definitions, and Storybook stories.

## What's inside

- `src/app/components/ui/` — Primitive UI components (Button, Input, Card, Dialog, etc.)
- `src/app/components/` — Composed app-level components
- `src/tokens/` — Global CSS styles and Tailwind base
- `src/themes/` — Design token CSS files per theme version (v1–v4)
- `src/stories/` — Storybook stories for all components
- `.storybook/` — Storybook configuration

## Getting started

### 1. Clone the repo

```bash
git clone https://github.com/balajik-cmyk/aero-ds.git
cd aero-ds
```

SSH (when your GitHub SSH config uses a host alias for this account, e.g. `github-balajik`):

```bash
git clone git@github-balajik:balajik-cmyk/aero-ds.git
cd aero-ds
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run Storybook

```bash
npm run storybook
```

Storybook will start at [http://localhost:6006](http://localhost:6006).

### 4. Build Storybook (static)

```bash
npm run build-storybook
```

### 5. Build the published package (TypeScript)

Emits `dist/` for the npm entry (`cn` helper and `package.json` `exports`). This is a narrow build and does not typecheck the full Storybook tree.

```bash
npm run build
```

## Publishing

This package is published to the GitHub Package Registry under the `@balajik-cmyk` scope.

```bash
npm publish
```

Requires a valid `NODE_AUTH_TOKEN` with `write:packages` permission set in your environment.
