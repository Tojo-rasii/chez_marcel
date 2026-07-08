import { DiagonalCarousel } from "@/components/ui/diagonal-carousel"

const items = [
  { src: "/images/city.jpg", title: "urban exploration" },
  { src: "/images/night.jpg", title: "night scene" },
  { src: "/images/flowers.jpg", title: "yellow wildflowers" },
  { src: "/images/fuji.jpg", title: "street with mount fuji" },
]

export function DiagonalCarouselDemo() {
  return (
    <DiagonalCarousel
      items={items}
      defaultActiveIndex={2}
      slideSize={250}
      className="h-[560px] bg-[#ececec] text-neutral-800 dark:bg-neutral-950 dark:text-neutral-100"
    />
  )
}