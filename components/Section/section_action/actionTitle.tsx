"use client";
import { Separator } from "@/components/lightswind/separator";
import { Button } from "@/components/ui/button";
import { Mouse } from "lucide-react";


export default function ActionTitle() {
  return (
    <div>
        <h3 className="font-heading font-semibold text-xl max-md:text-lg max-md:text-center flex items-center gap-3">
            <Separator className="w-10 h-0.5 bg-yellow-500 max-md:hidden "/><span>Chez Marcel Click & Services</span> 
        </h3>
    </div>
  );
}
