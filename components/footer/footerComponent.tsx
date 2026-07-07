import Image from "next/image";
import FooterDescription from "./footerDescription";
import FooterTitle from "./footerTitle";
import FooterFollow from "./footerFollow";
import FooterCopyright from "./footerCopyright";
import FooterNewsLetter from "./footerNewsletter";
import FooterActionLink from "./footerActionLink";
import FooterServiceLink from "./footerServiceLink";
import { Button } from "@/components/ui/button";

export default function FooterComponent() {
    return (
        <div className="flex flex-col dark:text-white max-md:justify-start justify-between h-full gap-4">
            <div className="grid grid-cols-2 max-md:grid-cols-1 max-md:pb-10  border-b-1 border-black h-full max-md:h-full">
                <div className="flex flex-col justify-between max-md:justify-between max-md:gap-2 gap-4">
                    <div className="flex flex-col max-md:gap-2 gap-4">
                        <FooterTitle />
                        <FooterDescription />
                    </div>
                    <div className="max-md:hidden">
                        <FooterFollow />
                    </div>

                </div>
                <div className="flex flex-col max-md:items-start max-md:mt-4 items-end gap-5">
                    <div className="flex items-start max-md:flex-col max-md:gap-4  justify-end gap-25">
                        <FooterServiceLink />
                        <FooterActionLink />
                    </div>
                    <div className="flex w-full justify-end max-md:hidden">
                        <FooterNewsLetter />
                    </div>
                    <div className="hidden max-md:flex mt-4">
                        <Button variant="outline" className="max-md:w-full max-md:text-wrap max-sm:h-max outline-2 outline-black bg-transparent font-heading max-sm:text-lg text-xl w-max h-13 text-black px-8 cursor-pointer rounded-full">Abonnez vous à nos newsLetters</Button>
                    </div>

                </div>
            </div>
            <div className="copyright">
                <FooterCopyright />
            </div>
        </div>
    );
}
