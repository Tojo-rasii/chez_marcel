import Image from "next/image";
import NavbarUi from "./Navbar/navbarUi";
import SectionHomeComponent from "./Section/sectionHomeComponent";

export default function HomeComponent() {
    return (
        <div className="h-screen">
            <NavbarUi />
            <SectionHomeComponent />
        </div>
    );
}
