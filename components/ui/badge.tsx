import type * as React from "react"

const badgeClassNames = {
  default:
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  secondary:
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  destructive:
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  outline: "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  success:
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
};

const badgeColors = {
  default:
    "bg-primary text-primary-foreground hover:bg-primary/80 border-transparent",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/80 border-transparent",
  outline: "text-foreground",
  success: "bg-green-500 text-white hover:bg-green-500/80 border-transparent",
};

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof badgeColors;
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const classNames = `${badgeClassNames[variant]} ${badgeColors[variant]} ${className}`;
  return <div className={classNames} {...props} />;
}

export { Badge };

