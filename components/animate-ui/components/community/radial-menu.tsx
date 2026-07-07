"use client";

import * as React from "react";
import {
  LucideIcon,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  CalendarCheck2,
  LayoutGrid,
  X,
  Check,
  Clock,
  PackageOpen,
} from "lucide-react";
import { motion, AnimatePresence, type Transition } from "motion/react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/lightswind/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/lightswind/carousel";
import { FlipCard } from "./flip-card";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export type CatalogEntry = {
  id: string;
  name: string;
  description?: string;
  price?: string;
  /** Visuel de la carte catalogue. Si absent ou en échec de chargement, l'image du service (item.image) est utilisée à la place. */
  image?: string;
};

export type MenuItem = {
  id: number;
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  /** Titre affiché en haut du pop-up "Catalogue" (ex: "Styles de coupe disponibles") */
  catalogLabel?: string;
  /** Contenu du catalogue, propre à chaque service */
  catalog?: CatalogEntry[];
};

type OrderEntry = {
  id: string;
  itemId: number;
  itemLabel: string;
  catalogId?: string;
  choice: string;
  createdAt: Date;
};

type ReservationEntry = {
  id: string;
  itemId: number;
  itemLabel: string;
  date: Date;
  time: string;
};

type ActiveModal = "catalog" | "calendar" | "history" | null;

type RadialMenuProps = {
  menuItems: MenuItem[];
  size?: number;
  iconSize?: number;
  bandWidth?: number;
  innerGap?: number;
  outerGap?: number;
  outerRingWidth?: number;
  /** Numéro de la page/écran courant (utilisé pour afficher les indicateurs prev/next latéraux) */
  activePage: number | string;
  setActivePage: any;
  onSelect?: (item: MenuItem) => void;
};

type Point = { x: number; y: number };

/* -------------------------------------------------------------------------- */
/*  Constantes                                                                */
/* -------------------------------------------------------------------------- */

const menuTransition: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 32,
};

const FULL_CIRCLE = 360;
const START_ANGLE = -90;
const TIME_SLOTS = ["09:00", "11:00", "13:00", "15:00", "17:00"];
const WEEKDAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const MONTH_LABELS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

/** Durée d'un cycle complet de l'autoplay, quel que soit le nombre d'items. */
const AUTOPLAY_DURATION_MS = 4000;
/** Fréquence de rafraîchissement de la barre de progression. */
const PROGRESS_TICK_MS = 40;

/* -------------------------------------------------------------------------- */
/*  Géométrie                                                                 */
/* -------------------------------------------------------------------------- */

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function polarToCartesian(radius: number, angle: number): Point {
  const rad = degToRad(angle);
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  };
}

function slicePath(index: number, total: number, outerRadius: number, innerRadius: number) {
  const slice = FULL_CIRCLE / total;
  const mid = START_ANGLE + slice * index;
  const half = slice / 2;

  const start = mid - half;
  const end = mid + half;

  const outerStart = polarToCartesian(outerRadius, start);
  const outerEnd = polarToCartesian(outerRadius, end);
  const innerStart = polarToCartesian(innerRadius, start);
  const innerEnd = polarToCartesian(innerRadius, end);

  return `
    M ${outerStart.x} ${outerStart.y}
    A ${outerRadius} ${outerRadius} 0 0 1 ${outerEnd.x} ${outerEnd.y}
    L ${innerEnd.x} ${innerEnd.y}
    A ${innerRadius} ${innerRadius} 0 0 0 ${innerStart.x} ${innerStart.y}
    Z
  `;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

/* -------------------------------------------------------------------------- */
/*  Pré-chargement des images d'arrière-plan (évite tout flash au changement) */
/* -------------------------------------------------------------------------- */

function useImagePreload(urls: string[]) {
  React.useEffect(() => {
    const images = urls.filter(Boolean).map((url) => {
      const img = new window.Image();
      img.src = url;
      return img;
    });
    return () => {
      images.forEach((img) => {
        img.src = "";
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urls.join("|")]);
}

/* -------------------------------------------------------------------------- */
/*  Pop-up générique                                                          */
/* -------------------------------------------------------------------------- */

function ModalShell({
  title,
  subtitle,
  onClose,
  children,
}: {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-999 flex items-center justify-center p-4 bg-black/20 backdrop-blur-xs"
      onClick={onClose}
      role="presentation"
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="w-full max-w-2xl z-999 max-h-[95vh] overflow-hidden flex flex-col bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl"
      >
        <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <h3 className="text-xl font-heading font-bold text-neutral-900 dark:text-white">{title}</h3>
            {subtitle && <p className="text-xs mt-2 uppercase flex items-center gap-2 font-semibold text-neutral-700 dark:text-neutral-400 mt-0.5">  <Separator className="w-4 h-0.5 max-md:w-5 bg-black/50" />{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="shrink-0 border cursor-pointer p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-4 space-y-2">{children}</div>
      </motion.div>
    </motion.div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-2 py-8 px-2">
      <PackageOpen className="text-neutral-300 dark:text-neutral-700" size={28} />
      <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-[220px]">{message}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pop-up "Catalogue" — contenu propre à chaque service                     */
/* -------------------------------------------------------------------------- */

function CatalogModal({
  item,
  addedIds,
  onPick,
  onClose,
}: {
  item: MenuItem;
  addedIds: string[];
  onPick: (entry: CatalogEntry) => void;
  onClose: () => void;
}) {
  const entries = item.catalog ?? [];

  return (
    <ModalShell
      title={item.catalogLabel ?? "Catalogue"}
      subtitle={item.label}
      onClose={onClose}
    >
      {entries.length === 0 ? (
        <EmptyState message="Aucun élément de catalogue n'est disponible pour ce service pour le moment." />
      ) : (
        <Carousel
          opts={{ align: "start", loop: false }}
          className="w-full"
        >
          <CarouselContent>
            {entries.map((entry) => {
              const added = addedIds.includes(entry.id);

              return (
                <CarouselItem
                  key={entry.id}
                  className="basis-full md:basis-1/2 xl:basis-1/3"
                >
                  {/* FlipCard wrapper SANS casser le layout */}
                  <div className="flex relative font-heading justify-center">
                    <FlipCard
                      data={{
                        name: entry.name,
                        username: entry.id,
                        image: entry.image ?? item.image,
                        bio: entry.description ?? "",
                        stats: {
                          following: 0,
                          followers: 0,
                        },
                      }}
                    />
                    <button
                      onClick={() => onPick(entry)}
                      disabled={added}
                      className={cn(
                        "w-20 h-8 font-semibold rounded-full cursor-pointer absolute bottom-5 text-xs font-medium transition-all",
                        added
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-yellow-400 hover:bg-yellow-500 text-black"
                      )}
                    >
                      {added ? "Ajouté" : "Ajouter"}
                    </button>
                  </div>

                  
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <div className="absolute top-1/2 -translate-y-1/2 left-10">

            <CarouselPrevious />
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-10">

            <CarouselNext />

          </div>
        </Carousel>
      )}
    </ModalShell>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pop-up "Réserver" — calendrier + créneau horaire                         */
/* -------------------------------------------------------------------------- */

function CalendarModal({
  item,
  onConfirm,
  onClose,
}: {
  item: MenuItem;
  onConfirm: (date: Date, time: string) => void;
  onClose: () => void;
}) {
  const today = React.useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [viewDate, setViewDate] = React.useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDay, setSelectedDay] = React.useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  const [confirmed, setConfirmed] = React.useState(false);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7; // Lundi = 0
  const cells: (Date | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  const canGoPrev = year > today.getFullYear() || (year === today.getFullYear() && month > today.getMonth());

  function goToPrevMonth() {
    if (!canGoPrev) return;
    setViewDate(new Date(year, month - 1, 1));
  }
  function goToNextMonth() {
    setViewDate(new Date(year, month + 1, 1));
  }

  function handleConfirm() {
    if (!selectedDay || !selectedTime) return;
    onConfirm(selectedDay, selectedTime);
    setConfirmed(true);
    setTimeout(onClose, 900);
  }

  if (confirmed && selectedDay && selectedTime) {
    return (
      <ModalShell title="Réservation confirmée" subtitle={item.label} onClose={onClose}>
        <div className="flex flex-col items-center text-center gap-3 py-6">
          <div className="size-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center">
            <Check className="text-emerald-500" size={24} />
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            Votre créneau du {formatDate(selectedDay)} à {selectedTime} est réservé.
          </p>
        </div>
      </ModalShell>
    );
  }

  return (
    <ModalShell title="Réserver un créneau" subtitle={item.label} onClose={onClose}>



      <div className="grid grid-cols-[1fr_0.8fr] max-md:grid-cols-1 gap-8">
        <div className="flex flex-col border p-3 pb-0.5 border-gray-100">
          <div className="flex items-center  justify-between mb-3">
            <button
              onClick={goToPrevMonth}
              disabled={!canGoPrev}
              aria-label="Mois précédent"
              className="p-1.5 rounded-lg text-neutral-400 hover:scale-110 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm font-heading  font-semibold text-neutral-800 dark:text-neutral-100">
              {MONTH_LABELS[month]} {year}
            </span>
            <button
              onClick={goToNextMonth}
              aria-label="Mois suivant"
              className="p-1.5 rounded-lg text-neutral-400 hover:scale-110 dark:hover:bg-neutral-800"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {WEEKDAY_LABELS.map((w) => (
              <span key={w} className="text-[10px] font-semibold uppercase text-neutral-500">
                {w}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 mb-4">
            {cells.map((day, i) => {
              if (!day) return <div key={`empty-${i}`} />;
              const isPast = day < today;
              const isSelected = !!selectedDay && isSameDay(day, selectedDay);
              return (
                <button
                  key={day.toISOString()}
                  disabled={isPast}
                  onClick={() => setSelectedDay(day)}
                  className={cn(
                    "aspect-square border border-black/5 rounded-full hover:border-1 hover:border-black/20  font-heading text-xs font-semibold transition-colors",
                    isPast && "text-neutral-300 border-black/5 dark:text-neutral-700 cursor-not-allowed",
                    !isPast && !isSelected && "text-neutral-700 dark:text-neutral-300 hover:bg-yellow-50 dark:hover:bg-yellow-950/40",
                    isSelected && "bg-yellow-500 text-black"
                  )}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col">
          {selectedDay && (
            <div className="mb-4">
              <p className="text-sm mb-3 font-heading font-semibold text-neutral-500 dark:text-neutral-400 mb-2 flex items-center gap-1.5">
                <Clock size={14} /> À quelle heure ?.
              </p>
              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={cn(
                      "py-2 rounded-lg text-xs font-medium border transition-colors",
                      selectedTime === time
                        ? "bg-transparent border-yellow-500 border-2 text-neutral-900"
                        : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:border-black/50"
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!selectedDay && (
            <div className="flex flex-col mb-3 items-center gap-2 text-center">
              <h3 className="font-heading font-semibold text-md max-md:text-lg max-md:text-center flex items-center gap-3">
                <span>Quand êtes-vous disponible ?</span>
              </h3>
              <p className="text-sm">Réservez votre place en choisissant une date.</p>

            </div>

          )}

          <button
            onClick={handleConfirm}
            disabled={!selectedDay || !selectedTime}
            className="w-full py-2.5 px-6 mx-auto rounded-full bg-yellow-500/90 text-black uppercase text-[0.8em] font-semibold disabled:active:scale-[1] disabled:hover:bg-black disabled:opacity-30 disabled:cursor-not-allowed hover:bg-yellow-500 cursor-pointer active:scale-[0.98] transition-all"
          >
            Confirmer la réservation
          </button>
        </div>
      </div>




    </ModalShell>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pop-up "Commander" — historique commandes + réservations                 */
/* -------------------------------------------------------------------------- */

function HistoryModal({
  item,
  orders,
  reservations,
  onClose,
}: {
  item: MenuItem;
  orders: OrderEntry[];
  reservations: ReservationEntry[];
  onClose: () => void;
}) {
  const itemOrders = orders.filter((o) => o.itemId === item.id);
  const itemReservations = reservations.filter((r) => r.itemId === item.id);
  const isEmpty = itemOrders.length === 0 && itemReservations.length === 0;

  return (
    <ModalShell title="Mes commandes & réservations" subtitle={item.label} onClose={onClose}>
      {isEmpty ? (
        <EmptyState message="Vous n'avez rien réservé ni commandé." />
      ) : (
        <div className="space-y-4">
          {itemReservations.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-neutral-400 mb-2">Réservations</p>
              <div className="space-y-2">
                {itemReservations.map((r) => (
                  <div key={r.id} className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60">
                    <CalendarCheck2 size={16} className="text-yellow-600 dark:text-yellow-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100 truncate">
                        {formatDate(r.date)}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">à {r.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {itemOrders.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-neutral-400 mb-2">Commandes</p>
              <div className="space-y-2">
                {itemOrders.map((o) => (
                  <div key={o.id} className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60">
                    <ShoppingBag size={16} className="text-yellow-600 dark:text-yellow-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100 truncate">{o.choice}</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {o.createdAt.toLocaleDateString("fr-FR")} à{" "}
                        {o.createdAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </ModalShell>
  );
}

/* -------------------------------------------------------------------------- */
/*  Bandeau de vignettes représentant tous les services du menu              */
/* -------------------------------------------------------------------------- */

function ThumbnailRail({
  items,
  activeIndex,
  onHover,
  onSelect,
}: {
  items: MenuItem[];
  activeIndex: number;
  onHover: (index: number) => void;
  onSelect: (item: MenuItem) => void;
}) {
  return (
    <div className="flex max-md:absolute items-center justify-end h-full gap-4 mt-6">
      <Separator className="w-7" />
      {items.map((item, index) => {
        const active = index === activeIndex;
        return (
          <button
            key={item.id}
            onMouseEnter={() => onHover(index)}
            onClick={() => onSelect(item)}
            aria-current={active}
            aria-label={item.label}
            className={cn(
              "relative shrink-0 w-50 h-50  rounded-full overflow-hidden transition-all duration-300",
              active ? " ring-3 ring-yellow-500 ring-offset-2 ring-offset-white dark:ring-offset-neutral-950" : "hidden size-9 opacity-70 hover:opacity-100"
            )}
          >
            <img
              src={item.image}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </button>
        );
      })}
      <Separator className="w-7" />

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Composant principal                                                       */
/* -------------------------------------------------------------------------- */

export function RadialMenu({
  menuItems,
  size = 350,
  iconSize = 22,
  bandWidth = 60,
  innerGap = 8,
  outerGap = 8,
  outerRingWidth = 12,
  onSelect,
  activePage,
  setActivePage
}: RadialMenuProps) {
  const itemCount = menuItems.length;

  const radius = size / 2;
  const outerRingOuterRadius = radius;
  const outerRingInnerRadius = radius - outerRingWidth;
  const wedgeOuterRadius = outerRingInnerRadius - outerGap;
  const wedgeInnerRadius = wedgeOuterRadius - bandWidth;
  const iconRadius = (wedgeOuterRadius + wedgeInnerRadius) / 2;
  const centerRadius = wedgeInnerRadius - innerGap;
  const progressRingRadius = centerRadius + 3;
  const circumference = 2 * Math.PI * progressRingRadius;

  const pageNumber = Number(activePage);
  // Sur la page 1, on veut uniquement la roue + son anneau de chargement,
  // sans le texte descriptif ni le panneau d'actions de part et d'autre.
  const isMinimal = pageNumber === 1;

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [selectedItem, setSelectedItem] = React.useState<MenuItem | null>(null);
  const [isPaused, setIsPaused] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [activeModal, setActiveModal] = React.useState<ActiveModal>(null);
  const [orders, setOrders] = React.useState<OrderEntry[]>([]);
  const [reservations, setReservations] = React.useState<ReservationEntry[]>([]);

  // Recale l'index actif si la liste de services change de taille (ex: filtrage dynamique).
  React.useEffect(() => {
    if (activeIndex >= itemCount && itemCount > 0) {
      setActiveIndex(0);
      setProgress(0);
    }
  }, [itemCount, activeIndex]);

  // Précharge toutes les images du menu pour que le fondu d'arrière-plan soit
  // fluide et automatique, sans flash au moment du changement.
  const imageUrls = React.useMemo(() => menuItems.map((m) => m.image), [menuItems]);
  useImagePreload(imageUrls);

  // Autoplay basé sur un horodatage réel (plutôt qu'un simple compteur de ticks)
  // afin d'éviter toute dérive et de garantir un cycle homogène quel que soit
  // le nombre d'items du menu.
  React.useEffect(() => {
    if (isPaused || itemCount <= 1) return;

    const startedAt = performance.now();
    const interval = window.setInterval(() => {
      const elapsed = performance.now() - startedAt;
      const ratio = Math.min(elapsed / AUTOPLAY_DURATION_MS, 1);
      setProgress(ratio * 100);

      if (ratio >= 1) {
        setActiveIndex((prevIndex) => (prevIndex + 1) % itemCount);
      }
    }, PROGRESS_TICK_MS);

    return () => window.clearInterval(interval);
    // Se relance à chaque changement d'item (ou reprise après pause) pour que
    // CHAQUE service du menu bénéficie du même temps d'affichage.
  }, [isPaused, itemCount, activeIndex]);

  const slice = itemCount > 0 ? FULL_CIRCLE / itemCount : 0;
  const nextIndex = itemCount > 0 ? (activeIndex + 1) % itemCount : 0;
  const prevIndex = itemCount > 0 ? (activeIndex - 1 + itemCount) % itemCount : 0;

  const nextItem = menuItems[nextIndex];
  const prevItem = menuItems[prevIndex];
  const activeItem = menuItems[activeIndex];
  const ActiveIcon = activeItem?.icon;

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Pré-calcule la géométrie des quartiers une seule fois par changement de
  // dimensions/nombre d'items, plutôt qu'à chaque rendu.
  const wedgeGeometry = React.useMemo(
    () =>
      menuItems.map((_, index) => {
        const mid = START_ANGLE + slice * index;
        return {
          outerPath: slicePath(index, itemCount, outerRingOuterRadius, outerRingInnerRadius),
          wedgePath: slicePath(index, itemCount, wedgeOuterRadius, wedgeInnerRadius),
          iconPos: polarToCartesian(iconRadius, mid),
        };
      }),
    [menuItems, itemCount, slice, outerRingOuterRadius, outerRingInnerRadius, wedgeOuterRadius, wedgeInnerRadius, iconRadius]
  );

  const handleHover = React.useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handlePick = React.useCallback(
    (item: MenuItem) => {
      setSelectedItem(item);
      onSelect?.(item);
    },
    [onSelect]
  );

  function handleAddOrder(entry: CatalogEntry) {
    if (!selectedItem) return;
    setOrders((prev) => [
      ...prev,
      {
        id: `${selectedItem.id}-${entry.id}-${Date.now()}`,
        itemId: selectedItem.id,
        itemLabel: selectedItem.label,
        catalogId: entry.id,
        choice: entry.name,
        createdAt: new Date(),
      },
    ]);
  }

  function handleAddReservation(date: Date, time: string) {
    if (!selectedItem) return;
    setReservations((prev) => [
      ...prev,
      {
        id: `${selectedItem.id}-${date.toISOString()}-${time}`,
        itemId: selectedItem.id,
        itemLabel: selectedItem.label,
        date,
        time,
      },
    ]);
  }

  const addedCatalogIds = React.useMemo(
    () =>
      selectedItem
        ? orders.filter((o) => o.itemId === selectedItem.id).map((o) => o.catalogId).filter((id): id is string => !!id)
        : [],
    [orders, selectedItem]
  );

  if (itemCount === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto rounded-[2.5rem] p-12 flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
        <EmptyState message="Aucun service n'est disponible pour le moment." />
      </div>
    );
  }

  return (
     <>
    <div className={`relative isolate ${!isMinimal && "grid grid-cols-3 max-md:grid-cols-1"} w-full mx-auto overflow-hidden`}>
      {/* ================= ARRIÈRE-PLAN DYNAMIQUE : chaque service illustre le fond à tour de rôle ================= */}
      {/* Masqué en mode minimal (page 1) : il ne doit rester que la roue + le chargement, rien d'autre en fond */}
      {/* {!isMinimal && (
        <div className="absolute inset-0 -z-10">
          <AnimatePresence mode="sync">
            <motion.img
              key={activeItem?.id ?? activeIndex}
              src={activeItem?.image}
              alt=""
              aria-hidden="true"
              loading="eager"
              decoding="async"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-white/92 via-white/85 to-white/95 dark:from-neutral-950/92 dark:via-neutral-950/85 dark:to-neutral-950/95" />
        </div>
      )} */}
      {!isMinimal && (
        <div className="w-full max-md:hidden grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4 py-8">

          {/* ================= COLONNE GAUCHE : DESCRIPTION (HOVER/AUTOPLAY) ================= */}
          {/* Masquée en mode minimal (page 1) : on ne garde que la roue + le chargement */}
          {!isMinimal && (
            <div className="lg:col-span-3 space-y-4 flex flex-col justify-center min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* <span className="text-md font-bold mb-2 font-heading uppercase text-black mb-4 dark:text-yellow-400 ">
                    {activeItem?.label}
                  </span> */}
                  <h3 className="font-heading uppercase font-semibold text-md max-md:text-lg max-md:text-center flex items-center gap-3">

                    <Separator className="w-5 h-0.5 bg-yellow-500" /><span>{activeItem?.label}</span>
                  </h3>
                  <h2 className="text-4xl p-1 font-extrabold font-heading text-yellow dark:text-neutral-50 tracking-tight">
                    {activeItem?.title}
                  </h2>
                  <p className="text-sm  text-neutral-600 dark:text-neutral-400 leading-relaxed balance">
                    {activeItem?.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      )}

      {/* ================= COLONNE CENTRALE : LE MENU RADIAL ================= */}
      <div className={`${activePage !== 1 ? "items-end justify-end  self-end" : ""}  grid relative items-center justify-center bg-transparent select-none w-full`}>



        {/* ================= COLONNE CENTRALE : LE MENU RADIAL ================= */}
        <div
          className={cn(
            "flex relative items-center max-md:scale-80 justify-center select-none w-full",
            isMinimal ? "lg:col-span-6" : "lg:col-span-6"
          )}
        >

          {pageNumber === 2 && (
            <div className="absolute left-[-100px] hidden flex-col items-center justify-center w-24 text-center">
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Suivant</span>
              <div className="flex items-center gap-1 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                <ChevronLeft className="size-3 animate-pulse" />
                <span className="truncate max-w-[80px]">{nextItem?.label}</span>
              </div>
            </div>
          )}

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={menuTransition}
            style={{ width: size, height: size }}
            className="relative rounded-full overflow-hidden bg-transparent dark:bg-transparent border border-neutral-800/0"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <svg
              className="size-full relative z-10"
              viewBox={`${-radius} ${-radius} ${radius * 2} ${radius * 2}`}
              role="menu"
              aria-label="Menu des services"
            >
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const { outerPath, wedgePath, iconPos } = wedgeGeometry[index];
                const active = activeIndex === index;

                return (
                  <g
                    key={item.id}
                    role="menuitem"
                    tabIndex={0}
                    aria-label={item.label}
                    aria-current={active}
                    onMouseEnter={() => handleHover(index)}
                    onFocus={() => handleHover(index)}
                    onClick={() => {
                      handlePick(item);
                     setActivePage(2)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handlePick(item);
                      }
                    }}
                    className="cursor-pointer fill-black outline-none"
                  >
                    <path
                      d={outerPath}
                      className={cn("transition-colors duration-300", active ? "fill-yellow-500 stroke-black" : "fill-white/30 dark:fill-gray-500/20 stroke-black/50")}
                    />
                    <path
                      d={wedgePath}
                      className={cn(
                        "transition-all duration-300 stroke-black/20 dark:stroke-white/5",
                        active ? "fill-yellow-500 stroke-black/30" : "fill-white/20 dark:fill-black/20 dark:stroke-gray-500/20 stroke-black/70"
                      )}
                    />
                    <foreignObject x={iconPos.x - 22} y={iconPos.y - 22} width={44} height={44}>
                      <div className="flex h-full w-full items-center justify-center">
                        {/* Badge circulaire autour de l'icône : rendu plus soigné et lisible qu'une icône nue */}
                        <div
                          className={cn(
                            "flex items-center justify-center rounded-full transition-all duration-300 border",
                            active
                              ? "size-9 bg-transparent/15 border-yellow scale-100"
                              : "size-8 bg-white/5 border-white/10 group-hover:border-white/30"
                          )}
                        >
                          <Icon
                            size={iconSize}
                            strokeWidth={active ? 2.25 : 1.75}
                            className={cn(
                              "transition-colors duration-300",
                              active ? "text-yellow" : "text-black/70 dark:text-white/80"
                            )}
                          />
                        </div>
                      </div>
                    </foreignObject>
                  </g>
                );
              })}

              <circle cx={0} cy={0} r={centerRadius} className="fill-white dark:fill-neutral-900/95" />

              {/* Piste de fond de la barre de progression, visible même en pause */}
              <circle
                cx={0}
                cy={0}
                r={progressRingRadius}
                className="fill-gray-300/50 dark:fill-black/50 stroke-black/30 dark:stroke-white/5"
                strokeWidth={1}
              />

              {!isPaused && (
                <circle
                  cx={0}
                  cy={0}
                  r={progressRingRadius}
                  className="fill-none stroke-yellow-500 transition-[stroke-dashoffset] duration-75 ease-linear"
                  strokeWidth={3}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  transform="rotate(-90)"
                />
              )}

              <foreignObject
                x={-(centerRadius - 10)}
                y={-(centerRadius - 10)}
                width={(centerRadius - 10) * 2}
                height={(centerRadius - 10) * 2}
                className="pointer-events-none"
              >
                <div className="flex flex-col h-full w-full items-center justify-center text-center p-4">
                  <div className="mb-2 flex items-center justify-center size-14 rounded-full bg-yellow-500 dark:bg-yellow-950/40 border border-black dark:border-yellow-900 text-black dark:text-yellow-400 transition-transform duration-300">
                    {ActiveIcon && <ActiveIcon size={28} strokeWidth={1.75} />}
                  </div>
                  <span className="text-lg font-heading font-bold dark:text-neutral-100 tracking-tight">
                    {activeItem?.label}
                  </span>
                </div>
              </foreignObject>
            </svg>
          </motion.div>




          {pageNumber === 2 && (
            <div className="absolute right-[-100px] hidden flex-col items-center justify-center w-24 text-center">
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Précédent</span>
              <div className="flex items-center gap-1 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                <span className="truncate max-w-[80px]">{prevItem?.label}</span>
                <ChevronRight className="size-3 animate-pulse" />
              </div>
            </div>
          )}
        </div>


      </div>
      {/* ================= COLONNE DROITE : LES ACTION BUTTONS (CLIC) ================= */}
      {/* Masquée en mode minimal (page 1) : pas d'actions déclenchables ici */}
      {!isMinimal && selectedItem && (
        <div className="min-h-full max-md:bg-white dark:max-md:bg-[#0D0D0D] max-md:w-full  max-md:right-0  max-md:p-2 w-70 absolute right-9 z-999 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {selectedItem ? (
              <motion.div
                key={selectedItem.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-3 bg-white dark:bg-neutral-900/90 p-5  border border-neutral-400 dark:border-neutral-800"
              >

                {/* X CLOSE BUTTON */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-2 cursor-pointer right-0 p-1 rounded-full text-neutral-500 hover:text-black border  dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
                <div className="mb-4 flex items-center flex-col">

                  <h3 className="font-heading text-sm py-0 flex items-center gap-2">
                    <Separator className="w-4 h-0.5 bg-black/30" /><span>Option choisie</span>
                    <Separator className="w-4 h-0.5 bg-black/30" /></h3>
                  <h2 className="font-bold text-xl uppercase mt-1 font-heading text-neutral-900 dark:text-white">{selectedItem.label}</h2>
                </div>

                <button
                  onClick={() => setActiveModal("history")}
                  className="w-full py-3 border uppercase px-4 flex items-center justify-center gap-2 bg-yellow-500/90 text-black hover:bg-yellow-500 active:scale-[0.98]  font-semibold text-xs rounded-full transition-all  cursor-pointer"
                >
                  <ShoppingBag size={16} />
                  Commande
                </button>

                <button
                  onClick={() => setActiveModal("calendar")}
                  className="w-full py-3 uppercase px-4 flex items-center justify-center gap-2 bg-neutral-200 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 active:scale-[0.98] text-neutral-900 dark:text-neutral-100 font-medium text-xs rounded-full border-black/60 border  cursor-pointer transition-all"
                >
                  <CalendarCheck2 size={16} />
                  Réserver
                </button>

                <button
                  onClick={() => setActiveModal("catalog")}
                  className="w-full py-3 uppercase px-4 flex items-center justify-center gap-2 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 active:scale-[0.98] text-neutral-700 dark:text-neutral-300 font-medium text-xs rounded-full border-black/60 border cursor-pointer transition-all"
                >
                  <LayoutGrid size={16} />
                  Catalogue
                </button>
              </motion.div>
            ) : (
              <div className="flex hidden h-full flex-col items-center justify-center p-6 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl text-center bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md">
                <p className="text-xs text-neutral-400 dark:text-neutral-500 font-medium max-w-[180px]">
                  Cliquez sur un service du menu pour débloquer les actions de réservation.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}

      {!isMinimal && (
        <div className="px-4 max-md:hidden top-0 pb-8 -mt-2">
          <ThumbnailRail items={menuItems} activeIndex={activeIndex} onHover={handleHover} onSelect={handlePick} />
        </div>
      )}

      {!isMinimal && (
        <AnimatePresence>
          {selectedItem && activeModal === "catalog" && (
            <CatalogModal
              item={selectedItem}
              addedIds={addedCatalogIds}
              onPick={handleAddOrder}
              onClose={() => setActiveModal(null)}
            />
          )}
          {selectedItem && activeModal === "calendar" && (
            <CalendarModal item={selectedItem} onConfirm={handleAddReservation} onClose={() => setActiveModal(null)} />
          )}
          {selectedItem && activeModal === "history" && (
            <HistoryModal
              item={selectedItem}
              orders={orders}
              reservations={reservations}
              onClose={() => setActiveModal(null)}
            />
          )}
        </AnimatePresence>
      )
      }

    </div >
    </>
  );
}