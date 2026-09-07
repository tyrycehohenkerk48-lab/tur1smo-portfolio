export type MusicRelease = {
  id: string;
  title: string;
  artist: string;
  year: string;
  coverArt: string;
  releaseType: string;
  spotifyUrl: string;
  appleMusicUrl: string;
  soundcloudUrl: string;
};

/**
 * Add cover artwork to `public/releases`, then copy one object below and update
 * its details. Leave a streaming URL empty to hide that platform link.
 */
export const musicReleases: MusicRelease[] = [
  {
    id: "release-001",
    title: "Release 001",
    artist: "TUR1SMO",
    year: "2026",
    coverArt: "/releases/watermark-kover.jpeg",
    releaseType: "Single",
    spotifyUrl: "https://open.spotify.com/track/0dS1o1hdZslQJ12Pbu9wgF?si=8903bdcafd04493f",
    appleMusicUrl: "",
    soundcloudUrl: "",
  },
  {
    id: "release-002",
    title: "Release 002",
    artist: "TUR1SMO",
    year: "2026",
    coverArt: "",
    releaseType: "EP",
    spotifyUrl: "",
    appleMusicUrl: "",
    soundcloudUrl: "",
  },
  {
    id: "release-003",
    title: "Release 003",
    artist: "TUR1SMO",
    year: "2026",
    coverArt: "",
    releaseType: "Single",
    spotifyUrl: "",
    appleMusicUrl: "",
    soundcloudUrl: "",
  },
];
