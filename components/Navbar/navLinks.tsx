"use client";

import { Globe, TextAlignStart, MoonStar } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/lightswind/dropdown-menu";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/lightswind/radio-group";
import { Switch } from "@/components/lightswind/switch";

export default function NavLinks() {
  const [language, setLanguage] = useState<"fr" | "mg">("fr");

  // Charger le thème sauvegardé
 const [darkMode, setDarkMode] = useState(true);

useEffect(() => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    const isDark = savedTheme === "dark";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  } else {
    // Dark par défaut
    setDarkMode(true);
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
}, []);

  // Changer le thème
const handleDarkMode = (checked: boolean) => {
  setDarkMode(checked);

  document.documentElement.classList.toggle("dark", checked);
  localStorage.setItem("theme", checked ? "dark" : "light");
};


  const nav = [
    {
      label: "Services",
      href: "/",
    },
    {
      label: "À propos",
      href: "/",
    },
    {
      label: "Contact",
      href: "/",
    },
  ];


  return (
    <div className="flex text-black/80 dark:text-white z-99 items-center justify-center gap-5">

      <ul className="flex items-center max-md:hidden gap-7 font-heading text-sm">
        {nav.map((item, index) => (
          <li key={index}>
            <p className="hover:text-yellow-500 font-semibold uppercase cursor-pointer transition-colors">
              {item.label}
            </p>
          </li>
        ))}
      </ul>


      <div className="flex items-center gap-5 ms-10">

        {/* Language */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="outline-none">
              <Globe className="size-5 cursor-pointer hover:text-yellow-500 transition-colors" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-40 rounded-0 border-black/30 p-2 dark:bg-neutral-900"
          >

            <RadioGroup
              value={language}
              onValueChange={(value) =>
                setLanguage(value as "fr" | "mg")
              }
            >

              <label className="flex items-center gap-3 rounded-lg px-2 py-2 cursor-pointer hover:bg-muted">

                <span className="fi fi-fr h-4 w-6 shadow-sm"></span>

                <span className="flex-1 font-medium">
                  Français
                </span>

                <RadioGroupItem value="fr" />

              </label>


              <label className="flex items-center gap-3 rounded-lg px-2 py-2 cursor-pointer hover:bg-muted">

                <span className="fi fi-mg h-4 w-6 shadow-sm"></span>

                <span className="flex-1 font-medium">
                  Malagasy
                </span>

                <RadioGroupItem value="mg" />

              </label>

            </RadioGroup>

          </DropdownMenuContent>
        </DropdownMenu>


        {/* Dark mode */}
        <DropdownMenu>

          <DropdownMenuTrigger asChild>
            <button className="outline-none">
              <TextAlignStart className="size-5 cursor-pointer hover:text-yellow-500 transition-colors" />
            </button>
          </DropdownMenuTrigger>


          <DropdownMenuContent
            align="end"
            className="w-56 rounded-xs border-black/30 p-2 dark:bg-neutral-900"
          >

            <div className="flex items-center justify-between rounded-lg px-3 py-2">

              <div className="flex items-center gap-3">
                <MoonStar className="size-4" />

                <span className="font-medium">
                  Dark mode
                </span>
              </div>


              <Switch
                checked={darkMode}
                onCheckedChange={handleDarkMode}
              />

            </div>

          </DropdownMenuContent>

        </DropdownMenu>

      </div>

    </div>
  );
}