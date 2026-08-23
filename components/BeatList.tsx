"use client";

import { useState } from "react";
import type { Beat } from "@/data/beats";
import { beatCategories, type BeatCategory } from "@/data/beats";
import { formatTime, useAudio } from "./AudioProvider";
import { BrandMonogram, BrandWordmark } from "./BrandMark";
import { RouteLink } from "./RouteLink";

type Filter = "all" | BeatCategory;
type BeatListMode = "compact" | "library";

function BeatArtwork({ beat, index }: { beat: Beat; index: number }) {
  return (
    <div className="beat-hover-art" style={{ "--art-tone": beat.artworkTone } as React.CSSProperties} aria-hidden="true">
      {beat.artwork ? <img src={beat.artwork} alt="" /> : <><span>CAT. {String(index + 1).padStart(3, "0")}</span><BrandMonogram className="display-monogram" /></>}
    </div>
  );
}

function LibraryBeatRow({ beat, index }: { beat: Beat; index: number }) {
  const { activeTrack, isPlaying, currentTime, totalTime, playbackError, playTrack, seek } = useAudio();
  const isActive = activeTrack?.id === beat.id;
  const isPlayable = beat.available && Boolean(beat.audioUrl);
  const elapsed = isActive ? currentTime : 0;
  const duration = isActive ? totalTime : beat.durationSeconds;
  const progress = duration ? (elapsed / duration) * 100 : 0;

  return (
    <article className={`beat-row beat-row-library ${isActive ? "is-active" : ""}`} data-beat-id={beat.id}>
      <div className="beat-library-main">
        <button
          className="beat-play"
          type="button"
          onClick={() => playTrack(beat)}
          disabled={!isPlayable}
          aria-label={`${isActive && isPlaying ? "Pause" : "Play"} ${beat.title}`}
        >
          <span aria-hidden="true">{isActive && isPlaying ? "Ⅱ" : "▶"}</span>
        </button>
        <span className="beat-number">{String(index + 1).padStart(2, "0")}</span>
        <div className="beat-library-identity">
          <button className="beat-title" type="button" onClick={() => playTrack(beat)} disabled={!isPlayable}>
            {beat.title}
          </button>
          <span className="beat-library-subline">{beat.category} <i>/</i> {beat.year} <i>/</i> {beat.available ? "available" : "unavailable"}</span>
        </div>
        <span className="beat-bpm">{beat.bpm} BPM</span>
        <span className="beat-key">{beat.key}</span>
        <span className="beat-duration">{formatTime(duration)}</span>
      </div>

      <div className="beat-inline-player">
        <span className="beat-inline-state" aria-live="polite">
          {isActive && playbackError ? playbackError : isActive ? (isPlaying ? "Playing" : "Paused") : "Preview"}
        </span>
        <input
          className="beat-inline-seek"
          type="range"
          min="0"
          max={Math.max(duration, 1)}
          step="0.1"
          value={Math.min(elapsed, duration || 1)}
          disabled={!isActive}
          onChange={(event) => seek(Number(event.target.value))}
          aria-label={`Seek through ${beat.title}`}
          style={{ "--progress": `${progress}%` } as React.CSSProperties}
        />
        <span className="beat-inline-time">{formatTime(elapsed)} / {formatTime(duration)}</span>
      </div>

      {beat.artwork ? <BeatArtwork beat={beat} index={index} /> : null}
    </article>
  );
}

function CompactBeatRow({ beat, index, expandable = true }: { beat: Beat; index: number; expandable?: boolean }) {
  const { activeTrack, isPlaying, playTrack } = useAudio();
  const [expanded, setExpanded] = useState(false);
  const isActive = activeTrack?.id === beat.id;
  const isPlayable = beat.available && Boolean(beat.audioUrl);

  return (
    <article className={`beat-row ${expanded ? "is-expanded" : ""} ${isActive ? "is-active" : ""}`}>
      <div className="beat-main">
        <span className="beat-number">{String(index + 1).padStart(2, "0")}</span>
        <button className="beat-title" type="button" onClick={() => expandable && setExpanded((value) => !value)} aria-expanded={expandable ? expanded : undefined}>
          {beat.title}
        </button>
        <span className="beat-meta">{beat.category} <i>/</i> {beat.year}</span>
        <span className="beat-duration">{formatTime(beat.durationSeconds)}</span>
        <button className="beat-play" type="button" onClick={() => playTrack(beat)} disabled={!isPlayable} aria-label={`${isActive && isPlaying ? "Pause" : "Play"} ${beat.title}`}>
          <span aria-hidden="true">{isActive && isPlaying ? "Ⅱ" : "▶"}</span>
        </button>
        {expandable ? (
          <button className="beat-expand" type="button" onClick={() => setExpanded((value) => !value)} aria-label={`${expanded ? "Hide" : "Show"} details for ${beat.title}`} aria-expanded={expanded}>
            <span aria-hidden="true">{expanded ? "−" : "+"}</span>
          </button>
        ) : null}
      </div>

      {expandable ? (
        <div className="beat-details" aria-hidden={!expanded}>
          <div className="beat-detail-title">
            <span>{beat.title}</span>
            <small>{beat.category} / {beat.year}</small>
          </div>
          <dl>
            <div><dt>Tempo</dt><dd>{beat.bpm} BPM</dd></div>
            <div><dt>Key</dt><dd>{beat.key}</dd></div>
            <div><dt>Credit</dt><dd className="brand-credit">Produced by <BrandWordmark className="inline-brand" /></dd></div>
          </dl>
          <div className="beat-detail-actions">
            <button type="button" onClick={() => playTrack(beat)}>{isActive && isPlaying ? "Pause" : "Play"} <span>↗</span></button>
            <RouteLink href={`/contact?interest=beat&track=${beat.id}`}>Inquire <span>↗</span></RouteLink>
          </div>
        </div>
      ) : null}

      <BeatArtwork beat={beat} index={index} />
    </article>
  );
}

export function BeatList({ items, expandable = true, mode = "compact" }: { items: Beat[]; expandable?: boolean; mode?: BeatListMode }) {
  return (
    <div className={`beat-list beat-list-${mode}`}>
      {mode === "library" ? (
        <div className="beat-library-head" aria-hidden="true">
          <span>Play</span><span>No.</span><span>Title / Category</span><span>Tempo</span><span>Key</span><span>Time</span>
        </div>
      ) : (
        <div className="beat-head" aria-hidden="true">
          <span>No.</span><span>Title</span><span>Category / Year</span><span>Time</span><span>Play</span><span />
        </div>
      )}
      {items.map((beat, index) => mode === "library"
        ? <LibraryBeatRow key={beat.id} beat={beat} index={index} />
        : <CompactBeatRow key={beat.id} beat={beat} index={index} expandable={expandable} />)}
    </div>
  );
}

export function BeatArchive({ initialCategory = "all", items }: { initialCategory?: Filter; items: Beat[] }) {
  const [filter, setFilter] = useState<Filter>(initialCategory);
  const visibleBeats = filter === "all" ? items : items.filter((beat) => beat.category === filter);

  return (
    <>
      <div className="beat-filters" role="toolbar" aria-label="Filter beats by category">
        {beatCategories.map((category) => (
          <button key={category} type="button" onClick={() => setFilter(category)} className={filter === category ? "is-active" : ""} aria-pressed={filter === category}>
            {category}
          </button>
        ))}
      </div>
      <div className="archive-count" aria-live="polite"><span>Archive 048-848</span><span>{String(visibleBeats.length).padStart(2, "0")} records</span></div>
      <div className="beat-results" key={filter}>
        <BeatList items={visibleBeats} mode="library" />
      </div>
    </>
  );
}
