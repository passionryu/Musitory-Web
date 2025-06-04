"use client"

import { useState } from "react"
import MusicCarousel from "./music-carousel"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import type { RecommendationPost } from "@/types/recommendation"
import { formatDistanceToNow } from "date-fns"

export default function RecommendationsForOthers() {
  const [selectedPost, setSelectedPost] = useState<RecommendationPost | null>(null)
  const [posts, setPosts] = useState<RecommendationPost[]>([
    {
      id: "1",
      content:
        "공부할 때 듣기 좋은 차분한 로파이 비트를 찾고 있어요. 집중에 도움이 되면서도 너무 산만하지 않은 음악이면 좋겠어요. 추천 부탁드려요!",
      author: "공부왕",
      timestamp: new Date("2024-05-28T10:30:00").toISOString(),
      recommendations: [
        {
          id: "r1",
          thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop",
          title: "Lofi Hip Hop Radio",
          artist: "ChilledCow",
          recommender: "음악선생",
        },
        {
          id: "r2",
          thumbnail: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=80&h=80&fit=crop",
          title: "Study Session",
          artist: "Kupla",
          recommender: "차분한음악",
        },
        {
          id: "r3",
          thumbnail: "https://images.unsplash.com/photo-1506197603053-17d58b2763bd?w=80&h=80&fit=crop",
          title: "Focused Mind",
          artist: "Ambition",
          recommender: "집중력향상",
        },
      ],
    },
    {
      id: "2",
      content:
        "아침 조깅할 때 들을 신나는 운동 음악이 필요해요. 강한 비트와 에너지 넘치는 분위기의 음악으로 추천해주세요!",
      author: "운동매니아",
      timestamp: new Date("2024-05-27T16:45:00").toISOString(),
      recommendations: [
        {
          id: "r4",
          thumbnail: "https://images.unsplash.com/photo-1573867336216-34932c99e6a5?w=80&h=80&fit=crop",
          title: "Power Workout",
          artist: "Motivation Mix",
          recommender: "헬스왕",
        },
        {
          id: "r5",
          thumbnail: "https://images.unsplash.com/photo-1586899028174-e7098630bb91?w=80&h=80&fit=crop",
          title: "Run This Town",
          artist: "Jay-Z ft. Rihanna",
          recommender: "음악마스터",
        },
      ],
    },
    {
      id: "3",
      content:
        "이번 주말에 호스팅할 저녁 파티를 위한 편안한 어쿠스틱 음악을 찾고 있어요. 너무 시끄럽지 않으면서 좋은 분위기를 만들어줄 음악이면 좋겠어요.",
      author: "파티호스트",
      timestamp: new Date("2024-05-27T14:20:00").toISOString(),
      recommendations: [
        {
          id: "r6",
          thumbnail: "https://images.unsplash.com/photo-1543791187-825578470492?w=80&h=80&fit=crop",
          title: "Dinner Party Acoustic",
          artist: "Various Artists",
          recommender: "분위기메이커",
        },
      ],
    },
    {
      id: "4",
      content: "70년대와 80년대 클래식 록 음악 중에서 숨겨진 명곡들이 있을까요? 놓친 좋은 곡들을 추천해주세요!",
      author: "록팬",
      timestamp: new Date("2024-05-26T19:15:00").toISOString(),
      recommendations: [
        {
          id: "r7",
          thumbnail: "https://images.unsplash.com/photo-1614680376585-51d1171b8803?w=80&h=80&fit=crop",
          title: "Radar Love",
          artist: "Golden Earring",
          recommender: "클래식로커",
        },
        {
          id: "r8",
          thumbnail: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop",
          title: "Barracuda",
          artist: "Heart",
          recommender: "바이닐수집가",
        },
        {
          id: "r9",
          thumbnail: "https://images.unsplash.com/photo-1585242757849-495c47a4e6a2?w=80&h=80&fit=crop",
          title: "Sultans of Swing",
          artist: "Dire Straits",
          recommender: "기타히어로",
        },
      ],
    },
    {
      id: "5",
      content:
        "새로운 인디 포크 음악을 발견하고 싶어요. Bon Iver나 Fleet Foxes 같은 아티스트를 좋아하는데, 비슷한 추천 있나요?",
      author: "인디소울",
      timestamp: new Date("2024-05-26T12:30:00").toISOString(),
      recommendations: [
        {
          id: "r10",
          thumbnail: "https://images.unsplash.com/photo-1576673448316-409c9eb48703?w=80&h=80&fit=crop",
          title: "Holocene",
          artist: "Bon Iver",
          recommender: "포크팬",
        },
        {
          id: "r11",
          thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=80&h=80&fit=crop",
          title: "White Winter Hymnal",
          artist: "Fleet Foxes",
          recommender: "인디러버",
        },
      ],
    },
    {
      id: "6",
      content: "감성적인 K-pop 발라드를 찾고 있어요. IU나 태연 같은 스타일의 잔잔하고 감동적인 곡들을 추천해주세요.",
      author: "발라드러버",
      timestamp: new Date("2024-05-25T20:30:00").toISOString(),
      recommendations: [
        {
          id: "r12",
          thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop",
          title: "Through the Night",
          artist: "IU",
          recommender: "아이유팬",
        },
      ],
    },
    {
      id: "7",
      content:
        "새벽에 혼자 듣기 좋은 차분한 재즈 음악을 추천해주세요. 너무 복잡하지 않고 평온한 느낌의 곡이면 좋겠어요.",
      author: "재즈애호가",
      timestamp: new Date("2024-05-25T15:15:00").toISOString(),
      recommendations: [
        {
          id: "r13",
          thumbnail: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=80&h=80&fit=crop",
          title: "Autumn Leaves",
          artist: "Bill Evans",
          recommender: "재즈마니아",
        },
      ],
    },
  ])

  return (
    <>
      <MusicCarousel
        items={posts}
        visibleItems={6}
        renderItem={(post) => (
          <div
            className="flex flex-col p-3 md:p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-md border border-slate-200 w-48 md:w-52 h-44 md:h-48 transition-all hover:shadow-lg hover:bg-white/80 cursor-pointer"
            onClick={() => setSelectedPost(post)}
          >
            <h3 className="font-medium text-xs md:text-sm mb-2 line-clamp-1 text-slate-800">{post.content}</h3>
            <p className="text-xs text-slate-600 mb-1">by {post.author}</p>
            <p className="text-xs text-slate-400 mb-3">
              {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
            </p>
            <div className="text-xs text-slate-600 line-clamp-3 flex-grow">{post.content}</div>
            <p className="text-xs text-slate-500 mt-2">
              {post.recommendations.length} recommendation{post.recommendations.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}
      />

      <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent className="bg-white border-slate-200 max-w-3xl mx-4">
          {selectedPost && (
            <div className="p-4">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-slate-800">{selectedPost.author}'s Request</h3>
                <p className="text-sm text-slate-500 mb-2">
                  {formatDistanceToNow(new Date(selectedPost.timestamp), { addSuffix: true })}
                </p>
                <p className="text-slate-700">{selectedPost.content}</p>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-3 text-slate-700">Recommendations</h4>
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {selectedPost.recommendations.map((rec) => (
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
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
