"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion, type MotionValue } from "framer-motion";

/**
 * ContainerScroll — Aceternity-style scroll reveal.
 * The "device" rotates from 20° down to flat and scales up as the
 * user scrolls the wrapper through the viewport. Header translates
 * up simultaneously.
 *
 * Tuned for VINCENT: shorter wrapper so it doesn't blow the layout.
 */
export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = (): [number, number] =>
    isMobile ? [0.78, 0.96] : [1.02, 1];

  const rotate = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div
      className="h-[46rem] md:h-[60rem] flex items-center justify-center relative p-2 md:p-10"
      ref={containerRef}
    >
      <div
        className="py-8 md:py-20 w-full relative"
        style={{ perspective: "1000px" }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

const Card = ({
  rotate,
  scale,
  children,
  frameVariant = "night",
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
  frameVariant?: "night" | "day";
}) => {
  const nightStyles = {
    background: "linear-gradient(180deg, #10233F 0%, #060F1E 100%)",
    border: "1px solid rgba(127, 214, 255, 0.22)",
    boxShadow:
      "inset 0 1px 0 rgba(127, 214, 255, 0.22), inset 0 -1px 0 rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(232, 185, 49, 0.08)",
  };
  const dayStyles = {
    background: "linear-gradient(180deg, #F5F0E1 0%, #E7DFD1 100%)",
    border: "1px solid rgba(16, 35, 63, 0.25)",
    boxShadow:
      "inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(16, 35, 63, 0.16), 0 0 0 1px rgba(16, 35, 63, 0.08)",
  };
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-[380px] md:max-w-[420px] -mt-8 mx-auto h-[36rem] md:h-[40rem] w-full p-2 rounded-[38px] shadow-2xl"
    >
      <div
        className="relative h-full w-full rounded-[32px] p-2"
        style={frameVariant === "day" ? dayStyles : nightStyles}
      >
        <div className="h-full w-full overflow-hidden rounded-[26px]">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

/**
 * ContainerScrollReverse — inverse gesture.
 *
 * The phone STARTS flat (close to the user, like holding it in your
 * hand) and as scroll progresses it tilts AWAY and shrinks slightly,
 * reading as "you just let it go, dropped it on the table". The
 * header drops with it.
 *
 * Used in VincentSplit día beat: when the checklist finishes
 * marking items, the phone gets released — you're done, you put
 * it down, day recovered.
 */
export const ContainerScrollReverse = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Inverse of ContainerScroll:
  //   - rotateX starts at 0° (flat, in hand) → ends at 22° (tilted away)
  //   - scale starts at 1 → shrinks slightly (moving away / being let go)
  //   - header translates DOWN slightly (it's being released, not pulled up)
  const scaleDimensions = (): [number, number] =>
    isMobile ? [0.96, 0.8] : [1, 0.9];

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 22]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  // header barely drifts so it doesn't fight the device
  const translate = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <div
      className="h-[46rem] md:h-[60rem] flex items-center justify-center relative p-2 md:p-10"
      ref={containerRef}
    >
      <div
        className="py-8 md:py-20 w-full relative"
        style={{ perspective: "1000px" }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale} frameVariant="day">
          {children}
        </Card>
      </div>
    </div>
  );
};
