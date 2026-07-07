"use client";

import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import SectionHero from "./section_hero/sectionHero";
import HeroPagination from "./section_hero/heroPagination";
import MouseScroll from "./section_hero/mouseScroll";

gsap.registerPlugin(Observer);

const MAX_PAGE = 6;

export default function SectionHomeComponent() {
  const [activePage, setActivePage] = useState(1);
  const activePageRef = useRef(1);
  const isAnimating = useRef(false);
  const heroWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    activePageRef.current = activePage;
  }, [activePage]);

  const goToPage = (target: number) => {
    if (isAnimating.current) return;
    if (target < 1 || target > MAX_PAGE || target === activePageRef.current) return;

    isAnimating.current = true;
    const direction = target > activePageRef.current ? -1 : 1;

    gsap.to(heroWrapperRef.current, {
      opacity: 0,
      y: direction * 30,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        setActivePage(target);

        gsap.fromTo(
          heroWrapperRef.current,
          { opacity: 0, y: -direction * 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
            onComplete: () => {
              isAnimating.current = false;
            },
          }
        );
      },
    });
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);


    // ✅ Desktop scroll (wheel only)
    let touchStartY = 0;

    const observer = Observer.create({
      target: window,
      type: "wheel,touch",
      wheelSpeed: 1,
      tolerance: 20,
      preventDefault: false,

      // Desktop
      onDown(self) {
        if (self.event?.type === "wheel") {
          goToPage(activePageRef.current + 1);
        }
      },

      onUp(self) {
        if (self.event?.type === "wheel") {
          goToPage(activePageRef.current - 1);
        }
      },

      // Mobile
      onPress(self) {
        if ("clientY" in self.event) {
          const event = self.event as { clientY: number };
          touchStartY = event.clientY;
        }
      },

      onRelease(self) {
        if (!("clientY" in self.event)) return;

        const event = self.event as { clientY: number };
        const delta = touchStartY - event.clientY;

        if (Math.abs(delta) < 40) return;

        if (delta > 0) {
          // doigt vers le haut = vrai scroll vers le bas = page suivante
          goToPage(activePageRef.current + 1);
        } else {
          // doigt vers le bas = vrai scroll vers le haut = page précédente
          goToPage(activePageRef.current - 1);
        }
      },
    });

    // ✅ Mobile swipe fallback (IMPORTANT)


    return () => {
      observer.kill();
      lenis.destroy();
      cancelAnimationFrame(rafId);


    };
  }, []);

  return (
    <div className="h-full pt-4 w-full relative overflow-hidden touch-pan-y">
      <div ref={heroWrapperRef} className="h-full flex items-center">
        <SectionHero activePage={activePage} />
      </div>

      <div className="absolute max-md:hidden bottom-0 left-0">
        <HeroPagination activePage={activePage} setActivePage={goToPage} />
      </div>

      <div className="absolute max-md:hidden bottom-0 right-0">
        <MouseScroll />
      </div>
    </div>
  );
}