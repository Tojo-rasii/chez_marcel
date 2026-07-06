import Image from "next/image";

export default function FooterFollow() {
  return (
    <div className="p-6 px-0 font-heading max-w-xl mt-5">
      {/* Titre principal en majuscules avec espacement large */}
      <h3 className="text-lg tracking-widest uppercase mb-5 font-semibold">
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
        <div className="w-13 h-13 rounded-full border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
          <span className="text-2xl font-semibold transform">
            F
          </span>
        </div>
        
        {/* Bloc de textes (Nom du réseau + Page) */}
        <div className="flex flex-col justify-center">
          <span className="text-xs tracking-widest font-semibold uppercase mb-0.5">
            FACEBOOK
          </span>
          <span className="text-xl font-semibold font-light tracking-wide opacity-95 group-hover:underline">
            Chez Marcel - Click & services
          </span>
        </div>
      </a>
    </div>
  );
}