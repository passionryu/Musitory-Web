"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Play, Heart, Plus, Search, Trash2 } from "lucide-react"
import type { Playlist } from "@/types/user"
import type { Music } from "@/types/music"

interface PlaylistDetailModalProps {
  isOpen: boolean
  onClose: () => void
  playlist: Playlist
}

// Mock music data for playlist
const mockPlaylistMusic: Music[] = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    genre: "Pop",
    thumbnail: "/placeholder.svg?height=50&width=50",
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
    thumbnail: "/placeholder.svg?height=50&width=50",
    likes: 1120,
    uploadedBy: "MusicLover22",
    uploadedAt: "2024-01-10T15:20:00Z",
    comment: "테일러 스위프트의 최신곡!",
  },
]

export default function PlaylistDetailModal({ isOpen, onClose, playlist }: PlaylistDetailModalProps) {
  const [playlistMusic, setPlaylistMusic] = useState<Music[]>(mockPlaylistMusic)
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddMusic, setShowAddMusic] = useState(false)

  const handleRemoveMusic = (musicId: string) => {
    setPlaylistMusic(playlistMusic.filter((music) => music.id !== musicId))
  }

  const filteredMusic = playlistMusic.filter(
    (music) =>
      music.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      music.artist.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center justify-between">
            <div>
              {playlist.name}
              <div className="text-sm font-normal text-slate-500 mt-1">{playlistMusic.length}곡</div>
            </div>
            <Button size="sm" onClick={() => setShowAddMusic(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-1" />
              음악 추가
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* 플레이리스트 설명 */}
          {playlist.description && (
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-sm text-slate-700">{playlist.description}</p>
            </div>
          )}

          {/* 검색 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="플레이리스트에서 음악 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* 음악 목록 */}
          <div className="space-y-3">
            {filteredMusic.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                {searchQuery ? "검색 결과가 없습니다." : "플레이리스트가 비어있습니다."}
              </div>
            ) : (
              filteredMusic.map((music, index) => (
                <div
                  key={music.id}
                  className="flex items-center space-x-4 p-3 bg-white border border-slate-200 rounded-lg hover:shadow-sm transition-shadow"
                >
                  <div className="text-slate-500 font-medium w-6 text-center">{index + 1}</div>

                  <img
                    src={music.thumbnail || "/placeholder.svg"}
                    alt={music.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{music.title}</h4>
                    <p className="text-sm text-slate-600 truncate">{music.artist}</p>
                  </div>

                  <div className="flex items-center space-x-1 text-sm text-slate-500">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>{music.likes}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline">
                      <Play className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveMusic(music.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
