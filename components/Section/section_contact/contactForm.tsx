import { Button } from "@/components/ui/button";
import { Mouse } from "lucide-react";

export default function ContactForm() {
  return (
    <div className="relative w-full max-w-xl mx-auto my-8">
      {/* Conteneur principal avec effet d'ombre pleine noire décalée */}
      <div className="bg-white border border-black p-8 md:p-10 shadow-[20px_20px_0px_0px_#1a1a1a] flex flex-col gap-8">
        
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-serif tracking-wider text-black uppercase">
            LOREM IPSUM
          </h3>
          {/* Icône optionnelle si vous souhaitez l'intégrer discrètement */}
          <Mouse className="text-black/40 w-5 h-5 hidden md:block" />
        </div>

        <form className="flex flex-col gap-10">
          {/* Ligne : Nom & Prénom */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Nom"
                className="w-full border-b border-black bg-transparent pb-2 text-black placeholder-black/80 focus:outline-none rounded-none text-base"
                required
              />
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Prénom"
                className="w-full border-b border-black bg-transparent pb-2 text-black placeholder-black/80 focus:outline-none rounded-none text-base"
                required
              />
            </div>
          </div>

          {/* Ligne : Email */}
          <div className="flex flex-col">
            <input
              type="email"
              placeholder="Email"
              className="w-full border-b border-black bg-transparent pb-2 text-black placeholder-black/80 focus:outline-none rounded-none text-base"
              required
            />
          </div>

          {/* Ligne : Messages */}
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Messages"
              className="w-full border-b border-black bg-transparent pb-2 text-black placeholder-black/80 focus:outline-none rounded-none text-base"
              required
            />
          </div>

          {/* Bouton de soumission arrondi et centré */}
          <div className="flex justify-center mt-4">
            <Button 
              type="submit" 
              className="bg-[#1a1a1a] hover:bg-black text-white font-medium tracking-widest uppercase px-16 py-6 rounded-full text-xs transition-colors"
            >
              ENVOYER
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}