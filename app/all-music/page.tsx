"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, Play } from "lucide-react"
import Link from "next/link"
import type { MusicItem } from "@/types/music"
import MusicDetailModal from "@/components/music-detail-modal"

export default function AllMusicPage() {
  const [selectedMusic, setSelectedMusic] = useState<MusicItem | null>(null)
  const [items, setItems] = useState<MusicItem[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef<HTMLDivElement>(null)

  // 초기 데이터 로드
  useEffect(() => {
    loadMoreItems()
  }, [])

  // 무한 스크롤 구현
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreItems()
        }
      },
      { threshold: 0.1 },
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, loading])

  const loadMoreItems = async () => {
    if (loading) return

    setLoading(true)

    // 시뮬레이션된 API 호출
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newItems: MusicItem[] = Array.from({ length: 10 }, (_, index) => {
      const id = `${items.length + index + 1}`
      const musicData = [
        {
          title: "Flowers",
          artist: "Miley Cyrus",
          genre: "Pop",
          uploader: "MileyFan",
          thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
          comment: "마일리 사이러스의 새로운 시작을 알리는 곡! 자립과 성장에 대한 메시지가 감동적이에요.",
        },
        {
          title: "Kill Bill",
          artist: "SZA",
          genre: "R&B",
          uploader: "SZALover",
          thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
          comment: "SZA의 감성적인 보컬이 돋보이는 곡이에요. 사랑과 이별의 복잡한 감정을 잘 표현했어요.",
        },
        {
          title: "Anti-Hero",
          artist: "Taylor Swift",
          genre: "Pop",
          uploader: "Swiftie",
          thumbnail: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=200&h=200&fit=crop",
          comment: "테일러 스위프트의 자기 성찰이 담긴 곡. 솔직한 가사와 중독성 있는 멜로디가 인상적입니다.",
        },
        {
          title: "Calm Down",
          artist: "Rema",
          genre: "Afrobeats",
          uploader: "AfrobeatsFan",
          thumbnail: "https://images.unsplash.com/photo-1506197603053-17d58b2763bd?w=200&h=200&fit=crop",
          comment: "아프로비츠의 매력이 가득한 곡! 리듬감이 정말 좋고 듣기만 해도 몸이 움직여져요.",
        },
        {
          title: "Unholy",
          artist: "Sam Smith & Kim Petras",
          genre: "Pop",
          uploader: "MusicExplorer",
          thumbnail: "https://images.unsplash.com/photo-1573867336216-34932c99e6a5?w=200&h=200&fit=crop",
          comment: "샘 스미스와 킴 페트라스의 콜라보! 강렬하고 도발적인 분위기가 매력적이에요.",
        },
      ]

      const randomMusic = musicData[index % musicData.length]
      return {
        id,
        ...randomMusic,
        likes: Math.floor(Math.random() * 500) + 100,
        timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      }
    })

    setItems((prev) => [...prev, ...newItems])
    setLoading(false)

    // 시뮬레이션: 50개 아이템 후 더 이상 로드하지 않음
    if (items.length + newItems.length >= 50) {
      setHasMore(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="container mx-auto px-2 sm:px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                돌아가기
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-slate-800">모든 음악 게시글</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-md border border-slate-200 p-3 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="group flex items-center gap-2 sm:gap-4 p-3 sm:p-4 bg-white/50 rounded-lg border border-slate-100 hover:bg-white/70 hover:scale-[1.02] transition-all duration-300 cursor-pointer hover:shadow-lg"
                onClick={() => setSelectedMusic(item)}
              >
                {/* Ranking - 모바일에서 더 작게 */}
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-slate-700 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm group-hover:bg-slate-800 transition-colors">
                  {index + 1}
                </div>

                {/* Thumbnail - 모바일에서 더 작게 */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden ring-2 ring-slate-200 group-hover:ring-slate-300 transition-all flex-shrink-0">
                  <img
                    src={item.thumbnail || "/placeholder.svg"}
                    alt={`${item.title} thumbnail`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Music Info - 모바일 최적화 */}
                <div className="flex-grow min-w-0 pr-2">
                  <h3 className="font-semibold text-sm sm:text-base text-slate-800 line-clamp-1 group-hover:text-slate-900 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-1">{item.artist}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs text-slate-500 mt-1">
                    <span className="line-clamp-1">{item.genre}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="line-clamp-1">by {item.uploader}</span>
                  </div>
                </div>

                {/* Likes - 모바일에서 세로 배치 */}
                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-red-500 flex-shrink-0">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  <span className="font-semibold text-xs sm:text-sm">{item.likes.toLocaleString()}</span>
                </div>

                {/* Play Button - 모바일에서 더 작게 */}
                <button className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-slate-700 text-white rounded-full flex items-center justify-center hover:bg-slate-800 transition-colors group-hover:scale-110">
                  <Play className="w-3 h-3 sm:w-5 sm:h-5 fill-current" />
                </button>
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-700"></div>
              </div>
            )}

            {/* End of content */}
            {!hasMore && <div className="text-center py-8 text-slate-500">모든 게시글을 불러왔습니다.</div>}

            {/* Intersection observer target */}
            <div ref={observerRef} className="h-4" />
          </div>
        </div>
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
