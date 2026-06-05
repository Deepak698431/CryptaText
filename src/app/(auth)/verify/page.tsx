"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"
import { sendVarificataionEmail } from "@/helpers/sendVerificationEmail"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function VerifyPage() {
  const router = useRouter()
  const [timer, setTimer] = useState(30);
  const [disabled, setDisabled] = useState(true);
  const searchParams = useSearchParams()

  useEffect(() => {
      if (timer > 0) {
        const interval = setInterval(() => {
          setTimer(timer - 1);
        }, 1000);

        return () => clearInterval(interval);
      } else {
        setDisabled(false);
      }
    }, [timer]);
    // We now get username from query param
    const username = searchParams.get("username")

    const handleResend = async() => {
    setTimer(30);
    setDisabled(true);

    // call API here
    try {
      const response = await fetch("/api/manageEmailSending", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError("Error in sending Email")
      } else {
        setSuccess("Email send successfully.")
      }

    } catch (err) {
      setError("Something went wrong")
    }

    setLoading(false)
    console.log("OTP resent");
  };


  const [verifyCode, setVerifyCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    if (!username) {
      setError("Username missing")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          verifyCode,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Invalid verification code")
      } else {
        setSuccess("Account verified successfully 🎉")

        setTimeout(() => {
          router.push("/signin")
        }, 1500)
      }

    } catch (err) {
      setError("Something went wrong")
    }

    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-indigo-900 via-black to-slate-900 px-4">

      <Card className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl">

        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white">
            Verify Account
          </CardTitle>
          <CardDescription className="text-gray-400">
            Enter the verification code sent to your email
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleVerify} className="space-y-5">

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
              <Label className="text-gray-300">Verification Code</Label>
              <Input
                type="text"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}
                placeholder="Enter 6-digit code"
                required
                className="bg-white/10 border-white/20 text-white text-center tracking-widest text-lg rounded-xl"
              />
            </div>
             
              <div className="flex flex-col items-center mt-4 gap-2">
                <button
                  onClick={handleResend}
                  disabled={disabled}
                  className={`px-4 py-2 rounded-md text-white ${
                    disabled ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  Resend OTP
                </button>

                {disabled && (
                  <p className="text-sm text-blue-700">
                    Resend available in {timer}s
                  </p>
                )}
              </div>
          

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 rounded-xl"
            >
              {loading ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                "Verify"
              )}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}
