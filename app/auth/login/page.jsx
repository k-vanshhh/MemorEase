"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../../lib/auth-context"
import { authAPI } from "../../../lib/api.js"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import Link from "next/link"
import { InteractiveMascots } from "../../../components/auth/interactive-mascots"
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
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#f0f2f5]">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
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
          <Button variant="ghost" className="rounded-full hover:bg-white/50">
            Back to Home
          </Button>
        </Link>
      </nav>

      <div className="w-full max-w-[1100px] h-[700px] bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10 transition-all duration-500">

        {/* LEFT PANEL: Illustration */}
        <div className="w-full md:w-1/2 bg-[#f2f4f8] relative flex flex-col items-center justify-center p-8 border-r border-gray-100">
          {/* Removed internal logo since we have global nav now, or keep purely decorative? */}
          {/* <div className="absolute top-8 left-8 text-foreground/80">
            <ModernLogo size={28} />
          </div> */}

          <div className="w-full max-w-[400px]">
            <InteractiveMascots isShy={isShy} isPeeking={isPeeking} hasError={!!error} />
          </div>
        </div>

        {/* RIGHT PANEL: Form */}
        <div className="w-full md:w-1/2 p-12 md:p-16 flex flex-col justify-center bg-white relative">
          <div className="flex flex-col items-center mb-10 text-center">
            {/* Top Icon/Logo centered? Image showed a specific star icon. 
                     We'll stick to text centered for now or use the ModernLogo again if needed. 
                     The design image shows a floating star logo above 'Welcome back' */}
            <div className="mb-6">
              <ModernLogo size={42} className="text-black" />
            </div>
            <h1 className="text-3xl font-bold text-black mb-2">Welcome back!</h1>
            <p className="text-gray-500">Please enter your details</p>
          </div>

          {error && <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg mb-6 text-center">{error}</div>}

          <form onSubmit={handleLogin} className="space-y-6 w-full max-w-[400px] mx-auto">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 bg-white border-gray-200 focus:border-black focus:ring-black/5 rounded-xl transition-all"
                onFocus={() => setIsShy(true)}
                onBlur={() => setIsShy(false)}
              />
            </div>

            <div className="space-y-1.5 ">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 bg-white border-gray-200 focus:border-black focus:ring-black/5 rounded-xl pr-10 transition-all font-sans"
                  onFocus={() => {
                    setIsShy(true)
                    if (showPassword) setIsPeeking(true)
                  }}
                  onBlur={() => {
                    setIsShy(false)
                    setIsPeeking(false)
                  }}
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black/20 accent-black" />
                <span className="text-gray-500">Remember for 30 days</span>
              </label>
              <a href="#" className="font-medium text-gray-400 hover:text-black transition-colors">Forgot password?</a>
            </div>

            <div className="space-y-3 pt-2">
              <Button type="submit" className="w-full h-11 bg-black hover:bg-black/90 text-white rounded-xl shadow-lg shadow-black/10 font-medium text-base transition-transform active:scale-[0.98]">
                {loading ? "Logging In..." : "Log In"}
              </Button>

              <Button type="button" variant="outline" className="w-full h-11 bg-[#f8f9fa] hover:bg-[#ebedf0] border-0 text-black rounded-xl font-medium text-base flex items-center justify-center gap-2 transition-transform active:scale-[0.98]">
                {/* Google G Icon */}
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.2 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Log in with Google
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Dont have an account? <Link href="/auth/signup" className="text-black font-semibold hover:underline">Sign Up</Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
