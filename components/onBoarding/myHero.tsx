import { MorphText } from "@/components/ui/morph-text"

// Default — cycles CREATE / DESIGN / DEVELOP
export function MyHero({
    onNext,
}: {
    onNext: () => void;
}) {

    
    return (
        <MorphText
            subtext="Rapidité, sécurité et style au même endroit !"
            onNext={onNext}
        />
    );
}


// Custom words and interval
export function CustomMorph() {
  return (
    <MorphText
      words={["Transferts d’argent", "Films", "Coiffure pro"]}
      interval={2500}
      subtext="Move fast. Break things."
      fontSize="clamp(2rem, 10vw, 8rem)"
      className="font-heading"
    />
  )
}