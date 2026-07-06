"use client";
import { Button } from "@/components/ui/button";
import { Mouse } from "lucide-react";
import ActionDescription from "./actionDescription";
import ActionTitle from "./actionTitle";
import ActionButton from "./actionButton";


export default function ActionComponent() {
    return (
        <div className="bg-white p-5 w-full flex flex-col gap-8 max-md:gap-4 justify-center h-full">
            <div className="flex justify-center">
                <ActionTitle />

            </div>
            <div className="flex justify-center">
                <ActionDescription />

            </div>
            <div className="flex justify-center">
                <ActionButton />

            </div>


        </div>
    );
}
