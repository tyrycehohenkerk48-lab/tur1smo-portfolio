"use client";

import Link from "next/link";
import { useState } from "react";
import type { Beat } from "@/data/beats";
import { beatGenres, type BeatGenre } from "@/data/beats";
import { useAudio } from "./AudioProvider";
import { BrandMonogram, BrandWordmark } from "./BrandMark";

type Filter = "all" | BeatGenre;

function BeatRow({ beat, index, expandable = true }: { beat: Beat; index: number; expandable?: boolean }) {
  const { activeTrack, isPlaying, playTrack } = useAudio();
  const [expanded, setExpanded] = useState(false);
  const isActive = activeTrack?.id === beat.id;

  return (
    <article className={`beat-row ${expanded ? "is-expanded" : ""}`}>
      <div className="beat-main">
        <span className="beat-number">{String(index + 1).padStart(2, "0")}</span>
        <button className="beat-title" type="button" onClick={() => expandable && setExpanded((value) => !value)} aria-expanded={expandable ? expanded : undefined}>
          {beat.title}
        </button>
        <span className="beat-meta">{beat.genre} <i>/</i> {beat.year}</span>
        <span className="beat-duration">{beat.duration}</span>
        <button className="beat-play" type="button" onClick={() => playTrack(beat)} aria-label={`${isActive && isPlaying ? "Pause" : "Play"} ${beat.title}`}>
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
            <small>{beat.genre} / {beat.year}</small>
          </div>
          <dl>
            <div><dt>Tempo</dt><dd>{beat.bpm} BPM</dd></div>
            <div><dt>Key</dt><dd>{beat.musicalKey}</dd></div>
            <div><dt>Credit</dt><dd className="brand-credit">Produced by <BrandWordmark className="inline-brand" /></dd></div>
          </dl>
          <div className="beat-detail-actions">
            <button type="button" onClick={() => playTrack(beat)}>{isActive && isPlaying ? "Pause" : "Play"} <span>↗</span></button>
            <Link href={`/contact?interest=beat&track=${beat.id}`}>Inquire <span>↗</span></Link>
          </div>
        </div>
      ) : null}

      <div className="beat-hover-art" style={{ "--art-tone": beat.artworkTone } as React.CSSProperties} aria-hidden="true">
        {beat.artwork ? <img src={beat.artwork} alt="" /> : <><span>CAT. {String(index + 1).padStart(3, "0")}</span><BrandMonogram className="display-monogram" /></>}
      </div>
    </article>
  );
}

export function BeatList({ items, expandable = true }: { items: Beat[]; expandable?: boolean }) {
  return (
    <div className="beat-list">
      <div className="beat-head" aria-hidden="true">
        <span>No.</span><span>Title</span><span>Genre / Year</span><span>Time</span><span>Play</span><span />
      </div>
      {items.map((beat, index) => <BeatRow key={beat.id} beat={beat} index={index} expandable={expandable} />)}
    </div>
  );
}

export function BeatArchive({ initialGenre = "all", items }: { initialGenre?: Filter; items: Beat[] }) {
  const [filter, setFilter] = useState<Filter>(initialGenre);
  const visibleBeats = filter === "all" ? items : items.filter((beat) => beat.genre === filter);

  return (
    <>
      <div className="beat-filters" aria-label="Filter beats">
        {beatGenres.map((genre) => (
          <button key={genre} type="button" onClick={() => setFilter(genre)} className={filter === genre ? "is-active" : ""} aria-pressed={filter === genre}>
            {genre}
          </button>
        ))}
      </div>
      <div className="archive-count"><span>Archive 048-848</span><span>{String(visibleBeats.length).padStart(2, "0")} records</span></div>
      <BeatList items={visibleBeats} />
    </>
  );
}
