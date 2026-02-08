import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

interface NavLinkCompatProps extends LinkProps, Omit<AnchorProps, "href"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, href, ...props }, ref) => {
    const router = useRouter();
    const isActive = typeof href === "string" ? router.asPath === href : false;
    return (
      <Link
        ref={ref}
        href={href}
        className={cn(className, isActive && activeClassName, pendingClassName)}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
