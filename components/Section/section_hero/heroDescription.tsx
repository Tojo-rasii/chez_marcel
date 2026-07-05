import Image from "next/image";

export default function HeroDescription({ page }: any) {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-2xl text-white max-w-2xl">
      <div className="flex flex-col gap-6">
        <span className="font-semibold tracking-wider uppercase text-sm">Bienvenue chez Marcel Click & Services</span>
        <h1 className="font-heading text-4xl md:text-5xl leading-tight text-yellow-500 ">
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