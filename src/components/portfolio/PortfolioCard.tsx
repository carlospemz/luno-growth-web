"use client";

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

function Thumbnail({ project }: { project: Project }) {
  const { gradient, name, image } = project;

  return (
    <div
      className="group/thumb relative aspect-[16/9] overflow-hidden"
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
          {/* Rich gradient background with texture */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 80% 60% at 30% 20%, rgba(255,255,255,0.25), transparent 60%),
                radial-gradient(ellipse 60% 80% at 80% 80%, rgba(255,255,255,0.15), transparent 50%)
              `,
            }}
          />
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)
              `,
              backgroundSize: "24px 24px",
            }}
          />
          {/* Name */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <span className="text-[28px] font-bold tracking-[-0.02em] text-white/90 md:text-[36px] drop-shadow-sm">
              {name}
            </span>
            <span className="text-[12px] font-medium uppercase tracking-[0.15em] text-white/50">
              Ver sitio en vivo
            </span>
          </div>
          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
        </>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover/thumb:bg-black/[0.04]" />
    </div>
  );
}

/* ═══════════════════════════════════════
   CaseMeta — standardized 2-row grid
   ═══════════════════════════════════════ */

function CaseMeta({ service, extras }: { service: string; extras?: string }) {
  return (
    <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[14px]">
      <dt className="font-medium text-zinc-400">Servicio:</dt>
      <dd className="font-semibold text-zinc-800">{service}</dd>
      <dt className="font-medium text-zinc-400">Extras:</dt>
      <dd className="font-semibold text-zinc-800">{extras || "—"}</dd>
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
      className={`portfolio-card rounded-[20px] border transition-colors
        ${highlight ? "border-purple-200/50" : "border-zinc-200/60"}`}
    >
      {/* Preview frame with browser chrome */}
      <div className="p-3 pb-0">
        <div className="portfolio-frame overflow-hidden rounded-xl">
          {/* Mini browser bar */}
          <div className="flex items-center gap-1.5 border-b border-zinc-100 bg-zinc-50 px-3 py-1.5">
            <span className="h-[7px] w-[7px] rounded-full bg-zinc-200" />
            <span className="h-[7px] w-[7px] rounded-full bg-zinc-200" />
            <span className="h-[7px] w-[7px] rounded-full bg-zinc-200" />
            <div className="mx-auto flex h-[18px] w-28 items-center justify-center rounded-[4px] bg-zinc-100/80">
              <span className="text-[9px] text-zinc-400 truncate">{project.url.replace(/https?:\/\//, "").split("/")[0]}</span>
            </div>
          </div>
          <Thumbnail project={project} />
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-4 pb-5 md:px-6">
        {/* Title */}
        <h3 className="font-heading text-[20px] font-bold tracking-[-0.01em] text-zinc-900">
          {project.name}
        </h3>

        {/* Description */}
        <p className="mt-1.5 text-[14.5px] leading-[1.5] text-zinc-500">
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
