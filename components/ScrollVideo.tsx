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
  const [isMuted, setIsMuted] = useState(muted);
  const [progreso, setProgreso] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const intentarReproducir = () => {
      const p = video.play();
      if (p !== undefined) {
        p.catch(() => {});
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (autoPlayOnView) intentarReproducir();
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    // Reintentar cuando el video termine de cargar datos (ayuda en mobile)
    const onLoadedData = () => {
      if (autoPlayOnView && video.getBoundingClientRect().top < window.innerHeight) {
        intentarReproducir();
      }
    };
    video.addEventListener("loadeddata", onLoadedData);

    // Reintentar si el navegador lo pausa solo (throttling, ahorro de datos, etc)
    const onPause = () => {
      if (autoPlayOnView) {
        const rect = video.getBoundingClientRect();
        const visible = rect.top < window.innerHeight && rect.bottom > 0;
        if (visible) intentarReproducir();
      }
    };
    if (!controls) {
      video.addEventListener("pause", onPause);
    }

    return () => {
      observer.disconnect();
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("pause", onPause);
    };
  }, [autoPlayOnView, controls]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !controls) return;

    const onPlay = () => setIsPlaying(true);
    const onPauseUi = () => setIsPlaying(false);

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPauseUi);
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPauseUi);
    };
  }, [controls]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play();
    else video.pause();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const buscar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const nuevoProgreso = Number(e.target.value);
    video.currentTime = (nuevoProgreso / 100) * video.duration;
    setProgreso(nuevoProgreso);
  };

  if (!controls) {
    return (
      <video
        ref={(el) => {
          videoRef.current = el;
          if (el) el.playbackRate = 0.5;
        }}
        muted
        autoPlay
        loop={loop}
        playsInline
        preload="auto"
        className={className}
      >
        <source src={src} type="video/mp4" />
      </video>
    );
  }

  return (
    <div className="relative">
      <video
        ref={videoRef}
        muted={isMuted}
        loop={loop}
        playsInline
        poster={poster}
        className={className}
        onClick={togglePlay}
      >
        <source src={src} type="video/mp4" />
      </video>

      {!isPlaying && (
        <button
          onClick={togglePlay}
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

      <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/80 to-transparent px-4 py-3">
        <button onClick={togglePlay} aria-label={isPlaying ? "Pausar" : "Reproducir"} className="text-[#c9a24b]">
          {isPlaying ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current"><path d="M8 5v14l11-7z" /></svg>
          )}
        </button>

        <input
          type="range"
          min={0}
          max={100}
          value={progreso}
          onChange={buscar}
          className="h-1 flex-1 cursor-pointer accent-[#c9a24b]"
        />

        <button onClick={toggleMute} aria-label={isMuted ? "Activar sonido" : "Silenciar"} className="text-[#c9a24b]">
          {isMuted ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current"><path d="M16.5 12A4.5 4.5 0 0014 8v1.5a3 3 0 010 5v1.5a4.5 4.5 0 002.5-4zM5 9v6h4l5 5V4L9 9H5z" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current"><path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2A4.5 4.5 0 0014 7.5v9a4.5 4.5 0 002.5-4.5z" /></svg>
          )}
        </button>
      </div>
    </div>
  );
}
