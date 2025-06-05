"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Clock, Users, Star, BookOpen } from "lucide-react"
import Link from "next/link"

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  students: number
  rating: number
  level: string
  price: number
  category: string
  thumbnail: string
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("All")
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    // Mock data - replace with actual Firebase query
    setCourses([
      {
        id: "1",
        title: "Potion Making Fundamentals",
        description: "Master the ancient art of magical potion brewing with hands-on experiments",
        instructor: "Master Alchemist Merlin",
        duration: "8 hours",
        students: 1250,
        rating: 4.9,
        level: "Beginner",
        price: 49,
        category: "Alchemy",
        thumbnail: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "2",
        title: "Advanced Spell Casting",
        description: "Explore complex magical incantations and master powerful enchantments",
        instructor: "Archmage Gandalf the Wise",
        duration: "12 hours",
        students: 890,
        rating: 4.8,
        level: "Advanced",
        price: 79,
        category: "Magic",
        thumbnail: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "3",
        title: "Mystical Creatures Study",
        description: "Learn about magical beings through interactive encounters and observations",
        instructor: "Beast Master Luna",
        duration: "6 hours",
        students: 2100,
        rating: 4.7,
        level: "Intermediate",
        price: 59,
        category: "Creatures",
        thumbnail: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "4",
        title: "Enchanted Artifacts Creation",
        description: "Craft powerful magical items and learn the secrets of enchantment",
        instructor: "Artificer Blacksmith Thor",
        duration: "15 hours",
        students: 650,
        rating: 4.6,
        level: "Advanced",
        price: 99,
        category: "Crafting",
        thumbnail: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "5",
        title: "Elemental Magic Mastery",
        description: "Harness the power of fire, water, earth, and air in magical combat",
        instructor: "Elementalist Sage Aang",
        duration: "10 hours",
        students: 1800,
        rating: 4.8,
        level: "Beginner",
        price: 39,
        category: "Magic",
        thumbnail: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "6",
        title: "Divination and Fortune Telling",
        description: "Peer into the future using crystal balls, tarot cards, and ancient runes",
        instructor: "Oracle Mystic Sybill",
        duration: "14 hours",
        students: 750,
        rating: 4.5,
        level: "Intermediate",
        price: 89,
        category: "Divination",
        thumbnail: "/placeholder.svg?height=200&width=300",
      },
    ])
  }, [])

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = selectedLevel === "All" || course.level === selectedLevel
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory
    return matchesSearch && matchesLevel && matchesCategory
  })

  const levels = ["All", "Beginner", "Intermediate", "Advanced"]
  const categories = ["All", "Alchemy", "Magic", "Creatures", "Crafting", "Divination"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-4">
            📚 Magical Spell Books
          </h1>
          <p className="text-xl text-purple-200">Discover enchanted courses to expand your magical knowledge</p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 h-5 w-5" />
            <Input
              placeholder="Search for magical knowledge..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-purple-900/30 border-purple-300/30 text-white placeholder:text-purple-300 focus:border-pink-400 focus:ring-pink-400"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex gap-2">
              <span className="text-purple-200 font-medium self-center">Level:</span>
              {levels.map((level) => (
                <Button
                  key={level}
                  variant={selectedLevel === level ? "default" : "outline"}
                  onClick={() => setSelectedLevel(level)}
                  size="sm"
                  className={
                    selectedLevel === level
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0"
                      : "border-purple-300 text-purple-200 hover:bg-purple-500/20"
                  }
                >
                  {level}
                </Button>
              ))}
            </div>

            <div className="flex gap-2">
              <span className="text-purple-200 font-medium self-center">Category:</span>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  size="sm"
                  className={
                    selectedCategory === category
                      ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white border-0"
                      : "border-purple-300 text-purple-200 hover:bg-purple-500/20"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              className="bg-gradient-to-br from-purple-800/40 to-blue-800/40 backdrop-blur-sm border-purple-300/30 hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-500 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl">
                    {course.category === "Alchemy" && "🧪"}
                    {course.category === "Magic" && "⚡"}
                    {course.category === "Creatures" && "🐉"}
                    {course.category === "Crafting" && "🔨"}
                    {course.category === "Divination" && "🔮"}
                  </div>
                </div>
              </div>

              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg text-white">{course.title}</CardTitle>
                  <Badge
                    variant="outline"
                    className={`${
                      course.level === "Beginner"
                        ? "border-green-400 text-green-300"
                        : course.level === "Intermediate"
                          ? "border-yellow-400 text-yellow-300"
                          : "border-red-400 text-red-300"
                    }`}
                  >
                    {course.level}
                  </Badge>
                </div>
                <CardDescription className="text-purple-200">{course.description}</CardDescription>
                <p className="text-sm text-purple-300">by {course.instructor}</p>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-purple-300">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium text-white">{course.rating}</span>
                    </div>
                    <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                      {course.price} Gold
                    </div>
                  </div>

                  <Link href={`/courses/${course.id}`}>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Study This Magic
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-purple-300 text-lg">No magical courses found matching your criteria.</p>
            <p className="text-purple-400 text-sm mt-2">
              Try adjusting your search or filters to discover more spells!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
