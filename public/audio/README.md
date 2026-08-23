# Beat preview files

Place real preview MP3 files directly in this folder:

```text
public/audio/motorway-preview.mp3
public/audio/after-hours-preview.mp3
public/audio/silverstone-preview.mp3
```

Then open `data/beats.ts` and change the matching beat's `audioUrl`:

```ts
audioUrl: "/audio/motorway-preview.mp3",
```

The leading `/audio/` maps to this `public/audio/` folder. Keep previews reasonably compressed for fast mobile loading. The bundled `tur1smo-demo.wav` is currently shared by the placeholder records so the player can be tested without adding duplicate fake audio files.

A full remote URL also works without changing the player:

```ts
audioUrl: "https://example.public.blob.vercel-storage.com/motorway-preview.mp3",
```
