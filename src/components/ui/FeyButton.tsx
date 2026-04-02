"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface FeyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
}

export function FeyButton({ className, children, href, ...props }: FeyButtonProps) {
  const cls = cn(
    "group relative flex items-center justify-center gap-1",
    "h-10 min-w-[160px] whitespace-nowrap rounded-[28px] px-5 py-2",
    "text-sm font-semibold leading-tight text-zinc-900",
    "bg-[radial-gradient(61.35%_50.07%_at_48.58%_50%,rgb(255,255,255)_0%,rgba(0,0,0,0.03)_100%)]",
    "[box-shadow:inset_0_0_0_0.5px_rgba(0,0,0,0.12),inset_1px_1px_0_-0.5px_rgba(0,0,0,0.08),inset_-1px_-1px_0_-0.5px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.08)]",
    "after:absolute after:inset-0 after:rounded-[28px] after:opacity-0 after:transition-opacity after:duration-200",
    "after:bg-[radial-gradient(61.35%_50.07%_at_48.58%_50%,rgb(250,250,255)_0%,rgb(240,240,255)_100%)]",
    "after:[box-shadow:inset_0_0_0_0.5px_rgba(139,92,246,0.3),0_0_8px_rgba(139,92,246,0.15)]",
    "hover:after:opacity-100 transition-transform hover:-translate-y-0.5 active:translate-y-0",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    className
  );

  if (href) {
    return (
      <a href={href} className={cn(cls, "inline-flex cursor-pointer")}>
        <span className="relative z-10 flex items-center gap-1">{children}</span>
      </a>
    );
  }

  return (
    <button className={cls} {...props}>
      <span className="relative z-10 flex items-center gap-1">{children}</span>
    </button>
  );
}
