"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Calendar, Phone, UserIcon, Shield } from "lucide-react"
import type { User } from "@/types/user"

interface UserDetailModalProps {
  isOpen: boolean
  onClose: () => void
  user: User
}

export default function UserDetailModal({ isOpen, onClose, user }: UserDetailModalProps) {
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">개인 정보 상세</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 프로필 이미지 */}
          <div className="flex justify-center">
            <img
              src={user.profileImage || "/placeholder.svg"}
              alt="프로필"
              className="w-24 h-24 rounded-full object-cover border-4 border-slate-200"
            />
          </div>

          {/* 개인 정보 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <UserIcon className="h-5 w-5 text-slate-500" />
              <div>
                <div className="text-sm text-slate-500">닉네임</div>
                <div className="font-medium">{user.nickname}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <UserIcon className="h-5 w-5 text-slate-500" />
              <div>
                <div className="text-sm text-slate-500">본명</div>
                <div className="font-medium">{user.realName}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-slate-500" />
              <div>
                <div className="text-sm text-slate-500">전화번호</div>
                <div className="font-medium">{user.phoneNumber}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-slate-500" />
              <div>
                <div className="text-sm text-slate-500">가입일</div>
                <div className="font-medium">{new Date(user.joinDate).toLocaleDateString("ko-KR")}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-slate-500" />
              <div>
                <div className="text-sm text-slate-500">활동 상태</div>
                <Badge className={`mt-1 ${getStatusColor(user.status)}`}>{getStatusText(user.status)}</Badge>
              </div>
            </div>

            <div>
              <div className="text-sm text-slate-500 mb-2">좋아하는 음악 장르</div>
              <div className="flex flex-wrap gap-2">
                {user.favoriteGenres.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
