import { Button } from "@/components/ui/button";
import { Mouse } from "lucide-react";
import PourquoiTitle from "./pourquoiTitle";
import PourquoiCard from "./pourquoiCard";


export default function PourquoiComponent() {
    return (
        <div className=" p-5 w-full flex flex-col gap-8 justify-center h-full">
            <div className="flex justify-center">
                <PourquoiTitle />
            </div>
            <div className="flex justify-center">
                <PourquoiCard />
            </div>

        </div>
    );
}
