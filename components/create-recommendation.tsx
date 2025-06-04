"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import type { MusicRecommendation } from "@/types/recommendation"

export default function CreateRecommendation() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isEditing, setIsEditing] = useState(false)
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
    {
      id: "r3",
      thumbnail: "https://images.unsplash.com/photo-1506197603053-17d58b2763bd?w=80&h=80&fit=crop",
      title: "Viva La Vida",
      artist: "Coldplay",
      recommender: "ClassicRocker",
    },
  ])

  const handleSubmit = () => {
    console.log("Submitted:", { title, content })
    setIsEditing(false)
    // In a real app, you would send this to your backend
  }

  const handleDelete = () => {
    setTitle("")
    setContent("")
    setIsEditing(false)
    // In a real app, you would delete from your backend
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left side - Content creation */}
      <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-md border border-slate-200 p-6 h-[500px] flex flex-col">
        <h3 className="text-lg font-medium mb-4 text-slate-700">Share Your Music Request</h3>

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
          className="flex-grow bg-slate-50/50 border-slate-200 text-slate-800 resize-none mb-4 focus:border-slate-400"
        />

        <div className="flex gap-3">
          {isEditing ? (
            <>
              <Button onClick={handleSubmit} className="bg-slate-700 hover:bg-slate-800 text-white">
                Save
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </Button>
            </>
          ) : title || content ? (
            <>
              <Button onClick={() => setIsEditing(true)} className="bg-slate-700 hover:bg-slate-800 text-white">
                Edit
              </Button>
              <Button onClick={handleDelete} variant="destructive" className="bg-red-500 hover:bg-red-600">
                Delete
              </Button>
            </>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-slate-700 hover:bg-slate-800 text-white"
              disabled={!title.trim() && !content.trim()}
            >
              Post
            </Button>
          )}
        </div>
      </div>

      {/* Right side - Recommendations */}
      <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-md border border-slate-200 p-6 h-[500px] flex flex-col">
        <h3 className="text-lg font-medium mb-4 text-slate-700">Your Recommendations</h3>
        <div className="flex-grow overflow-y-auto space-y-4 pr-2">
          {recommendations.length > 0 ? (
            recommendations.map((rec) => (
              <div key={rec.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
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
              No recommendations yet. Post your request to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
