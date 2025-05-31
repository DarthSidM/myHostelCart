import React from "react";
import clsx from "clsx";

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}) {
  // Example variants: default, secondary, success, warning, danger
  const variantClasses = {
    default: "bg-blue-600 text-white",
    secondary: "bg-blue-100 text-blue-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    danger: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
