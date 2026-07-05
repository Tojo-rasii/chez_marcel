import Logo from "./logo";
import NavLinks from "./navLinks";

export default function NavbarUi() {
    return (
        <div className="absolute w-full top-0">
            <div className="flex items-center justify-between h-16 p-5 bg-black text-white">
                <Logo />

                <div className="flex items-center justify-end">
                    <NavLinks />
                </div>
            </div>
        </div>
    );
}
