import { Button } from "@/components/ui/button";
import ContactTitle from "./contactTitle";
import ContactDescription from "./contactDescription";
import ContactInfo from "./contactInfo";
import ContactForm from "./contactForm";



export default function ContactComponent() {
    return (
        <div className="bg-white w-full grid grid-cols-2 gap-8 max-md:grid-cols-1 justify-center h-full">
         <div className="bg-red-500  max-md:hidden w-full flex flex-col gap-4">
            <ContactTitle />
            <ContactDescription />
           <ContactInfo />
         </div>
         <div className="bg-red-500 w-full">
            <ContactForm />
         </div>

        </div>
    );
}
