import { ArrowRight } from "lucide-react";

export default function FooterNewsletter() {
  return (
    <section className="mx-auto my-12 w-full max-w-2xl px-4">
      <form className="relative overflow-visible border border-black bg-white px-8 py-10 shadow-[14px_14px_0px_0px_#111]">
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-neutral-500">
              Newsletter
            </p>

            <h2 className="font-serif text-3xl leading-tight text-black">
              Recevez nos dernières nouveautés
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-neutral-600">
              Promotions, nouveaux produits et conseils directement dans votre
              boîte mail. Aucun spam.
            </p>
          </div>

          <div className="relative">
            <input
              type="email"
              placeholder="Votre adresse e-mail"
              required
              className="w-full border-0 border-b-2 border-neutral-300 bg-transparent py-3 pr-20 text-lg text-black placeholder:text-neutral-400 focus:border-black focus:outline-none"
            />

            <button
              type="submit"
              aria-label="S'abonner"
              className="absolute right-0 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-black bg-black text-white transition-all duration-300 hover:-translate-y-1/2 hover:scale-105 hover:bg-yellow-800 active:scale-95"
            >
              <ArrowRight size={22} strokeWidth={2} />
            </button>
          </div>

          <p className="text-xs leading-5 text-neutral-500">
            En vous inscrivant, vous acceptez de recevoir nos emails. Vous
            pourrez vous désinscrire à tout moment.
          </p>
        </div>
      </form>
    </section>
  );
}