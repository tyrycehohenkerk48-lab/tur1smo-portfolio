# TUR1SMO — Sound / Visual / Direction

A responsive portfolio for TUR1SMO: music production, modeling, and creative direction from Montréal.

## Run locally

Use Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Before publishing a change, run `npm run build`.

## Add a beat

1. Copy the MP3 into `public/audio/`.
2. Copy optional artwork into `public/images/beats/`.
3. Open `data/beats.ts` and duplicate one beat object.
4. Give it a unique `id` and update its title, genre, year, display duration, duration in seconds, BPM, key, audio path, artwork path, and featured status.
5. Set `artwork` to `null` to keep the built-in technical placeholder.

Example media paths:

```ts
audioFile: "/audio/new-track.mp3",
artwork: "/images/beats/new-track.jpg",
```

Only one track plays at a time. Because the audio provider lives in the root layout and site links use client navigation, playback continues between pages.

## Add a beat category

1. Add its lowercase name to `beatGenres` in `data/beats.ts`.
2. Add the same value to the `BeatGenre` content by keeping it in that array—the type updates automatically.
3. Assign the new genre to any beat. The archive filter and navigation menus render from the array automatically.

## Add a modeling photo

1. Copy the image into `public/images/modeling/`.
2. Open `data/modeling.ts`.
3. Replace a placeholder's `src: null` with a path such as `src: "/images/modeling/look-01.jpg"`, or duplicate an object to add another image.
4. Write useful alt text, choose a layout value, and optionally set `position` to a CSS object-position such as `"center top"`.

The portfolio component uses `object-fit: cover` in the editorial grid and `object-fit: contain` in the lightbox, so source photos are not distorted.

## Hero media

The homepage hero currently uses a lightweight CSS media placeholder. Replace `.hero::before` and `.hero-wash` in `app/globals.css` with a background image, or add a muted `<video>` inside the hero section in `app/page.tsx`.

## Connect the contact form

`components/ContactForm.tsx` currently validates in the browser and shows a local confirmation. To deliver messages, connect its submit handler to a form service or your own API route. Keep the existing fields (`name`, `email`, `interest`, and `message`) as the request body.

## Important files

- `data/beats.ts` — all track data and genres
- `data/modeling.ts` — all portfolio image data and layout choices
- `components/AudioProvider.tsx` — persistent audio and seek controls
- `components/BeatList.tsx` — archive, filters, expansion, and playback
- `components/PortfolioGrid.tsx` — editorial layout and accessible lightbox
- `app/globals.css` — the complete responsive visual system
- `public/og.png` — social sharing card
