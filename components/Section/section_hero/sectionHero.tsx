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

export default function SectionHero({
  activePage,
  setActivePage,
}: {
  activePage: number;
  setActivePage: (page: number) => void;
}) {
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
    <div className="p-5 max-lg:py-0 h-[80vh] w-full  bg-transparent">
      <div
        ref={gridRef}
        className={`grid ${activePage === 2 ? "grid-cols-1" : ""} grid-cols-1 ${activePage === 1 ? "grid-cols-2 max-lg:flex max-md:flex-col max-md:py-0" : ""
          } gap-5 items-center max-md:justify-center h-full`}
      >
        {activePage !== 2 && activePage !== 3 && activePage !== 4 && activePage !== 5 && activePage !== 6 && (
          <div
            className={`h-full max-md:h-max max-md:items-start flex items-center ${activePage === 2 ? "justify-center col-span-2 text-center" : ""
              }`}
          >
            <HeroDescription page={activePage} />
          </div>
        )}

        {activePage !== 3 && activePage !== 4 && activePage !== 5 && activePage !== 6 && (
          <div className="h-full  max-md:h-max max-md:m-0 m-auto bg-transparent200 w-full flex items-center justify-center">
            <HeroServiceContenu page={activePage} activePage={activePage} setActivePage={setActivePage}/>
          </div>
        )}

        {activePage !== 1 && activePage !== 2 && activePage !== 4 && activePage !== 5 && activePage !== 6 && (
          <PourquoiComponent />
        )}

        {activePage !== 1 && activePage !== 2 && activePage !== 3 && activePage !== 5 && activePage !== 6 && (
          <ActionComponent setActivePage={setActivePage} />
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