import { Separator } from "@/components/lightswind/separator";
import Image from "next/image";

export default function HeroDescription({ page }: any) {
  return (
    <div className="text-white bg-red-500">
      <div className="flex flex-col gap-5">
        <h3 className="font-heading text-2xl flex items-center gap-3">
                    <Separator className="w-8 h-0.5 bg-white/50"/><span>Bienvenue chez Marcel Click & Services</span> 
                </h3>
        <h1 className="font-heading uppercase text-2xl leading-relaxed font-semibold md:text-4xl text-yellow-500 ">
          Votre guichet unique pour tous vos besoins quotidiens
        </h1>
        <p className="text-gray-200 leading-relaxed">
          Nous proposons un ensemble de prestations de confiance (Mobile Money, espace multimédia, salon de coiffure pour hommes, etc.), le tout sous un même toit.
          <br /><br />
          Notre équipe expérimentée se consacre à vous offrir des services de qualité, rapides et adaptés à vos besoins. En alliant convivialité et professionnalisme, Chez Marcel vous assure une expérience client optimale.
        </p>
      </div>
    </div>
  );
}