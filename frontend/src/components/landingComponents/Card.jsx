import React from "react";
import clsx from "clsx";

export function Card({ className, children, ...props }) {
  return (
    <div
      className={clsx(
        "rounded-2xl border bg-white shadow-sm transition",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
