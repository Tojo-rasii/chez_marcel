import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function ContactForm() {
  return (
    <div className="relative w-full max-w-2xl mx-auto my-10">
      
      {/* glow background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-yellow-500/10 via-transparent to-transparent blur-2xl" />

      {/* card */}
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl flex flex-col gap-8">
        
        {/* header */}
        <div className="space-y-2">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Envoyez-nous un message
          </h3>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Nous vous répondons rapidement.
          </p>
        </div>

        <form className="flex flex-col gap-6">
          
          {/* name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputField label="Nom" placeholder="Votre nom" />
            <InputField label="Prénom" placeholder="Votre prénom" />
          </div>

          {/* email */}
          <InputField label="Email" placeholder="exemple@mail.com" type="email" />

          {/* message */}
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wider text-neutral-400">
              Message
            </label>
            <textarea
              rows={5}
              placeholder="Comment pouvons-nous vous aider ?"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition resize-none"
            />
          </div>

          {/* button */}
          <Button
            type="submit"
            className="w-full h-12 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-xl transition flex items-center justify-center gap-2"
          >
            Envoyer le message
            <Send className="w-4 h-4" />
          </Button>

        </form>
      </div>
    </div>
  );
}

/* reusable input */
function InputField({ label, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs uppercase tracking-wider text-neutral-400">
        {label}
      </label>
      <input
        {...props}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition"
      />
    </div>
  );
}