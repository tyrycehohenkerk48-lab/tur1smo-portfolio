# Beat preview files

Place real preview MP3 or M4A files directly in this folder. Use short,
web-safe filenames with lowercase letters and hyphens:

```text
public/audio/my-beat-name.mp3
```

Then open `data/beats.ts` and change the matching beat's `audioUrl`:

```ts
audioUrl: "/audio/my-beat-name.mp3",
```

The leading `/audio/` maps to this `public/audio/` folder. Keep previews
reasonably compressed for fast mobile loading. Full-resolution source WAVs can
be kept in the ignored `audio-sources/` folder at the project root; only the
compressed files in this folder are published with the website.

A full remote URL also works without changing the player:

```ts
audioUrl: "https://example.public.blob.vercel-storage.com/my-beat-name.mp3",
```
