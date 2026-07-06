import { Button } from "@/components/ui/button";
import { Mouse } from "lucide-react";


export default function MouseScroll() {
  return (
    <div className=" m-5 p-5 h-full">
        <h2 className="bg-transparent font-heading text-white text-xl flex items-center gap-2">
            < Mouse />
            scroll
        </h2>
    </div>
  );
}
