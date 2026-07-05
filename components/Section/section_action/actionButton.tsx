"use client";
import { Button } from "@/components/ui/button";
import { Mouse } from "lucide-react";


export default function ActionButton() {
  return (
    <div>
        <div className="flex justify-center gap-4 items-center mt-5">
            <Button variant="outline" className="w-full outline-2 outline-black bg-transparent font-heading text-xl w-max h-15 text-black px-4 rounded-full">Demander un devis</Button>
            <Button variant="default" className="w-full outline-2 outline-black bg-black text-white w-max h-15 text-xl font-heading px-4 rounded-full"> Nous contacter </Button>
        </div>
    </div>
  );
}
