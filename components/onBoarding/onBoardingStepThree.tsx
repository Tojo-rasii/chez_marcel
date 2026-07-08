import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/lightswind/button";

export default function OnBoardingStepThree({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <div className="relative flex flex-col items-center text-center gap-8">

      <button
        onClick={onBack}
        className="absolute left-0 top-0 p-3 rounded-full border border-white/20 hover:bg-white/10 transition"
      >
        <ArrowLeft className="size-5" />
      </button>

      <span className="uppercase tracking-[0.3em] text-yellow-500">
        Dernière étape
      </span>

      <h1 className="text-6xl font-heading">
        Tout est prêt !
      </h1>

      <p className="max-w-xl text-white/70">
        Découvrez l'ensemble des services de Marcel Click & Services.
      </p>

      <Button className="rounded-full px-10 py-5 bg-yellow-500 text-black">
        <Compass className="mr-2 size-5" />
        Explorer
      </Button>

    </div>
  );
}