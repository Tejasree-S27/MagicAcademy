import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, BookOpen, Award, TrendingUp, Wand2 } from "lucide-react"
import Link from "next/link"
import { HeroSection } from "@/components/hero-section"
import { FloatingElements } from "@/components/floating-elements"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <FloatingElements />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">✨ Magical Learning Features ✨</h2>
            <p className="text-xl text-purple-200">Discover the enchanted world of knowledge</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 border-pink-300/30 backdrop-blur-sm hover:scale-105 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white">Spell Books</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-pink-100">
                  Interactive courses that feel like magical adventures
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 border-emerald-300/30 backdrop-blur-sm hover:scale-105 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center">
                  <Wand2 className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white">Master Wizards</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-emerald-100">
                  Learn from the most skilled instructors in the realm
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-300/30 backdrop-blur-sm hover:scale-105 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white">Magic Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-amber-100">
                  Earn mystical achievements and show off your powers
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-violet-500/20 to-purple-500/20 border-violet-300/30 backdrop-blur-sm hover:scale-105 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white">Power Level</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-violet-100">
                  Track your magical progress with enchanted analytics
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-12">Join the Magic Academy</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-400 mb-2">10,000+</div>
              <div className="text-purple-200">Apprentice Wizards</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-pink-400 mb-2">500+</div>
              <div className="text-purple-200">Magical Courses</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-emerald-400 mb-2">50+</div>
              <div className="text-purple-200">Master Instructors</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-sm rounded-3xl p-12 border border-purple-300/30">
            <h2 className="text-4xl font-bold text-white mb-6">🌟 Begin Your Magical Journey 🌟</h2>
            <p className="text-xl text-purple-100 mb-8">
              Transform into a master of knowledge with our enchanted learning platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Learning Magic
                </Button>
              </Link>
              <Link href="/courses">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-300 text-purple-100 hover:bg-purple-500/20"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Browse Spell Books
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
