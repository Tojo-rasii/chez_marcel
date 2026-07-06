import Image from "next/image";

export default function HeroDescription({ page }: any) {
  return (
    <div className="max-w-2xl -translate-y-8 mb-16 rounded-3xl p-12 text-white shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col gap-6">
        <span className="text-base font-semibold uppercase tracking-wider text-yellow-400 drop-shadow-sm">
          Bienvenue chez Marcel Click & Services
        </span>

        <h2 className="font-heading text-xl md:text-4xl leading-tight text-yellow-500">
          Votre guichet unique pour tous vos besoins quotidiens
        </h2>

        <p className="leading-relaxed text-gray-200">
          Nous proposons un ensemble de prestations de confiance (Mobile Money,
          espace multimédia, salon de coiffure pour hommes, etc.), le tout sous
          un même toit.
          <br />
          <br />
          Notre équipe expérimentée se consacre à vous offrir des services de
          qualité, rapides et adaptés à vos besoins. En alliant convivialité et
          professionnalisme, Chez Marcel vous assure une expérience client
          optimale.
        </p>
      </div>
    </div>
  );
}
