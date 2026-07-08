"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function ActionButton({
    setActivePage,
    openDevis,
    setOpenDevis,
}:{
    setActivePage:(page:number)=>void;
    openDevis:boolean;
    setOpenDevis:any;
}){
  // const [openDevis, setOpenDevis] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmitDevis = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // TODO: remplacer par ton appel API réel (ex: /api/devis)
      console.log("Demande de devis :", data);
      setOpenDevis(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // TODO: remplacer par ton appel API réel (ex: /api/contact)
      console.log("Message de contact :", data);
      setOpenContact(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center max-md:flex-wrap max-md:w-full gap-4 items-center mt-5">
        <Button
          variant="outline"
          onClick={() => setOpenDevis(true)}
           className="max-md:w-full max-md:text-wrap max-sm:h-max border-1 border-black dark:border-white dark:text-white hover:bg-gray-50/90 bg-transparent text-black uppercase w-max max-sm:text-lg h-13 text-md font-medium px-8 max-md:py-2 cursor-pointer rounded-full"

        >
          Demander un devis
        </Button>
      <Button
  variant="default"
  onClick={() => setActivePage(5)}
  className="max-md:w-full max-md:text-wrap dark:border-white max-sm:h-max border-1 border-black hover:bg-yellow-500/90 bg-yellow-500 text-black uppercase w-max max-sm:text-lg h-13 text-md font-medium px-8 max-md:py-2 cursor-pointer rounded-full"
>
  Nous contacter
</Button>
      </div>

      {/* Popup : Demande de devis */}
      <Dialog open={openDevis} onOpenChange={setOpenDevis}>
        <DialogContent className="sm:max-w-[500px] rounded-none">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">
              Demander un devis
            </DialogTitle>
            <DialogDescription>
              Remplissez ce formulaire, notre équipe vous répondra rapidement.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitDevis} className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="devis-nom">Nom complet</Label>
                <Input className="border-b-1 bg-transparent border-b-black dark:border-b-white rounded-none" id="devis-nom" name="nom" required />
              </div>
              <div>
                <Label htmlFor="devis-email">Email</Label>
                <Input className="border-b-1 bg-transparent border-b-black dark:border-b-white rounded-none" id="devis-email" name="email" type="email" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="devis-telephone">Téléphone</Label>
                <Input className="border-b-1 bg-transparent border-b-black dark:border-b-white rounded-none" id="devis-telephone" name="telephone" type="tel" />
              </div>
              <div className="w-full">
                <Label htmlFor="devis-service">Type de service</Label>
                <Select name="service" >
                  <SelectTrigger id="devis-service" className="border-b-1  bg-transparent border-b-black dark:border-b-white rounded-none w-full">
                    <SelectValue placeholder="Choisir..." className="w-full"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mobile money">Mobile money</SelectItem>
                    <SelectItem value="Multimédia">Multimédia</SelectItem>
                    <SelectItem value="Barber Shop">Barber Shop</SelectItem>
                    <SelectItem value="Salle de jeux">Salle de jeux</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="devis-arrivee">Date </Label>
                <Input className="border-b-1 bg-transparent border-b-black dark:border-b-white rounded-none" id="devis-arrivee" name="dateArrivee" type="date" />
              </div>
            </div>

            <div>
              <Label htmlFor="devis-message">Message</Label>
              <Textarea
                id="devis-message"
                className="border-b-1 bg-transparent border-b-black dark:border-b-white rounded-none"
                name="message"
                placeholder="Précisez votre besoin..."
                rows={4}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 text-black rounded-full h-12 font-semibold uppercase hover:bg-yellow-500/90 cursor-pointer"
            >
              {loading ? "Envoi..." : "Envoyer la demande"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

  
    </div>
  );
}