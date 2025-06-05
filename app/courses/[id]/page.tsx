"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Users, Star, Play, BookOpen, Award } from "lucide-react"
import { InteractiveLesson } from "@/components/interactive-lesson"

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
  lessons: Lesson[]
}

interface Lesson {
  id: string
  title: string
  duration: string
  type: "video" | "3d" | "quiz"
  completed: boolean
}

export default function CoursePage() {
  const params = useParams()
  const [course, setCourse] = useState<Course | null>(null)
  const [enrolled, setEnrolled] = useState(false)
  const [currentLesson, setCurrentLesson] = useState<string | null>(null)

  useEffect(() => {
    // Mock data - replace with actual Firebase query
    setCourse({
      id: params.id as string,
      title: "3D Modeling Fundamentals",
      description:
        "Master the basics of 3D modeling with hands-on projects and interactive lessons. This comprehensive course covers everything from basic shapes to complex modeling techniques.",
      instructor: "Dr. Sarah Johnson",
      duration: "8 hours",
      students: 1250,
      rating: 4.8,
      level: "Beginner",
      price: 49,
      lessons: [
        { id: "1", title: "Introduction to 3D Space", duration: "15 min", type: "video", completed: true },
        { id: "2", title: "Basic Shapes and Primitives", duration: "20 min", type: "3d", completed: true },
        { id: "3", title: "Understanding Coordinates", duration: "10 min", type: "quiz", completed: false },
        { id: "4", title: "Modeling Your First Object", duration: "30 min", type: "3d", completed: false },
        { id: "5", title: "Textures and Materials", duration: "25 min", type: "video", completed: false },
        { id: "6", title: "Lighting Fundamentals", duration: "20 min", type: "3d", completed: false },
        { id: "7", title: "Final Project", duration: "45 min", type: "3d", completed: false },
      ],
    })
    setEnrolled(true) // Mock enrollment status
  }, [params.id])

  if (!course) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const completedLessons = course.lessons.filter((lesson) => lesson.completed).length
  const progress = (completedLessons / course.lessons.length) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {currentLesson ? (
        <InteractiveLesson lessonId={currentLesson} onClose={() => setCurrentLesson(null)} />
      ) : (
        <div className="max-w-7xl mx-auto p-6">
          {/* Course Header */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge
                    variant={
                      course.level === "Beginner"
                        ? "secondary"
                        : course.level === "Intermediate"
                          ? "default"
                          : "destructive"
                    }
                  >
                    {course.level}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    {course.rating} ({course.students.toLocaleString()} students)
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
                <p className="text-gray-600 mb-6">{course.description}</p>

                <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {course.students.toLocaleString()} students
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {course.lessons.length} lessons
                  </div>
                </div>

                <p className="text-gray-700">
                  <strong>Instructor:</strong> {course.instructor}
                </p>
              </div>

              <div className="lg:pl-8">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-2xl">${course.price}</CardTitle>
                      {enrolled && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <Award className="h-3 w-3 mr-1" />
                          Enrolled
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {enrolled ? (
                      <>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{Math.round(progress)}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                          <p className="text-sm text-gray-600">
                            {completedLessons} of {course.lessons.length} lessons completed
                          </p>
                        </div>
                        <Button
                          className="w-full"
                          onClick={() =>
                            setCurrentLesson(course.lessons.find((l) => !l.completed)?.id || course.lessons[0].id)
                          }
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Continue Learning
                        </Button>
                      </>
                    ) : (
                      <Button className="w-full" onClick={() => setEnrolled(true)}>
                        Enroll Now
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Course Content */}
          <Tabs defaultValue="lessons" className="space-y-6">
            <TabsList>
              <TabsTrigger value="lessons">Lessons</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="lessons">
              <Card>
                <CardHeader>
                  <CardTitle>Course Lessons</CardTitle>
                  <CardDescription>Interactive lessons with 3D content, videos, and quizzes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {course.lessons.map((lesson, index) => (
                      <div
                        key={lesson.id}
                        className={`flex items-center justify-between p-4 rounded-lg border ${
                          lesson.completed ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                              lesson.completed ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-medium">{lesson.title}</h3>
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="h-3 w-3 mr-1" />
                              {lesson.duration}
                              <Badge variant="outline" className="ml-2 text-xs">
                                {lesson.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        {enrolled && (
                          <Button
                            variant={lesson.completed ? "outline" : "default"}
                            size="sm"
                            onClick={() => setCurrentLesson(lesson.id)}
                          >
                            {lesson.completed ? "Review" : "Start"}
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>What You'll Learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Fundamentals of 3D modeling and design principles</li>
                    <li>• Working with basic shapes and primitive objects</li>
                    <li>• Understanding 3D coordinate systems and transformations</li>
                    <li>• Creating complex models from simple shapes</li>
                    <li>• Applying textures and materials to 3D objects</li>
                    <li>• Basic lighting techniques for 3D scenes</li>
                    <li>• Best practices for 3D modeling workflows</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Student Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                        <span className="ml-2 font-medium">John D.</span>
                      </div>
                      <p className="text-gray-700">
                        "Excellent course! The 3D interactive elements really helped me understand the concepts better
                        than traditional video tutorials."
                      </p>
                    </div>
                    <div className="border-b pb-4">
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                        <span className="ml-2 font-medium">Sarah M.</span>
                      </div>
                      <p className="text-gray-700">
                        "Dr. Johnson explains everything clearly and the hands-on approach makes learning fun and
                        engaging."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
