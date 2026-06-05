import type { ReactNode } from "react";

export function PhoneFrame({
  children,
  className = "",
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`relative aspect-[9/19] w-full rounded-[2.6rem] p-2.5 shadow-[0_40px_80px_-20px_rgba(8,12,40,0.45)] ${
        dark
          ? "bg-gradient-to-b from-[#1a1d2e] to-[#06070d] ring-1 ring-white/10"
          : "bg-gradient-to-b from-[#e9e9ee] to-[#cfcfd6] ring-1 ring-black/5"
      } ${className}`}
    >
      <div
        className={`relative h-full w-full overflow-hidden rounded-[2.1rem] ${
          dark ? "bg-night" : "bg-white"
        }`}
      >
        {/* notch */}
        <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black/90" />
        {children}
      </div>
    </div>
  );
}
