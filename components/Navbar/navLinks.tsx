"use client";

import { Globe, TextAlignStart, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/lightswind/dropdown-menu";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/lightswind/radio-group";
import { Switch } from "@/components/lightswind/switch";
import { MoonStar } from "lucide-react";

export default function NavLinks() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<"fr" | "mg">("fr");

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
    <div className="flex text-black/80 z-99 items-center justify-center gap-5">
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="outline-none">
              <Globe className="size-5 cursor-pointer hover:text-yellow-500 transition-colors" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-40 rounded-0 border-black/30 p-2"
          >
            <RadioGroup
              value={language}
              onValueChange={(value) => setLanguage(value as "fr" | "mg")}
              className="space-y-1"
            >
              <label
                htmlFor="fr"
                className="flex items-center gap-3 rounded-lg px-2 py-2 cursor-pointer hover:bg-muted transition-colors"
              >


                <span className="fi fi-fr h-4 w-6 shadow-sm"></span>

                <span className="flex-1 font-medium">Français</span>
                <RadioGroupItem
                  id="fr"
                  value="fr"
                  className="
focus:outline-none
focus-visible:outline-none
focus-visible:ring-0
focus-visible:ring-offset-0
data-[state=checked]:border-primary
ring-0
"
                />
              </label>

              <label
                htmlFor="mg"
                className="flex items-center gap-3 rounded-lg px-2 py-2 cursor-pointer hover:bg-muted transition-colors"
              >


                <span className="fi fi-mg h-4 w-6 shadow-sm"></span>

                <span className="flex-1 font-medium">Malagasy</span>
                <RadioGroupItem
                  id="mg"
                  value="mg"
                  className="
focus:outline-none
focus-visible:outline-none
focus-visible:ring-0
focus-visible:ring-offset-0
data-[state=checked]:border-primary
ring-0
"
                />
              </label>
            </RadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="outline-none">
              <TextAlignStart className="size-5 cursor-pointer hover:text-yellow-500 transition-colors" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56 rounded-xl scale-95 border-black/30 p-2"
          >
            <div className="flex items-center justify-between rounded-lg px-3 py-2">
              <div className="flex items-center gap-3">
                <MoonStar className="size-4" />
                <span className="font-medium">Dark mode</span>
              </div>

              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />

            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}