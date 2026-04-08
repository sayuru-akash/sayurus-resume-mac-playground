# GitHub Copilot Instructions

This file provides context for GitHub Copilot (and Copilot cloud agents) so that suggestions and automated changes stay consistent with the project's conventions, architecture, and quality bar.

## Project Overview

This is a browser-based portfolio that recreates a **macOS-style desktop** experience in React. The desktop itself _is_ the resume: apps, menus, dock, Spotlight, and Control Center are all used to present portfolio content.

**Core quality bar:** visual fidelity and interaction polish, not just functional correctness. Small CSS or state-management regressions can visibly damage the experience. Always preserve the macOS look and feel.

Live site: [sayuru.dev](https://sayuru.dev)

## Tech Stack

| Layer | Choice |
|---|---|
| UI framework | React 19 |
| State | Redux Toolkit |
| Styling | UnoCSS + plain CSS files |
| Language | TypeScript (strict) |
| Build tool | Vite 8 |
| Animation | Framer Motion |
| Package manager | **npm** (do NOT switch to pnpm or yarn) |

Node.js `20.19+` or `22.12+` and npm `10+` are required.

## Setup & Scripts

```bash
npm install        # install dependencies
npm run dev        # start Vite dev server
npm run build      # tsc + vite build
npm run serve      # vite preview (uses vite.config.ts preview port)
npm run lint       # eslint on .js/.ts/.tsx
```

There is **no automated test suite** beyond linting, type-checking (`tsc`), and production builds. UI regressions must be verified visually in a browser.

## Repository Layout

```
src/
  index.tsx              – app bootstrap; top-level login/boot/desktop routing
  pages/
    Boot.tsx             – boot and wake flow
    Login.tsx            – login screen
    Desktop.tsx          – desktop orchestration, app visibility, z-order,
                           Launchpad, Spotlight, dock/top-bar visibility
  components/
    Window.tsx           – draggable/resizable desktop window shell
    apps/                – individual desktop apps (Bear, Safari, Terminal, FaceTime, …)
    dock/                – dock shell and magnified dock items
    menus/               – Apple menu, Wi-Fi, Control Center, battery, top bar
  configs/               – all content/registry data (see below)
  hooks/                 – reusable browser and interaction hooks
  redux/
    slices/system.ts     – dark mode, audio, brightness, wifi, bluetooth, fullscreen
    slices/dock.ts       – dock sizing and magnification
  styles/                – global styles and app-specific CSS
  types/                 – shared TypeScript types
  utils/                 – URL helpers, fullscreen helpers, screen utilities
public/
  markdown/              – resume and note content in Markdown
  screenshots/           – desktop screenshots used in README
```

## Content & Data Conventions

When **changing displayed content**, edit config files rather than presentational components:

| Content | File |
|---|---|
| Personal info | `src/configs/user.ts` |
| Desktop app registry | `src/configs/apps.tsx` |
| Bear app notes | `src/configs/bear.tsx` |
| Safari websites | `src/configs/websites.ts` |
| Launchpad items | `src/configs/launchpad.ts` |
| Wallpapers / media | `src/configs/wallpapers.ts`, `src/configs/music.ts` |
| Terminal content | `src/configs/terminal.tsx` |
| Resume Markdown | `public/markdown/` |

Keep asset paths relative to the **public root** (e.g., `/screenshots/day.png`, not `./public/screenshots/day.png`).

## Architecture Conventions

### State management
- **Shared, cross-surface state** → Redux slice in `src/redux/slices/`.
- **Local transient UI state** → `useState` / `useReducer` inside the owning component.
- Never mutate Redux state objects in place; always use immutable updates (Redux Toolkit's `createSlice` handles this via Immer, but be careful with nested objects in `useSelector` results).

### Window geometry
`src/components/Window.tsx` persists per-app geometry in `localStorage` under the `desktop-window:` key prefix. Preserve this behaviour unless a task explicitly changes it.

### Sliders
Control Center sliders use `rc-slider` with custom overrides in `src/styles/component.css`. Do **not** swap out `rc-slider` or remove those overrides without re-verifying the Control Center UI.

## Styling Conventions

- UnoCSS utility classes are the primary styling approach; shortcuts and custom rules live in `unocss.config.ts`.
- Plain CSS files in `src/styles/` handle cases that utility classes cannot (e.g., complex animations, third-party component overrides).
- Prefer explicit `className` strings over JSX attributify syntax when debugging layout issues.
- **Avoid container-wide `opacity-*` classes** — they fade children too. Use alpha color utilities like `bg-gray-100/80` instead.
- Every visual change must look correct in **both light and dark modes**.

## UI & Interaction Guardrails

- Do **not** redesign components into a generic dashboard or SaaS aesthetic; keep the macOS-inspired look.
- Favour targeted, surgical fixes over broad visual rewrites.
- When touching menus, dock, Spotlight, Safari, Bear, or Control Center, verify spacing and alignment visually after the change.
- When touching window behaviour, preserve deterministic initial positioning and minimize/restore animations.
- Do **not** remove or silently break Framer Motion transitions — they are intentional.

## Verification Checklist

Run after **any** non-trivial change:

```bash
npm run lint
npm run build
```

For UI-affecting changes, also verify in a browser:

1. Login screen renders and transitions correctly.
2. Desktop loads without layout jumps.
3. Dock magnification works on hover.
4. Top bar menus open, display correctly, and close.
5. Control Center sliders align and are draggable.
6. Open at least one app window → move → minimize → restore → maximize → close.
7. Confirm both light (day) and dark (night) wallpaper modes look correct.

## Dependency & Tooling Rules

- Keep `package-lock.json` in sync with `package.json` (`npm install` after any dependency change).
- Document user-visible tooling changes in `README.md`.
- Prefer modern, actively maintained packages; avoid adding heavyweight libraries for trivial tasks.
- When upgrading build tooling, re-run lint and build before finishing.
- The package manager is **npm**. Do not introduce `pnpm-lock.yaml` or `yarn.lock`.

## Documentation

- `README.md` — human-facing: project description, setup, usage, structure, customisation.
- `AGENTS.md` — agent/automation-facing: commands, architecture, guardrails, verification.
- `.github/copilot-instructions.md` (this file) — Copilot-specific context and guardrails.
- Keep all three current when workflows, stack versions, or project structure change.
