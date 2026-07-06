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
    <footer className="w-full bg-black text-white border-t border-white/10">
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          
          {/* LEFT */}
          <div className="flex flex-col gap-4">
            <FooterTitle />
            <p className="text-neutral-400 text-sm leading-relaxed max-w-md">
              <FooterDescription />
            </p>
            <FooterFollow />
          </div>

          {/* RIGHT */}
            <div className="flex flex-col md:items-end justify-start gap-1 -mt-1">
                <FooterNewsLetter />
            </div>

        </div>
      </div>
    </footer>
  );
}