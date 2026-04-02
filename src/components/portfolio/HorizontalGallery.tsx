"use client";

import { motion } from "framer-motion";
import PortfolioCard, { type Project } from "@/components/portfolio/PortfolioCard";
import { MOTION } from "@/lib/motion";

interface HorizontalGalleryProps {
  projects: Project[];
}

/* Each card enters from a different direction */
const cardEntrances = [
  { x: 0, y: 30 },
  { x: -40, y: 0 },
  { x: 40, y: 0 },
];

export default function HorizontalGallery({ projects }: HorizontalGalleryProps) {
  return (
    <div
      className="grid gap-6 md:grid-cols-2 max-w-[1120px] mx-auto px-6"
    >
      {projects.map((project, i) => {
        const dir = cardEntrances[i] ?? { x: 0, y: 0 };
        return (
          <motion.div
            key={project.name}
            className={i === 0 ? "md:col-span-2 md:max-w-[560px] md:mx-auto" : ""}
            initial={{ opacity: 0, x: dir.x, y: dir.y, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.7,
              ease: [...MOTION.ease],
              delay: i * 0.15,
            }}
          >
            <PortfolioCard project={project} highlight={i === 0} />
          </motion.div>
        );
      })}
    </div>
  );
}
