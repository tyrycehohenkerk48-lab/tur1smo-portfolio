export const beatGenres = [
  "all",
  "dark",
  "ambient",
  "melodic",
  "experimental",
  "soul",
] as const;

export type BeatGenre = Exclude<(typeof beatGenres)[number], "all">;

export type Beat = {
  id: string;
  title: string;
  genre: BeatGenre;
  year: number;
  duration: string;
  durationSeconds: number;
  bpm: number;
  musicalKey: string;
  audioFile: string;
  artwork: string | null;
  artworkTone: string;
  featured: boolean;
};

/**
 * Add or edit beats here. Media paths are relative to the public folder.
 * Replace the demo WAV paths with your own /audio/filename.mp3 files at any time.
 */
export const beats: Beat[] = [
  {
    id: "silverstone",
    title: "Silverstone",
    genre: "dark",
    year: 2026,
    duration: "02:46",
    durationSeconds: 166,
    bpm: 142,
    musicalKey: "C Minor",
    audioFile: "/audio/tur1smo-demo.wav",
    artwork: null,
    artworkTone: "#7d8179",
    featured: true,
  },
  {
    id: "nightshift",
    title: "Nightshift",
    genre: "dark",
    year: 2026,
    duration: "02:48",
    durationSeconds: 168,
    bpm: 138,
    musicalKey: "F Minor",
    audioFile: "/audio/tur1smo-demo.wav",
    artwork: null,
    artworkTone: "#4d504c",
    featured: true,
  },
  {
    id: "costa",
    title: "Costa",
    genre: "ambient",
    year: 2026,
    duration: "03:12",
    durationSeconds: 192,
    bpm: 118,
    musicalKey: "D Major",
    audioFile: "/audio/tur1smo-demo.wav",
    artwork: null,
    artworkTone: "#a9a797",
    featured: true,
  },
  {
    id: "190e",
    title: "190E",
    genre: "melodic",
    year: 2026,
    duration: "02:37",
    durationSeconds: 157,
    bpm: 130,
    musicalKey: "A Minor",
    audioFile: "/audio/tur1smo-demo.wav",
    artwork: null,
    artworkTone: "#8b847a",
    featured: true,
  },
  {
    id: "after-hours",
    title: "After Hours",
    genre: "soul",
    year: 2026,
    duration: "03:04",
    durationSeconds: 184,
    bpm: 92,
    musicalKey: "E♭ Major",
    audioFile: "/audio/tur1smo-demo.wav",
    artwork: null,
    artworkTone: "#6b665e",
    featured: true,
  },
  {
    id: "mulsanne",
    title: "Mulsanne",
    genre: "experimental",
    year: 2026,
    duration: "02:58",
    durationSeconds: 178,
    bpm: 148,
    musicalKey: "G Minor",
    audioFile: "/audio/tur1smo-demo.wav",
    artwork: null,
    artworkTone: "#62665f",
    featured: false,
  },
  {
    id: "velour",
    title: "Velour",
    genre: "soul",
    year: 2026,
    duration: "03:21",
    durationSeconds: 201,
    bpm: 88,
    musicalKey: "B♭ Minor",
    audioFile: "/audio/tur1smo-demo.wav",
    artwork: null,
    artworkTone: "#80766c",
    featured: false,
  },
  {
    id: "north-line",
    title: "North Line",
    genre: "ambient",
    year: 2026,
    duration: "02:51",
    durationSeconds: 171,
    bpm: 110,
    musicalKey: "C♯ Minor",
    audioFile: "/audio/tur1smo-demo.wav",
    artwork: null,
    artworkTone: "#9b9f9b",
    featured: false,
  },
];

export function getFeaturedBeats() {
  return beats.filter((beat) => beat.featured).slice(0, 5);
}
