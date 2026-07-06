"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

export default function HeroPagination({ activePage, setActivePage }: any) {
  return (
    // Suppression du fond gris et des marges fixes
    
      <Pagination>
        <PaginationContent className="gap-8">
          {[1, 2, 3, 4, 5, 6].map((page) => (
            <PaginationItem key={page} className="flex items-center gap-6">
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActivePage(page);
                }}
                className={`
                  p-0 bg-none font-heading text-lg
                  text-[#E2C300] transition-opacity duration-300
                  ${activePage === page ? "opacity-100" : "opacity-30 hover:opacity-60"}
                `}
              >
                {page.toString().padStart(2, "0")}
              </PaginationLink>

              {activePage === page && (
                <div className="h-[2px] w-16 bg-[#E2C300] transition-all duration-300" />
              )}
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
  );
}