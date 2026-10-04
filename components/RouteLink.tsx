"use client";

import type { AnchorHTMLAttributes } from "react";
import { useRouter } from "next/navigation";

type RouteLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export function RouteLink({ href, children, onClick, ...props }: RouteLinkProps) {
  const router = useRouter();

  // Keep the intentional full refresh for links directly to the home screen.
  if (href === "/") return <a href={href} onClick={onClick} {...props}>{children}</a>;

  // Use the statically imported router: the production Link chunk loses its
  // dynamic navigation exports. Client routing keeps the AudioProvider mounted.
  return <a href={href} {...props} onClick={(event) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || props.download != null || (props.target && props.target !== "_self")) return;
    const destination = new URL(href, window.location.href);
    if (destination.origin !== window.location.origin) return;
    event.preventDefault();
    router.push(destination.pathname + destination.search + destination.hash);
  }}>{children}</a>;
}
