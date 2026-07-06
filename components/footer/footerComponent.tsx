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
        <div className="flex flex-col justify-between h-full gap-4">
            <div className="grid grid-cols-2  border-b-1 border-black h-full">
                <div className="flex flex-col justify-between gap-4">
                    <div className="flex flex-col gap-4">
                        <FooterTitle />
                        <FooterDescription />
                    </div>

                    <FooterFollow />
                </div>
                <div className="flex flex-col items-end gap-5">
                    <div className="flex items-start justify-end gap-25">
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
