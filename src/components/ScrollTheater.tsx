"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { chapterOpacity, frameSrc, site } from "@/lib/site";

const FRAME_COUNT = site.film.frameCount;

export function ScrollTheater() {
  const trackRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<Array<HTMLImageElement | null>>(
    Array.from({ length: FRAME_COUNT }, () => null),
  );
  const targetRef = useRef(0);
  const playheadRef = useRef(0);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const frames = imagesRef.current;
    for (let i = 0; i < FRAME_COUNT; i += 1) {
      const img = new Image();
      img.decoding = "async";
      img.src = frameSrc(i);
      frames[i] = img;
    }

    const drawCover = (
      ctx: CanvasRenderingContext2D,
      image: CanvasImageSource,
      width: number,
      height: number,
    ) => {
      const iw =
        "naturalWidth" in image && image.naturalWidth
          ? image.naturalWidth
          : (image as HTMLImageElement).width;
      const ih =
        "naturalHeight" in image && image.naturalHeight
          ? image.naturalHeight
          : (image as HTMLImageElement).height;
      if (!iw || !ih) return;
      const scale = Math.max(width / iw, height / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      ctx.drawImage(image, (width - dw) / 2, (height - dh) / 2, dw, dh);
    };

    const paint = (playhead: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const pixelW = Math.floor(width * dpr);
      const pixelH = Math.floor(height * dpr);
      if (canvas.width !== pixelW || canvas.height !== pixelH) {
        canvas.width = pixelW;
        canvas.height = pixelH;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);

      const index = Math.round(
        Math.min(Math.max(playhead, 0), FRAME_COUNT - 1),
      );
      const image = frames[index];
      if (image && image.complete && image.naturalWidth) {
        ctx.globalAlpha = 1;
        drawCover(ctx, image, width, height);
      }
    };

    let raf = 0;
    const tick = () => {
      const target = targetRef.current;
      let current = playheadRef.current;
      const delta = target - current;
      const distance = Math.abs(delta);

      if (distance < 0.45) {
        current = Math.round(target);
      } else {
        current += Math.sign(delta);
      }

      playheadRef.current = current;
      paint(current);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    const onResize = () => paint(playheadRef.current);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setProgress(value);
    targetRef.current = value * (FRAME_COUNT - 1);
  });

  const heroOpacity =
    progress < 0.08 ? 1 : Math.max(0, 1 - (progress - 0.08) / 0.07);

  return (
    <section id="forma" ref={trackRef} className="relative h-[380vh] bg-ink">
      <div className="sticky top-0 h-screen overflow-hidden bg-ink">
        <img
          src={frameSrc(0)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink/75" />

        <div
          className="absolute bottom-10 left-5 z-10 max-w-xl md:bottom-14 md:left-8"
          style={{ opacity: heroOpacity }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-solare">
            {site.brand.tagline}
          </p>
          <h1 className="mt-3 font-display text-6xl font-extrabold uppercase leading-[0.85] tracking-tight text-paper md:text-8xl">
            {site.brand.product}
          </h1>
          <p className="mt-4 text-sm font-medium text-mute">
            {site.brand.variant} · {site.brand.detail}
          </p>
        </div>

        {site.chapters.map((chapter) => {
          const opacity = chapterOpacity(progress, chapter.start, chapter.end);
          return (
            <article
              key={chapter.id}
              className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-ink via-ink/80 to-transparent px-5 py-10 md:inset-x-auto md:bottom-14 md:left-0 md:max-w-lg md:bg-gradient-to-r md:from-ink/90 md:via-ink/55 md:to-transparent md:px-8 md:py-8"
              style={{
                opacity,
                pointerEvents: opacity > 0.2 ? "auto" : "none",
              }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-solare">
                {chapter.index} / {chapter.kicker}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-[1.05] text-paper md:text-4xl">
                {chapter.title}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/80 md:text-[15px]">
                {chapter.body}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
