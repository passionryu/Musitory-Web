"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { User, LogIn } from "lucide-react"
import LoginModal from "./login-modal"
import SignupModal from "./signup-modal"

export default function Header() {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)

  const handleLoginClick = () => {
    setShowLogin(true)
  }

  const handleSignupClick = () => {
    setShowLogin(false)
    setShowSignup(true)
  }

  const handleBackToLogin = () => {
    setShowSignup(false)
    setShowLogin(true)
  }

  return (
    <>
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-end items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-600 hover:text-slate-800 hover:bg-slate-100"
              onClick={handleLoginClick}
            >
              <LogIn className="h-4 w-4 mr-2" />
              로그인
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-slate-600 hover:text-slate-800 border-slate-300 hover:bg-slate-100"
            >
              <User className="h-4 w-4 mr-2" />
              마이페이지
            </Button>
          </div>
        </div>
      </header>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} onSignupClick={handleSignupClick} />

      <SignupModal isOpen={showSignup} onClose={() => setShowSignup(false)} onBackToLogin={handleBackToLogin} />
    </>
  )
}
