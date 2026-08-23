import type { AnchorHTMLAttributes } from "react";

type RouteLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

/**
 * Uses a normal document navigation so every route remains reliable in the
 * deployed Sites runtime while retaining ordinary link accessibility.
 */
export function RouteLink({ href, children, ...props }: RouteLinkProps) {
  return <a href={href} {...props}>{children}</a>;
}
