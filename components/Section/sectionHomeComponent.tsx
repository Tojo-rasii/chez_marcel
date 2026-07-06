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

  // Transition animée + changement de page (utilisée aussi par le scroll manuel via pagination)
  const goToPage = (target: number) => {
    if (isAnimating.current) return;
    if (target < 1 || target > MAX_PAGE || target === activePageRef.current) return;

    isAnimating.current = true;
    const direction = target > activePageRef.current ? -1 : 1; // sens de la sortie

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
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    // Observer capte molette / trackpad / touch, avec un "tolerance" qui évite
    // les faux déclenchements (remplace ton système de setTimeout manuel)
    const observer = Observer.create({
      target: window,
      type: "wheel,touch",
      wheelSpeed: 1,
      tolerance: 10,
      preventDefault: true,
      onDown: () => goToPage(activePageRef.current + 1), // scroll vers le bas -> page suivante
      onUp: () => goToPage(activePageRef.current - 1),   // scroll vers le haut -> page précédente
    });

    return () => {
      observer.kill();
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full pt-15 relative overflow-hidden">
      <div ref={heroWrapperRef} className="h-full">
        <SectionHero activePage={activePage} />
      </div>

      <div className="fixed bottom-1 left-8 z-20">
        <HeroPagination
          activePage={activePage}
          setActivePage={goToPage}
        />
      </div>

      <div className="fixed bottom-1 right-8 z-20">
        <MouseScroll />
      </div>
    </div>
  );
}