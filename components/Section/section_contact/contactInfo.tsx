import { MapPin, Phone } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="text-black font-serif p-4 max-w-xl">
      {/* En-tête / Titre principal */}
      <h2 className="text-2xl font-normal tracking-wide mb-10 pl-10">
        Chez Marcel - Click & services
      </h2>

      {/* Liste des informations de contact */}
      <div className="flex flex-col gap-8 text-xl">
        
        {/* Ligne 1 : Adresse / Localisation */}
        <div className="flex items-center gap-6">
          <MapPin className="w-8 h-8 stroke-[1.25] shrink-0" />
          <span className="font-light tracking-wide">
            Anjanahary, Antananarivo.
          </span>
        </div>

        {/* Ligne 2 : Numéro WhatsApp */}
        <div className="flex items-center gap-6">
          {/* Icône personnalisée de bulle de message avec téléphone (style WhatsApp) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8 shrink-0"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            <path d="M15 13a2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2 2 2 0 0 1 2 2z" className="opacity-0" />
            <path d="M10.5 9.5c.5-1 1.5-1 2 0s.5 2-1 2.5-2-.5-2.5-1.5z" className="opacity-0" />
            {/* Version simplifiée du combiné à l'intérieur de la bulle */}
            <path d="M9 10a.5.5 0 0 0 .5.5.5.5 0 0 0 .5-.5M14 13.5a2.5 2.5 0 0 1-4-2" />
            <path d="M15 13.5c-.2-.6-.8-1-1.5-1h-.5c-.7 0-1.3.4-1.5 1a1.2 1.2 0 0 0 1 1.5h1.5a1.2 1.2 0 0 0 1-1.5z" className="opacity-0"/>
            <path d="M9.5 9.5a3 3 0 0 1 5 3" />
          </svg>
          <span className="font-light tracking-wide">
            +261 38 62 962 95
          </span>
        </div>

        {/* Ligne 3 : Numéro de téléphone classique */}
        <div className="flex items-center gap-6">
          <Phone className="w-8 h-8 stroke-[1.25] shrink-0 -rotate-90" />
          <span className="font-light tracking-wide">
            038 62 962 95
          </span>
        </div>

      </div>
    </div>
  );
}