import Image from "next/image";
import { HamburgerMenuOverlay } from "@/components/lightswind/hamburger-menu-overlay"

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
    <div className="flex items-center justify-center gap-5">

      <ul className="flex items-center max-md:hidden gap-5 font-heading text-xl">
        {nav.map((item, index) => (
          <li key={index}>
            <p className="hover:text-blue-500 capitalize cursor-pointer transition-colors duration-300">
              {item.label}
            </p>
          </li>
        ))}
      </ul>

      {/* <div className="relative bg-red-500 max-md:flex hidden">
        <HamburgerMenuOverlay items={nav} buttonTop="0"
          buttonLeft="0"
          buttonColor="none"
          overlayBackground="none" />

      </div> */}

    </div>
  );
}
