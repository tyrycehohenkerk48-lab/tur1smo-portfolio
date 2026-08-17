"use client";

/* eslint-disable jsx-a11y/media-has-caption -- the player serves instrumental music with no spoken content */

import { createContext, useCallback, useContext, useRef, useState } from "react";
import type { Beat } from "@/data/beats";
import { BrandWordmark } from "./BrandMark";

type AudioContextValue = {
  activeTrack: Beat | null;
  isPlaying: boolean;
  currentTime: number;
  totalTime: number;
  playTrack: (track: Beat) => void;
  togglePlayback: () => void;
  seek: (time: number) => void;
};

const AudioContext = createContext<AudioContextValue | null>(null);

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [activeTrack, setActiveTrack] = useState<Beat | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [mediaDuration, setMediaDuration] = useState(0);

  const playTrack = useCallback(
    (track: Beat) => {
      const audio = audioRef.current;
      if (!audio) return;

      if (activeTrack?.id === track.id) {
        if (audio.paused) {
          void audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
        } else {
          audio.pause();
          setIsPlaying(false);
        }
        return;
      }

      setActiveTrack(track);
      setCurrentTime(0);
      setMediaDuration(track.durationSeconds);
      audio.src = track.audioFile;
      audio.load();
      void audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    },
    [activeTrack],
  );

  const togglePlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !activeTrack) return;
    if (audio.paused) {
      void audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [activeTrack]);

  const seek = useCallback((time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  const totalTime = mediaDuration || activeTrack?.durationSeconds || 0;

  return (
    <AudioContext.Provider
      value={{ activeTrack, isPlaying, currentTime, totalTime, playTrack, togglePlayback, seek }}
    >
      {children}
      <audio
        ref={audioRef}
        preload="metadata"
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => {
          if (Number.isFinite(event.currentTarget.duration)) setMediaDuration(event.currentTarget.duration);
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
      />
      {activeTrack ? (
        <aside className="persistent-player" aria-label="Audio player">
          <button className="player-toggle" type="button" onClick={togglePlayback} aria-label={isPlaying ? "Pause current track" : "Play current track"}>
            <span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
          </button>
          <div className="player-track">
            <span className="player-title">{activeTrack.title}</span>
            <span className="player-credit">— <BrandWordmark className="inline-brand" /></span>
          </div>
          <span className="player-time">{formatTime(currentTime)}</span>
          <input
            className="player-seek"
            type="range"
            min="0"
            max={Math.max(totalTime, 1)}
            step="0.1"
            value={Math.min(currentTime, totalTime || 1)}
            onChange={(event) => seek(Number(event.target.value))}
            aria-label={`Seek through ${activeTrack.title}`}
            style={{ "--progress": `${totalTime ? (currentTime / totalTime) * 100 : 0}%` } as React.CSSProperties}
          />
          <span className="player-time">{formatTime(totalTime)}</span>
        </aside>
      ) : null}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const value = useContext(AudioContext);
  if (!value) throw new Error("useAudio must be used inside AudioProvider");
  return value;
}
