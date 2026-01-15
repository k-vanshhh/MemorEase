"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { authAPI } from "../../../lib/api.js"
import { Button } from "../../../components/ui/button.jsx"
import { Input } from "../../../components/ui/input.jsx"
import Link from "next/link"
import { InteractiveCat } from "../../../components/auth/interactive-cat"
import { ModernLogo } from "../../../components/modern-logo"
import { Eye, EyeOff } from "lucide-react"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Interaction State
  const [isShy, setIsShy] = useState(false)
  const [isPeeking, setIsPeeking] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter()

  const handleSignup = async (e) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      const data = await authAPI.signup(name, email, password, confirmPassword)
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      window.location.href = "/"
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
    setIsPeeking(!showPassword)
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#e0f2fe]">
      {/* Pastel Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navbar / Top Bar */}
      <nav className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-white p-2 rounded-xl shadow-sm border border-black/5 group-hover:scale-105 transition-transform">
            <ModernLogo size={24} />
          </div>
          <span className="font-bold text-lg text-gray-800 tracking-tight">Memorease</span>
        </Link>

        <Link href="/">
          <Button variant="ghost" className="rounded-full hover:bg-white/50 text-slate-600">
            Back to Home
          </Button>
        </Link>
      </nav>

      {/* Main Card Container */}
      <div className="relative w-full max-w-md mx-4 mt-20">

        {/* The Peek-a-Boo Cat */}
        <InteractiveCat
          isShy={isShy}
          isTyping={loading ? false : (typeof document !== 'undefined' && (document.activeElement?.type === 'email' || document.activeElement?.type === 'text'))}
          isSuccess={loading}
          className="z-20"
        />

        {/* Signup Form Card */}
        <div className="relative bg-white/90 backdrop-blur-sm rounded-[32px] shadow-2xl p-8 md:p-10 border border-white/50 z-10 transition-all duration-500">
          <div className="flex flex-col items-center mb-6 text-center">
            <div className="mb-4 bg-orange-100 p-3 rounded-full">
              <ModernLogo size={32} className="text-orange-500" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Create Account</h1>
            <p className="text-slate-500 text-sm">Join the feline fun.</p>
          </div>

          {error && <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg mb-6 text-center">{error}</div>}

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 ml-1">Name</label>
              <Input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required disabled={loading}
                className="h-11 bg-slate-50 border-slate-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl transition-all"
                onFocus={() => setIsPeeking(true)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 ml-1">Email</label>
              <Input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="h-11 bg-slate-50 border-slate-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl transition-all"
                onFocus={() => setIsPeeking(true)}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 ml-1">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="h-11 bg-slate-50 border-slate-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl pr-10 transition-all font-sans"
                    onFocus={() => setIsShy(true)}
                    onBlur={() => setIsShy(false)}
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-500 transition-colors"
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 ml-1">Confirm Password</label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="h-11 bg-slate-50 border-slate-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl transition-all font-sans"
                  onFocus={() => setIsShy(true)}
                  onBlur={() => setIsShy(false)}
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-lg shadow-slate-900/20 font-medium text-base mt-2 transition-transform active:scale-[0.98]" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>

            <Button type="button" variant="outline" className="w-full h-11 bg-white hover:bg-slate-50 border-slate-200 text-slate-700 rounded-xl font-medium text-base flex items-center justify-center gap-2 transition-transform active:scale-[0.98]">
              {/* Google G Icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.2 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Sign up with Google
            </Button>

          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-orange-500 font-semibold hover:underline decoration-2 underline-offset-4">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}