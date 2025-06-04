"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { PlusCircle } from "lucide-react"
import type { MusicRecommendation } from "@/types/recommendation"

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit?: (data: { title: string; content: string }) => void
}

export default function CreatePostModal({ isOpen, onClose, onSubmit }: CreatePostModalProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [recommendations, setRecommendations] = useState<MusicRecommendation[]>([
    {
      id: "r1",
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop",
      title: "Starlight",
      artist: "Muse",
      recommender: "RockFan",
    },
    {
      id: "r2",
      thumbnail: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=80&h=80&fit=crop",
      title: "Clocks",
      artist: "Coldplay",
      recommender: "MelodyMaster",
    },
  ])

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({ title, content })
    }
    setTitle("")
    setContent("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white border-slate-200 max-w-3xl mx-2 sm:mx-4 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-800">게시글 작성</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2 sm:p-4">
          {/* Left side - Content creation */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-md border border-slate-200 p-4 sm:p-6 flex flex-col">
            <h3 className="text-lg font-medium mb-4 text-slate-700">음악 추천 요청하기</h3>

            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요..."
              className="bg-slate-50/50 border-slate-200 text-slate-800 mb-4 focus:border-slate-400"
            />

            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="어떤 종류의 음악을 찾고 있는지 설명해주세요..."
              className="flex-grow bg-slate-50/50 border-slate-200 text-slate-800 resize-none mb-4 focus:border-slate-400 min-h-[150px]"
            />

            <div className="flex gap-3">
              <Button
                onClick={handleSubmit}
                className="bg-slate-700 hover:bg-slate-800 text-white"
                disabled={!title.trim() && !content.trim()}
              >
                게시하기
              </Button>
              <Button onClick={onClose} variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                취소
              </Button>
            </div>
          </div>

          {/* Right side - Recommendations */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-md border border-slate-200 p-4 sm:p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-slate-700">추천 음악</h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-600 hover:text-slate-800 hover:bg-slate-100 flex items-center gap-1"
              >
                <PlusCircle className="w-4 h-4" />
                <span>음악 추가</span>
              </Button>
            </div>

            <div className="flex-grow overflow-y-auto space-y-4 pr-2">
              {recommendations.length > 0 ? (
                recommendations.map((rec) => (
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
                ))
              ) : (
                <div className="flex items-center justify-center h-full text-slate-500 text-sm">
                  추천할 음악을 추가해주세요!
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
