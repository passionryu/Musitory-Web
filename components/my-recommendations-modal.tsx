"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MessageSquare, Calendar, MoreVertical } from "lucide-react"
import type { Recommendation } from "@/types/recommendation"

interface MyRecommendationsModalProps {
  isOpen: boolean
  onClose: () => void
}

// Mock data
const mockMyRecommendations: Recommendation[] = [
  {
    id: "1",
    title: "운동할 때 듣기 좋은 신나는 음악 추천해주세요!",
    content: "헬스장에서 운동할 때 들으면 힘이 나는 음악을 찾고 있어요. 장르는 상관없고 템포가 빠른 곡들로 부탁드려요.",
    author: "MusicLover22",
    createdAt: "2024-01-15T10:30:00Z",
    replies: 12,
  },
  {
    id: "2",
    title: "비 오는 날 감성적인 발라드 추천",
    content: "요즘 비가 자주 와서 감성적인 기분이 드는데, 비 오는 날에 어울리는 발라드 곡들 추천해주세요.",
    author: "MusicLover22",
    createdAt: "2024-01-10T15:20:00Z",
    replies: 8,
  },
]

export default function MyRecommendationsModal({ isOpen, onClose }: MyRecommendationsModalProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ko-KR")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">내가 올린 추천 게시글</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {mockMyRecommendations.length === 0 ? (
            <div className="text-center py-8 text-slate-500">아직 작성한 추천 게시글이 없습니다.</div>
          ) : (
            mockMyRecommendations.map((recommendation) => (
              <div
                key={recommendation.id}
                className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg line-clamp-2">{recommendation.title}</h3>

                  <p className="text-slate-600 text-sm line-clamp-3">{recommendation.content}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(recommendation.createdAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>답글 {recommendation.replies}개</span>
                      </div>
                    </div>

                    <Button size="sm" variant="ghost">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
