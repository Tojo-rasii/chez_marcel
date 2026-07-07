import { SendIcon } from "lucide-react";
import Image from "next/image";

export default function FooterNewsLetter() {
  return (
    <div className="relative w-full max-w-lg mt-8 -mb-10 float-end me-3 my-0">
      {/* Conteneur principal avec effet d'ombre pleine noire décalée */}
      <div className="bg-white dark:bg-gray-500/20 dark:text-white  border border-black p-5 pt-5 pb-8 shadow-[16px_16px_0px_0px_#F0B118] relative flex flex-col gap-6">
        
        {/* Titre au style Serif élégant */}
        <h3 className="text-2xl font-semibold font-heading tracking-wider dark:text-white text-black uppercase">
          NEWSLETTERS
        </h3>
        
        {/* Champ de saisie souligné */}
        <div className="mt-3 mb-5">
          <input
            type="email"
            placeholder="Entrez votre email"
            className="w-full border-b border-black dark:border-b-white bg-transparent pb-2 dark:text-white text-black placeholder-black/80 dark:placeholder-white/80 focus:outline-none rounded-none text-lg font-light tracking-wide"
            required
          />
        </div>
        
        {/* Bouton d'action circulaire noir superposé */}
        <button 
          type="submit" 
          className="absolute bg-yellow-500 cursor-pointer -bottom-7 right-12 w-16 h-16 bg-black rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 border border-black focus:outline-none"
          aria-label="S'abonner à la newsletter"
        >
          {/* L'image montre un cercle noir uni, vous pouvez y ajouter une flèche discrète si besoin */}
          <SendIcon className="text-black dark:text-black"/>
        </button>
      </div>
    </div>
  );
}