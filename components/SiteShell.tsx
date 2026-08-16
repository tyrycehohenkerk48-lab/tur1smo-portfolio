"use client";

import { AudioProvider } from "./AudioProvider";
import { Header } from "./Header";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <AudioProvider>
      <Header />
      {children}
    </AudioProvider>
  );
}
