"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Eye, MessageCircle, Clock } from "lucide-react"
import Link from "next/link"
import CreatePostModal from "./create-post-modal"
import type { Recommendation } from "@/types/recommendation"

// Mock data
const mockRecommendations: Recommendation[] = [
  {
    id: "1",
    title: "운동할 때 듣기 좋은 신나는 음악 추천해주세요!",
    content:
      "헬스장에서 운동할 때 동기부여가 되는 신나는 음악들을 찾고 있어요. 장르는 상관없고 템포가 빠른 곡들로 추천해주시면 감사하겠습니다.",
    author: "FitnessLover",
    timestamp: "2024-01-15T16:30:00Z",
    replies: 12,
    tags: ["운동", "신나는", "템포빠른"],
  },
  {
    id: "2",
    title: "비 오는 날 감성에 젖을 수 있는 발라드 추천",
    content:
      "요즘 날씨가 우울해서 비 오는 날에 어울리는 감성적인 발라드를 찾고 있어요. 한국 가수든 해외 가수든 상관없습니다.",
    author: "RainyMood",
    timestamp: "2024-01-15T14:15:00Z",
    replies: 8,
    tags: ["발라드", "감성", "비오는날"],
  },
  {
    id: "3",
    title: "2000년대 추억의 팝송 모음 만들고 싶어요",
    content: "2000년대에 유행했던 팝송들로 플레이리스트를 만들고 싶은데, 당시 인기 있었던 곡들을 추천해주세요!",
    author: "NostalgiaFan",
    timestamp: "2024-01-15T11:45:00Z",
    replies: 15,
    tags: ["2000년대", "팝송", "추억"],
  },
]

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

export default function RecommendationsForOthers() {
  const [showCreatePost, setShowCreatePost] = useState(false)

  return (
    <>
      <div className="space-y-4">
        {/* Header with buttons */}
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-slate-600 hover:text-slate-800 border-slate-300 hover:bg-slate-100"
            onClick={() => setShowCreatePost(true)}
          >
            <Plus className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">게시글 추가</span>
            <span className="sm:hidden">추가</span>
          </Button>
          <Link href="/all-recommendations">
            <Button
              variant="outline"
              size="sm"
              className="text-slate-600 hover:text-slate-800 border-slate-300 hover:bg-slate-100"
            >
              <Eye className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">모든 게시글 보기</span>
              <span className="sm:hidden">전체보기</span>
            </Button>
          </Link>
        </div>

        {/* Recommendations List */}
        <div className="space-y-3">
          {mockRecommendations.map((recommendation) => (
            <Card
              key={recommendation.id}
              className="bg-white/70 backdrop-blur-sm border-slate-200 p-4 hover:bg-white/80 transition-all duration-300 cursor-pointer"
            >
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-800 text-sm sm:text-base line-clamp-2">
                  {recommendation.title}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm line-clamp-2">{recommendation.content}</p>

                <div className="flex flex-wrap gap-2">
                  {recommendation.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>by {recommendation.author}</span>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>{recommendation.replies}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatTimeAgo(recommendation.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <CreatePostModal isOpen={showCreatePost} onClose={() => setShowCreatePost(false)} type="recommendation" />
    </>
  )
}
