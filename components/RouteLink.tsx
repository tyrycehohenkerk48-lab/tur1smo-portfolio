import type { AnchorHTMLAttributes } from "react";
import Link from "next/link";

type RouteLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export function RouteLink({ href, children, ...props }: RouteLinkProps) {
  // Keep the intentional full refresh for links directly to the home screen.
  if (href === "/") return <a href={href} {...props}>{children}</a>;

  // Client navigation keeps the root AudioProvider (and its audio element) mounted.
  return <Link href={href} {...props}>{children}</Link>;
}
