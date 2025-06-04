"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Play, Heart, Calendar, MoreVertical } from "lucide-react"
import type { Music } from "@/types/music"
import MusicDetailModal from "./music-detail-modal"

interface MyMusitoryModalProps {
  isOpen: boolean
  onClose: () => void
}

// Mock data
const mockMyMusic: Music[] = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    genre: "Pop",
    thumbnail: "/placeholder.svg?height=60&width=60",
    likes: 1245,
    uploadedBy: "MusicLover22",
    uploadedAt: "2024-01-15T10:30:00Z",
    comment: "새벽에 듣기 좋은 노래예요!",
  },
  {
    id: "2",
    title: "Anti-Hero",
    artist: "Taylor Swift",
    genre: "Pop",
    thumbnail: "/placeholder.svg?height=60&width=60",
    likes: 1120,
    uploadedBy: "MusicLover22",
    uploadedAt: "2024-01-10T15:20:00Z",
    comment: "테일러 스위프트의 최신곡! 중독성 있어요",
  },
]

export default function MyMusitoryModal({ isOpen, onClose }: MyMusitoryModalProps) {
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
            <DialogTitle className="text-xl font-bold">내가 올린 Musitory</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {mockMyMusic.length === 0 ? (
              <div className="text-center py-8 text-slate-500">아직 올린 음악이 없습니다.</div>
            ) : (
              mockMyMusic.map((music) => (
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
                      <Button size="sm" variant="ghost">
                        <MoreVertical className="h-4 w-4" />
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
