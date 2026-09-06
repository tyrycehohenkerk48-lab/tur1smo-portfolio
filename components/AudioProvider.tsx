"use client";

/* eslint-disable jsx-a11y/media-has-caption -- the player serves instrumental music with no spoken content */

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
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
  getAnalyser: () => AnalyserNode | null;
};

const AudioContext = createContext<AudioContextValue | null>(null);

export function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

function PlayerSpectrum() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { getAnalyser, isPlaying } = useAudio();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const barCount = 42;
    const levels = new Float32Array(barCount);
    let frequencyData: Uint8Array<ArrayBuffer> | null = null;
    let animationFrame = 0;

    const draw = () => {
      const bounds = canvas.getBoundingClientRect();
      const width = Math.max(1, bounds.width);
      const height = Math.max(1, bounds.height);
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const nextWidth = Math.round(width * pixelRatio);
      const nextHeight = Math.round(height * pixelRatio);

      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth;
        canvas.height = nextHeight;
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      }

      context.clearRect(0, 0, width, height);
      const analyser = getAnalyser();
      if (analyser) {
        if (!frequencyData || frequencyData.length !== analyser.frequencyBinCount) {
          frequencyData = new Uint8Array(analyser.frequencyBinCount);
        }
        analyser.getByteFrequencyData(frequencyData);
      }

      const gap = Math.max(2, width / 170);
      const barWidth = Math.max(1, (width - gap * (barCount - 1)) / barCount);
      context.fillStyle = getComputedStyle(canvas).color;

      for (let index = 0; index < barCount; index += 1) {
        const frequencyIndex = frequencyData
          ? Math.min(
              frequencyData.length - 1,
              Math.floor(Math.pow(index / (barCount - 1), 1.55) * frequencyData.length),
            )
          : 0;
        const target = isPlaying && frequencyData ? frequencyData[frequencyIndex] / 255 : 0;
        const response = target > levels[index] ? 0.48 : 0.12;
        levels[index] += (target - levels[index]) * response;
        const barHeight = levels[index] > 0.012
          ? Math.max(1, Math.pow(levels[index], 1.25) * (height - 4))
          : 0;
        const x = index * (barWidth + gap);
        context.globalAlpha = 0.22 + levels[index] * 0.72;
        if (barHeight) context.fillRect(x, (height - barHeight) / 2, barWidth, barHeight);
      }

      context.globalAlpha = 1;
      if (isPlaying || levels.some((level) => level > 0.012)) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    draw();
    return () => window.cancelAnimationFrame(animationFrame);
  }, [getAnalyser, isPlaying]);

  return <canvas ref={canvasRef} className="player-spectrum" aria-hidden="true" />;
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const activeTrackIdRef = useRef<string | null>(null);
  const lastAudibleVolumeRef = useRef(1);
  const [activeTrack, setActiveTrack] = useState<Beat | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [mediaDuration, setMediaDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackError, setPlaybackError] = useState<string | null>(null);

  const ensureAnalyser = useCallback((audio: HTMLAudioElement) => {
    if (analyserRef.current) {
      if (audioContextRef.current?.state === "suspended") void audioContextRef.current.resume();
      return analyserRef.current;
    }

    const AudioContextConstructor = window.AudioContext
      ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextConstructor) return null;

    try {
      const audioContext = new AudioContextConstructor();
      const analyser = audioContext.createAnalyser();
      const mediaSource = audioContext.createMediaElementSource(audio);
      analyser.fftSize = 128;
      analyser.minDecibels = -88;
      analyser.maxDecibels = -18;
      analyser.smoothingTimeConstant = 0.82;
      mediaSource.connect(analyser);
      analyser.connect(audioContext.destination);
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      mediaSourceRef.current = mediaSource;
      if (audioContext.state === "suspended") void audioContext.resume();
      return analyser;
    } catch {
      return null;
    }
  }, []);

  const getAnalyser = useCallback(() => analyserRef.current, []);

  useEffect(() => () => {
    mediaSourceRef.current?.disconnect();
    analyserRef.current?.disconnect();
    if (audioContextRef.current?.state !== "closed") void audioContextRef.current?.close();
  }, []);

  const startPlayback = useCallback((track: Beat, audio: HTMLAudioElement) => {
    const requestedTrackId = track.id;
    ensureAnalyser(audio);
    void audio.play()
      .then(() => {
        if (activeTrackIdRef.current === requestedTrackId) setIsPlaying(true);
      })
      .catch(() => {
        if (activeTrackIdRef.current !== requestedTrackId) return;
        setIsPlaying(false);
        setPlaybackError("Preview unavailable");
      });
  }, [ensureAnalyser]);

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
      value={{ activeTrack, isPlaying, currentTime, totalTime, playbackError, playTrack, togglePlayback, seek, getAnalyser }}
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
          <div className="player-seek-wrap">
            <PlayerSpectrum />
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
          </div>
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
