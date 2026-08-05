"use client";

import { useEffect, useRef } from "react";

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

  return (
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
  );
}
