import Image from "next/image";

export default function FooterFollow() {
  return (
    <div className="text-white p-6 font-serif max-w-xl">
      {/* Titre principal en majuscules avec espacement large */}
      <h3 className="text-2xl tracking-widest uppercase mb-8 font-normal">
        SUIVEZ-NOUS
      </h3>
      
      {/* Conteneur du lien Facebook */}
      <a 
        href="#" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex items-center gap-5 group w-fit focus:outline-none"
      >
        {/* Cercle fin avec la lettre F centrée */}
        <div className="w-14 h-14 rounded-full border border-white flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
          <span className="text-2xl font-normal transform -translate-y-[1px]">
            F
          </span>
        </div>
        
        {/* Bloc de textes (Nom du réseau + Page) */}
        <div className="flex flex-col justify-center">
          <span className="text-xs tracking-widest font-normal uppercase text-gray-300 mb-0.5">
            FACEBOOK
          </span>
          <span className="text-xl font-light tracking-wide opacity-95 group-hover:underline">
            Chez Marcel - Click & services
          </span>
        </div>
      </a>
    </div>
  );
}