import Image from "next/image";
import NavbarUi from "./Navbar/navbarUi";
import SectionHomeComponent from "./Section/sectionHomeComponent";

export default function HomeComponent() {
    return (
        <div className="h-screen dark:bg-black/95 dark:text-white">
            <NavbarUi />
            <SectionHomeComponent />
        </div>
    );
}
