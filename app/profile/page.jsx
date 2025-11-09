"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { authAPI } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "" })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name || "", email: user.email || "" })
    }
  }, [user])

  const handleUpdate = async () => {
    setLoading(true)
    try {
      await authAPI.updateProfile(formData)
      setIsEditing(false)
      alert("Profile updated successfully!")
    } catch (err) {
      alert("Error updating profile: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-8">
          <p className="mb-4">Please log in to view your profile</p>
          <Link href="/auth/login">
            <Button>Go to Login</Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-6">My Profile</h1>

          <div className="space-y-4 mb-6">
            {isEditing ? (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium">Name:</label>
                  <p className="text-lg">{user.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium">Email:</label>
                  <p className="text-lg">{user.email}</p>
                </div>
              </>
            )}
          </div>

          <div className="flex gap-4">
            {isEditing ? (
              <>
                <Button onClick={handleUpdate} disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    logout()
                    window.location.href = "/"
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
