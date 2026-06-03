"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import Link from "next/link";


import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function SignInPage() {
  const router = useRouter()

  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await signIn("credentials", {
      identifier,
      password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError("Invalid credentials")
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-indigo-900 via-black to-slate-900 px-4">

      <Card className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl">

        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white">
            Sign In
          </CardTitle>
          <CardDescription className="text-gray-400">
            Welcome back to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">

            {error && (
              <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl p-2 text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-gray-300">Email or Username</Label>
              <Input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
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
              {loading ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                "Sign In"
              )}
            </Button>

          </form>
        </CardContent>
        <div className="mt-4 text-center">
  <p className="text-gray-400">
    Don’t have an account?{" "}
    <Link
      href="/signup"
      className="text-blue-400 hover:text-blue-300 hover:underline transition"
    >
      Register
    </Link>
  </p>
</div>

      </Card>
    </div>
  )
}
