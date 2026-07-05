import Logo from "./logo";
import NavLinks from "./navLinks";

export default function NavbarUi() {
    return (
        <div>
            <div className="flex items-center justify-between h-16 px-4 bg-black text-white">
                <Logo />

                <div className="flex items-center justify-end">
                    <NavLinks />
                </div>
            </div>
        </div>
    );
}
