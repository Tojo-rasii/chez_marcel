"use client";
import { Separator } from "@/components/lightswind/separator";
import { Button } from "@/components/ui/button";
import { Mouse } from "lucide-react";


export default function ActionTitle() {
  return (
    <div>
        <h3 className="font-heading text-2xl flex items-center gap-3">
            <Separator className="w-10 h-0.5 bg-black/50"/><span>Chez Marcel Click & Services</span> 
        </h3>
    </div>
  );
}
