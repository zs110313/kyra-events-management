import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary:
    "border-gold-400 bg-gold-400 text-ink hover:bg-gold-300 hover:border-gold-300",
  secondary:
    "border-gold-400/70 bg-transparent text-ivory hover:bg-gold-400 hover:text-ink",
  ghost:
    "border-white/10 bg-white/[0.03] text-ivory hover:border-gold-400/60 hover:text-gold-300"
};

export function Button({
  className,
  children,
  variant = "primary",
  href,
  ...props
}: ButtonProps) {
  const rel = props.target === "_blank" ? props.rel ?? "noopener noreferrer" : props.rel;
  const classes = cn(
    "inline-flex min-h-12 items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition duration-300 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:ring-offset-2 focus:ring-offset-ink",
    variants[variant],
    className
  );

  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a className={classes} href={href} {...props} rel={rel}>
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} href={href} {...props} rel={rel}>
      {children}
    </Link>
  );
}
