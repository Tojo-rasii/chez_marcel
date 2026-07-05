'use client';

import * as React from 'react';
import { RadialMenu } from '@/components/animate-ui/components/community/radial-menu';
import { Scissors, ShieldCheck, CreditCard, Gamepad2 } from 'lucide-react';

export default function HeroServiceContenu({ activePage }: any) {
    const MENU_ITEMS = [
        {
            id: 1,
            label: 'Barber shop',
            icon: Scissors,
            title: 'Coiffure Homme',
            description: 'Salon de coiffure professionnel pour hommes. Des coupes modernes et soignées, réalisées par des coiffeurs experts, pour prendre soin de votre style dans un cadre accueillant.',
            image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop'
        },
        {
            id: 2,
            label: 'Multimedia',
            icon: ShieldCheck,
            title: "Espace Multimédia & Téléchargements ",
            description: "Accès aux dernières nouveautés de films, séries et musiques. Téléchargements haute qualité et ultra-rapides sur tous vos supports numériques.",
            image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop'
        },
        {
            id: 3,
            label: 'Mobile money',
            icon: CreditCard,
            title: "Transferts et dépots d'argent",
            description: "Dépôts et retraits via Mvola, Orange Money et Airtel Money en toute sécurité. Profitez de transactions rapides et fiables pour toutes vos opérations financières du quotidien.",
            image: 'https://images.unsplash.com/photo-1563013544-824ae1d704d3?q=80&w=800&auto=format&fit=crop'
        },
        {
            id: 4,
            label: 'Salle de jeux',
            icon: Gamepad2,
            title: "Jeux Vidéo (PS3 & PS4)",
            description: "Espace détente équipé de consoles PlayStation. Amusez-vous avec une sélection variée de jeux vidéo dans une ambiance conviviale.",
            image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop'
        },
    ];

    return (
        <div className="w-full min-h-screen flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-950">
            <RadialMenu
                activePage={activePage}
                menuItems={MENU_ITEMS}
                onSelect={(item) => console.log("Sélectionné :", item.label)}
            />
        </div>
    );
}