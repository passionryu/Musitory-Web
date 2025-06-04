"use client"

import { useState } from "react"
import type { MusicItem } from "@/types/music"
import { Heart, Play } from "lucide-react"
import MusicDetailModal from "./music-detail-modal"

export default function MostLikedMusic() {
  const [selectedMusic, setSelectedMusic] = useState<MusicItem | null>(null)
  const [items, setItems] = useState<MusicItem[]>([
    {
      id: "1",
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
      title: "Blinding Lights",
      artist: "The Weeknd",
      genre: "Pop",
      uploader: "MusicFan22",
      likes: 1245,
      timestamp: new Date("2023-05-15").toISOString(),
      comment:
        "이 노래는 정말 최고예요! 운전할 때 듣기 좋고 신나는 비트가 일품입니다. 80년대 신스팝의 느낌을 현대적으로 재해석한 명곡이라고 생각해요.",
    },
    {
      id: "2",
      thumbnail: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=200&h=200&fit=crop",
      title: "As It Was",
      artist: "Harry Styles",
      genre: "Pop Rock",
      uploader: "StylesLover",
      likes: 1120,
      timestamp: new Date("2023-06-20").toISOString(),
      comment: "해리 스타일스의 감성이 너무 좋아요. 멜로디가 중독성 있고 가사도 의미 깊어서 계속 듣게 되네요.",
    },
    {
      id: "3",
      thumbnail: "https://images.unsplash.com/photo-1506197603053-17d58b2763bd?w=200&h=200&fit=crop",
      title: "Dynamite",
      artist: "BTS",
      genre: "K-Pop",
      uploader: "BTSArmy",
      likes: 980,
      timestamp: new Date("2023-07-05").toISOString(),
      comment: "BTS의 첫 영어 곡! 정말 에너지가 넘치고 듣기만 해도 기분이 좋아져요. 전 세계를 사로잡은 명곡입니다.",
    },
    {
      id: "4",
      thumbnail: "https://images.unsplash.com/photo-1573867336216-34932c99e6a5?w=200&h=200&fit=crop",
      title: "Bad Guy",
      artist: "Billie Eilish",
      genre: "Alternative Pop",
      uploader: "EilishFan",
      likes: 875,
      timestamp: new Date("2023-08-10").toISOString(),
      comment: "빌리 아일리시만의 독특한 스타일이 돋보이는 곡이에요. 다크하면서도 중독성 있는 멜로디가 인상적입니다.",
    },
    {
      id: "5",
      thumbnail: "https://images.unsplash.com/photo-1586899028174-e7098630bb91?w=200&h=200&fit=crop",
      title: "Stay",
      artist: "The Kid LAROI & Justin Bieber",
      genre: "Pop",
      uploader: "MusicExplorer",
      likes: 830,
      timestamp: new Date("2023-09-15").toISOString(),
      comment: "두 아티스트의 콜라보가 정말 완벽해요. 감정적인 가사와 멜로디가 마음에 와닿습니다.",
    },
    {
      id: "6",
      thumbnail: "https://images.unsplash.com/photo-1543791187-825578470492?w=200&h=200&fit=crop",
      title: "Levitating",
      artist: "Dua Lipa",
      uploader: "DuaFan",
      likes: 790,
      timestamp: new Date("2023-10-20").toISOString(),
    },
    {
      id: "7",
      thumbnail: "https://images.unsplash.com/photo-1614680376585-51d1171b8803?w=200&h=200&fit=crop",
      title: "Butter",
      artist: "BTS",
      uploader: "KpopLover",
      likes: 760,
      timestamp: new Date("2023-11-25").toISOString(),
    },
    {
      id: "8",
      thumbnail: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop",
      title: "Good 4 U",
      artist: "Olivia Rodrigo",
      uploader: "OliviaFan",
      likes: 720,
      timestamp: new Date("2023-12-30").toISOString(),
    },
    {
      id: "9",
      thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
      title: "Heat Waves",
      artist: "Glass Animals",
      uploader: "IndieMusic",
      likes: 695,
      timestamp: new Date("2023-11-10").toISOString(),
    },
    {
      id: "10",
      thumbnail: "https://images.unsplash.com/photo-1585242757849-495c47a4e6a2?w=200&h=200&fit=crop",
      title: "Industry Baby",
      artist: "Lil Nas X ft. Jack Harlow",
      uploader: "HipHopHead",
      likes: 680,
      timestamp: new Date("2023-12-05").toISOString(),
    },
  ])

  // Sort by likes and take top 10
  const topItems = items.sort((a, b) => b.likes - a.likes).slice(0, 5)

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-md border border-slate-200 p-3 sm:p-6">
      <div className="space-y-3 sm:space-y-4">
        {topItems.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 bg-white/50 rounded-lg border border-slate-100 hover:bg-white/70 transition-all cursor-pointer"
            onClick={() => setSelectedMusic(item)}
          >
            {/* Ranking */}
            <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-slate-700 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
              {index + 1}
            </div>

            {/* Thumbnail */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden ring-2 ring-slate-200 flex-shrink-0">
              <img
                src={item.thumbnail || "/placeholder.svg"}
                alt={`${item.title} thumbnail`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Music Info */}
            <div className="flex-grow min-w-0 pr-2">
              <h3 className="font-semibold text-sm sm:text-base text-slate-800 line-clamp-1">{item.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 line-clamp-1">{item.artist}</p>
              <p className="text-xs text-slate-500 line-clamp-1">by {item.uploader}</p>
            </div>

            {/* Likes */}
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-red-500 flex-shrink-0">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              <span className="font-semibold text-xs sm:text-sm">{item.likes.toLocaleString()}</span>
            </div>

            {/* Play Button */}
            <button className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-slate-700 text-white rounded-full flex items-center justify-center hover:bg-slate-800 transition-colors">
              <Play className="w-3 h-3 sm:w-5 sm:h-5 fill-current" />
            </button>
          </div>
        ))}
      </div>
      <MusicDetailModal
        music={selectedMusic}
        isOpen={!!selectedMusic}
        onClose={() => setSelectedMusic(null)}
        onLike={(id) => {
          setItems((prev) =>
            prev.map((item) =>
              item.id === id
                ? { ...item, likes: item.isLiked ? item.likes - 1 : item.likes + 1, isLiked: !item.isLiked }
                : item,
            ),
          )
        }}
        onBookmark={(id) => {
          setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item)),
          )
        }}
        onReport={(id) => console.log("Reported:", id)}
      />
    </div>
  )
}
