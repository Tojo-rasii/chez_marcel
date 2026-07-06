import Image from "next/image";
import { HamburgerMenuOverlay } from "@/components/lightswind/hamburger-menu-overlay"
import { TextAlignStart, Globe, SeparatorVertical } from "lucide-react";
import { Separator } from "../lightswind/separator";

export default function NavLinks() {

  const nav = [
    {
      label: "Services",
      href: "/",
    },
    {
      label: "à propos",
      href: "/",
    },
    {
      label: "Contact",
      href: "/",
    },
  ]


  return (
    <div className="flex items-center z-99 justify-center gap-5">

      <ul className="flex items-center max-md:hidden gap-7 font-heading text-lg">
        {nav.map((item, index) => (
          <li key={index}>
            <p className="hover:text-blue-500 capitalize cursor-pointer transition-colors duration-300">
              {item.label}
            </p>
          </li>
        ))}
      </ul>

      {/* <Separator position="vertical"/> */}

      <div className="flex items-center gap-5 ms-10">
        <Globe className="size-5 cursor-pointer" />
        <TextAlignStart className="size-5 cursor-pointer" />
      </div>
    </div>
  );
}
