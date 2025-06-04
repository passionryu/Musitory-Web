"use client"

import { useState } from "react"
import MusicCarousel from "./music-carousel"
import type { MusicItem } from "@/types/music"
import { formatDistanceToNow } from "date-fns"
import MusicDetailModal from "./music-detail-modal"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export default function RecentMusic() {
  const [selectedMusic, setSelectedMusic] = useState<MusicItem | null>(null)
  const [items, setItems] = useState<MusicItem[]>([
    {
      id: "1",
      thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
      title: "Flowers",
      artist: "Miley Cyrus",
      genre: "Pop",
      uploader: "MileyFan",
      likes: 320,
      timestamp: new Date("2024-05-28T14:30:00").toISOString(),
      comment: "마일리 사이러스의 새로운 시작을 알리는 곡! 자립과 성장에 대한 메시지가 감동적이에요.",
    },
    {
      id: "2",
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
      title: "Kill Bill",
      artist: "SZA",
      genre: "R&B",
      uploader: "SZALover",
      likes: 290,
      timestamp: new Date("2024-05-28T12:15:00").toISOString(),
      comment: "SZA의 감성적인 보컬이 돋보이는 곡이에요. 사랑과 이별의 복잡한 감정을 잘 표현했어요.",
    },
    {
      id: "3",
      thumbnail: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=200&h=200&fit=crop",
      title: "Anti-Hero",
      artist: "Taylor Swift",
      genre: "Pop",
      uploader: "Swiftie",
      likes: 275,
      timestamp: new Date("2024-05-28T10:45:00").toISOString(),
      comment: "테일러 스위프트의 자기 성찰이 담긴 곡. 솔직한 가사와 중독성 있는 멜로디가 인상적입니다.",
    },
    {
      id: "4",
      thumbnail: "https://images.unsplash.com/photo-1506197603053-17d58b2763bd?w=200&h=200&fit=crop",
      title: "Calm Down",
      artist: "Rema",
      genre: "Afrobeats",
      uploader: "AfrobeatsFan",
      likes: 260,
      timestamp: new Date("2024-05-28T08:20:00").toISOString(),
      comment: "아프로비츠의 매력이 가득한 곡! 리듬감이 정말 좋고 듣기만 해도 몸이 움직여져요.",
    },
    {
      id: "5",
      thumbnail: "https://images.unsplash.com/photo-1573867336216-34932c99e6a5?w=200&h=200&fit=crop",
      title: "Unholy",
      artist: "Sam Smith & Kim Petras",
      genre: "Pop",
      uploader: "MusicExplorer",
      likes: 245,
      timestamp: new Date("2024-05-27T22:10:00").toISOString(),
      comment: "샘 스미스와 킴 페트라스의 콜라보! 강렬하고 도발적인 분위기가 매력적이에요.",
    },
    {
      id: "6",
      thumbnail: "https://images.unsplash.com/photo-1586899028174-e7098630bb91?w=200&h=200&fit=crop",
      title: "Creepin'",
      artist: "Metro Boomin, The Weeknd & 21 Savage",
      genre: "Hip-Hop",
      uploader: "HipHopFan",
      likes: 230,
      timestamp: new Date("2024-05-27T20:05:00").toISOString(),
      comment: "세 아티스트의 완벽한 조합! 다크한 분위기와 강렬한 비트가 일품입니다.",
    },
    {
      id: "7",
      thumbnail: "https://images.unsplash.com/photo-1543791187-825578470492?w=200&h=200&fit=crop",
      title: "Die For You",
      artist: "The Weeknd",
      genre: "R&B",
      uploader: "WeekndFan",
      likes: 215,
      timestamp: new Date("2024-05-27T18:30:00").toISOString(),
      comment: "위켄드의 감성적인 보컬이 돋보이는 사랑 노래. 멜로디가 정말 아름다워요.",
    },
    {
      id: "8",
      thumbnail: "https://images.unsplash.com/photo-1614680376585-51d1171b8803?w=200&h=200&fit=crop",
      title: "Escapism",
      artist: "RAYE & 070 Shake",
      genre: "Pop",
      uploader: "MusicLover",
      likes: 200,
      timestamp: new Date("2024-05-27T16:45:00").toISOString(),
      comment: "현실 도피에 대한 솔직한 이야기를 담은 곡. RAYE의 보컬이 정말 인상적이에요.",
    },
  ])

  return (
    <div>
      <div className="flex justify-between items-center mb-3 sm:mb-4 px-1">
        <div></div>
        <Link href="/all-music">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 sm:gap-2 text-slate-600 hover:text-slate-800 border-slate-300 hover:bg-slate-100 text-xs sm:text-sm px-2 sm:px-4"
          >
            <span className="hidden sm:inline">모든 게시글 보기</span>
            <span className="sm:hidden">전체보기</span>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </Link>
      </div>

      <MusicCarousel
        items={items}
        visibleItems={7}
        renderItem={(item) => (
          <div
            className="flex flex-col items-center p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-md border border-slate-200 w-44 md:w-44 transition-all hover:shadow-lg hover:bg-white/80 cursor-pointer"
            onClick={() => setSelectedMusic(item)}
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mb-3 ring-2 ring-slate-200">
              <img
                src={item.thumbnail || "/placeholder.svg"}
                alt={`${item.title} thumbnail`}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-medium text-xs md:text-sm text-center line-clamp-1 text-slate-800">{item.title}</h3>
            <p className="text-xs text-slate-600 text-center line-clamp-1">{item.artist}</p>
            <p className="text-xs text-slate-500 text-center mt-1">by {item.uploader}</p>
            <p className="text-xs text-slate-400 mt-1">
              {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
            </p>
          </div>
        )}
      />

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
