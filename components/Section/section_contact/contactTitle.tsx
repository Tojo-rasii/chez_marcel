import { Separator } from "@/components/lightswind/separator";
import { Button } from "@/components/ui/button";
import { Mouse } from "lucide-react";


export default function ContactTitle() {
  return (
    <div>
      <h3 className="font-heading font-semibold text-xl max-md:text-lg max-md:text-center flex items-center gap-3">

        <Separator className="w-8 h-0.5 bg-yellow-500" /><span>Contact</span>
      </h3>
    </div>
  );
}
