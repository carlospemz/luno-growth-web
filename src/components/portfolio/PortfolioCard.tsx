"use client";

import { useMemo, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import Button from "@/components/ui/Button";
import "@/styles/luno-landing.css";

/* ═══════════════════════════════════════
   Types
   ═══════════════════════════════════════ */

export interface Project {
  name: string;
  line1: string;
  line2: string;
  url: string;
  image?: string;
  gradient: { from: string; via: string; to: string };
  service: string;
  extras?: string;
}

/* ═══════════════════════════════════════
   Screenshot thumbnail — premium frame
   ═══════════════════════════════════════ */

function Thumbnail({ project, glitchKey }: { project: Project; glitchKey?: number }) {
  const { gradient, name, image } = project;
  const [introGlitch, setIntroGlitch] = useState(false);
  const prevKey = useRef(glitchKey);

  useEffect(() => {
    if (glitchKey !== undefined && glitchKey !== prevKey.current && glitchKey > 0) {
      prevKey.current = glitchKey;
      setIntroGlitch(true);
      const t = setTimeout(() => setIntroGlitch(false), 320);
      return () => clearTimeout(t);
    }
    prevKey.current = glitchKey;
  }, [glitchKey]);

  const glitchVars = useMemo(() => ({
    "--gDelay": `${(Math.random() * 4).toFixed(2)}s`,
    "--gDur": `${(10 + Math.random() * 4).toFixed(2)}s`,
  } as React.CSSProperties), []);

  return (
    <div
      className={`group/thumb relative aspect-[16/9] overflow-hidden rounded-xl${introGlitch ? " thumb-intro-active" : ""}`}
      style={{
        background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.via} 50%, ${gradient.to} 100%), var(--surface-1)`,
        isolation: "isolate",
      }}
    >
      {image ? (
        <>
          <Image
            src={image}
            alt={`${name} — screenshot`}
            fill
            sizes="(max-width: 768px) 90vw, 540px"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover/thumb:scale-[1.03]"
          />
          {/* Dark vignette overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                linear-gradient(to bottom, transparent 40%, rgba(15,8,20,0.55) 100%),
                linear-gradient(135deg, ${gradient.from.replace(/[\d.]+\)$/, "0.15)")} 0%, transparent 60%)
              `,
            }}
          />
        </>
      ) : (
        <>
          <div
            className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
            style={{
              backgroundImage: "repeating-conic-gradient(rgba(255,255,255,0.08) 0% 25%, transparent 0% 50%)",
              backgroundSize: "3px 3px",
            }}
          />
          <div
            className="absolute -right-16 -top-16 h-52 w-52 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.05), transparent 55%)",
            }}
          />
          <span className="absolute inset-0 flex items-center justify-center font-heading text-[24px] font-bold tracking-[-0.02em] text-zinc-300 md:text-[32px]">
            {name}
          </span>
        </>
      )}

      {/* Corner chromatic aberration — elegant glitch signature */}
      <div className="thumb-glitch thumb-glitch--desync" style={glitchVars} aria-hidden="true" />
    </div>
  );
}

/* ═══════════════════════════════════════
   CaseMeta — standardized 2-row grid
   ═══════════════════════════════════════ */

function CaseMeta({ service, extras }: { service: string; extras?: string }) {
  return (
    <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[14px]">
      <dt className="font-medium text-white/70">Servicio:</dt>
      <dd className="font-semibold text-white/95">{service}</dd>
      <dt className="font-medium text-white/70">Extras:</dt>
      <dd className="font-semibold text-white/95">{extras || "—"}</dd>
    </dl>
  );
}

/* ═══════════════════════════════════════
   Component
   ═══════════════════════════════════════ */

interface PortfolioCardProps {
  project: Project;
  highlight?: boolean;
  glitchKey?: number;
}

export default function PortfolioCard({
  project,
  highlight = false,
  glitchKey,
}: PortfolioCardProps) {
  return (
    <div
      className={`${highlight ? "card-border-glow--accent" : "card-border-glow"} portfolio-card rounded-[20px] border transition-colors
        ${highlight ? "border-white/[0.15]" : "border-white/[0.12]"}`}
    >
      {/* Preview frame */}
      <div className="p-3 pb-0">
        <div className="portfolio-frame overflow-hidden rounded-xl">
          <Thumbnail project={project} glitchKey={glitchKey} />
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-4 pb-5 md:px-6">
        {/* Title */}
        <h3 className="font-heading text-[20px] font-bold tracking-[-0.01em]">
          {project.name}
        </h3>

        {/* Description */}
        <p className="mt-1.5 text-[14px] leading-[1.5] text-zinc-500">
          {project.line2 ? `${project.line1} ${project.line2}` : project.line1}
        </p>

        {/* Metadata — standardized 2-row grid */}
        <CaseMeta service={project.service} extras={project.extras} />

        {/* CTA — centered */}
        <div className="mt-5 flex justify-center">
          <Button
            variant="secondary"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            icon={<ExternalLink className="h-3.5 w-3.5" />}
            className="portfolio-cta w-[85%] justify-center"
          >
            Ver sitio en vivo
          </Button>
        </div>
      </div>
    </div>
  );
}
