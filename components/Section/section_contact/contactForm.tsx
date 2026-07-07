import { Button } from "@/components/ui/button";
import { Info, Mouse } from "lucide-react";

export default function ContactForm() {
  return (
    <div className="relative w-full max-w-xl mx-auto my-0">
      {/* Conteneur principal avec effet d'ombre pleine noire décalée */}
      <div className="bg-white/70 dark:bg-gray-500/20 dark:text-white border border-black/20 p-8 md:p-10 shadow-[20px_20px_0px_0px_#F0B100] flex flex-col gap-8">

        <div className="flex justify-between flex-wrap gap-2 items-center">
          <h3 className="text-xl  dark:text-white font-heading font-bold tracking-wider text-black uppercase">
            Laissez-nous un message
          </h3>

          {/* Icône optionnelle si vous souhaitez l'intégrer discrètement */}
          <div className="max-md:flex hidden">
            <Info />     </div>
        </div>

        <form className="flex flex-col gap-10">
          {/* Ligne : Nom & Prénom */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Nom"
                className="w-full dark:border-b-white dark:text-white border-b border-black bg-transparent pb-2 text-black placeholder-black/80  dark:placeholder-white/80  focus:outline-none rounded-none text-base"
                required
              />
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Prénom"
                className="w-full dark:border-b-white dark:text-white border-b border-black bg-transparent pb-2 text-black placeholder-black/80  dark:placeholder-white/80  focus:outline-none rounded-none text-base"
                required
              />
            </div>
          </div>

          {/* Ligne : Email */}
          <div className="flex flex-col">
            <input
              type="email"
              placeholder="Email"
              className="w-full dark:border-b-white dark:text-white border-b border-black bg-transparent pb-2 text-black placeholder-black/80  dark:placeholder-white/80  focus:outline-none rounded-none text-base"
              required
            />
          </div>

          {/* Ligne : Messages */}
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Messages"
              className="w-full dark:border-b-white dark:text-white border-b border-black bg-transparent pb-2 text-black placeholder-black/80 dark:placeholder-white/80 focus:outline-none rounded-none text-base"
              required
            />
          </div>

          {/* Bouton de soumission arrondi et centré */}
          <div className="flex justify-end mt-2">
            <Button
              type="submit"
              className="bg-yellow-500 border border-black hover:bg-yellow-500/95 text-black font-medium uppercase px-16 py-7 cursor-pointer w-full rounded-full text-md transition-colors"
            >
              ENVOYER
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}