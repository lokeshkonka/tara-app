import { useCallback, useEffect, useRef } from "react";
import {
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";
import type { AudioSource } from "expo-audio";

export interface UseTaraAudioOptions {
  onStart?: () => void;
  onEnd?: () => void;
}

export interface TaraAudio {
  isPlaying: boolean;
  duration: number | null;
  play: () => void;
  stop: () => void;
}

export function useTaraAudio(
  source?: AudioSource,
  options?: UseTaraAudioOptions
): TaraAudio {
  const player = useAudioPlayer(source, {
    updateInterval: 500,
  });
  const status = useAudioPlayerStatus(player);
  const isPlaying = status.playing;
  const duration = typeof status.duration === "number" ? status.duration : null;

  const wasPlayingRef = useRef(isPlaying);
  const optionsRef = useRef(options);
  const statusRef = useRef(status);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    setAudioModeAsync({ playsInSilentMode: true }).catch(() => {});
  }, []);

  useEffect(() => {
    if (isPlaying !== wasPlayingRef.current) {
      wasPlayingRef.current = isPlaying;
      if (isPlaying) {
        optionsRef.current?.onStart?.();
      } else {
        optionsRef.current?.onEnd?.();
      }
    }
  }, [isPlaying]);

  const play = useCallback(() => {
    if (!source) return;
    try {
      if (statusRef.current.currentTime && statusRef.current.currentTime > 0) {
        player.seekTo(0);
      }
      player.play();
    } catch {
      // Ignore transient audio error
    }
  }, [player, source]);

  const stop = useCallback(() => {
    try {
      player.pause();
    } catch {
      // Ignore transient audio release error
    }
  }, [player]);

  return { isPlaying, duration, play, stop };
}
