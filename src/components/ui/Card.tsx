import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

/**
 * Card
 * ---------------------------------------------------------------------
 * This is the ONE place that defines what a "lifted" surface looks
 * like (soft warm shadow, subtle gold border, gentle hover-rise).
 * Every card-like element across the site - the three big navigation
 * buttons today, and later things like text cards, chapter cards, even
 * verse cards - should be built using this component.
 *
 * Why centralize this in one file? If you ever want to adjust how
 * "lifted" things look (say, a stronger shadow, or a different hover
 * animation), you change it here ONCE, and every card across the
 * entire site updates automatically. This directly supports the
 * "easy to redesign later" answer from Phase 2.
 * ---------------------------------------------------------------------
 */
export default function Card({ children, onClick, className = "" }: CardProps) {
  const isInteractive = Boolean(onClick);

  return (
    <div
      onClick={onClick}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      className={`elevated-card bg-ivory border border-sandalwood rounded-2xl
                  shadow-lifted hover:shadow-lifted-hover
                  ${isInteractive ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
