"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Play } from "lucide-react"
import MusicDetailModal from "./music-detail-modal"
import type { Music } from "@/types/music"

interface MusicCarouselProps {
  music: Music[]
}

function formatTimeAgo(timestamp: string): string {
  try {
    const date = new Date(timestamp)
    if (isNaN(date.getTime())) {
      return "방금 전"
    }

    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return "방금 전"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`
    return `${Math.floor(diffInSeconds / 86400)}일 전`
  } catch {
    return "방금 전"
  }
}

export default function MusicCarousel({ music }: MusicCarouselProps) {
  const [selectedMusic, setSelectedMusic] = useState<Music | null>(null)
  const [musicList, setMusicList] = useState(music)

  const handleLike = (musicId: string) => {
    setMusicList((prev) => prev.map((item) => (item.id === musicId ? { ...item, likes: item.likes + 1 } : item)))
  }

  return (
    <>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 pb-4" style={{ width: "max-content" }}>
          {musicList.map((item) => (
            <Card
              key={item.id}
              className="flex-shrink-0 w-48 sm:w-56 bg-white/70 backdrop-blur-sm border-slate-200 p-3 hover:bg-white/80 transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedMusic(item)}
            >
              <div className="space-y-3">
                <div className="relative">
                  <img
                    src={item.thumbnail || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-32 sm:h-36 object-cover rounded-lg"
                  />
                  <Button
                    size="sm"
                    className="absolute bottom-2 right-2 bg-slate-700/80 hover:bg-slate-800 text-white w-8 h-8 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle play functionality
                    }}
                  >
                    <Play className="h-3 w-3 fill-current" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-slate-800 text-sm line-clamp-2">{item.title}</h3>
                  <p className="text-slate-600 text-xs">{item.artist}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{item.genre}</span>
                    <div className="flex items-center gap-1 text-red-500">
                      <Heart className="h-3 w-3 fill-current" />
                      <span>{item.likes}</span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500">
                    <p>by {item.uploader}</p>
                    <p>{formatTimeAgo(item.timestamp)}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {selectedMusic && (
        <MusicDetailModal
          music={selectedMusic}
          isOpen={!!selectedMusic}
          onClose={() => setSelectedMusic(null)}
          onLike={handleLike}
        />
      )}
    </>
  )
}
