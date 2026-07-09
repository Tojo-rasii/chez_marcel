import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/lightswind/button";
import DiagonalCarousel from "../ui/diagonal-carousel";
import { DiagonalCarouselDemo } from "./diagonalCarouselDemo";
import { Separator } from "../lightswind/separator";
import { useEffect, useState } from "react";

export default function OnBoardingStepTwo({
  onNext,
  onBack,
  onBackgroundChange,
}: {
  onNext: () => void;
  onBack: () => void;
  onBackgroundChange: (index: number) => void;
}) {
    const items = [
        {
            src: "/image.png",
            title: " Catalogue de films",
            heading: "Trouvez et\ncommandez\nvos films",
            description:
                "Parcourez notre catalogue en ligne, choisissez vos films et passez votre commande en toute simplicité. Une fois sur place, il vous suffit de nous communiquer votre numéro de commande pour récupérer votre sélection rapidement.",
        },
        {
            src: "/barber.png",
            title: "Salon de coiffure",
            heading: "Réservez votre passage chez le coiffeur",
            description:
                "Prenez rendez-vous sans faire la queue. Recevez une notification lorsque votre tour approche et présentez-vous au bon moment.",
        },
        {
            src: "/mbl.png",
            title: "Dépôt et autres services",
            heading: "Planifiez votre dépôt",
            description:
                "Programmez à l'avance le dépôt de vos colis ou de vos articles. Gagnez du temps grâce à une prise en charge plus rapide lors de votre arrivée.",
        },
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    const current = items[activeIndex];

    useEffect(() => {
  onBackgroundChange(activeIndex);
}, [activeIndex, onBackgroundChange]);
    return (
        <div className="relative flex flex-col h-full w-full items-center text-center gap-8">



            <DiagonalCarousel
                items={items}
                activeIndex={activeIndex}
                onActiveIndexChange={setActiveIndex}
                slideSize={250}
                className="h-full w-full text-neutral-800  dark:text-neutral-100"
            />

            <div className="absolute left-0 bottom-0 p-7 flex flex-col gap-8 text-white text-left">

                <p className="max-w-md text-md text-white/70 transition-all duration-500">
                    {current.description}
                </p>
                <Separator className="w-25 max-sm:w-8 max-sm:w-5 h-0.5 bg-white/80" />
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => {
                            if (activeIndex > 0) {
                                setActiveIndex((prev) => prev - 1);
                            } else {
                                onBack();
                            }
                        }}
                        className="p-3 rounded-full border border-white/20 hover:gap-2 transition"
                    >
                        <ArrowLeft className="size-5" />
                    </button>
                    <Button
                        onClick={() => {
                            if (activeIndex < items.length - 1) {
                                setActiveIndex((prev) => prev + 1);
                            } else {
                                onNext();
                            }
                        }}
                        className="rounded-full px-8 py-5 !bg-yellow-500  hover:bg-yellow-400  hover:gap-3 cursor-pointer font-semibold uppercase text-black"
                    >
                        {activeIndex === items.length - 1 ? "Explorer" : "Continuer"}
                        <ArrowRight className="size-5" />
                    </Button>
                </div>



            </div>

            <div className="absolute right-0 text-white px-7 flex items-end gap-4 justify-center flex-col  text-right">


                <h3
                    className=
                    "morph-subtext mt-8 flex max-md:!text-[0.9em] items-center !text-wrap gap-4 font-heading uppercase text-white/80"
                    style={{
                        opacity: 1,
                        animation: "morph-fade-up 1s text-white ease-out 1s forwards",
                    }}
                >
                    <Separator className="w-15 max-sm:w-8 max-sm:w-5 h-0.5 bg-yellow-500/50" /><span className="!text-wrap">Chez Marcel Click & Services</span>
                </h3>

                <h1 className="text-6xl font-heading max-w-md whitespace-pre-line transition-all duration-500">
                    {current.heading}
                </h1>



            </div>

        </div>
    );
}