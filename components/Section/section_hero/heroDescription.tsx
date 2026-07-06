import { Separator } from "@/components/lightswind/separator";
import Image from "next/image";

export default function HeroDescription({ page }: any) {
  return (
    <div className="text-black/80 bg-transparent">
      <div className="flex flex-col gap-5">
        <h3 className="font-heading text-xl font-semibold max-md:text-lg flex items-center gap-3">
          <Separator className="w-8 h-0.5 max-md:hidden bg-black/50" /><span>Bienvenue chez Marcel Click & Services</span>
        </h3>
        <h1 className="font-heading uppercase max-md:text-xl text-2xl leading-relaxed font-extrabold md:text-4xl">
          Votre guichet unique pour tous vos besoins quotidiens
        </h1>
        <p className="text-black/70  font-semibold leading-relaxed ">
          <span className="max-md:line-clamp-3">
            Nous proposons un ensemble de prestations de confiance (Mobile Money, espace multimédia, salon de coiffure pour hommes, etc.), le tout sous un même toit.
            <br />
            Notre équipe expérimentée se consacre à vous offrir des services de qualité, rapides et adaptés à vos besoins. 

          </span>

          {/* <span className="hidden max-md:flex">Voir plus</span> */}
        </p>
      </div>
    </div>
  );
}