import { Button } from "@/components/ui/button";
import { Mouse } from "lucide-react";


export default function MouseScroll() {
  return (
    <div className="bg-red-500 p-2 px-5">
        <h2 className="bg-transparent font-heading text-xl flex items-center gap-2">
            <Mouse />
            scroll
        </h2>
    </div>
  );
}
