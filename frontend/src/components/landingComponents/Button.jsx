import React from "react";
import clsx from "clsx";

// Button variants and sizes
const VARIANT_STYLES = {
  solid:
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  outline:
    "border border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50 focus:ring-blue-500",
  ghost:
    "bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
  secondary:
    "bg-blue-100 text-blue-700 hover:bg-blue-200 focus:ring-blue-200",
};

const SIZE_STYLES = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-8 py-3 text-lg",
};

export function Button({
  children,
  className,
  variant = "solid",
  size = "md",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? "span" : "button";
  return (
    <Comp
      className={clsx(
        "inline-flex items-center justify-center font-semibold rounded-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
