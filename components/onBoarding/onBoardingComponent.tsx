"use client";

import { useState } from "react";
import { MyHero } from "./myHero";
import OnBoardingStepTwo from "./onBoardingStepTwo";
import OnBoardingStepThree from "./onBoardingStepThree";

export default function OnBoardingComponent() {
  const [page, setPage] = useState(1);

  return (
    <div className="h-full flex items-center justify-center">

      {page === 1 && (
        <MyHero onNext={() => setPage(2)} />
      )}

      {page === 2 && (
        <OnBoardingStepTwo
          onNext={() => setPage(3)}
          onBack={() => setPage(1)}
        />
      )}

      {page === 3 && (
        <OnBoardingStepThree
          onBack={() => setPage(2)}
        />
      )}

    </div>
  );
}