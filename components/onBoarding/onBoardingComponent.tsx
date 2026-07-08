import Image from "next/image";
import { MyHero } from "./myHero";
export default function OnBoardingComponent({
    onNext,
}: {
    onNext: () => void;
}) {
  
  return (
    <div className="h-full flex justify-center items-center">
     <MyHero onNext={onNext} />
    </div>
  );
}