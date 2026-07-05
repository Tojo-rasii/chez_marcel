import FooterComponent from "@/components/footer/footerComponent";
import ActionComponent from "../section_action/actionComponent";
import ContactComponent from "../section_contact/contactComponent";
import PourquoiComponent from "../section_pourquoi/pourquoiComponent";
import HeroDescription from "./heroDescription";
import HeroServiceContenu from "./heroServiceContenu";

export default function SectionHero({ activePage }: any) {
    return (
        <div className="p-5 h-full">
            <div className={`grid ${activePage === 2 ? "grid-cols-1" : ""} grid-cols-1 ${activePage === 1 ? "grid-cols-2" : ""} gap-5 items-center h-full transition-all duration-500`}>
                {activePage !== 2 && activePage !== 3 && activePage !== 4 && activePage !== 5 && activePage !== 6 &&  (

                    <div className={`h-full flex items-center transition-all duration-500 ${activePage === 2 ? "justify-center col-span-2 text-center" : ""
                        }`}>
                        <HeroDescription page={activePage} />
                    </div>
                )}


                {activePage !== 3 && activePage !== 4 && activePage !== 5 && activePage !== 6 && (

                <div className={`h-full m-auto w-full flex items-center justify-center transition-all duration-500`}>
                    <HeroServiceContenu page={activePage} />
                </div>
                )}

                {activePage !== 1 && activePage !== 2 && activePage !== 4 && activePage !== 5 && activePage !== 6 && (
                    <PourquoiComponent />
                )}


                {activePage !== 1 && activePage !== 2 &&  activePage !== 3 && activePage !== 5 && activePage !== 6 &&(
                    <ActionComponent />
                )}

                
                {activePage !== 1 && activePage !== 2 &&  activePage !== 3 && activePage !== 4 &&   activePage !== 6 &&(
                    <ContactComponent />
                )}


                {activePage !== 1 && activePage !== 2 &&  activePage !== 3 && activePage !== 4 && activePage !== 5 &&(
                    <FooterComponent />
                )}



            </div>
        </div>
    );
}