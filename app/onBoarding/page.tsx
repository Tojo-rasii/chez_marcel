import HomeComponent from "@/components/homeComponent";
import OnBoarding from "@/components/onBoarding/onBoarding";

export default function Home({
    onNext,
}: {
    onNext: () => void;
}) {
  return (
    <div>
    <OnBoarding  onNext={onNext}/>
    </div>
  );
}
