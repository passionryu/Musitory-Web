"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, Music, MessageSquare, Bookmark, FolderOpen } from "lucide-react"
import type { User as UserType } from "@/types/user"
import UserDetailModal from "./user-detail-modal"
import MyMusitoryModal from "./my-musitory-modal"
import MyRecommendationsModal from "./my-recommendations-modal"
import MyScrapsModal from "./my-scraps-modal"
import MyPlaylistsModal from "./my-playlists-modal"

interface MyPageModalProps {
  isOpen: boolean
  onClose: () => void
}

// Mock user data
const mockUser: UserType = {
  id: "user1",
  nickname: "MusicLover22",
  realName: "김음악",
  phoneNumber: "010-1234-5678",
  profileImage: "/placeholder.svg?height=80&width=80",
  favoriteGenres: ["K-Pop", "R&B", "Jazz"],
  joinDate: "2023-01-15",
  status: "normal",
}

export default function MyPageModal({ isOpen, onClose }: MyPageModalProps) {
  const [showUserDetail, setShowUserDetail] = useState(false)
  const [showMyMusitory, setShowMyMusitory] = useState(false)
  const [showMyRecommendations, setShowMyRecommendations] = useState(false)
  const [showMyScraps, setShowMyScraps] = useState(false)
  const [showMyPlaylists, setShowMyPlaylists] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "normal":
        return "정상"
      case "warning":
        return "경고"
      case "suspended":
        return "정지"
      default:
        return "알 수 없음"
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">마이페이지</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* 개인 정보 간단 조회 */}
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <img
                  src={mockUser.profileImage || "/placeholder.svg"}
                  alt="프로필"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{mockUser.nickname}</h3>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {mockUser.favoriteGenres.map((genre) => (
                      <Badge key={genre} variant="secondary" className="text-xs">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                  <Badge className={`mt-2 text-xs ${getStatusColor(mockUser.status)}`}>
                    {getStatusText(mockUser.status)}
                  </Badge>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowUserDetail(true)} className="shrink-0">
                  <Settings className="h-4 w-4 mr-1" />
                  상세
                </Button>
              </div>
            </div>

            {/* 메뉴 버튼들 */}
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant="outline"
                className="justify-start h-12 text-left"
                onClick={() => setShowMyMusitory(true)}
              >
                <Music className="h-5 w-5 mr-3" />
                <div>
                  <div className="font-medium">내가 올린 Musitory</div>
                  <div className="text-xs text-gray-500">내가 공유한 음악들</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="justify-start h-12 text-left"
                onClick={() => setShowMyRecommendations(true)}
              >
                <MessageSquare className="h-5 w-5 mr-3" />
                <div>
                  <div className="font-medium">내가 올린 추천 게시글</div>
                  <div className="text-xs text-gray-500">내가 작성한 추천 요청들</div>
                </div>
              </Button>

              <Button variant="outline" className="justify-start h-12 text-left" onClick={() => setShowMyScraps(true)}>
                <Bookmark className="h-5 w-5 mr-3" />
                <div>
                  <div className="font-medium">내가 스크랩한 Musitory</div>
                  <div className="text-xs text-gray-500">저장한 음악들</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="justify-start h-12 text-left"
                onClick={() => setShowMyPlaylists(true)}
              >
                <FolderOpen className="h-5 w-5 mr-3" />
                <div>
                  <div className="font-medium">내 보관소</div>
                  <div className="text-xs text-gray-500">나만의 플레이리스트</div>
                </div>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 하위 모달들 */}
      <UserDetailModal isOpen={showUserDetail} onClose={() => setShowUserDetail(false)} user={mockUser} />

      <MyMusitoryModal isOpen={showMyMusitory} onClose={() => setShowMyMusitory(false)} />

      <MyRecommendationsModal isOpen={showMyRecommendations} onClose={() => setShowMyRecommendations(false)} />

      <MyScrapsModal isOpen={showMyScraps} onClose={() => setShowMyScraps(false)} />

      <MyPlaylistsModal isOpen={showMyPlaylists} onClose={() => setShowMyPlaylists(false)} />
    </>
  )
}
