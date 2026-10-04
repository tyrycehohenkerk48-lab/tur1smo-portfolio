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
4. Give it a unique `id` and update its title, category, BPM, key, audio URL, artwork path, year, availability, published status, preview duration, and featured status.
5. Keep `artwork` as an empty string until artwork is available.

Example beat:

```ts
{
  id: "motorway",
  title: "Motorway",
  category: "paddock",
  bpm: 140,
  key: "F# Minor",
  audioUrl: "/audio/motorway-preview.mp3",
  artwork: "",
  year: "2026",
  available: true,
  published: true,
  durationSeconds: 161,
  featured: false,
  artworkTone: "#535752",
}
```

`audioUrl` can also be a complete Vercel Blob URL; the player does not need to change. Only one track plays at a time. Because the audio provider lives in the root layout and site links use client navigation, playback continues between pages.

Set `published: false` to keep a beat in the data file without showing it on the site. The seven published beats currently give each rollout category one temporary track; change these flags when the final selection is ready. Set `featured: true` on up to five published beats to show them under Selected Sounds on the homepage.

## Add a beat category

1. Add its URL-safe name to `beatCategories` in `data/beats.ts`.
2. Add the public label to `beatCategoryLabels` in the same file.
3. Assign the new category to any beat. The archive filters update automatically.

## Add a modeling photo

1. Copy the image into `public/images/modeling/`.
2. Open `data/modeling.ts`.
3. Replace a placeholder's `src: null` with a path such as `src: "/images/modeling/look-01.jpg"`, or duplicate an object to add another image.
4. Write useful alt text, choose a layout value, and optionally set `position` to a CSS object-position such as `"center top"`.

The portfolio component uses `object-fit: cover` in the editorial grid and `object-fit: contain` in the lightbox, so source photos are not distorted.

## Contact and social links

`components/ContactForm.tsx` validates in the browser and opens an email draft to `tur1smo848@gmail.com` with the visitor's name, email, interest and message. The visitor sends the draft from their own email app; the website does not claim to deliver messages itself. `data/contact.ts` keeps the confirmed email and Instagram URL shared across the site.

The production Worker redirects `www.tur1smo.com` to `https://tur1smo.com`, preserving paths and query strings. Both hostnames must remain attached to Sites for HTTPS to work.

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
