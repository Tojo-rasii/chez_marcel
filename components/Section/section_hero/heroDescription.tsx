import Image from "next/image";

export default function HeroDescription({ page }: any) {
  return (
    <div>
      <div className="flex-col flex gap-4">
        <h1 className="font-heading text-2xl">Bienvenue chez Marcel</h1>
        <h1 className="font-heading text-5xl">Votre guichet unique pour tous vos besoins quotidiens</h1>
        <p>Nous proposons un ensemble de prestations de confiance (Mobile Money,  espace multimédia, salon de coiffure pour hommes, etc.), le tout sous un même toit.
          <br />
          Notre équipe expérimentée se consacre à vous offrir des  services de qualité, rapides et adaptés à vos besoins.
          <br /> En alliant  convivialité et professionnalisme, Chez Marcel vous assure une  expérience client optimale.</p>

      </div>
    </div>
  );
}
