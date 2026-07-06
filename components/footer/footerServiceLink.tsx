

import Image from "next/image";

export default function FooterServiceLink() {
    return (
        <div>
            <h1 className="font-heading text-2xl flex items-center gap-2">
                Services
            </h1>

            <ul className="flex flex-col mt-4 text-lg gap-3">
                <li className="cursor-pointer">
                    Multimedia
                </li>
                <li className="cursor-pointer">
                    Film
                </li>
                <li className="cursor-pointer">
                    Mobile money
                </li>
                <li className="cursor-pointer">
                    Barber shop
                </li>
            </ul>
        </div>
    );
}
