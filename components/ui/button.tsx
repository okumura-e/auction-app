import * as React from "react";

type ButtonVariants = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type ButtonSizes = "default" | "sm" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
  size?: ButtonSizes;
  asChild?: boolean;
}

const buttonStyles: Record<ButtonVariants, string> = {
  default: "bg-blue-500 text-white hover:bg-blue-600",
  destructive: "bg-red-500 text-white hover:bg-red-600",
  outline: "border border-gray-300 bg-white text-black hover:bg-gray-100",
  secondary: "bg-gray-500 text-white hover:bg-gray-600",
  ghost: "bg-transparent text-black hover:bg-gray-200",
  link: "text-blue-500 underline hover:text-blue-600",
};

const sizeStyles: Record<ButtonSizes, string> = {
  default: "h-10 px-4 py-2",
  sm: "h-9 px-3",
  lg: "h-11 px-8",
  icon: "h-10 w-10 flex items-center justify-center",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", asChild, ...props }, ref) => {
    const classes = `inline-flex items-center justify-center rounded-md text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${buttonStyles[variant]} ${sizeStyles[size]} ${className}`;
    
    return <button className={classes} ref={ref} {...props} />;
  }
);

Button.displayName = "Button";

export { Button };
