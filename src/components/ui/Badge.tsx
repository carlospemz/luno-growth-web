export default function Badge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-white/[0.06] px-3.5 py-1.5 text-[13px] text-muted ${className}`}
    >
      {children}
    </span>
  );
}
