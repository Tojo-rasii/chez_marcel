"use client";

import { useState } from "react";
import { MyHero } from "./myHero";
import OnBoardingStepTwo from "./onBoardingStepTwo";

export default function OnBoardingComponent({
  onFinish,
  onBackgroundChange,
}: {
  onFinish: () => void;
  onBackgroundChange: (index: number) => void;
}) {
  const [page, setPage] = useState(1);

  return (
    <div className="h-full flex items-center justify-center">

      {page === 1 && (
        <MyHero onNext={() => setPage(2)} />
      )}

      {page === 2 && (
 <OnBoardingStepTwo
  onNext={onFinish}
  onBack={() => setPage(1)}
  onBackgroundChange={onBackgroundChange}
/>
      )}

      

    </div>
  );
}