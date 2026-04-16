"use client";

import { useEffect, useState, useRef } from "react";
import { MessageCircle } from "lucide-react";
import { waAnchorProps } from "@/config/contact";

/**
 * MobileBar — contextual floating WA CTA (mobile only).
 *
 * Behavior contract:
 *   1. Hidden until the user has fully passed the hero (hero completely
 *      off-screen at least once).
 *   2. Then shows ONLY in neutral reading sections where a floating CTA
 *      actually helps. Hides whenever a loud section is even partially
 *      visible — loud = has its own local CTAs, or is the protagonist
 *      the user is actively reading/interacting with:
 *        - hero
 *        - split (narrative piece)
 *        - para-quien (ForWhom carousel)
 *        - offers (CoreOffers cards with CTAs)
 *        - sequence
 *        - addons
 *        - brief (form)
 *        - contact (final CTA block with its own CTAs)
 *   3. Visible slot: between para-quien and sequence if that gap exists,
 *      SocialProof, Process, Work, Founders, Manifesto, FAQ. The ones
 *      without local CTAs where a sticky actually helps.
 *   4. Threshold is 0 (any pixel visible counts) so scrolling through
 *      a long loud section never leaks a visible frame.
 */
export default function MobileBar() {
  const [visible, setVisible] = useState(false);
  const hasPassedHeroRef = useRef(false);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("section:first-of-type");

    // All the sections we consider "loud" — the bar hides whenever
    // any of these is even partially in view.
    const LOUD_IDS = [
      "split",
      "para-quien",
      "offers",
      "sequence",
      "addons",
      "brief",
      "contact",
    ];

    // State for each observed element.
    const state: Record<string, boolean> = {
      hero: true,
      split: false,
      "para-quien": false,
      offers: false,
      sequence: false,
      addons: false,
      brief: false,
      contact: false,
    };

    const update = () => {
      if (!hasPassedHeroRef.current) {
        setVisible(false);
        return;
      }
      const anyLoud = LOUD_IDS.some((id) => state[id]);
      setVisible(!anyLoud);
    };

    // Hero observer — tracks when the hero has fully left the viewport
    // at least once. After that we consider the reader "past the hero".
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        state.hero = entry.isIntersecting;
        // Hero is considered "passed" once intersectionRatio has been
        // zero and we're below it.
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          hasPassedHeroRef.current = true;
        }
        update();
      },
      { threshold: 0 },
    );
    if (hero) heroObserver.observe(hero);

    // Observers for loud sections. threshold 0 means "any pixel visible
    // triggers intersectionRatio > 0", so we never leak a visible frame.
    const observers: IntersectionObserver[] = [heroObserver];
    for (const id of LOUD_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const o = new IntersectionObserver(
        ([entry]) => {
          state[id] = entry.isIntersecting;
          update();
        },
        { threshold: 0 },
      );
      o.observe(el);
      observers.push(o);
    }

    update();

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const waProps = waAnchorProps();

  return (
    <div
      data-mobile-bar
      aria-hidden={!visible}
      className={`pointer-events-none fixed inset-x-0 bottom-0 flex justify-center md:hidden transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
      style={{
        zIndex: 30,
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 10px)",
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      <a
        {...waProps}
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full text-[12px] font-semibold transition-transform active:scale-[0.97]"
        style={{
          background: "linear-gradient(135deg, #E8B931, #F5D06A)",
          color: "#0B1E38",
          paddingInline: "18px",
          paddingBlock: "10px",
          boxShadow:
            "0 4px 14px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(11, 30, 56, 0.55)",
        }}
      >
        <MessageCircle className="h-[14px] w-[14px]" />
        Habla con Vincent
      </a>
    </div>
  );
}
