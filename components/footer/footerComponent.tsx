import Image from "next/image";
import FooterDescription from "./footerDescription";
import FooterTitle from "./footerTitle";
import FooterFollow from "./footerFollow";
import FooterCopyright from "./footerCopyright";
import FooterNewsLetter from "./footerNewsletter";
import FooterActionLink from "./footerActionLink";
import FooterServiceLink from "./footerServiceLink";

export default function FooterComponent() {
    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 h-full">
                <div className="flex flex-col gap-4">
                    <FooterTitle />
                    <FooterDescription />
                    <FooterFollow />
                </div>
                <div className="flex flex-col items-end gap-4">
                    <div className="flex items-start justify-end gap-5">
                        <FooterServiceLink />
                        <FooterActionLink />
                    </div>
               <FooterNewsLetter />
                </div>
            </div>
            <div className="copyright">
                <FooterCopyright />
            </div>
        </div>
    );
}
