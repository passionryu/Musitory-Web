"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Eye } from "lucide-react"
import Link from "next/link"
import MusicCarousel from "./music-carousel"
import CreatePostModal from "./create-post-modal"
import type { Music } from "@/types/music"

// Mock data
const mockRecentMusic: Music[] = [
  {
    id: "1",
    title: "Flowers",
    artist: "Miley Cyrus",
    genre: "Pop",
    thumbnail: "/placeholder.svg?height=200&width=200",
    likes: 892,
    uploader: "MileyFan",
    timestamp: "2024-01-15T14:20:00Z",
    comment: "마일리 사이러스의 새로운 시작을 보여주는 곡이에요.",
  },
  {
    id: "2",
    title: "Kill Bill",
    artist: "SZA",
    genre: "R&B",
    thumbnail: "/placeholder.svg?height=200&width=200",
    likes: 756,
    uploader: "SZALover",
    timestamp: "2024-01-15T12:10:00Z",
    comment: "SZA의 감성적인 보컬이 돋보이는 곡이에요.",
  },
  {
    id: "3",
    title: "Unholy",
    artist: "Sam Smith ft. Kim Petras",
    genre: "Pop",
    thumbnail: "/placeholder.svg?height=200&width=200",
    likes: 634,
    uploader: "SamFan",
    timestamp: "2024-01-15T10:30:00Z",
    comment: "샘 스미스와 킴 페트라스의 콜라보가 환상적이에요.",
  },
  {
    id: "4",
    title: "Calm Down",
    artist: "Rema",
    genre: "Afrobeats",
    thumbnail: "/placeholder.svg?height=200&width=200",
    likes: 567,
    uploader: "AfrobeatsFan",
    timestamp: "2024-01-15T08:45:00Z",
    comment: "아프로비츠의 매력을 느낄 수 있는 곡입니다.",
  },
  {
    id: "5",
    title: "Shivers",
    artist: "Ed Sheeran",
    genre: "Pop",
    thumbnail: "/placeholder.svg?height=200&width=200",
    likes: 445,
    uploader: "EdFan",
    timestamp: "2024-01-15T06:15:00Z",
    comment: "에드 시런의 달콤한 러브송이에요.",
  },
]

export default function RecentMusic() {
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
          <Link href="/all-music">
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

        {/* Music Carousel */}
        <MusicCarousel music={mockRecentMusic} />
      </div>

      <CreatePostModal isOpen={showCreatePost} onClose={() => setShowCreatePost(false)} type="music" />
    </>
  )
}
