"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollVideoProps {
  src: string;
  className?: string;
  poster?: string;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  autoPlayOnView?: boolean;
}

export default function ScrollVideo({
  src,
  className = "",
  poster,
  muted = true,
  loop = true,
  controls = false,
  autoPlayOnView = true,
}: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (autoPlayOnView) {
            video.play().catch(() => {});
          }
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [autoPlayOnView]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  const mostrarBotonPersonalizado = controls && !isPlaying;

  return (
    <div className="relative">
      <video
        ref={videoRef}
        muted={muted}
        loop={loop}
        playsInline
        controls={controls}
        poster={poster}
        className={className}
      >
        <source src={src} type="video/mp4" />
      </video>

      {mostrarBotonPersonalizado && (
        <button
          onClick={() => videoRef.current?.play()}
          aria-label="Reproducir video"
          className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity hover:bg-black/40"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#c9a24b] bg-[#1a0505]/90 shadow-[0_0_25px_8px_rgba(201,162,75,0.4)]">
            <svg viewBox="0 0 24 24" className="ml-1 h-9 w-9 fill-[#c9a24b]">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
