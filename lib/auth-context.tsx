"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { setAuthToken } from "./api"

interface AuthContextType {
  user: any
  loading: boolean
  isAuthenticated: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token")
      const storedUser = localStorage.getItem("user")

      if (token && storedUser) {
        setAuthToken(token)
        setUser(JSON.parse(storedUser))
      }

      setLoading(false)
    }

    initAuth()
  }, [])

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    setAuthToken("")
  }

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, logout }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
