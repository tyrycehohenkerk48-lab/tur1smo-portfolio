import { BrandMonogram } from "./BrandMark";
import { musicReleases, type MusicRelease } from "@/data/releases";

const placeholderTones = ["#4d514d", "#89877d", "#30322f"];

function releaseLinks(release: MusicRelease) {
  return [
    { label: "Spotify", url: release.spotifyUrl },
    { label: "Apple Music", url: release.appleMusicUrl },
    { label: "SoundCloud", url: release.soundcloudUrl },
  ].filter((link) => Boolean(link.url));
}

export function ReleaseArchive() {
  return (
    <section className="release-archive" aria-labelledby="selected-releases-title">
      <header className="release-archive-heading">
        <span>02.2 / Music</span>
        <h2 id="selected-releases-title">Selected<br />Releases</h2>
        <p>Latest work<br />Direct listening</p>
      </header>

      <div className="release-grid">
        {musicReleases.map((release, index) => {
          const links = releaseLinks(release);
          return (
            <figure className="release-item" key={release.id}>
              <div className="release-cover">
                {release.coverArt ? (
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
                )}
              </div>

              <figcaption>
                <div className="release-caption-main">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{release.title}</h3>
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
  );
}
