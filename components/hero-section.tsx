"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, BookOpen, Wand2 } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          >
            <Sparkles className="w-4 h-4 text-yellow-300 opacity-60" />
          </div>
        ))}
      </div>

      {/* Mouse follower effect */}
      <div
        className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-sm rounded-full px-6 py-3 border border-purple-300/30 mb-6">
            <Wand2 className="w-5 h-5 text-yellow-300" />
            <span className="text-purple-100 font-medium">Welcome to the Academy of Magic</span>
            <Sparkles className="w-5 h-5 text-yellow-300" />
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 mb-6 leading-tight">
          Learn Magic
        </h1>

        <p className="text-2xl md:text-3xl text-purple-100 mb-8 leading-relaxed">
          Master the ancient arts of{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400 font-semibold">
            knowledge
          </span>{" "}
          and{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400 font-semibold">
            wisdom
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <Link href="/auth/signup">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg"
            >
              <Sparkles className="w-6 h-6 mr-3" />
              Begin Your Quest
            </Button>
          </Link>
          <Link href="/courses">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-purple-300 text-purple-100 hover:bg-purple-500/20 backdrop-blur-sm px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105"
            >
              <BookOpen className="w-6 h-6 mr-3" />
              Explore Grimoire
            </Button>
          </Link>
        </div>

        {/* Floating achievement badges */}
        <div className="flex justify-center gap-4 flex-wrap">
          {["🏆 Master Wizard", "⭐ Spell Caster", "🔮 Knowledge Seeker"].map((badge, i) => (
            <div
              key={i}
              className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm rounded-full px-4 py-2 border border-yellow-300/30 text-yellow-100 text-sm animate-bounce"
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
