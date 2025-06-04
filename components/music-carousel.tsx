"use client"

import { useState, type ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MusicCarouselProps<T> {
  items: T[]
  renderItem: (item: T) => ReactNode
  visibleItems?: number
  mobileVisibleItems?: number
}

export default function MusicCarousel<T>({
  items,
  renderItem,
  visibleItems = 6,
  mobileVisibleItems = 2.5,
}: MusicCarouselProps<T>) {
  const [startIndex, setStartIndex] = useState(0)

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? Math.max(0, items.length - visibleItems) : prev - 1))
  }

  const handleNext = () => {
    setStartIndex((prev) => (prev >= items.length - visibleItems ? 0 : prev + 1))
  }

  const visibleItemsArray = items.slice(startIndex, startIndex + visibleItems)

  return (
    <div className="relative">
      {/* Desktop version with arrows */}
      <div className="hidden md:flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 z-10 bg-slate-100/90 text-slate-600 rounded-full hover:bg-slate-200 border border-slate-300 shadow-sm"
          onClick={handlePrev}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Previous</span>
        </Button>

        <div className="flex gap-3 overflow-hidden mx-10 py-4">
          <div className="flex gap-3 transition-transform duration-500 ease-in-out">
            {visibleItemsArray.map((item, index) => (
              <div key={startIndex + index} className="flex-shrink-0">
                {renderItem(item)}
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 z-10 bg-slate-100/90 text-slate-600 rounded-full hover:bg-slate-200 border border-slate-300 shadow-sm"
          onClick={handleNext}
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Next</span>
        </Button>
      </div>

      {/* Mobile version with horizontal scroll */}
      <div className="md:hidden">
        <div
          className="flex gap-3 overflow-x-auto py-4 px-4 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {items.map((item, index) => (
            <div key={index} className="flex-shrink-0">
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
