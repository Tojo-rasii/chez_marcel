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
            <div className="grid items-start gap-4 grid-cols-3 mt-5">

                {
                    cardData.map((card, index) => (
                
                    <div key={index} className="flex flex-col items-center gap-4">
                    <div className="number min-w-18 min-h-18 flex items-center justify-center m-auto rounded-full bg-black ">
                        <span className="font-normal font-heading  text-3xl text-white" >
                            {card.number}
                        </span>
                    </div>
                    <div className="title">
                        <h1 className="text-3xl font-heading text-center">{card.title}</h1>
                    </div>
                    <div className="desc text-center">
                        <p>{card.desc}</p>
                    </div>
                </div> 
            
                ))
                }
               
            </div>

        </div>
    );
}
