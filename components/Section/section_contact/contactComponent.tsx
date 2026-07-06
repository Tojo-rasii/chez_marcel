import { Button } from "@/components/ui/button";
import ContactTitle from "./contactTitle";
import ContactDescription from "./contactDescription";
import ContactInfo from "./contactInfo";
import ContactForm from "./contactForm";



export default function ContactComponent() {
    return (
        <div className="bg-black p-5 w-full grid grid-cols-2  h-full">
         <div className="bg-black w-full flex flex-col ">
            <ContactTitle />
            <ContactDescription />
           <ContactInfo />
         </div>
         <div>
            <ContactForm />
         </div>

        </div>
    );
}
