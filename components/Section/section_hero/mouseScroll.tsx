import { Button } from "@/components/ui/button";
import { Mouse } from "lucide-react";


export default function MouseScroll() {
  return (
    <div className="bg-transparent p-2 px-5">
      <h2 className="bg-transparent font-heading text-xl flex items-center gap-2">
        <i className="text-yellow-500"><Mouse /></i>
        scroll
      </h2>
    </div>
  );
}
