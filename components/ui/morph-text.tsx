"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "../lightswind/separator";
import { Button } from "../lightswind/button";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowRightIcon } from "lucide-react";
// ─── Types ─────────────────────────────────────────────────────────────────

export interface MorphTextProps {
  /**
   * Array of words / phrases to cycle through.
   * @default ["CREATE", "DESIGN", "DEVELOP"]
   */
  words?: string[];
  /**
   * Duration (ms) each word is displayed before transitioning.
   * @default 3000
   */
  interval?: number;
  /**
   * Optional subtext rendered beneath the morphing word.
   */
  subtext?: string;
  /**
   * Font size passed as a CSS value (e.g. "clamp(3rem, 15vw, 10rem)").
   * Defaults to a fluid clamp that scales with the viewport.
   */
  fontSize?: string;
  /**
   * Font family. Defaults to `"Space Grotesk", sans-serif`.
   */
  fontFamily?: string;
  /** Extra CSS classes on the root wrapper. */
  className?: string;
  /** Extra CSS classes on the morphing text container. */
  textClassName?: string;
  /** Extra CSS classes on the subtext element. */
  subtextClassName?: string;

  onWordChange?: (index: number) => void;
  onNext?: () => void;
}

// ─── Component ──────────────────────────────────────────────────────────────

export function MorphText({
  words = ["Transferts d’argent", "Films", "Coiffure pro"],
  interval = 3000,
  subtext,
  fontSize = "clamp(2rem, 10vw, 6.5rem)",
  fontFamily = '"Marcellus", sans-serif',
  className,
  textClassName,
  onWordChange,
  onNext,
  subtextClassName,
}: MorphTextProps) {
  // Unique ID so multiple instances don't share filter IDs
  const uid = useId().replace(/:/g, "");
  const filterId = `morph-threshold-${uid}`;

  const totalDuration = (interval / 1000) * words.length; // seconds
  const wordDuration = interval / 1000;

  // Build per-word keyframe + delay styles
  const wordStyles = words.map((_, i) => ({
    animationDelay: `${i * wordDuration}s`,
    animationDuration: `${totalDuration}s`,
  }));

  const [current, setCurrent] = useState(0);
  useEffect(() => {
    onWordChange?.(0);

    const id = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % words.length;
        onWordChange?.(next);
        return next;
      });
    }, interval);

    return () => clearInterval(id);
  }, []);

  const cards = [
  {
    title: "Transfert",
    image: "/mbl.png",
  },
  {
    title: "Films",
    image: "image.png",
  },
  {
    title: "Coiffure",
    image: "barber.png",
  },
];
  return (
    <div className={cn("morph-text-root relative h-full flex items-center flex-col gap-8 justify-center", className)}>
      {/* ── Threshold SVG filter (hidden) ─────────────────────────── */}
      <svg
        aria-hidden="true"
        focusable="false"
        style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}
      >
        <defs>
          <filter id={filterId}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      {/* ── Optional subtext ──────────────────────────────────────── */}

      <h3
        className={cn(
          "morph-subtext mt-8 flex max-md:!text-[0.9em] items-center !text-wrap gap-4 uppercase text-white/80",
          subtextClassName
        )}
        style={{
          fontSize: "1rem",
          opacity: 1,
          animation: "morph-fade-up 1s text-white ease-out 1s forwards",
          fontFamily,
        }}
      >
        <Separator className="w-15 max-sm:w-8 max-sm:w-5 h-0.5 bg-yellow-500/50" /><span className="!text-wrap">Bienvenue Chez Marcel Click & Services</span>
        <Separator className="w-15  max-sm:w-8  max-sm:w-5  h-0.5 bg-yellow-500/50" />
      </h3>


      {/* ── Morphing word container ────────────────────────────────── */}
      <div
        className={cn("morph-text-container relative select-none", textClassName)}
        style={{
          fontSize,
          fontWeight: 700,
          filter: `url(#${filterId})`,
          fontFamily,
        }}
      >
        {/* word rotator */}
        <div
          className="morph-word-rotator relative text-white flex items-center justify-center"
          style={{ height: "1.2em", minWidth: "14ch" }}
        >
          {words.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="morph-word absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 0,
                whiteSpace: "nowrap",
                animationName: "morph-word-rotate",
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                animationFillMode: "both",
                ...wordStyles[i],
              }}
            >

              {word}
            </span>
          ))}
        </div>
      </div>

      {/* ── Optional subtext ──────────────────────────────────────── */}
      {subtext && (
        <p
          className={cn(
            "morph-subtext hidden mt-3 uppercase text-[#888]",
            subtextClassName
          )}
          style={{
            fontSize: "1.2rem",
            opacity: 0,
            animation: "morph-fade-up 1s ease-out 1s forwards",
            fontFamily,
          }}
        >
          {subtext}
        </p>
      )}

      <div className="button mt-3">

        <Button
          type="submit"
           onClick={onNext}
          className="!bg-yellow-500 max-md:text-sm hover:gap-4 transition flex items-center gap-3 w-max  border border-black hover:bg-yellow-500/95 text-black font-semibold uppercase px-8 py-5 cursor-pointer mx-auto flex items-center justify-center rounded-full text-md transition-colors"
        >
          Commencez <ArrowRightIcon className="size-5"/>
        </Button>

       <div className="flex items-center w-full justify-center gap-10 mt-18 -mb-8">
        <Separator className="w-50 h-0.5 max-md:hidden bg-white" />
  {cards.map((card, index) => {
    const active = current === index;

    return (
      <div
        key={index}
        className={cn(
          "relative overflow-hidden rounded-md w-45 h-45 transition-all duration-500",
          active
            ? "border-2 border-yellow-500 opacity-100"
            : "border border-white/10 opacity-70"
        )}
        style={{
          transform:
            index === 0
              ? "rotate(-18deg)"
              : index === 2
              ? "rotate(18deg)"
              : "rotate(0deg)",
        }}
      >
        <img
          src={card.image}
          alt={card.title}
   
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/20" />
      </div>
    );
  })}
  <Separator className="w-50 h-0.5 max-md:hidden bg-white" />
</div>
      </div>

      {/* ── Scoped keyframes ──────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&display=swap');

        @keyframes morph-word-rotate {
          0% {
            opacity: 0;
            filter: blur(20px);
            transform: translate(-50%, -50%) scale(0.8);
          }
          5% {
            opacity: 0.5;
            filter: blur(10px);
          }
          15%, 35% {
            opacity: 1;
            filter: blur(0px);
            transform: translate(-50%, -50%) scale(1);
          }
          45% {
            opacity: 0.5;
            filter: blur(10px);
          }
          50%, 100% {
            opacity: 0;
            filter: blur(20px);
            transform: translate(-50%, -50%) scale(1.2);
          }
        }

        @keyframes morph-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default MorphText;
