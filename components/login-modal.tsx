"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSignupClick: () => void
}

export default function LoginModal({ isOpen, onClose, onSignupClick }: LoginModalProps) {
  const [nickname, setNickname] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempt:", { nickname, password })
    // Close modal on successful login
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white border-slate-200 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-800 text-center">로그인</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <div className="space-y-2">
            <Label htmlFor="nickname" className="text-slate-700">
              닉네임
            </Label>
            <Input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력하세요"
              className="bg-slate-50/50 border-slate-200 focus:border-slate-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-700">
              비밀번호
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="bg-slate-50/50 border-slate-200 focus:border-slate-400"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-slate-700 hover:bg-slate-800 text-white">
            로그인
          </Button>

          <div className="text-center pt-4">
            <p className="text-sm text-slate-600">
              계정이 없으신가요?{" "}
              <button
                type="button"
                onClick={onSignupClick}
                className="text-slate-700 hover:text-slate-900 font-medium underline"
              >
                회원가입
              </button>
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
