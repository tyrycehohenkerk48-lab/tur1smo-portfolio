"use client";

import { useEffect, useRef, useState } from "react";
import { modelingImages } from "@/data/modeling";
import { MediaPlaceholder } from "./MediaPlaceholder";
import { BrandWordmark } from "./BrandMark";

export function PortfolioGrid() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const touchStart = useRef<number | null>(null);

  const close = () => setActiveIndex(null);
  const move = (direction: number) => setActiveIndex((current) => {
    if (current === null) return null;
    return (current + direction + modelingImages.length) % modelingImages.length;
  });

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex]);

  return (
    <>
      <div className="portfolio-grid">
        {modelingImages.map((image, index) => (
          <figure key={image.id} className={`portfolio-item portfolio-${image.layout}`}>
            <button type="button" onClick={() => setActiveIndex(index)} aria-label={`Open ${image.title} in lightbox`}>
              <MediaPlaceholder image={image} index={index} />
            </button>
            <figcaption><span>{image.title}</span><span>{String(index + 1).padStart(2, "0")} / {String(modelingImages.length).padStart(2, "0")}</span></figcaption>
          </figure>
        ))}
      </div>

      {activeIndex !== null ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${modelingImages[activeIndex].title} image viewer`} onPointerDown={(event) => { touchStart.current = event.clientX; }} onPointerUp={(event) => {
          if (touchStart.current === null) return;
          const distance = event.clientX - touchStart.current;
          if (Math.abs(distance) > 55) move(distance > 0 ? -1 : 1);
          touchStart.current = null;
        }}>
          <div className="lightbox-top"><span className="brand-credit"><BrandWordmark className="inline-brand" /> / Modeling</span><button type="button" onClick={close} autoFocus>Close</button></div>
          <button className="lightbox-arrow lightbox-prev" type="button" onClick={() => move(-1)} aria-label="Previous image">←</button>
          <div className="lightbox-media"><MediaPlaceholder image={modelingImages[activeIndex]} index={activeIndex} /></div>
          <button className="lightbox-arrow lightbox-next" type="button" onClick={() => move(1)} aria-label="Next image">→</button>
          <div className="lightbox-footer"><span>{modelingImages[activeIndex].title}</span><span>{String(activeIndex + 1).padStart(2, "0")} / {String(modelingImages.length).padStart(2, "0")}</span></div>
        </div>
      ) : null}
    </>
  );
}
