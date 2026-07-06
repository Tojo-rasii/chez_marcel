import Image from "next/image";
import { Separator } from "../lightswind/separator";

export default function FooterTitle() {
  return (
<div>
      <h3 className="font-heading font-semibold text-xl max-md:text-lg max-md:text-center flex items-center gap-3">
            <Separator className="w-8 h-0.5 max-md:w-5 bg-black/50"/><span>lorem ipsum</span> 
        </h3>
    </div>
  );
}
