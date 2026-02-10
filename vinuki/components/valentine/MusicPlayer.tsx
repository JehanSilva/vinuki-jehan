"use client";

import { useEffect, useRef } from "react";

export default function MusicPlayer({ play }: { play: boolean }) {
  // Audio state
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (play && audioRef.current) {
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(e => console.error("Audio play failed", e));
    }
  }, [play]);

  return (
      <audio 
        ref={audioRef} 
        src="/music/music.mp3" 
        loop
      />
  );
}
