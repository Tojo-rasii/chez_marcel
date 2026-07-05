"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

export default function HeroPagination({ activePage, setActivePage }:any) {
  return (
    <div className="bg-gray-500 m-5 p-5">
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
                  p-0 bg-none font-heading
                  text-[#E2C300]
                  ${activePage === page ? "opacity-100" : "opacity-50"}
                `}
              >
                {page.toString().padStart(2, "0")}
              </PaginationLink>

              {activePage === page && (
                <div className="h-[2px] w-20 bg-[#E2C300]" />
              )}
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </div>
  );
}