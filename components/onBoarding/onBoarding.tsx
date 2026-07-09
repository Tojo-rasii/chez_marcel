"use client";

import { useEffect, useState } from "react";
import OnBoardingComponent from "./onBoardingComponent";

export default function OnBoarding() {
  const [showOnboarding, setShowOnboarding] = useState(false);
const [backgroundIndex, setBackgroundIndex] = useState(0);
const backgrounds = [
  "/image.png",
  "/mbl.png",
  "/barber.png",
];

  useEffect(() => {
    const done = localStorage.getItem("onboarding-finished");

    if (!done) {
      setShowOnboarding(true);
    }
  }, []);

  const finishOnboarding = () => {
    localStorage.setItem("onboarding-finished", "true");
    setShowOnboarding(false);
  };

  if (!showOnboarding) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden dark:bg-black/20 dark:text-white">
      <div className="absolute inset-0 -z-10">
       <img
  key={backgroundIndex}
  src={backgrounds[backgroundIndex]}
  className="h-full w-full scale-110 object-cover blur-xl transition-all duration-700"
/>

        <div className="absolute inset-0 bg-black/50" />
      </div>

     <OnBoardingComponent
  onFinish={finishOnboarding}
  onBackgroundChange={setBackgroundIndex}
/>
    </div>
  );
}