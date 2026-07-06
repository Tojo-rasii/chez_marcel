"use client";

import * as React from "react";
import { RadialMenu, type MenuItem } from "@/components/animate-ui/components/community/radial-menu";
import { Scissors, Film, CreditCard, Gamepad2 } from "lucide-react";


const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    label: "Barber shop",
    icon: Scissors,
    title: "Coiffure Homme",
    description:
      "Salon de coiffure professionnel pour hommes. Des coupes modernes et soignées, réalisées par des coiffeurs experts, pour prendre soin de votre style dans un cadre accueillant.",
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1600&auto=format&fit=crop&crop=faces",
    catalogLabel: "Styles de coupe disponibles",
    catalog: [
      {
        id: "fade",
        name: "Fade américain",
        description: "Dégradé progressif sur les côtés, longueur au choix sur le dessus.",
        price: "15 000 Ar",
        image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=400&auto=format&fit=crop",
      },
      {
        id: "undercut",
        name: "Undercut",
        description: "Coupe courte sur les côtés, volume marqué sur le dessus.",
        price: "18 000 Ar",
        image: "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?q=80&w=400&auto=format&fit=crop",
      },
      {
        id: "afro",
        name: "Taper afro",
        description: "Coupe adaptée aux cheveux afro, contours nets à la tondeuse.",
        price: "15 000 Ar",
        image: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=400&auto=format&fit=crop",
      },
      {
        id: "classic",
        name: "Coupe classique",
        description: "Coupe intemporelle aux ciseaux et à la tondeuse.",
        price: "12 000 Ar",
        image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=400&auto=format&fit=crop",
      },
      {
        id: "beard",
        name: "Taille de barbe",
        description: "Taille et dessin de barbe au rasoir.",
        price: "8 000 Ar",
        image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=400&auto=format&fit=crop",
      },
    ],
  },
  {
    id: 2,
    label: "Multimedia",
    icon: Film,
    title: "Espace Multimédia & Téléchargements",
    description:
      "Accès aux dernières nouveautés de films, séries et musiques. Téléchargements haute qualité et ultra-rapides sur tous vos supports numériques.",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1600&auto=format&fit=crop&crop=entropy",
    catalogLabel: "Catégories de films & séries",
    catalog: [
      {
        id: "action",
        name: "Action",
        description: "Blockbusters et films d'action récents.",
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=400&auto=format&fit=crop",
      },
      {
        id: "comedie",
        name: "Comédie",
        description: "Comédies françaises et internationales.",
        image: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?q=80&w=400&auto=format&fit=crop",
      },
      {
        id: "drame",
        name: "Drame",
        description: "Films dramatiques et récompensés.",
        image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=400&auto=format&fit=crop",
      },
      {
        id: "serie",
        name: "Séries TV",
        description: "Saisons complètes, VF et VOSTFR.",
        image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=400&auto=format&fit=crop",
      },
      {
        id: "anime",
        name: "Animation & anime",
        description: "Dessins animés et animes japonais.",
        image: "https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?q=80&w=400&auto=format&fit=crop",
      },
      {
        id: "musique",
        name: "Musique",
        description: "Albums et playlists à télécharger.",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&auto=format&fit=crop",
      },
    ],
  },
  {
    id: 3,
    label: "Mobile money",
    icon: CreditCard,
    title: "Transferts et dépôts d'argent",
    description:
      "Dépôts et retraits via Mvola, Orange Money et Airtel Money en toute sécurité. Profitez de transactions rapides et fiables pour toutes vos opérations financières du quotidien.",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&auto=format&fit=crop",
    catalogLabel: "Services disponibles",
    catalog: [
      {
        id: "depot",
        name: "Dépôt d'argent",
        description: "Alimentez votre compte Mvola, Orange Money ou Airtel Money.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=400&auto=format&fit=crop",
      },
      {
        id: "retrait",
        name: "Retrait d'argent",
        description: "Retirez du cash depuis votre compte mobile money.",
        image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=400&auto=format&fit=crop",
      },
      {
        id: "transfert",
        name: "Transfert",
        description: "Envoyez de l'argent à un autre numéro instantanément.",
        image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?q=80&w=400&auto=format&fit=crop",
      },
      {
        id: "facture",
        name: "Paiement de factures",
        description: "JIRAMA, Canal+, abonnements internet...",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=400&auto=format&fit=crop",
      },
    ],
  },
  {
    id: 4,
    label: "Salle de jeux",
    icon: Gamepad2,
    title: "Jeux Vidéo (PS3 & PS4)",
    description:
      "Espace détente équipé de consoles PlayStation. Amusez-vous avec une sélection variée de jeux vidéo dans une ambiance conviviale.",
    image:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1600&auto=format&fit=crop&crop=entropy",
    catalogLabel: "Jeux disponibles",
    catalog: [
      {
        id: "fifa",
        name: "EA Sports FC",
        description: "Simulation de football, multijoueur local.",
        image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?q=80&w=400&auto=format&fit=crop",
      },
      {
        id: "gta",
        name: "GTA V",
        description: "Monde ouvert, action-aventure.",
        image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=400&auto=format&fit=crop",
      },
      {
        id: "mk",
        name: "Mortal Kombat",
        description: "Jeu de combat culte.",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&auto=format&fit=crop",
      },
      {
        id: "cod",
        name: "Call of Duty",
        description: "FPS multijoueur en écran partagé.",
        image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=400&auto=format&fit=crop",
      },
    ],
  },
];

type HeroServiceContenuProps = {
  activePage: any;
  page: any;
};

export default function HeroServiceContenu({ activePage, page }: HeroServiceContenuProps) {
  return (
    <div className="w-full max-md:absolute max-md:p-0  max-md:scale-100 flex items-center justify-center">
      <RadialMenu
        activePage={page}
        menuItems={MENU_ITEMS}
        onSelect={(item) => console.log("Sélectionné :", item.label)}
      />
    </div>
  );
}