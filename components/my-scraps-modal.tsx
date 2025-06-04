"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Play, Heart, Calendar, Bookmark } from "lucide-react"
import type { Music } from "@/types/music"
import MusicDetailModal from "./music-detail-modal"

interface MyScrapsModalProps {
  isOpen: boolean
  onClose: () => void
}

// Mock data
const mockScrappedMusic: Music[] = [
  {
    id: "3",
    title: "Dynamite",
    artist: "BTS",
    genre: "K-Pop",
    thumbnail: "/placeholder.svg?height=60&width=60",
    likes: 980,
    uploadedBy: "BTSArmy",
    uploadedAt: "2024-01-12T14:15:00Z",
    comment: "BTS의 대표곡! 언제 들어도 기분이 좋아져요",
  },
  {
    id: "4",
    title: "Bad Habits",
    artist: "Ed Sheeran",
    genre: "Pop",
    thumbnail: "/placeholder.svg?height=60&width=60",
    likes: 875,
    uploadedBy: "EllishFan",
    uploadedAt: "2024-01-08T09:45:00Z",
    comment: "에드 시런의 중독적인 멜로디",
  },
]

export default function MyScrapsModal({ isOpen, onClose }: MyScrapsModalProps) {
  const [selectedMusic, setSelectedMusic] = useState<Music | null>(null)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ko-KR")
  }

  const formatLikes = (likes: number) => {
    if (likes >= 1000) {
      return `${(likes / 1000).toFixed(1)}k`
    }
    return likes.toString()
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center">
              <Bookmark className="h-5 w-5 mr-2" />
              내가 스크랩한 Musitory
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {mockScrappedMusic.length === 0 ? (
              <div className="text-center py-8 text-slate-500">아직 스크랩한 음악이 없습니다.</div>
            ) : (
              mockScrappedMusic.map((music) => (
                <div
                  key={music.id}
                  className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedMusic(music)}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={music.thumbnail || "/placeholder.svg"}
                      alt={music.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">{music.title}</h3>
                      <p className="text-slate-600 truncate">{music.artist}</p>
                      <p className="text-sm text-slate-500">by {music.uploadedBy}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-slate-500">
                        <span className="bg-slate-100 px-2 py-1 rounded text-xs">{music.genre}</span>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4 text-red-500" />
                          <span>{formatLikes(music.likes)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(music.uploadedAt)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-blue-600">
                        <Bookmark className="h-4 w-4 fill-current" />
                      </Button>
                    </div>
                  </div>

                  {music.comment && (
                    <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-700">{music.comment}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      {selectedMusic && (
        <MusicDetailModal isOpen={!!selectedMusic} onClose={() => setSelectedMusic(null)} music={selectedMusic} />
      )}
    </>
  )
}
