"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
  onBackToLogin: () => void
}

const musicGenres = [
  "팝(Pop)",
  "록(Rock)",
  "힙합(Hip-Hop)",
  "R&B",
  "재즈(Jazz)",
  "클래식(Classical)",
  "일렉트로닉(Electronic)",
  "컨트리(Country)",
  "인디(Indie)",
  "K-Pop",
  "발라드(Ballad)",
  "레게(Reggae)",
]

export default function SignupModal({ isOpen, onClose, onBackToLogin }: SignupModalProps) {
  const [formData, setFormData] = useState({
    nickname: "",
    realName: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    favoriteGenres: [] as string[],
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleGenreChange = (genre: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      favoriteGenres: checked ? [...prev.favoriteGenres, genre] : prev.favoriteGenres.filter((g) => g !== genre),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.")
      return
    }

    if (formData.favoriteGenres.length === 0) {
      alert("좋아하는 음악 장르를 최소 하나 선택해주세요.")
      return
    }

    // Handle signup logic here
    console.log("Signup attempt:", formData)
    // Close modal on successful signup
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white border-slate-200 max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-800 text-center">회원가입</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <div className="space-y-2">
            <Label htmlFor="nickname" className="text-slate-700">
              닉네임 *
            </Label>
            <Input
              id="nickname"
              type="text"
              value={formData.nickname}
              onChange={(e) => handleInputChange("nickname", e.target.value)}
              placeholder="닉네임을 입력하세요"
              className="bg-slate-50/50 border-slate-200 focus:border-slate-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="realName" className="text-slate-700">
              본명 *
            </Label>
            <Input
              id="realName"
              type="text"
              value={formData.realName}
              onChange={(e) => handleInputChange("realName", e.target.value)}
              placeholder="본명을 입력하세요"
              className="bg-slate-50/50 border-slate-200 focus:border-slate-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-700">
              비밀번호 *
            </Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="bg-slate-50/50 border-slate-200 focus:border-slate-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-slate-700">
              비밀번호 확인 *
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              placeholder="비밀번호를 다시 입력하세요"
              className="bg-slate-50/50 border-slate-200 focus:border-slate-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-slate-700">
              전화번호 *
            </Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              placeholder="010-1234-5678"
              className="bg-slate-50/50 border-slate-200 focus:border-slate-400"
              required
            />
          </div>

          <div className="space-y-3">
            <Label className="text-slate-700">좋아하는 음악 장르 * (복수 선택 가능)</Label>
            <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto p-2 bg-slate-50/30 rounded-lg">
              {musicGenres.map((genre) => (
                <div key={genre} className="flex items-center space-x-2">
                  <Checkbox
                    id={genre}
                    checked={formData.favoriteGenres.includes(genre)}
                    onCheckedChange={(checked) => handleGenreChange(genre, checked as boolean)}
                  />
                  <Label htmlFor={genre} className="text-sm text-slate-700 cursor-pointer">
                    {genre}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full bg-slate-700 hover:bg-slate-800 text-white">
            회원가입
          </Button>

          <div className="text-center pt-4">
            <p className="text-sm text-slate-600">
              이미 계정이 있으신가요?{" "}
              <button
                type="button"
                onClick={onBackToLogin}
                className="text-slate-700 hover:text-slate-900 font-medium underline"
              >
                로그인
              </button>
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
