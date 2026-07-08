import Image from "next/image";

import OnBoardingComponent from "./onBoardingComponent";

export default function OnBoarding() {
  return (
    <div className="relative h-screen overflow-hidden dark:bg-black/20 dark:text-white">

      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=400&auto=format&fit=crop"
          className="object-cover w-full h-full scale-110 blur-xl"
        />

        <div className="absolute inset-0 bg-black/50"/>
      </div>

      <OnBoardingComponent />

    </div>
  );
}