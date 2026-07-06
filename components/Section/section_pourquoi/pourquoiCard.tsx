import { Button } from "@/components/ui/button";
import { Mouse } from "lucide-react";


export default function PourquoiCard() {

    const cardData = [
        {
            number: "01",
            title: "Solution tout-en-un",
            desc: "Chez Marcel Click & Services regroupe plusieurs services (finance mobile, loisirs, bien-être) en un seul lieu pratique."
        },
        {
            number: "02",
            title: "Sécurité et fiabilité",
            desc: "Toutes les transactions Mobile Money sont sécurisées. Notre  savoir-faire vous garantit des opérations financières fiables et  rapides."
        },
        {
            number: "03",
            title: "Rapidité et disponibilité",
            desc: "Horaires étendus et délai minimal d’attente : nous savons que votre temps est précieux."
        },
    ]
    return (
        <div>
            <div className="grid items-start max-md:w-full gap-4 grid-cols-3 max-md:grid-cols-1 max-md:mt-0 mt-5">

                {
                    cardData.map((card, index) => (

                        <div key={index} className="flex max-md:items-start max-md:w-full max-md:flex-row  relative flex-col items-center max-md:items-start gap-4">
                            <div className="number min-w-18 min-h-18 max-md:min-w-12  max-md:min-h-12  flex items-center justify-center max-md:m-0 m-auto rounded-full bg-black ">
                                <span className="font-normal font-heading max-md:text-xl text-3xl text-white" >
                                    {card.number}
                                </span>
                            </div>
                            <div className="desc ax-md:w-full flex flex-col gap-2">
                                <div className="title">
                                    <h1 className="text-2xl text-black/80 font-semibold max-md:text-xl font-heading max-md:text-start text-center">{card.title}</h1>
                                </div>
                                <div className="desc text-center max-sm:line-clamp-2 max-md:text-start">
                                    <p>{card.desc}</p>
                                </div>
                            </div>

                        </div>

                    ))
                }

            </div>

        </div>
    );
}
