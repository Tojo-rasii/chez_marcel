import Image from "next/image";
import { Separator } from "../lightswind/separator";

export default function FooterTitle() {
  return (
<div>
        <h3 className="font-heading text-2xl max-md:text-xl ps-0 p-4 py-0 flex items-center gap-3">
            <Separator className="w-10 h-0.5 max-md:w-5 bg-black/50"/><span>lorem ipsum</span> 
        </h3>
    </div>
  );
}
