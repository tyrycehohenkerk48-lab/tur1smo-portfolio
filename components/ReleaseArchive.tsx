"use client";

import { useEffect, useRef, useState } from "react";
import { BrandMonogram, BrandWordmark } from "./BrandMark";
import { musicReleases, type MusicRelease } from "@/data/releases";

const placeholderTones = ["#4d514d", "#89877d", "#30322f"];
const visibleReleases = musicReleases.filter((release) => Boolean(release.coverArt));

function releaseLinks(release: MusicRelease) {
  return [
    { label: "Spotify", url: release.spotifyUrl },
    { label: "Apple Music", url: release.appleMusicUrl },
    { label: "SoundCloud", url: release.soundcloudUrl },
  ].filter((link) => Boolean(link.url));
}

function ReleaseArtwork({ release, index }: { release: MusicRelease; index: number }) {
  return release.coverArt ? (
    <img src={release.coverArt} alt={`${release.title} by ${release.artist} cover artwork`} />
  ) : (
    <div
      className="media-placeholder release-cover-placeholder"
      style={{ "--media-tone": placeholderTones[index % placeholderTones.length] } as React.CSSProperties}
      role="img"
      aria-label={`Cover artwork placeholder for ${release.title}`}
    >
      <span>Release / {String(index + 1).padStart(2, "0")}</span>
      <BrandMonogram className="display-monogram" />
      <small>Place cover art / 3000 × 3000</small>
    </div>
  );
}

export function ReleaseArchive() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const activeRelease = activeIndex === null ? null : visibleReleases[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;
    const openedButton = openerRef.current;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
    };
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      openedButton?.focus();
    };
  }, [activeIndex]);

  return (
    <>
      <section className="release-archive" aria-labelledby="selected-releases-title">
        <header className="release-archive-heading">
          <span>02.1 / Music</span>
          <h2 id="selected-releases-title">Selected<br />Releases</h2>
          <p>Latest work<br />Direct listening</p>
        </header>

        <div className="release-grid">
          {visibleReleases.map((release, index) => {
            const links = releaseLinks(release);
            return (
              <figure className="release-item" key={release.id}>
                <button
                  className="release-cover"
                  type="button"
                  onClick={(event) => {
                    openerRef.current = event.currentTarget;
                    setActiveIndex(index);
                  }}
                  aria-haspopup="dialog"
                  aria-label={`Open details for ${release.title}`}
                >
                  <ReleaseArtwork release={release} index={index} />
                </button>

                <figcaption>
                  <div className="release-caption-main">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>
                      <button
                        className="release-title-button"
                        type="button"
                        onClick={(event) => {
                          openerRef.current = event.currentTarget;
                          setActiveIndex(index);
                        }}
                        aria-haspopup="dialog"
                        aria-label={`Open details for ${release.title}`}
                      >
                        {release.title}
                      </button>
                    </h3>
                  </div>
                  <div className="release-meta">
                    <span>{release.artist}</span>
                    <span>{release.releaseType} / {release.year}</span>
                  </div>
                  {links.length ? (
                    <nav className="release-links" aria-label={`Listen to ${release.title}`}>
                      {links.map((link) => (
                        <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
                          {link.label} <span aria-hidden="true">↗</span>
                        </a>
                      ))}
                    </nav>
                  ) : null}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </section>

      {activeRelease && activeIndex !== null ? (
        <div
          className="release-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="release-dialog-title"
          aria-describedby="release-dialog-bio"
        >
          <div className="release-dialog-panel">
            <header className="release-dialog-top">
              <span className="brand-credit"><BrandWordmark className="inline-brand" /> / Selected Releases</span>
              <button ref={closeButtonRef} type="button" onClick={() => setActiveIndex(null)}>Close</button>
            </header>

            <div className="release-dialog-content">
              <div className="release-dialog-art">
                <ReleaseArtwork release={activeRelease} index={activeIndex} />
              </div>

              <div className="release-dialog-copy">
                <span className="release-dialog-index">Release / {String(activeIndex + 1).padStart(2, "0")}</span>
                <h3 id="release-dialog-title">{activeRelease.title}</h3>
                <p className="release-dialog-meta">{activeRelease.artist} / {activeRelease.releaseType} / {activeRelease.year}</p>
                <div className="release-dialog-notes">
                  <span>Release notes</span>
                  <p id="release-dialog-bio">{activeRelease.bio || "Release bio coming soon."}</p>
                </div>
                {releaseLinks(activeRelease).length ? (
                  <nav className="release-dialog-links" aria-label={`Listen to ${activeRelease.title}`}>
                    {releaseLinks(activeRelease).map((link) => (
                      <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
                        {link.label} <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </nav>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
