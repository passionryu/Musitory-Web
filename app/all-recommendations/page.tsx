"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, PlusCircle } from "lucide-react"
import Link from "next/link"
import type { RecommendationPost } from "@/types/recommendation"
import { formatDistanceToNow } from "date-fns"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import CreatePostModal from "@/components/create-post-modal"

export default function AllRecommendationsPage() {
  const [selectedPost, setSelectedPost] = useState<RecommendationPost | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [items, setItems] = useState<RecommendationPost[]>([])
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

    const sampleContents = [
      "공부할 때 듣기 좋은 차분한 로파이 비트를 찾고 있어요. 집중에 도움이 되면서도 너무 산만하지 않은 음악이면 좋겠어요.",
      "아침 조깅할 때 들을 신나는 운동 음악이 필요해요. 강한 비트와 에너지 넘치는 분위기의 음악으로 추천해주세요!",
      "이번 주말에 호스팅할 저녁 파티를 위한 편안한 어쿠스틱 음악을 찾고 있어요. 너무 시끄럽지 않으면서 좋은 분위기를 만들어줄 음악이면 좋겠어요.",
      "70년대와 80년대 클래식 록 음악 중에서 숨겨진 명곡들이 있을까요? 놓친 좋은 곡들을 추천해주세요!",
      "새로운 인디 포크 음악을 발견하고 싶어요. Bon Iver나 Fleet Foxes 같은 아티스트를 좋아하는데, 비슷한 추천 있나요?",
    ]

    const sampleAuthors = ["공부왕", "운동매니아", "파티호스트", "록팬", "인디소울", "발라드러버", "재즈애호가"]

    const newItems: RecommendationPost[] = Array.from({ length: 10 }, (_, index) => {
      const id = `${items.length + index + 1}`
      const contentIndex = Math.floor(Math.random() * sampleContents.length)
      const authorIndex = Math.floor(Math.random() * sampleAuthors.length)

      return {
        id,
        content: sampleContents[contentIndex],
        author: sampleAuthors[authorIndex],
        timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        recommendations: Array.from({ length: Math.floor(Math.random() * 3) }, (_, i) => ({
          id: `rec-${id}-${i}`,
          thumbnail: `https://images.unsplash.com/photo-${1470225620780 + i * 10000}-dba8ba36b745?w=80&h=80&fit=crop`,
          title: `추천 음악 ${i + 1}`,
          artist: `아티스트 ${i + 1}`,
          recommender: `추천자 ${i + 1}`,
        })),
      }
    })

    setItems((prev) => [...prev, ...newItems])
    setLoading(false)

    // 시뮬레이션: 50개 아이템 후 더 이상 로드하지 않음
    if (items.length + newItems.length >= 50) {
      setHasMore(false)
    }
  }

  const handleCreatePost = (data: { title: string; content: string }) => {
    const newPost: RecommendationPost = {
      id: `new-${Date.now()}`,
      content: data.content,
      author: "현재사용자", // 실제로는 로그인된 사용자 정보를 사용
      timestamp: new Date().toISOString(),
      recommendations: [],
    }

    setItems([newPost, ...items])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="container mx-auto px-2 sm:px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  돌아가기
                </Button>
              </Link>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800">모든 추천 요청</h1>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 sm:gap-2 text-slate-600 hover:text-slate-800 border-slate-300 hover:bg-slate-100"
              onClick={() => setShowCreateModal(true)}
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">게시글 작성</span>
              <span className="sm:hidden">작성</span>
            </Button>
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
                className="group flex flex-col sm:flex-row gap-3 sm:items-center p-3 sm:p-4 bg-white/50 rounded-lg border border-slate-100 hover:bg-white/70 hover:scale-[1.02] transition-all duration-300 cursor-pointer hover:shadow-lg"
                onClick={() => setSelectedPost(item)}
              >
                {/* Author & Timestamp */}
                <div className="flex items-center justify-between sm:w-1/4 sm:flex-col sm:items-start">
                  <h3 className="font-semibold text-sm sm:text-base text-slate-800">{item.author}</h3>
                  <p className="text-xs text-slate-500">
                    {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                  </p>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <p className="text-sm text-slate-700 line-clamp-2 group-hover:text-slate-900">{item.content}</p>
                </div>

                {/* Recommendations Count */}
                <div className="flex items-center justify-between sm:w-1/6">
                  <span className="text-xs sm:text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded-full">
                    추천 {item.recommendations.length}개
                  </span>
                </div>
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

      {/* Detail Dialog */}
      <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent className="bg-white border-slate-200 max-w-3xl mx-4">
          {selectedPost && (
            <div className="p-4">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-slate-800">{selectedPost.author}'s Request</h3>
                <p className="text-sm text-slate-500 mb-2">
                  {formatDistanceToNow(new Date(selectedPost.timestamp), { addSuffix: true })}
                </p>
                <p className="text-slate-700">{selectedPost.content}</p>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-3 text-slate-700">Recommendations</h4>
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {selectedPost.recommendations.map((rec) => (
                    <div
                      key={rec.id}
                      className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg border border-slate-100"
                    >
                      <img
                        src={rec.thumbnail || "/placeholder.svg"}
                        alt={`${rec.title} thumbnail`}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div>
                        <h5 className="font-medium text-sm text-slate-800">{rec.title}</h5>
                        <p className="text-xs text-slate-600">{rec.artist}</p>
                        <p className="text-xs text-slate-500 mt-1">Recommended by {rec.recommender}</p>
                      </div>
                    </div>
                  ))}

                  {selectedPost.recommendations.length === 0 && (
                    <div className="flex items-center justify-center h-32 text-slate-500 text-sm">
                      아직 추천이 없습니다. 첫 번째 추천을 해보세요!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <CreatePostModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} onSubmit={handleCreatePost} />
    </div>
  )
}
