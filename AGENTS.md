# AGENTS.md

## Project Overview

This repository is a browser-based portfolio that recreates a macOS-style desktop experience. The core quality bar is visual fidelity and interaction polish, not just functional correctness. Small CSS or state-management regressions can noticeably damage the experience.

Treat this file as the agent-facing companion to `README.md`.

## Setup Commands

Use `npm` for this repository.

```bash
npm install
npm run dev
npm run lint
npm run build
npm run serve
```

Do not switch the documented workflow back to `pnpm` unless the repository is intentionally migrated and the lockfile, scripts, and docs are updated together.

## Environment Notes

- Vite 8 is installed. Follow current Vite expectations when changing tooling.
- This repo has no automated test suite beyond linting, type-checking, and production builds.
- UI changes should be validated in a real browser whenever possible.
- `npm run serve` uses the preview server configured in `vite.config.ts`.

## Architecture Map

- `src/index.tsx`: app bootstrap and top-level login/boot/desktop routing
- `src/pages/Boot.tsx`: boot and wake flow
- `src/pages/Login.tsx`: login screen
- `src/pages/Desktop.tsx`: desktop orchestration, app visibility, z-order, launchpad, spotlight, dock/top-bar visibility
- `src/components/Window.tsx`: draggable/resizable desktop window shell
- `src/components/apps/*`: individual desktop apps
- `src/components/menus/*`: top bar menus and Control Center
- `src/components/dock/*`: dock layout and hover magnification
- `src/configs/*`: content and app registry
- `src/redux/slices/system.ts`: dark mode, audio, brightness, wifi, bluetooth, fullscreen
- `src/redux/slices/dock.ts`: dock sizing and magnification
- `src/styles/*`: shared and app-specific CSS

## Content And Data Conventions

- Prefer editing data in `src/configs/*` or `public/markdown/*` when changing content.
- Avoid burying portfolio content directly inside presentational components unless the component is inherently self-contained.
- Keep asset paths relative to the public root when following the current project pattern.

## UI And Interaction Guardrails

- Preserve the existing macOS-inspired look and feel. Do not redesign components into a generic dashboard or SaaS aesthetic.
- Favor targeted fixes over broad visual rewrites.
- Be careful with transparency classes. Container-wide `opacity-*` often fades children unintentionally; prefer alpha colors like `bg-gray-100/80` where appropriate.
- If you change menu, dock, Spotlight, Safari, Bear, or Control Center styling, verify spacing and alignment visually.
- If you change window behavior, preserve deterministic positioning and minimize/restore behavior.
- `src/components/Window.tsx` persists per-app geometry in `localStorage` under the `desktop-window:` prefix. Respect that behavior unless the task explicitly changes it.
- Control Center sliders use `rc-slider` and depend on overrides in `src/styles/component.css`. Do not replace them casually or remove the alignment fixes without re-verifying the UI.

## State Management Expectations

- Shared desktop/system state belongs in Redux slices when it affects multiple surfaces.
- Local transient UI state can stay inside the owning component.
- Avoid mutating React state objects in place. Use immutable updates so menu and window interactions remain stable under modern React behavior.

## Styling Conventions

- The project uses UnoCSS plus regular CSS files.
- Existing UnoCSS shortcuts and rules live in `unocss.config.ts`.
- JSX attributify support exists, but explicit `className` strings are usually safer when debugging layout regressions.
- Keep visual changes consistent across light and dark modes.

## Verification Checklist

Run these checks after meaningful changes:

```bash
npm run lint
npm run build
```

For any UI-affecting change, also verify in-browser:

1. Login screen renders correctly.
2. Desktop loads without layout jumps.
3. Dock magnification still works.
4. Top bar menus open and close correctly.
5. Control Center sliders align correctly and remain draggable.
6. Open at least one app window, then move, minimize, restore, maximize, and close it.

If a change affects screenshots, setup steps, or package-manager/tooling expectations, update `README.md` in the same patch.

## Dependency And Tooling Changes

- Keep `package-lock.json` in sync with `package.json`.
- Document user-visible tooling changes in `README.md`.
- Prefer modern, actively maintained packages when replacing dependencies.
- When upgrading build tooling, re-run lint and build before finishing.

## Documentation Expectations

- `README.md` is for humans: concise project description, setup, usage, structure, and customization.
- `AGENTS.md` is for agents: commands, architecture, guardrails, and verification.
- Keep both current when workflows, stack versions, or project structure change.
