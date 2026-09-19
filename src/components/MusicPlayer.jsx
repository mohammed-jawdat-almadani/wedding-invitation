import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function MusicPlayer({ autoPlay, data }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.volume = 0.7;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay blocked until direct click
            setIsPlaying(false);
          });
      }
    }
  }, [autoPlay]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/assets/bg_music.mp3"
        loop
        preload="auto"
      />

      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={togglePlay}
          type="button"
          aria-label={isPlaying ? data.controls.musicOn : data.controls.musicOff}
          className="relative w-12 h-12 rounded-full border border-gold-400/60 bg-cream-100/90 backdrop-blur-md shadow-[0_4px_18px_rgba(114,99,81,0.22)] flex items-center justify-center text-gold-600 transition-all duration-300 hover:scale-105 active:scale-95 group"
        >
          {isPlaying ? (
            <div className="flex items-end gap-[3px] h-4">
              <span className="w-[3px] bg-gold-500 rounded-full animate-[barBounce1_1.2s_ease-in-out_infinite]" />
              <span className="w-[3px] bg-gold-500 rounded-full animate-[barBounce2_1.2s_ease-in-out_infinite]" />
              <span className="w-[3px] bg-gold-500 rounded-full animate-[barBounce3_1.2s_ease-in-out_infinite]" />
            </div>
          ) : (
            <VolumeX className="w-5 h-5 text-[#8C7330]/70 group-hover:text-[#8C7330]" />
          )}

          {/* Subtle gold ring ripple when playing */}
          {isPlaying && (
            <span className="absolute -inset-1 rounded-full border border-gold-400/40 animate-ping pointer-events-none opacity-40" />
          )}
        </button>
      </div>
    </>
  );
}
