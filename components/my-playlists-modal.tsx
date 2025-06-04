"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FolderOpen, Plus, Music, Calendar, Lock, Unlock, Edit, Trash2 } from "lucide-react"
import type { Playlist } from "@/types/user"
import PlaylistDetailModal from "./playlist-detail-modal"

interface MyPlaylistsModalProps {
  isOpen: boolean
  onClose: () => void
}

// Mock data
const mockPlaylists: Playlist[] = [
  {
    id: "1",
    name: "운동할 때 듣는 음악",
    description: "헬스장에서 운동할 때 듣기 좋은 신나는 음악들",
    createdAt: "2024-01-15T10:30:00Z",
    musicCount: 25,
    isPublic: true,
  },
  {
    id: "2",
    name: "감성 발라드 모음",
    description: "비 오는 날이나 조용한 밤에 듣기 좋은 발라드",
    createdAt: "2024-01-10T15:20:00Z",
    musicCount: 18,
    isPublic: false,
  },
]

export default function MyPlaylistsModal({ isOpen, onClose }: MyPlaylistsModalProps) {
  const [playlists, setPlaylists] = useState<Playlist[]>(mockPlaylists)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null)
  const [newPlaylist, setNewPlaylist] = useState({
    name: "",
    description: "",
    isPublic: true,
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ko-KR")
  }

  const handleCreatePlaylist = () => {
    if (!newPlaylist.name.trim()) return

    const playlist: Playlist = {
      id: Date.now().toString(),
      name: newPlaylist.name,
      description: newPlaylist.description,
      createdAt: new Date().toISOString(),
      musicCount: 0,
      isPublic: newPlaylist.isPublic,
    }

    setPlaylists([playlist, ...playlists])
    setNewPlaylist({ name: "", description: "", isPublic: true })
    setShowCreateForm(false)
  }

  const handleDeletePlaylist = (playlistId: string) => {
    setPlaylists(playlists.filter((p) => p.id !== playlistId))
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center justify-between">
              <div className="flex items-center">
                <FolderOpen className="h-5 w-5 mr-2" />내 보관소
              </div>
              <Button
                size="sm"
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-1" />새 플레이리스트
              </Button>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* 플레이리스트 생성 폼 */}
            {showCreateForm && (
              <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                <Input
                  placeholder="플레이리스트 이름"
                  value={newPlaylist.name}
                  onChange={(e) => setNewPlaylist({ ...newPlaylist, name: e.target.value })}
                />
                <Textarea
                  placeholder="설명 (선택사항)"
                  value={newPlaylist.description}
                  onChange={(e) => setNewPlaylist({ ...newPlaylist, description: e.target.value })}
                  rows={2}
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={newPlaylist.isPublic}
                    onChange={(e) => setNewPlaylist({ ...newPlaylist, isPublic: e.target.checked })}
                    className="rounded"
                  />
                  <label htmlFor="isPublic" className="text-sm">
                    공개 플레이리스트
                  </label>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" onClick={handleCreatePlaylist}>
                    생성
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setShowCreateForm(false)}>
                    취소
                  </Button>
                </div>
              </div>
            )}

            {/* 플레이리스트 목록 */}
            {playlists.length === 0 ? (
              <div className="text-center py-8 text-slate-500">아직 생성한 플레이리스트가 없습니다.</div>
            ) : (
              playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedPlaylist(playlist)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-lg">{playlist.name}</h3>
                        {playlist.isPublic ? (
                          <Unlock className="h-4 w-4 text-green-600" />
                        ) : (
                          <Lock className="h-4 w-4 text-slate-500" />
                        )}
                      </div>

                      {playlist.description && (
                        <p className="text-slate-600 text-sm mt-1 line-clamp-2">{playlist.description}</p>
                      )}

                      <div className="flex items-center space-x-4 mt-2 text-sm text-slate-500">
                        <div className="flex items-center space-x-1">
                          <Music className="h-4 w-4" />
                          <span>{playlist.musicCount}곡</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(playlist.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation()
                          // 편집 기능
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeletePlaylist(playlist.id)
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      {selectedPlaylist && (
        <PlaylistDetailModal
          isOpen={!!selectedPlaylist}
          onClose={() => setSelectedPlaylist(null)}
          playlist={selectedPlaylist}
        />
      )}
    </>
  )
}
