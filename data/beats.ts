export const beatCategories = [
  "all",
  "dark",
  "ambient",
  "melodic",
  "experimental",
  "soul",
] as const;

export type BeatCategory = Exclude<(typeof beatCategories)[number], "all">;

/**
 * The beat library's single source of truth.
 *
 * `audioUrl` accepts either a local public path (for example
 * `/audio/motorway-preview.mp3`) or a complete remote URL such as a future
 * Vercel Blob URL. The player does not need to change when the storage source
 * changes.
 */
export type Beat = {
  id: string;
  title: string;
  category: BeatCategory;
  bpm: number;
  key: string;
  audioUrl: string;
  artwork: string;
  year: string;
  available: boolean;
  durationSeconds: number;
  featured: boolean;
  artworkTone: string;
};

const demoAudioUrl = "/audio/tur1smo-demo.wav";

/**
 * Add a beat by copying one object below and changing its values. The bundled
 * demo WAV keeps every placeholder playable. Replace each `audioUrl` with its
 * real `/audio/<beat-name>-preview.mp3` path when your previews are ready.
 */
export const beats: Beat[] = [
  {
    id: "motorway",
    title: "Motorway",
    category: "dark",
    bpm: 140,
    key: "F# Minor",
    audioUrl: demoAudioUrl,
    artwork: "",
    year: "2026",
    available: true,
    durationSeconds: 161,
    featured: true,
    artworkTone: "#535752",
  },
  {
    id: "after-hours",
    title: "After Hours",
    category: "ambient",
    bpm: 128,
    key: "C Minor",
    audioUrl: demoAudioUrl,
    artwork: "",
    year: "2026",
    available: true,
    durationSeconds: 182,
    featured: true,
    artworkTone: "#8a8d87",
  },
  {
    id: "silverstone",
    title: "Silverstone",
    category: "dark",
    bpm: 142,
    key: "C Minor",
    audioUrl: demoAudioUrl,
    artwork: "",
    year: "2026",
    available: true,
    durationSeconds: 166,
    featured: true,
    artworkTone: "#7d8179",
  },
  {
    id: "costa",
    title: "Costa",
    category: "ambient",
    bpm: 118,
    key: "D Major",
    audioUrl: demoAudioUrl,
    artwork: "",
    year: "2026",
    available: true,
    durationSeconds: 192,
    featured: true,
    artworkTone: "#a9a797",
  },
  {
    id: "190e",
    title: "190E",
    category: "melodic",
    bpm: 130,
    key: "A Minor",
    audioUrl: demoAudioUrl,
    artwork: "",
    year: "2026",
    available: true,
    durationSeconds: 157,
    featured: true,
    artworkTone: "#8b847a",
  },
  {
    id: "mulsanne",
    title: "Mulsanne",
    category: "experimental",
    bpm: 148,
    key: "G Minor",
    audioUrl: demoAudioUrl,
    artwork: "",
    year: "2026",
    available: true,
    durationSeconds: 178,
    featured: false,
    artworkTone: "#62665f",
  },
  {
    id: "velour",
    title: "Velour",
    category: "soul",
    bpm: 88,
    key: "Bb Minor",
    audioUrl: demoAudioUrl,
    artwork: "",
    year: "2026",
    available: true,
    durationSeconds: 201,
    featured: false,
    artworkTone: "#80766c",
  },
  {
    id: "north-line",
    title: "North Line",
    category: "ambient",
    bpm: 110,
    key: "C# Minor",
    audioUrl: demoAudioUrl,
    artwork: "",
    year: "2026",
    available: true,
    durationSeconds: 171,
    featured: false,
    artworkTone: "#9b9f9b",
  },
  {
    id: "halogen",
    title: "Halogen",
    category: "melodic",
    bpm: 136,
    key: "E Minor",
    audioUrl: demoAudioUrl,
    artwork: "",
    year: "2026",
    available: true,
    durationSeconds: 149,
    featured: false,
    artworkTone: "#777970",
  },
  {
    id: "static-bloom",
    title: "Static Bloom",
    category: "experimental",
    bpm: 124,
    key: "D# Minor",
    audioUrl: demoAudioUrl,
    artwork: "",
    year: "2026",
    available: true,
    durationSeconds: 195,
    featured: false,
    artworkTone: "#65635f",
  },
];

export function getFeaturedBeats() {
  return beats.filter((beat) => beat.featured).slice(0, 5);
}
