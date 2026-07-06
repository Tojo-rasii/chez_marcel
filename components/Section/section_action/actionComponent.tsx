"use client";
import { Button } from "@/components/ui/button";
import { Mouse } from "lucide-react";
import ActionDescription from "./actionDescription";
import ActionTitle from "./actionTitle";
import ActionButton from "./actionButton";


export default function ActionComponent() {
  return (
    <section className="relative w-full bg-gradient-to-b from-black via-neutral-950 to-black px-6 py-16 md:py-24">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-10">
        
        {/* Titre */}
        <div className="animate-fade-in">
          <ActionTitle />
        </div>

        {/* Description */}
        <div className="max-w-2xl text-neutral-300 leading-relaxed animate-fade-in delay-100">
          <ActionDescription />
        </div>

        {/* Boutons */}
        <div className="mt-4 animate-fade-in delay-200">
          <ActionButton />
        </div>

      </div>
    </section>
  );
}
