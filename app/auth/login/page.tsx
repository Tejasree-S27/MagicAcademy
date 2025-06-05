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
import { Wand2, Sparkles, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(email, password)
      toast({
        title: "🎉 Welcome back, Wizard!",
        description: "You've successfully entered the Magic Academy!",
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "❌ Spell Failed",
        description: "Your magical credentials seem incorrect. Try again!",
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
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            <Sparkles className="w-4 h-4 text-yellow-300 opacity-40" />
          </div>
        ))}
      </div>

      <Card className="w-full max-w-md bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-xl border-purple-300/30 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center animate-magical-pulse">
              <Wand2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
            Enter the Academy
          </CardTitle>
          <CardDescription className="text-purple-200">
            Cast your login spell to access the magical realm of knowledge
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
                className="bg-purple-900/30 border-purple-300/30 text-white placeholder:text-purple-300 focus:border-pink-400 focus:ring-pink-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-purple-200 font-medium">
                Secret Spell
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your magical password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-purple-900/30 border-purple-300/30 text-white placeholder:text-purple-300 focus:border-pink-400 focus:ring-pink-400 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-pink-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Casting Spell...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 w-4 mr-2" />
                  Enter Academy
                </>
              )}
            </Button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-sm text-purple-200">
              New to magic?{" "}
              <Link href="/auth/signup" className="text-pink-300 hover:text-pink-200 underline font-medium">
                Join the Academy
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
