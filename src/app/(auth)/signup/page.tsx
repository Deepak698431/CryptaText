"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function SignUpPage() {
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Something went wrong")
      } else {
        setSuccess("Account created successfully 🎉")
        setTimeout(() => {
          router.push(`/verify?username=${username}`)
        }, 1500)
      }

    } catch (err) {
      setError("Server error. Try again.")
    }

    setLoading(false)
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-black to-slate-900 px-4">

      <Card className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl">

        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl text-white font-bold">
            Create Account
          </CardTitle>
          <CardDescription className="text-gray-400">
            Start your journey with us
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">

            {error && (
              <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl p-2 text-center">
                {error}
              </div>
            )}

            {success && (
              <div className="text-sm text-green-400 bg-green-500/10 border border-green-500/30 rounded-xl p-2 text-center">
                {success}
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-gray-300">Username</Label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white rounded-xl"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 rounded-xl"
            >
              {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Sign Up"}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}
