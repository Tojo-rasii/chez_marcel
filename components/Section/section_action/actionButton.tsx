"use client";
import { Button } from "@/components/ui/button";
import { Mouse } from "lucide-react";


export default function ActionButton() {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
      <Button
        variant="outline"
        className="h-12 px-6 rounded-full border-2 border-white bg-transparent text-white font-heading text-base sm:text-lg transition hover:bg-white hover:text-black"
      >
        Demander un devis
      </Button>

      <Button
        variant="default"
        className="h-12 px-6 rounded-full bg-white text-black font-heading text-base sm:text-lg transition hover:opacity-90 "
      >
        Nous contacter
      </Button>
    </div>
  );
}