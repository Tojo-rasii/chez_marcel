import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/lightswind/button";
import DiagonalCarousel from "../ui/diagonal-carousel";
import { DiagonalCarouselDemo } from "./diagonalCarouselDemo";

export default function OnBoardingStepTwo({
    onNext,
    onBack,
}: {
    onNext: () => void;
    onBack: () => void;
}) {

    const items = [
        { src: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=400&auto=format&fit=crop", title: "urban exploration" },
        { src: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=400&auto=format&fit=crop", title: "night scene" },
        { src: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=400&auto=format&fit=crop", title: "yellow wildflowers" },
        { src: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=400&auto=format&fit=crop", title: "street with mount fuji" },
    ]
    return (
        <div className="relative flex flex-col h-full w-full items-center text-center gap-8">



            <DiagonalCarousel
                items={items}
                defaultActiveIndex={2}
                slideSize={250}
                className="h-full w-full text-neutral-800 dark:bg-neutral-950 dark:text-neutral-100"
            />

            <div className="absolute left-0 bottom-0 text-white text-left">

                <p className="max-w-xl text-white/70">
                    Mobile Money, impression, films, coiffure et bien plus.
                </p>
                <div className="flex items-center gap-2">
                          <button
                    onClick={onBack}
                    className="p-3 rounded-full border border-white/20 hover:gap-2 transition"
                >
                    <ArrowLeft className="size-5" />
                </button>
                                <Button
                    onClick={onNext}
                    className="rounded-full px-8 py-5 bg-yellow-500  hover:bg-yellow-400  hover:gap-3 cursor-pointer font-semibold uppercase text-black"
                >
                    Continuer
                      <ArrowRight className="size-5" />
                </Button>
                </div>

             
            </div>

            <div className="absolute right-0 text-white text-right">
             

                <span className="uppercase tracking-[0.3em] text-yellow-500">
                    Étape 2
                </span>

                <h1 className="text-6xl font-heading">
                    Tous vos services
                    <br />
                    au même endroit
                </h1>

                <p className="max-w-xl text-white/70">
                    Mobile Money, impression, films, coiffure et bien plus.
                </p>


            </div>

        </div>
    );
}