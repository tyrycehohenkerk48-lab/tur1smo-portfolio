# TUR1SMO — Sound / Visual / Motion

A responsive portfolio for TUR1SMO, spanning music production, modeling, and visual culture across Montréal and Toronto.

## Requirements

- Node.js 22.13 or newer
- pnpm 11.19 or newer

## Run locally

```bash
pnpm install
pnpm run dev
```

Open `http://localhost:3000`. Before publishing a change, run `pnpm run build`.

## Verify a change

```bash
pnpm run lint
pnpm test
```

GitHub Actions runs the same checks automatically for pushes to `main` and for pull requests.

## Push to GitHub

This project is already initialized as a Git repository on the `main` branch. Create a new empty repository on GitHub without adding a README, license, or `.gitignore`, then connect and push it:

```bash
git remote add origin https://github.com/YOUR-USERNAME/tur1smo-portfolio.git
git push -u origin main
```

If you prefer SSH, use `git@github.com:YOUR-USERNAME/tur1smo-portfolio.git` as the remote URL. The `.openai/hosting.json` file keeps this checkout connected to its existing Sites project; it does not contain credentials.

## Add a beat

1. Copy the preview MP3 into `public/audio/` (for example `public/audio/motorway-preview.mp3`).
2. Copy optional artwork into `public/images/beats/`.
3. Open `data/beats.ts` and duplicate one beat object.
4. Give it a unique `id` and update its title, category, BPM, key, audio URL, artwork path, year, availability, preview duration, and featured status.
5. Keep `artwork` as an empty string until artwork is available.

Example beat:

```ts
{
  id: "motorway",
  title: "Motorway",
  category: "dark",
  bpm: 140,
  key: "F# Minor",
  audioUrl: "/audio/motorway-preview.mp3",
  artwork: "",
  year: "2026",
  available: true,
  durationSeconds: 161,
  featured: false,
  artworkTone: "#535752",
}
```

`audioUrl` can also be a complete Vercel Blob URL; the player does not need to change. Only one track plays at a time. Because the audio provider lives in the root layout and site links use client navigation, playback continues between pages.

## Add a beat category

1. Add its lowercase name to `beatCategories` in `data/beats.ts`.
2. Keep it in that array so the `BeatCategory` type updates automatically.
3. Assign the new category to any beat. The archive filter and navigation menus render from the array automatically.

## Add a modeling photo

1. Copy the image into `public/images/modeling/`.
2. Open `data/modeling.ts`.
3. Replace a placeholder's `src: null` with a path such as `src: "/images/modeling/look-01.jpg"`, or duplicate an object to add another image.
4. Write useful alt text, choose a layout value, and optionally set `position` to a CSS object-position such as `"center top"`.

The portfolio component uses `object-fit: cover` in the editorial grid and `object-fit: contain` in the lightbox, so source photos are not distorted.

## Connect the contact form

`components/ContactForm.tsx` currently validates in the browser and shows a local confirmation. To deliver messages, connect its submit handler to a form service or your own API route. Keep the existing fields (`name`, `email`, `interest`, and `message`) as the request body.

## Important files

- `data/beats.ts` — all track data and categories
- `public/audio/README.md` — exact preview-file placement instructions
- `data/modeling.ts` — all portfolio image data and layout choices
- `components/AudioProvider.tsx` — persistent audio and seek controls
- `components/BeatList.tsx` — archive, instant filters, inline player, and compact homepage rows
- `components/PortfolioGrid.tsx` — editorial layout and accessible lightbox
- `app/globals.css` — the complete responsive visual system
- `public/brand/exports/` — high-resolution transparent brand assets
- `public/og.png` — social sharing card
