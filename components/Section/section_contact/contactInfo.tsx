import { MapPin, Phone, MessageCircle } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className=" p-6 rounded-3xl shadow-2xl text-white max-w-xl">
      {/* En-tête */}
      <h2 className="text-xl font-bold tracking-tight mb-8 text-yellow-500 uppercase text-sm tracking-widest">
        Informations de contact
      </h2>

      {/* Liste des informations */}
      <div className="flex flex-col gap-4">
        
        {/* Adresse */}
        <div className="group flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300">
          <div className="p-3 bg-white/10 rounded-full group-hover:bg-yellow-500/20 transition-colors">
            <MapPin className="w-6 h-6 text-yellow-500" />
          </div>
          <span className="font-light tracking-wide text-lg text-gray-200">
            Anjanahary, Antananarivo
          </span>
        </div>

        {/* WhatsApp */}
        <a href="https://wa.me/261386296295" className="group flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer">
          <div className="p-3 bg-white/10 rounded-full group-hover:bg-green-500/20 transition-colors">
            <MessageCircle className="w-6 h-6 text-green-500" />
          </div>
          <span className="font-light tracking-wide text-lg text-gray-200">
            +261 38 62 962 95 (WhatsApp)
          </span>
        </a>

        {/* Téléphone */}
        <a href="tel:+261386296295" className="group flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer">
          <div className="p-3 bg-white/10 rounded-full group-hover:bg-blue-500/20 transition-colors">
            <Phone className="w-6 h-6 text-blue-400" />
          </div>
          <span className="font-light tracking-wide text-lg text-gray-200">
            038 62 962 95
          </span>
        </a>

      </div>
    </div>
  );
}