"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Heart, Flag, Bookmark, Play } from "lucide-react"
import type { MusicItem } from "@/types/music"
import { formatDistanceToNow } from "date-fns"

interface MusicDetailModalProps {
  music: MusicItem | null
  isOpen: boolean
  onClose: () => void
  onLike?: (id: string) => void
  onBookmark?: (id: string) => void
  onReport?: (id: string) => void
}

export default function MusicDetailModal({
  music,
  isOpen,
  onClose,
  onLike,
  onBookmark,
  onReport,
}: MusicDetailModalProps) {
  const [isLiked, setIsLiked] = useState(music?.isLiked || false)
  const [isBookmarked, setIsBookmarked] = useState(music?.isBookmarked || false)
  const [likes, setLikes] = useState(music?.likes || 0)

  if (!music) return null

  const handleLike = () => {
    const newLikedState = !isLiked
    setIsLiked(newLikedState)
    setLikes((prev) => (newLikedState ? prev + 1 : prev - 1))
    onLike?.(music.id)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    onBookmark?.(music.id)
  }

  const handleReport = () => {
    onReport?.(music.id)
    alert("신고가 접수되었습니다.")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white border-slate-200 max-w-2xl mx-2 sm:mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-3 sm:p-6">
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Thumbnail - 모바일에서 중앙 정렬 */}
            <div className="flex justify-center sm:justify-start">
              <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-xl overflow-hidden ring-4 ring-slate-200 flex-shrink-0">
                <img
                  src={music.thumbnail || "/placeholder.svg"}
                  alt={`${music.title} thumbnail`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Music Info */}
            <div className="space-y-3 sm:space-y-4">
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2 line-clamp-2">{music.title}</h2>
                <p className="text-base sm:text-lg text-slate-600 mb-1 line-clamp-1">{music.artist}</p>
                <p className="text-sm text-slate-500 mb-2">장르: {music.genre}</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm text-slate-500 justify-center sm:justify-start">
                  <span>업로드: {music.uploader}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{formatDistanceToNow(new Date(music.timestamp), { addSuffix: true })}</span>
                </div>
              </div>

              {/* Comment */}
              <div className="bg-slate-50 rounded-lg p-3 sm:p-4">
                <h3 className="font-medium text-slate-700 mb-2 text-sm sm:text-base">게시자 코멘트</h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{music.comment}</p>
              </div>

              {/* Action Buttons - 모바일에서 2x2 그리드 */}
              <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-3 pt-2 sm:pt-4">
                <Button
                  onClick={handleLike}
                  variant={isLiked ? "default" : "outline"}
                  className={`flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4 py-2 ${
                    isLiked ? "bg-red-500 hover:bg-red-600 text-white" : "border-red-200 text-red-500 hover:bg-red-50"
                  }`}
                >
                  <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${isLiked ? "fill-current" : ""}`} />
                  <span className="hidden sm:inline">{likes.toLocaleString()}</span>
                  <span className="sm:hidden">{likes > 999 ? `${Math.floor(likes / 1000)}k` : likes}</span>
                </Button>

                <Button
                  onClick={handleBookmark}
                  variant={isBookmarked ? "default" : "outline"}
                  className={`flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4 py-2 ${
                    isBookmarked
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "border-blue-200 text-blue-500 hover:bg-blue-50"
                  }`}
                >
                  <Bookmark className={`w-3 h-3 sm:w-4 sm:h-4 ${isBookmarked ? "fill-current" : ""}`} />
                  <span>스크랩</span>
                </Button>

                <Button
                  onClick={handleReport}
                  variant="outline"
                  className="flex items-center justify-center gap-1 sm:gap-2 border-orange-200 text-orange-500 hover:bg-orange-50 text-xs sm:text-sm px-2 sm:px-4 py-2"
                >
                  <Flag className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>신고</span>
                </Button>

                <Button className="flex items-center justify-center gap-1 sm:gap-2 bg-slate-700 hover:bg-slate-800 text-white text-xs sm:text-sm px-2 sm:px-4 py-2">
                  <Play className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                  <span>재생</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
