export type ModelingImage = {
  id: string;
  title: string;
  alt: string;
  src: string | null;
  layout: "portrait-large" | "portrait" | "landscape" | "wide" | "tall";
  tone: string;
  position?: string;
};

/**
 * Replace `src: null` with a path such as `/images/modeling/look-01.jpg`.
 * The layout and object position can be changed independently for each photo.
 */
export const modelingImages: ModelingImage[] = [
  { id: "m01", title: "Study 01", alt: "TUR1SMO modeling portrait placeholder", src: null, layout: "portrait-large", tone: "#4d514d" },
  { id: "m02", title: "Study 02", alt: "TUR1SMO fashion landscape placeholder", src: null, layout: "landscape", tone: "#a09d90" },
  { id: "m03", title: "Study 03", alt: "TUR1SMO modeling portrait placeholder", src: null, layout: "portrait", tone: "#6e6c66" },
  { id: "m04", title: "Study 04", alt: "TUR1SMO full-body editorial placeholder", src: null, layout: "tall", tone: "#232522" },
  { id: "m05", title: "Study 05", alt: "TUR1SMO close-up portrait placeholder", src: null, layout: "portrait", tone: "#989488" },
  { id: "m06", title: "Study 06", alt: "TUR1SMO wide fashion editorial placeholder", src: null, layout: "wide", tone: "#555853" },
  { id: "m07", title: "Study 07", alt: "TUR1SMO studio portrait placeholder", src: null, layout: "portrait", tone: "#b0ac9f" },
  { id: "m08", title: "Study 08", alt: "TUR1SMO oversized editorial placeholder", src: null, layout: "portrait-large", tone: "#3c3d39" },
];
