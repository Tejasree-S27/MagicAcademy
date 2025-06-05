"use client"

import { Construction } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

export function UnderConstruction() {
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
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
              <Construction className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
            Magical Construction in Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-purple-200 mb-4">
            Our wizard craftsmen are hard at work enchanting this section of the academy.
          </p>
          <p className="text-purple-200/80 text-sm">
            Please check back later for magical new features!
          </p>
        </CardContent>
      </Card>
    </div>
  )
}