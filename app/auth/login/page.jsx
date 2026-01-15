"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../../lib/auth-context"
import { authAPI } from "../../../lib/api.js"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import Link from "next/link"
import { InteractiveCat } from "../../../components/auth/interactive-cat"
import { ModernLogo } from "../../../components/modern-logo"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Interaction State
  const [isShy, setIsShy] = useState(false)
  const [isPeeking, setIsPeeking] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter()
  const { user } = useAuth()

  if (user) {
    router.push("/")
    return null
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const data = await authAPI.login(email, password)
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
    // If we are focused on password, we are shy. If we peek, we are still shy (hands over eyes) but peeking.
    // The Input onFocus sets isShy=true.
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
          isTyping={loading ? false : (typeof document !== 'undefined' && document.activeElement?.type === 'email')}
          isSuccess={loading}
          className="z-20"
        />

        {/* Login Form Card */}
        <div className="relative bg-white/90 backdrop-blur-sm rounded-[32px] shadow-2xl p-8 md:p-12 border border-white/50 z-10 transition-all duration-500">
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="mb-4 bg-orange-100 p-3 rounded-full">
              <ModernLogo size={32} className="text-orange-500" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Welcome Back!</h1>
            <p className="text-slate-500 text-sm">Our furry friend missed you.</p>
          </div>

          {error && <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg mb-6 text-center animate-in fade-in slide-in-from-top-2">{error}</div>}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 ml-1">Email</label>
              <Input
                type="email"
                placeholder="meow@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-slate-50 border-slate-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl transition-all"
                onFocus={() => setIsPeeking(true)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 ml-1">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 bg-slate-50 border-slate-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl pr-10 transition-all font-sans"
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

            <div className="flex items-center justify-between text-xs text-slate-500">
              <label className="flex items-center space-x-2 cursor-pointer hover:text-slate-700">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500/20 accent-orange-500" />
                <span>Remember me</span>
              </label>
              <a href="#" className="font-medium hover:text-orange-500 transition-colors">Forgot password?</a>
            </div>

            <Button type="submit" className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-lg shadow-slate-900/20 font-medium text-base transition-all active:scale-[0.98] mt-2">
              {loading ? "Logging In..." : "Log In"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm">
              No account? <Link href="/auth/signup" className="text-orange-500 font-semibold hover:underline decoration-2 underline-offset-4">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
