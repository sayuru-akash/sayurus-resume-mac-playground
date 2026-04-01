# Sayuru's Resume in a macOS Playground

A portfolio site that recreates a macOS-style desktop in the browser, then uses that desktop as the resume itself.

Live site: [sayuru.dev](https://sayuru.dev)

![Day mode desktop](./public/screenshots/day.png)
![Night mode desktop](./public/screenshots/night.png)

## What It Does

- Recreates a macOS-inspired desktop UI with draggable app windows, dock magnification, top bar menus, Spotlight, Launchpad, and Control Center.
- Uses the desktop to present portfolio content, links, markdown-based notes, and resume material.
- Ships with themed day and night wallpapers, audio controls, browser-style navigation, webcam capture, and an in-browser terminal experience.

## Built With

- [React 19](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [UnoCSS](https://unocss.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite 8](https://vite.dev/)
- [Framer Motion](https://www.framer.com/motion/)

## Getting Started

### Requirements

- Node.js `20.19+` or `22.12+`
- npm `10+`

This project now uses `npm` consistently. `pnpm` is no longer the documented package manager.

### Install

```bash
npm install
```

### Run The App

```bash
npm run dev
```

Vite will print the local URL in the terminal. By default this project uses the standard Vite dev workflow rather than hardcoding a custom app port.

### Build And Preview

```bash
npm run build
npm run serve
```

`npm run serve` starts a Vite preview server using the configured preview port in [`vite.config.ts`](./vite.config.ts).

## Available Scripts

```bash
npm run dev
npm run build
npm run serve
npm run lint
```

## Project Structure

```text
src/
  components/
    apps/        Desktop app windows such as Bear, Safari, Terminal, FaceTime
    dock/        Dock shell and magnified dock items
    menus/       Apple menu, Wi-Fi, Control Center, battery, top bar
  configs/       Portfolio content, wallpapers, links, markdown sources, app registry
  hooks/         Reusable browser and interaction hooks
  pages/         Boot, login, and desktop entry screens
  redux/         System and dock state
  styles/        Global styles and app-specific CSS
  utils/         URL helpers, fullscreen helpers, screen utilities
```

## Customization

Most content is intentionally driven from config files rather than hardcoded inside components.

- Personal info: [`src/configs/user.ts`](./src/configs/user.ts)
- Desktop app registry: [`src/configs/apps.tsx`](./src/configs/apps.tsx)
- Bear app content sources: [`src/configs/bear.tsx`](./src/configs/bear.tsx)
- Websites shown in Safari: [`src/configs/websites.ts`](./src/configs/websites.ts)
- Launchpad items: [`src/configs/launchpad.ts`](./src/configs/launchpad.ts)
- Wallpapers and media: [`src/configs/wallpapers.ts`](./src/configs/wallpapers.ts), [`src/configs/music.ts`](./src/configs/music.ts)
- Resume markdown content: [`public/markdown`](./public/markdown)

## Development Notes

- Window positions are persisted per app in `localStorage`.
- The Control Center sliders use `rc-slider` with custom styling in [`src/styles/component.css`](./src/styles/component.css).
- UI changes should be checked visually, not only with lint/build, because the project relies heavily on layout, translucency, and interaction polish.

## Verification

Before shipping changes, run:

```bash
npm run lint
npm run build
```

For visual changes, also verify the desktop flow in a browser:

- login screen
- desktop load
- dock behavior
- top bar menus
- Control Center sliders
- at least one desktop window open, move, minimize, and restore cycle

## Credits

- [Renovamen/playground-macos](https://github.com/Renovamen/playground-macos)
- [macOS Big Sur](https://www.apple.com/in/macos/big-sur/)
- [macOS Catalina](https://www.apple.com/bw/macos/catalina/)
- [macOS Icon Gallery](https://www.macosicongallery.com/)
- [sindresorhus/file-icon-cli](https://github.com/sindresorhus/file-icon-cli)
- [vivek9patel.github.io](https://github.com/vivek9patel/vivek9patel.github.io)

## License

[MIT](./LICENSE)
