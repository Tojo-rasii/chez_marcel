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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
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
        className="w-full max-w-md max-h-[85vh] overflow-hidden flex flex-col rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">{title}</h3>
            {subtitle && <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="shrink-0 p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 transition-colors"
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
    <ModalShell title={item.catalogLabel ?? "Catalogue"} subtitle={item.label} onClose={onClose}>
      {entries.length === 0 ? (
        <EmptyState message="Aucun élément de catalogue n'est disponible pour ce service pour le moment." />
      ) : (
        entries.map((entry) => {
          const added = addedIds.includes(entry.id);
          return (
            <div
              key={entry.id}
              className="flex items-center gap-3 p-3 rounded-xl border border-neutral-100 dark:border-neutral-800 hover:border-yellow-300 dark:hover:border-yellow-800 transition-colors"
            >
              <img
                src={entry.image ?? item.image}
                alt={entry.name}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  // Si le visuel spécifique à l'entrée est cassé, on retombe sur
                  // l'image du service pour ne jamais afficher d'icône brisée.
                  const img = e.currentTarget;
                  if (img.src !== item.image) {
                    img.src = item.image;
                  }
                }}
                className="w-14 h-14 rounded-lg object-cover shrink-0 bg-neutral-100 dark:bg-neutral-800"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{entry.name}</p>
                {entry.description && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
                    {entry.description}
                  </p>
                )}
                {entry.price && (
                  <p className="text-xs font-semibold text-yellow-600 dark:text-yellow-400 mt-1">{entry.price}</p>
                )}
              </div>
              <button
                onClick={() => onPick(entry)}
                disabled={added}
                className={cn(
                  "shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all active:scale-95",
                  added
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 cursor-default"
                    : "bg-yellow-500 text-neutral-900 hover:bg-yellow-400"
                )}
              >
                {added ? (
                  <>
                    <Check size={13} /> Ajouté
                  </>
                ) : (
                  "Ajouter"
                )}
              </button>
            </div>
          );
        })
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
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={goToPrevMonth}
          disabled={!canGoPrev}
          aria-label="Mois précédent"
          className="p-1.5 rounded-lg text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
          {MONTH_LABELS[month]} {year}
        </span>
        <button
          onClick={goToNextMonth}
          aria-label="Mois suivant"
          className="p-1.5 rounded-lg text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {WEEKDAY_LABELS.map((w) => (
          <span key={w} className="text-[10px] font-semibold uppercase text-neutral-400">
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
                "aspect-square rounded-lg text-xs font-medium transition-colors",
                isPast && "text-neutral-300 dark:text-neutral-700 cursor-not-allowed",
                !isPast && !isSelected && "text-neutral-700 dark:text-neutral-300 hover:bg-yellow-50 dark:hover:bg-yellow-950/40",
                isSelected && "bg-yellow-500 text-neutral-900"
              )}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>

      {selectedDay && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-2 flex items-center gap-1.5">
            <Clock size={12} /> Choisissez un horaire
          </p>
          <div className="grid grid-cols-3 gap-2">
            {TIME_SLOTS.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={cn(
                  "py-2 rounded-lg text-xs font-medium border transition-colors",
                  selectedTime === time
                    ? "bg-yellow-500 border-yellow-500 text-neutral-900"
                    : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:border-yellow-400"
                )}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleConfirm}
        disabled={!selectedDay || !selectedTime}
        className="w-full py-3 rounded-xl bg-yellow-500 text-neutral-900 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-yellow-400 active:scale-[0.98] transition-all"
      >
        Confirmer la réservation
      </button>
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
    <div className="flex items-center justify-center gap-2 flex-wrap mt-6">
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
              "relative shrink-0 rounded-full overflow-hidden transition-all duration-300",
              active ? "size-11 ring-2 ring-yellow-500 ring-offset-2 ring-offset-white dark:ring-offset-neutral-950" : "size-9 opacity-70 hover:opacity-100"
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
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Composant principal                                                       */
/* -------------------------------------------------------------------------- */

export function RadialMenu({
  menuItems,
  size = 400,
  iconSize = 22,
  bandWidth = 60,
  innerGap = 8,
  outerGap = 8,
  outerRingWidth = 12,
  onSelect,
  activePage,
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
    <div className="relative isolate flex w-full max-w-7xl mx-auto rounded-[2.5rem] overflow-hidden">
      {/* ================= ARRIÈRE-PLAN DYNAMIQUE : chaque service illustre le fond à tour de rôle ================= */}
      {/* Masqué en mode minimal (page 1) : il ne doit rester que la roue + le chargement, rien d'autre en fond */}
      {!isMinimal && (
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
      )}

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-4 py-8">

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
                className="space-y-3"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-950/50 px-3 py-1 rounded-full inline-block">
                  {activeItem?.label}
                </span>
                <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight">
                  {activeItem?.title}
                </h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed balance">
                  {activeItem?.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
      )}
      </div>
      {/* ================= COLONNE CENTRALE : LE MENU RADIAL ================= */}
      <div className={`${activePage !== 1 ? "" : "grid-cols-1"} flex relative items-center justify-center select-none w-full`}>



        {/* ================= COLONNE CENTRALE : LE MENU RADIAL ================= */}
        <div
          className={cn(
            "flex relative items-center justify-center select-none w-full",
            isMinimal ? "lg:col-span-12" : "lg:col-span-6"
          )}
        >

          {pageNumber === 2 && (
            <div className="absolute left-[-100px] hidden xl:flex flex-col items-center justify-center w-24 text-center">
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
            className="relative rounded-full overflow-hidden shadow-2xl bg-neutral-900/90 backdrop-blur-xl border border-neutral-800/60"
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
                    onClick={() => handlePick(item)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handlePick(item);
                      }
                    }}
                    className="cursor-pointer outline-none"
                  >
                    <path
                      d={outerPath}
                      className={cn("transition-colors duration-300", active ? "fill-yellow-500/40" : "fill-transparent")}
                    />
                    <path
                      d={wedgePath}
                      className={cn(
                        "transition-all duration-300 stroke-black/20 dark:stroke-white/5",
                        active ? "fill-white/[0.08] stroke-yellow-500/30" : "fill-transparent"
                      )}
                    />
                    <foreignObject x={iconPos.x - 22} y={iconPos.y - 22} width={44} height={44}>
                      <div className="flex h-full w-full items-center justify-center">
                        {/* Badge circulaire autour de l'icône : rendu plus soigné et lisible qu'une icône nue */}
                        <div
                          className={cn(
                            "flex items-center justify-center rounded-full transition-all duration-300 border",
                            active
                              ? "size-9 bg-yellow-500/15 border-yellow-500/70 shadow-[0_0_0_3px_rgba(234,179,8,0.15)] scale-110"
                              : "size-8 bg-white/5 border-white/10 group-hover:border-white/30"
                          )}
                        >
                          <Icon
                            size={iconSize}
                            strokeWidth={active ? 2.25 : 1.75}
                            className={cn(
                              "transition-colors duration-300",
                              active ? "text-yellow-400" : "text-neutral-400"
                            )}
                          />
                        </div>
                      </div>
                    </foreignObject>
                  </g>
                );
              })}

              <circle cx={0} cy={0} r={centerRadius} className="fill-white/95 dark:fill-neutral-900/95" />

              {/* Piste de fond de la barre de progression, visible même en pause */}
              <circle
                cx={0}
                cy={0}
                r={progressRingRadius}
                className="fill-none stroke-neutral-200/70 dark:stroke-white/5"
                strokeWidth={3}
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
                  <div className="mb-2 flex items-center justify-center size-14 rounded-full bg-yellow-50 dark:bg-yellow-950/40 border border-yellow-200 dark:border-yellow-900 text-yellow-600 dark:text-yellow-400 transition-transform duration-300">
                    {ActiveIcon && <ActiveIcon size={28} strokeWidth={1.75} />}
                  </div>
                  <span className="text-base font-bold text-neutral-800 dark:text-neutral-100 tracking-tight">
                    {activeItem?.label}
                  </span>
                </div>
              </foreignObject>
            </svg>
          </motion.div>

          {pageNumber === 2 && (
            <div className="absolute right-[-100px] hidden xl:flex flex-col items-center justify-center w-24 text-center">
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Précédent</span>
              <div className="flex items-center gap-1 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                <span className="truncate max-w-[80px]">{prevItem?.label}</span>
                <ChevronRight className="size-3 animate-pulse" />
              </div>
            </div>
          )}
        </div>

        {/* ================= COLONNE DROITE : LES ACTION BUTTONS (CLIC) ================= */}
        {/* Masquée en mode minimal (page 1) : pas d'actions déclenchables ici */}
        {!isMinimal && (
          <div className="lg:col-span-3 min-h-[280px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {selectedItem ? (
                <motion.div
                  key={selectedItem.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm"
                >
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                      Option choisie
                    </p>
                    <h4 className="text-base font-bold text-neutral-900 dark:text-white truncate">{selectedItem.label}</h4>
                  </div>

                  <button
                    onClick={() => setActiveModal("history")}
                    className="w-full py-3 px-4 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 active:scale-[0.98] text-neutral-900 font-semibold text-sm rounded-xl shadow-sm transition-all"
                  >
                    <ShoppingBag size={16} />
                    Commander
                  </button>

                  <button
                    onClick={() => setActiveModal("calendar")}
                    className="w-full py-3 px-4 flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 active:scale-[0.98] text-neutral-900 dark:text-neutral-100 font-medium text-sm rounded-xl transition-all"
                  >
                    <CalendarCheck2 size={16} />
                    Réserver
                  </button>

                  <button
                    onClick={() => setActiveModal("catalog")}
                    className="w-full py-3 px-4 flex items-center justify-center gap-2 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 active:scale-[0.98] text-neutral-700 dark:text-neutral-300 font-medium text-sm rounded-xl transition-all"
                  >
                    <LayoutGrid size={16} />
                    Catalogue
                  </button>
                </motion.div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center p-6 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl text-center bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md">
                  <p className="text-xs text-neutral-400 dark:text-neutral-500 font-medium max-w-[180px]">
                    Cliquez sur un service du menu pour débloquer les actions de réservation.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* ================= BANDEAU DE VIGNETTES : représente l'ensemble des services du menu ================= */}
      {/* Masqué en mode minimal (page 1) : on ne garde que la roue + le chargement */}
      {!isMinimal && (
        <div className="px-4 pb-8 -mt-2">
          <ThumbnailRail items={menuItems} activeIndex={activeIndex} onHover={handleHover} onSelect={handlePick} />
        </div>
      )}

      {/* ================= POP-UPS ================= */}
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
    </div>
  );
}