"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FooterComponent from "@/components/footer/footerComponent";
import ActionComponent from "../section_action/actionComponent";
import ContactComponent from "../section_contact/contactComponent";
import PourquoiComponent from "../section_pourquoi/pourquoiComponent";
import HeroDescription from "./heroDescription";
import HeroServiceContenu from "./heroServiceContenu";

export default function SectionHero({ activePage }: any) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const children = gridRef.current?.children;
      if (!children || children.length === 0) return;

      gsap.fromTo(
        children,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.08,
          delay: 0.1,
        }
      );
    },
    { scope: gridRef, dependencies: [activePage] }
  );

  return (
    <div className="p-5 h-full">
      <div
        ref={gridRef}
        className={`grid ${activePage === 2 ? "grid-cols-1" : ""} grid-cols-1 ${
          activePage === 1 ? "grid-cols-2" : ""
        } gap-5 items-center h-full`}
      >
        {activePage !== 2 && activePage !== 3 && activePage !== 4 && activePage !== 5 && activePage !== 6 && (
          <div
            className={`h-full flex items-center ${
              activePage === 2 ? "justify-center col-span-2 text-center" : ""
            }`}
          >
            <HeroDescription page={activePage} />
          </div>
        )}

        {activePage !== 3 && activePage !== 4 && activePage !== 5 && activePage !== 6 && (
          <div className="h-full m-auto w-full flex items-center justify-center">
            <HeroServiceContenu activePage={activePage} />
          </div>
        )}

        {activePage !== 1 && activePage !== 2 && activePage !== 4 && activePage !== 5 && activePage !== 6 && (
          <PourquoiComponent />
        )}

        {activePage !== 1 && activePage !== 2 && activePage !== 3 && activePage !== 5 && activePage !== 6 && (
          <ActionComponent />
        )}

        {activePage !== 1 && activePage !== 2 && activePage !== 3 && activePage !== 4 && activePage !== 6 && (
          <ContactComponent />
        )}

        {activePage !== 1 && activePage !== 2 && activePage !== 3 && activePage !== 4 && activePage !== 5 && (
          <FooterComponent />
        )}
      </div>
    </div>
  );
}