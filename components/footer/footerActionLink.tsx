
import Image from "next/image";

export default function FooterActionLink() {
    return (
        <div>
            <h1 className="font-heading dark:text-yellow-500 uppercase text-xl font-bold max-md:text-xl max-md:mb-2 flex items-center gap-2">

                Action
            </h1>


            <ul className="flex flex-col max-md:flex-row max-md:flex-wrap max-md:gap-2 max-md:mt-0 mt-4 text-lg gap-3">
                <li className="cursor-pointer  hover:text-yellow-500">
                    Demander un devis
                </li>
                <li className="cursor-pointer  hover:text-yellow-500">
                    Nous contacter
                </li>

            </ul>
        </div>
    );
}
