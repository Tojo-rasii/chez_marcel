"use client";

import * as React from "react";
import { LucideIcon, ChevronLeft, ChevronRight, ShoppingCart, Calendar, BookOpen } from "lucide-react";
import { motion, AnimatePresence, type Transition } from "motion/react";
import { cn } from "@/lib/utils";

type MenuItem = {
  id: number;
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
};

type RadialMenuProps = {
  menuItems: MenuItem[];
  size?: number;
  iconSize?: number;
  bandWidth?: number;
  innerGap?: number;
  outerGap?: number;
  outerRingWidth?: number;
  activePage?: any;
  onSelect?: (item: MenuItem) => void;
};

type Point = { x: number; y: number };

const menuTransition: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 32,
};

const FULL_CIRCLE = 360;
const START_ANGLE = -90;

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

export function RadialMenu({
  menuItems,
  size = 400, // Légèrement réduit pour un meilleur confort sur les écrans standards
  iconSize = 24,
  bandWidth = 60,
  innerGap = 8,
  outerGap = 8,
  outerRingWidth = 12,
  onSelect,
  activePage
}: RadialMenuProps) {
  const radius = size / 2;
  const outerRingOuterRadius = radius;
  const outerRingInnerRadius = radius - outerRingWidth;
  const wedgeOuterRadius = outerRingInnerRadius - outerGap;
  const wedgeInnerRadius = wedgeOuterRadius - bandWidth;
  const iconRadius = (wedgeOuterRadius + wedgeInnerRadius) / 2;
  const centerRadius = wedgeInnerRadius - innerGap;

  const pageNumber = Number(activePage);

  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const [selectedItem, setSelectedItem] = React.useState<MenuItem | null>(null);
  const [isPaused, setIsPaused] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState<number>(0);

  const AUTOPLAY_DURATION = 4000;
  const TIMER_STEP = 40;

  React.useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((prevIndex) => (prevIndex + 1) % menuItems.length);
          return 0;
        }
        return prev + (TIMER_STEP / AUTOPLAY_DURATION) * 100;
      });
    }, TIMER_STEP);

    return () => clearInterval(interval);
  }, [isPaused, menuItems.length]);

  const slice = FULL_CIRCLE / menuItems.length;
  const nextIndex = (activeIndex + 1) % menuItems.length;
  const prevIndex = (activeIndex - 1 + menuItems.length) % menuItems.length;

  const nextItem = menuItems[nextIndex];
  const prevItem = menuItems[prevIndex];
  const ActiveIcon = menuItems[activeIndex]?.icon;

  const progressRingRadius = centerRadius + 3;
  const circumference = 2 * Math.PI * progressRingRadius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;


  console.log(pageNumber, activePage);

  return (
    <div className={`${activePage !== 1 ? "flex" : "grid-cols-1"} w-full mx-auto  gap-12 items-center px-4 py-8`}>

      {/* ================= COLONNE GAUCHE : DESCRIPTION (HOVER/AUTOPLAY) ================= */}
      {activePage !== 1 && (
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
              <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-950/50 px-3 py-1 rounded-full inline-block">
                {menuItems[activeIndex]?.label}
              </span>
              <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight">
                {menuItems[activeIndex]?.title}
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed balance">
                {menuItems[activeIndex]?.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
      {/* Pagination GAUCHE */}
      {activePage !== 1 && (
        <div className="absolute left-[-100px] hidden xl:flex flex-col items-center justify-center w-24 text-center">
          <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Suivant</span>
          <div className="flex items-center gap-1 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            <ChevronLeft className="size-3 animate-pulse" />
            <span className="truncate max-w-[80px]">{nextItem?.label}</span>
          </div>
        </div>
      )}
      {/* ================= COLONNE CENTRALE : LE MENU RADIAL ================= */}
      <div className={`${activePage !== 1 ? "" : "grid-cols-1"} flex relative items-center justify-center select-none w-full`}>



        {/* Menu Radial Disque */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={menuTransition}
          style={{ width: size, height: size }}
          className="relative rounded-full overflow-hidden shadow-2xl bg-neutral-900 border border-neutral-800"
          onMouseEnter={() => {
            setIsPaused(true);
            setProgress(0);
          }}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Image de fond dynamique */}
          <div className="absolute inset-0 pointer-events-none z-0 rounded-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={menuItems[activeIndex]?.image}
                alt={menuItems[activeIndex]?.label}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 0.4, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

          <svg
            className="size-full relative z-10"
            viewBox={`${-radius} ${-radius} ${radius * 2} ${radius * 2}`}
          >
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const mid = START_ANGLE + slice * index;
              const { x, y } = polarToCartesian(iconRadius, mid);
              const active = activeIndex === index;

              return (
                <g
                  key={item.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => {
                    setSelectedItem(item);
                    onSelect?.(item);
                  }}
                  className="cursor-pointer"
                >
                  {/* Anneau extérieur réactif */}
                  <path
                    d={slicePath(index, menuItems.length, outerRingOuterRadius, outerRingInnerRadius)}
                    className={cn(
                      "transition-colors duration-300",
                      active ? "fill-violet-500/40" : "fill-transparent"
                    )}
                  />

                  {/* Tranche principale */}
                  <path
                    d={slicePath(index, menuItems.length, wedgeOuterRadius, wedgeInnerRadius)}
                    className={cn(
                      "transition-all duration-300 stroke-black/20 dark:stroke-white/5",
                      active ? "fill-white/10 backdrop-blur-[4px]" : "fill-transparent"
                    )}
                  />

                  {/* Icône de la tranche */}
                  <foreignObject x={x - 20} y={y - 20} width={40} height={40}>
                    <div className="flex h-full w-full items-center justify-center">
                      <Icon
                        size={iconSize}
                        className={cn(
                          "transition-all duration-300",
                          active ? "text-white drop-shadow-md scale-125" : "text-neutral-400 hover:text-white"
                        )}
                      />
                    </div>
                  </foreignObject>
                </g>
              );
            })}

            {/* Cercle central */}
            <circle cx={0} cy={0} r={centerRadius} className="fill-white dark:fill-neutral-900" />

            {/* Jauge d'Autoplay */}
            {!isPaused && (
              <circle
                cx={0}
                cy={0}
                r={progressRingRadius}
                className="fill-none stroke-violet-500 transition-all duration-75"
                strokeWidth={3}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90)"
              />
            )}

            {/* Contenu textuel central */}
            <foreignObject
              x={-(centerRadius - 10)}
              y={-(centerRadius - 10)}
              width={(centerRadius - 10) * 2}
              height={(centerRadius - 10) * 2}
              className="pointer-events-none"
            >
              <div className="flex flex-col h-full w-full items-center justify-center text-center p-4">
                <div className="mb-1 text-violet-600 dark:text-violet-400 transition-transform duration-300 scale-110">
                  {ActiveIcon && <ActiveIcon size={32} />}
                </div>
                <span className="text-base font-bold text-neutral-800 dark:text-neutral-100 tracking-tight">
                  {menuItems[activeIndex]?.label}
                </span>
              </div>
            </foreignObject>
          </svg>
        </motion.div>

      </div>

      {/* Pagination DROITE */}
      {activePage !== 1 && (
        <div className="absolute right-[-100px] hidden xl:flex flex-col items-center justify-center w-24 text-center">
          <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Précédent</span>
          <div className="flex items-center gap-1 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            <span className="truncate max-w-[80px]">{prevItem?.label}</span>
            <ChevronRight className="size-3 animate-pulse" />
          </div>
        </div>
      )}
      {/* ================= COLONNE DROITE : LES ACTION BUTTONS (CLIC) ================= */}
      {activePage !== 1 && (
        <div className="lg:col-span-3 min-h-[280px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {selectedItem ? (
              <motion.div
                key={selectedItem.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-3 bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm"
              >
                <div className="mb-4">
                  <p className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">Option choisie</p>
                  <h4 className="text-base font-bold text-neutral-900 dark:text-white truncate">{selectedItem.label}</h4>
                </div>

                <button
                  onClick={() => alert(`Commande lancée pour : ${selectedItem.label}`)}
                  className="w-full py-3 px-4 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 active:scale-[0.98] text-white font-medium text-sm rounded-xl shadow-sm transition-all"
                >
                  <ShoppingCart size={16} />
                  Commander
                </button>

                <button
                  onClick={() => alert(`Ajouté à la liste d'attente : ${selectedItem.label}`)}
                  className="w-full py-3 px-4 flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 active:scale-[0.98] text-neutral-900 dark:text-neutral-100 font-medium text-sm rounded-xl transition-all"
                >
                  <Calendar size={16} />
                  Liste d'attente
                </button>

                <button
                  onClick={() => alert(`Ouverture du catalogue de : ${selectedItem.label}`)}
                  className="w-full py-3 px-4 flex items-center justify-center gap-2 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 active:scale-[0.98] text-neutral-700 dark:text-neutral-300 font-medium text-sm rounded-xl transition-all"
                >
                  <BookOpen size={16} />
                  Catalogue
                </button>
              </motion.div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center p-6 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl text-center">
                <p className="text-xs text-neutral-400 dark:text-neutral-500 font-medium max-w-[180px]">
                  Cliquez sur un service du menu pour débloquer les actions de réservation.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}


    </div>
  );
}