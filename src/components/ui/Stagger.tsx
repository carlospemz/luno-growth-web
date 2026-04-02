"use client";

import { Children, type ReactNode } from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants, MOTION } from "@/lib/motion";

interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
}

export default function Stagger({
  children,
  className,
  stagger,
}: StaggerProps) {
  const variants = stagger
    ? {
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger },
        },
      }
    : containerVariants;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={MOTION.viewportEager}
      className={className}
    >
      {Children.map(children, (child) => (
        <motion.div variants={itemVariants}>{child}</motion.div>
      ))}
    </motion.div>
  );
}
