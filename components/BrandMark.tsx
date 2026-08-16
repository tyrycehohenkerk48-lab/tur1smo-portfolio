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

export function BrandMonogram({ className = "" }: { className?: string }) {
  return <span className={`brand-monogram ${className}`.trim()} role="img" aria-label="T1" />;
}

export function BrandWave({ className = "" }: { className?: string }) {
  return <span className={`brand-wave ${className}`.trim()} aria-hidden="true" />;
}
