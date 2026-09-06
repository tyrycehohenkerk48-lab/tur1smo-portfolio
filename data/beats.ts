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
 * `/audio/double-dollar.mp3`) or a complete remote URL such as a future
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

/**
 * Add a beat by copying one object below and changing its values. Audio file
 * names are kept web-safe while titles preserve the public-facing beat names.
 */
export const beats: Beat[] = [
  {
    id: "double-dollar",
    title: "Motorway",
    category: "dark",
    bpm: 140,
    key: "F# Minor",
    audioUrl: "/audio/double-dollar.mp3",
    artwork: "",
    year: "2026",
    available: true,
    durationSeconds: 130,
    featured: true,
    artworkTone: "#535752",
  },
  {
    id: "b4",
    title: "Silverstone",
    category: "melodic",
    bpm: 155,
    key: "A Minor",
    audioUrl: "/audio/b4.m4a",
    artwork: "",
    year: "2026",
    available: true,
    durationSeconds: 124,
    featured: true,
    artworkTone: "#8a8d87",
  },
  {
    id: "b6",
    title: "190E",
    category: "experimental",
    bpm: 140,
    key: "C Minor",
    audioUrl: "/audio/b6.m4a",
    artwork: "",
    year: "2026",
    available: true,
    durationSeconds: 110,
    featured: true,
    artworkTone: "#7d8179",
  },
  {
    id: "costa",
    title: "Mulsanne",
    category: "ambient",
    bpm: 118,
    key: "D Major",
    audioUrl: "/audio/costa.m4a",
    artwork: "",
    year: "2026",
    available: true,
    durationSeconds: 141,
    featured: true,
    artworkTone: "#a9a797",
  },
  {
    id: "invited",
    title: "After Hours",
    category: "dark",
    bpm: 148,
    key: "G Minor",
    audioUrl: "/audio/invited.m4a",
    artwork: "",
    year: "2026",
    available: true,
    durationSeconds: 130,
    featured: true,
    artworkTone: "#8b847a",
  },
  {
    id: "kant-think",
    title: "Costa",
    category: "experimental",
    bpm: 148,
    key: "G Minor",
    audioUrl: "/audio/kant-think.m4a",
    artwork: "",
    year: "2026",
    available: true,
    durationSeconds: 192,
    featured: false,
    artworkTone: "#62665f",
  },
  {
    id: "mike-and-ike",
    title: "Halogen",
    category: "melodic",
    bpm: 130,
    key: "A Minor",
    audioUrl: "/audio/mike-and-ike.mp3",
    artwork: "",
    year: "2026",
    available: true,
    durationSeconds: 121,
    featured: false,
    artworkTone: "#80766c",
  },
  {
    id: "obatala",
    title: "Velour",
    category: "soul",
    bpm: 88,
    key: "Bb Minor",
    audioUrl: "/audio/obatala.m4a",
    artwork: "",
    year: "2026",
    available: true,
    durationSeconds: 124,
    featured: false,
    artworkTone: "#9b9f9b",
  },
  {
    id: "onlyonly",
    title: "North Line",
    category: "ambient",
    bpm: 110,
    key: "C# Minor",
    audioUrl: "/audio/onlyonly.mp3",
    artwork: "",
    year: "2026",
    available: true,
    durationSeconds: 119,
    featured: false,
    artworkTone: "#777970",
  },
  {
    id: "revenge",
    title: "Group A",
    category: "dark",
    bpm: 154,
    key: "E Minor",
    audioUrl: "/audio/revenge.m4a",
    artwork: "",
    year: "2026",
    available: true,
    durationSeconds: 150,
    featured: false,
    artworkTone: "#65635f",
  },
  {
    id: "time-capsule",
    title: "Static Bloom",
    category: "soul",
    bpm: 124,
    key: "D# Minor",
    audioUrl: "/audio/time-capsule.m4a",
    artwork: "",
    year: "2026",
    available: true,
    durationSeconds: 157,
    featured: false,
    artworkTone: "#74716d",
  },
];

export function getFeaturedBeats() {
  return beats.filter((beat) => beat.featured).slice(0, 5);
}
