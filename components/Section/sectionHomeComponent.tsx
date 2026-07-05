"use client";

import { useState } from "react";
import SectionHero from "./section_hero/sectionHero";
import HeroPagination from "./section_hero/heroPagination";
import MouseScroll from "./section_hero/mouseScroll";

export default function SectionHomeComponent() {
    const [activePage, setActivePage] = useState(1);

    return (
        <div className="h-full pt-15 relative">
            <SectionHero activePage={activePage} />

            <div className="absolute bottom-0 left-0">
                <HeroPagination
                    activePage={activePage}
                    setActivePage={setActivePage}
                />
            </div>

            <div className="absolute bottom-0 right-0">
                <MouseScroll />
            </div>
        </div>
    );
}