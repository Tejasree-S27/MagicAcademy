"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"
import { BookOpen, Clock, Award, TrendingUp, Play, Sparkles, Star, Zap, Crown } from "lucide-react"
import Link from "next/link"

interface Course {
  id: string
  title: string
  description: string
  progress: number
  duration: string
  level: string
  thumbnail: string
  category: string
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earned: boolean
  date?: string
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [userLevel, setUserLevel] = useState(1)
  const [experiencePoints, setExperiencePoints] = useState(250)

  useEffect(() => {
    // Mock data - replace with actual Firebase query
    setEnrolledCourses([
      {
        id: "1",
        title: "Potion Making Fundamentals",
        description: "Learn the ancient art of magical potion brewing",
        progress: 75,
        duration: "8 hours",
        level: "Beginner",
        thumbnail: "/placeholder.svg?height=200&width=300",
        category: "Alchemy",
      },
      {
        id: "2",
        title: "Advanced Spell Casting",
        description: "Master complex magical incantations and rituals",
        progress: 45,
        duration: "12 hours",
        level: "Advanced",
        thumbnail: "/placeholder.svg?height=200&width=300",
        category: "Magic",
      },
      {
        id: "3",
        title: "Mystical Creatures Study",
        description: "Understanding magical beings and their behaviors",
        progress: 90,
        duration: "6 hours",
        level: "Intermediate",
        thumbnail: "/placeholder.svg?height=200&width=300",
        category: "Creatures",
      },
    ])

    setAchievements([
      {
        id: "1",
        title: "First Steps",
        description: "Complete your first magical lesson",
        icon: "🌟",
        earned: true,
        date: "2 days ago",
      },
      {
        id: "2",
        title: "Potion Master",
        description: "Brew 10 successful potions",
        icon: "🧪",
        earned: true,
        date: "1 week ago",
      },
      {
        id: "3",
        title: "Spell Weaver",
        description: "Cast 50 different spells",
        icon: "⚡",
        earned: false,
      },
      {
        id: "4",
        title: "Knowledge Seeker",
        description: "Complete 5 courses",
        icon: "📚",
        earned: false,
      },
    ])
  }, [])

  const stats = {
    totalCourses: enrolledCourses.length,
    completedCourses: enrolledCourses.filter((course) => course.progress === 100).length,
    totalHours: enrolledCourses.reduce((acc, course) => acc + Number.parseInt(course.duration), 0),
    averageProgress: Math.round(
      enrolledCourses.reduce((acc, course) => acc + course.progress, 0) / enrolledCourses.length,
    ),
  }

  const nextLevelXP = userLevel * 500
  const currentLevelProgress = (experiencePoints % 500) / 5

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Welcome back, {user?.email?.split("@")[0]}!
              </h1>
              <p className="text-purple-200">Continue your magical studies</p>
            </div>
          </div>

          {/* Level Progress */}
          <Card className="bg-gradient-to-r from-purple-800/40 to-blue-800/40 backdrop-blur-sm border-purple-300/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  <span className="text-xl font-bold text-white">Level {userLevel} Wizard</span>
                </div>
                <div className="text-purple-200">
                  {experiencePoints} / {nextLevelXP} XP
                </div>
              </div>
              <Progress value={currentLevelProgress} className="h-3 bg-purple-900/50" />
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 border-pink-300/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-pink-100">Spell Books</CardTitle>
              <BookOpen className="h-4 w-4 text-pink-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalCourses}</div>
              <p className="text-xs text-pink-200">Currently studying</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 border-emerald-300/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-emerald-100">Mastered</CardTitle>
              <Award className="h-4 w-4 text-emerald-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.completedCourses}</div>
              <p className="text-xs text-emerald-200">Courses completed</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-300/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-amber-100">Study Time</CardTitle>
              <Clock className="h-4 w-4 text-amber-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalHours}h</div>
              <p className="text-xs text-amber-200">Total learning</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-violet-500/20 to-purple-500/20 border-violet-300/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-violet-100">Magic Power</CardTitle>
              <TrendingUp className="h-4 w-4 text-violet-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.averageProgress}%</div>
              <p className="text-xs text-violet-200">Average progress</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Enrolled Courses */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">📚 My Spell Books</h2>
              <Link href="/courses">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Discover More
                </Button>
              </Link>
            </div>

            <div className="space-y-6">
              {enrolledCourses.map((course) => (
                <Card
                  key={course.id}
                  className="bg-gradient-to-r from-purple-800/40 to-blue-800/40 backdrop-blur-sm border-purple-300/30 hover:scale-105 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white">{course.title}</h3>
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
                          <Badge variant="outline" className="border-purple-400 text-purple-300">
                            {course.category}
                          </Badge>
                        </div>
                        <p className="text-purple-200 mb-4">{course.description}</p>

                        <div className="flex items-center text-sm text-purple-300 mb-4">
                          <Clock className="h-4 w-4 mr-1" />
                          {course.duration}
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-purple-200">Progress</span>
                            <span className="text-white font-medium">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      </div>
                    </div>

                    <Link href={`/courses/${course.id}`}>
                      <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                        <Play className="h-4 w-4 mr-2" />
                        Continue Learning
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Achievements Sidebar */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">🏆 Magical Achievements</h2>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`${
                    achievement.earned
                      ? "bg-gradient-to-r from-yellow-600/40 to-orange-600/40 border-yellow-300/30"
                      : "bg-gradient-to-r from-gray-600/40 to-gray-700/40 border-gray-400/30"
                  } backdrop-blur-sm transition-all duration-300 hover:scale-105`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h3 className={`font-bold ${achievement.earned ? "text-yellow-200" : "text-gray-300"}`}>
                          {achievement.title}
                        </h3>
                        <p className={`text-sm ${achievement.earned ? "text-yellow-300" : "text-gray-400"}`}>
                          {achievement.description}
                        </p>
                        {achievement.earned && achievement.date && (
                          <p className="text-xs text-yellow-400 mt-1">Earned {achievement.date}</p>
                        )}
                      </div>
                      {achievement.earned && <Star className="w-5 h-5 text-yellow-400" />}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
