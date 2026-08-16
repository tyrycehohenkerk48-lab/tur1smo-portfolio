import Image from "next/image";

type BrandWordmarkProps = {
  className?: string;
  registered?: boolean;
};

export function BrandWordmark({ className = "", registered = false }: BrandWordmarkProps) {
  return (
    <span className={`brand-wordmark-lockup ${className}`.trim()}>
      <span className="brand-wordmark" role="img" aria-label="TUR1SMO" />
      {registered ? <sup aria-hidden="true">®</sup> : null}
    </span>
  );
}

export function BrandFlag({ className = "" }: { className?: string }) {
  return (
    <Image
      className={`brand-flag ${className}`.trim()}
      src="/brand/checker-orange.png"
      width={1024}
      height={1024}
      alt=""
      aria-hidden="true"
    />
  );
}
