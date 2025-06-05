"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { Wand2, Sparkles, Eye, EyeOff, Star } from "lucide-react"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        title: "🔮 Spell Mismatch",
        description: "Your magical passwords don't match. Try again!",
        variant: "destructive",
      })
      return
    }

    if (password.length < 6) {
      toast({
        title: "⚡ Weak Magic",
        description: "Your spell needs at least 6 characters to be powerful enough!",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      await signup(email, password)
      toast({
        title: "🌟 Welcome to the Academy!",
        description: "Your magical journey begins now!",
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "❌ Enrollment Failed",
        description: "Something went wrong with your magical registration. Try again!",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 px-4 relative overflow-hidden">
      {/* Floating magical elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            <Star className="w-3 h-3 text-yellow-300 opacity-50" />
          </div>
        ))}
      </div>

      <Card className="w-full max-w-md bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-xl border-purple-300/30 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center animate-magical-pulse">
              <Wand2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-blue-300">
            Join the Academy
          </CardTitle>
          <CardDescription className="text-purple-200">
            Begin your magical journey and unlock the secrets of knowledge
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-purple-200 font-medium">
                Wizard Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.magic@academy.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-purple-900/30 border-purple-300/30 text-white placeholder:text-purple-300 focus:border-emerald-400 focus:ring-emerald-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-purple-200 font-medium">
                Create Secret Spell
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a powerful spell (6+ characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-purple-900/30 border-purple-300/30 text-white placeholder:text-purple-300 focus:border-emerald-400 focus:ring-emerald-400 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-emerald-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-purple-200 font-medium">
                Confirm Your Spell
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repeat your magical password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-purple-900/30 border-purple-300/30 text-white placeholder:text-purple-300 focus:border-emerald-400 focus:ring-emerald-400 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-emerald-300"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Enrolling in Academy...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 w-4 mr-2" />
                  Begin Magical Journey
                </>
              )}
            </Button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-sm text-purple-200">
              Already a wizard?{" "}
              <Link href="/auth/login" className="text-emerald-300 hover:text-emerald-200 underline font-medium">
                Enter the Academy
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
