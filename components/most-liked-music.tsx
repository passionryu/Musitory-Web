"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, Play } from "lucide-react"
import MusicDetailModal from "./music-detail-modal"
import type { Music } from "@/types/music"

// Mock data
const mockMostLikedMusic: Music[] = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    genre: "Pop",
    thumbnail: "/placeholder.svg?height=64&width=64",
    likes: 1245,
    uploader: "MusicFan22",
    timestamp: "2024-01-15T10:30:00Z",
    comment: "이 노래는 정말 중독성이 강해요! 밤에 드라이브할 때 듣기 완벽한 곡입니다.",
  },
  {
    id: "2",
    title: "Anti-Hero",
    artist: "Taylor Swift",
    genre: "Pop",
    thumbnail: "/placeholder.svg?height=64&width=64",
    likes: 1120,
    uploader: "StylesLover",
    timestamp: "2024-01-14T15:45:00Z",
    comment: "테일러 스위프트의 솔직한 가사가 마음에 와닿아요.",
  },
  {
    id: "3",
    title: "Dynamite",
    artist: "BTS",
    genre: "K-Pop",
    thumbnail: "/placeholder.svg?height=64&width=64",
    likes: 980,
    uploader: "BTSArmy",
    timestamp: "2024-01-13T09:20:00Z",
    comment: "언제 들어도 기분이 좋아지는 노래예요!",
  },
  {
    id: "4",
    title: "Bad Habit",
    artist: "Steve Lacy",
    genre: "R&B",
    thumbnail: "/placeholder.svg?height=64&width=64",
    likes: 875,
    uploader: "EilishFan",
    timestamp: "2024-01-12T18:10:00Z",
    comment: "스티브 레이시의 독특한 보컬이 매력적이에요.",
  },
  {
    id: "5",
    title: "As It Was",
    artist: "Harry Styles",
    genre: "Pop",
    thumbnail: "/placeholder.svg?height=64&width=64",
    likes: 756,
    uploader: "StylesFan",
    timestamp: "2024-01-11T12:30:00Z",
    comment: "해리 스타일스의 감성적인 목소리가 좋아요.",
  },
]

export default function MostLikedMusic() {
  const [selectedMusic, setSelectedMusic] = useState<Music | null>(null)
  const [musicList, setMusicList] = useState(mockMostLikedMusic)

  const handleLike = (musicId: string) => {
    setMusicList((prev) => prev.map((music) => (music.id === musicId ? { ...music, likes: music.likes + 1 } : music)))
  }

  const formatLikes = (likes: number) => {
    if (likes >= 1000) {
      return `${(likes / 1000).toFixed(1)}k`
    }
    return likes.toString()
  }

  return (
    <>
      <Card className="bg-white/70 backdrop-blur-sm border-slate-200 p-3 sm:p-4">
        <div className="space-y-3 sm:space-y-4">
          {musicList.slice(0, 10).map((music, index) => (
            <div
              key={music.id}
              className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg hover:bg-slate-50/80 transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedMusic(music)}
            >
              {/* Rank */}
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-slate-700 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                {index + 1}
              </div>

              {/* Thumbnail */}
              <div className="flex-shrink-0">
                <img
                  src={music.thumbnail || "/placeholder.svg"}
                  alt={music.title}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover"
                />
              </div>

              {/* Music Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-800 text-sm sm:text-base truncate">{music.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm truncate">{music.artist}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <span>{music.genre}</span>
                  <span>•</span>
                  <span>by {music.uploader}</span>
                </div>
              </div>

              {/* Likes */}
              <div className="flex items-center gap-1 text-red-500">
                <Heart className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium">{formatLikes(music.likes)}</span>
              </div>

              {/* Play Button */}
              <Button
                size="sm"
                className="bg-slate-700 hover:bg-slate-800 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full p-0"
                onClick={(e) => {
                  e.stopPropagation()
                  // Handle play functionality
                }}
              >
                <Play className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
              </Button>
            </div>
          ))}
        </div>
      </Card>

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
