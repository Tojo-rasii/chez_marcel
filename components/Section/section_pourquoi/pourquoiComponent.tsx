import { Button } from "@/components/ui/button";
import { Mouse } from "lucide-react";
import PourquoiTitle from "./pourquoiTitle";
import PourquoiCard from "./pourquoiCard";


export default function PourquoiComponent() {
    return (
        <div className="bg-white p-5 w-full flex flex-col gap-8 max-md:justify-start justify-center h-full">
            <div className="flex justify-center">
                <PourquoiTitle />
            </div>
            <div className="flex justify-center max-md:justify-start">
                <PourquoiCard />
            </div>

        </div>
    );
}
