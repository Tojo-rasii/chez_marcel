import Image from "next/image";

export default function FooterNewsLetter() {
  return (
    <div className="relative w-full max-w-xl mx-auto my-8">
      {/* Conteneur principal avec effet d'ombre pleine noire décalée */}
      <div className="bg-white border border-black p-8 pt-10 pb-12 shadow-[16px_16px_0px_0px_#1a1a1a] relative flex flex-col gap-6">
        
        {/* Titre au style Serif élégant */}
        <h3 className="text-2xl font-serif tracking-wider text-black uppercase">
          LOREM IPSUM
        </h3>
        
        {/* Champ de saisie souligné */}
        <div className="mt-4 mb-4">
          <input
            type="email"
            placeholder="Entrez votre email"
            className="w-full border-b border-black bg-transparent pb-2 text-black placeholder-black/80 focus:outline-none rounded-none text-lg font-light tracking-wide"
            required
          />
        </div>
        
        {/* Bouton d'action circulaire noir superposé */}
        <button 
          type="submit" 
          className="absolute -bottom-7 right-12 w-16 h-16 bg-black rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 border border-black focus:outline-none"
          aria-label="S'abonner à la newsletter"
        >
          {/* L'image montre un cercle noir uni, vous pouvez y ajouter une flèche discrète si besoin */}
        </button>
      </div>
    </div>
  );
}