import Image from "next/image";
import NavbarUi from "./Navbar/navbarUi";
import SectionHomeComponent from "./Section/sectionHomeComponent";
import OnBoarding from "./onBoarding/onBoarding";

export default function HomeComponent(setOpenDevis: (value: boolean) => void) {

  return (
    <>
      <OnBoarding />

      <div className="relative h-screen overflow-hidden dark:bg-black/20 dark:text-white">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/4.webp" // Remplace par ton image
            alt="Background"
            className="object-cover w-full h-full scale-110 blur-xl"
          />
          <div className="absolute inset-0 bg-white/80 dark:bg-black/50" />
        </div>

        <NavbarUi />
        <SectionHomeComponent setOpenDevis={setOpenDevis} />
      </div>
    </>

  );
}