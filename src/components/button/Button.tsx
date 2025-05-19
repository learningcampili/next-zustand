"use client";

import Link from "next/link";
import React, { CSSProperties, MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  title?: string;
  href?: string; // Optional if it's a submit button
  variant?:
    | "success"
    | "danger"
    | "warn"
    | "primary"
    | "secondary"
    | "disabled"
    | "transparent";
  size?: "xs" | "sm" | "md" | "lg" | "full";
  type?: "button" | "submit"; // Button type (submit or button)
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean; // Optional action
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const variantClasses = {
  success: "bg-green-600 hover:bg-green-700",
  danger: "bg-red-600 hover:bg-red-700",
  warn: "bg-yellow-600 hover:bg-yellow-700",
  primary: "bg-blue-600 hover:bg-blue-700",
  secondary: "bg-gray-600 hover:bg-gray-700",
  disabled: "cursor-not-allowed bg-gray-600 text-white",
  transparent: "bg-transparent text-white",
};

const sizeClasses = {
  xs: "py-1 px-1 text-sm",
  sm: "py-1 px-2 text-sm",
  md: "py-2 px-4 text-md",
  lg: "py-3 px-6 text-lg",
  full: "w-full py-2 px-4",
};

const Button: React.FC<ButtonProps> = ({
  title,
  href,
  variant = "primary",
  size = "md",
  type = "button", // Default to "button"
  onClick,
  disabled = false,
  children,
  className = "",
  style,
}) => {
  const baseClasses = "text-white  rounded my-3 cursor-pointer";
  const variantClass = variantClasses[variant] || "";
  const sizeClass = sizeClasses[size] || "";
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

  const content = children || title;

  if (href) {
    return (
      <Link href={href}>
        <button
          className={`${baseClasses} ${variantClass} ${sizeClass} ${disabledClass} ${className}`}
          style={style}
          title={title}
          aria-disabled={disabled} // Accessibility improvement
          onClick={!disabled ? onClick : undefined} // Prevent click if disabled
        >
          {content}
        </button>
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClass} ${sizeClass} ${disabledClass} ${className}`}
      onClick={!disabled ? onClick : undefined} // Prevent click if disabled
      disabled={disabled}
      style={style}
      title={title}
      aria-disabled={disabled} // Accessibility improvement
    >
      {content}
    </button>
  );
};

export default Button;
