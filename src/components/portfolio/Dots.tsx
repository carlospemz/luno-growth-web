"use client";

interface DotsProps {
  count: number;
  active: number;
}

export default function Dots({ count, active }: DotsProps) {
  return (
    <p className="text-center text-[13px] text-zinc-500">
      <span className="font-semibold text-violet-400">{active + 1}</span>
      {" / "}
      {count}
    </p>
  );
}
