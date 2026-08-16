import type { ModelingImage } from "@/data/modeling";

export function MediaPlaceholder({ image, index, className = "" }: { image: ModelingImage; index: number; className?: string }) {
  if (image.src) {
    return <img className={className} src={image.src} alt={image.alt} loading={index > 1 ? "lazy" : "eager"} style={{ objectPosition: image.position ?? "center" }} />;
  }

  return (
    <div className={`media-placeholder ${className}`} role="img" aria-label={image.alt} style={{ "--media-tone": image.tone } as React.CSSProperties}>
      <span>Portfolio / {String(index + 1).padStart(2, "0")}</span>
      <b>T1</b>
      <small>Replace image</small>
    </div>
  );
}
