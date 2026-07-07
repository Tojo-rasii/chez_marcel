"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

export default function HeroPagination({ activePage, setActivePage }: any) {
  return (
    <div className="bg-transparent p-2 px-5">
      <Pagination>
        <PaginationContent className="gap-5">
          {[1, 2, 3, 4, 5, 6].map((page) => (
            <PaginationItem key={page} className="flex items-center gap-2">
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActivePage(page);


                }}
                className={`
                  p-0 bg-none font-heading ring-0 offset-0 outline-0
                  
                  ${activePage === page ? "opacity-100 font-bold text-yellow" : "opacity-50"}
                `}
              >
                {page.toString().padStart(2, "0")}
              </PaginationLink>

              {activePage === page && (
                <div className="h-[2px] m-auto w-10 bg-yellow-500" />
              )}
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </div>
  );
}