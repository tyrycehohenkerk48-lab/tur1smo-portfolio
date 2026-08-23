"use client";

/* eslint-disable jsx-a11y/media-has-caption -- the player serves instrumental music with no spoken content */

import { createContext, useCallback, useContext, useRef, useState } from "react";
import type { Beat } from "@/data/beats";

type AudioContextValue = {
  activeTrack: Beat | null;
  isPlaying: boolean;
  currentTime: number;
  totalTime: number;
  playbackError: string | null;
  playTrack: (track: Beat) => void;
  togglePlayback: () => void;
  seek: (time: number) => void;
};

const AudioContext = createContext<AudioContextValue | null>(null);

export function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const activeTrackIdRef = useRef<string | null>(null);
  const lastAudibleVolumeRef = useRef(1);
  const [activeTrack, setActiveTrack] = useState<Beat | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [mediaDuration, setMediaDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackError, setPlaybackError] = useState<string | null>(null);

  const startPlayback = useCallback((track: Beat, audio: HTMLAudioElement) => {
    const requestedTrackId = track.id;
    void audio.play()
      .then(() => {
        if (activeTrackIdRef.current === requestedTrackId) setIsPlaying(true);
      })
      .catch(() => {
        if (activeTrackIdRef.current !== requestedTrackId) return;
        setIsPlaying(false);
        setPlaybackError("Preview unavailable");
      });
  }, []);

  const playTrack = useCallback(
    (track: Beat) => {
      const audio = audioRef.current;
      if (!audio || !track.available || !track.audioUrl) {
        setPlaybackError("Preview unavailable");
        return;
      }

      if (activeTrackIdRef.current === track.id) {
        setPlaybackError(null);
        if (audio.paused) startPlayback(track, audio);
        else audio.pause();
        return;
      }

      audio.pause();
      activeTrackIdRef.current = track.id;
      setActiveTrack(track);
      setCurrentTime(0);
      setMediaDuration(track.durationSeconds);
      setPlaybackError(null);
      audio.src = track.audioUrl;
      audio.currentTime = 0;
      audio.load();
      startPlayback(track, audio);
    },
    [startPlayback],
  );

  const togglePlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !activeTrack) return;
    if (audio.paused) startPlayback(activeTrack, audio);
    else audio.pause();
  }, [activeTrack, startPlayback]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const safeTime = Math.max(0, Math.min(time, Number.isFinite(audio.duration) ? audio.duration : time));
    audio.currentTime = safeTime;
    setCurrentTime(safeTime);
  }, []);

  const changeVolume = useCallback((nextVolume: number) => {
    const safeVolume = Math.max(0, Math.min(nextVolume, 1));
    if (safeVolume > 0) lastAudibleVolumeRef.current = safeVolume;
    if (audioRef.current) audioRef.current.volume = safeVolume;
    setVolume(safeVolume);
  }, []);

  const toggleMute = useCallback(() => {
    changeVolume(volume > 0 ? 0 : lastAudibleVolumeRef.current);
  }, [changeVolume, volume]);

  const totalTime = mediaDuration || activeTrack?.durationSeconds || 0;

  return (
    <AudioContext.Provider
      value={{ activeTrack, isPlaying, currentTime, totalTime, playbackError, playTrack, togglePlayback, seek }}
    >
      {children}
      <audio
        ref={audioRef}
        preload="metadata"
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => {
          if (Number.isFinite(event.currentTarget.duration) && event.currentTarget.duration > 0) {
            setMediaDuration(event.currentTarget.duration);
          }
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => {
          setIsPlaying(false);
          setPlaybackError("Preview unavailable");
        }}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
      />
      {activeTrack ? (
        <aside className="persistent-player" aria-label="Audio player">
          <button className="player-toggle" type="button" onClick={togglePlayback} aria-label={isPlaying ? `Pause ${activeTrack.title}` : `Play ${activeTrack.title}`}>
            {isPlaying ? <span className="pause-glyph" aria-hidden="true" /> : <span aria-hidden="true">▶</span>}
          </button>
          <div className="player-track">
            <span className="player-title">{activeTrack.title}</span>
            <span className="player-credit">— {activeTrack.category} / {activeTrack.bpm} BPM</span>
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
          <div className="player-volume">
            <button type="button" onClick={toggleMute} aria-label={volume > 0 ? "Mute audio" : "Unmute audio"}>
              {volume > 0 ? "VOL" : "MUTE"}
            </button>
            <input
              id="player-volume"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(event) => changeVolume(Number(event.target.value))}
              aria-label="Volume"
              style={{ "--volume": `${volume * 100}%` } as React.CSSProperties}
            />
            <output className="player-volume-value" htmlFor="player-volume" aria-live="polite">
              {Math.round(volume * 100)}%
            </output>
          </div>
          <span className="player-status" aria-live="polite">{playbackError ?? ""}</span>
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
