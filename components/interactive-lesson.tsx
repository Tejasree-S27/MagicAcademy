"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
/* Removed 3D rendering imports to avoid dependency issues
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Box, Sphere, Cylinder } from "@react-three/drei"
*/

interface InteractiveLessonProps {
  lessonId: string
  onClose: () => void
}

export function InteractiveLesson({ lessonId, onClose }: InteractiveLessonProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedShape, setSelectedShape] = useState<"box" | "sphere" | "cylinder">("box")

  const steps = [
    {
      title: "Welcome to 3D Modeling",
      content: "In this lesson, you'll learn about basic 3D shapes and how to manipulate them in 3D space.",
      interactive: false,
    },
    {
      title: "Basic Shapes",
      content:
        "Let's start with the three fundamental 3D shapes. Click on each shape to select it and observe how it looks in 3D space.",
      interactive: true,
    },
    {
      title: "Shape Properties",
      content:
        "Each shape has unique properties. Notice how the cube has sharp edges, the sphere is perfectly round, and the cylinder combines both curved and flat surfaces.",
      interactive: true,
    },
    {
      title: "Congratulations!",
      content:
        "You've completed this lesson. You now understand the basics of 3D shapes and how to interact with them.",
      interactive: false,
    },
  ]

  const progress = ((currentStep + 1) / steps.length) * 100

  // Removed 3D shape rendering component due to missing dependencies
  const Shape3D = () => {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-5/6 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex-1">
            <h2 className="text-2xl font-bold">Interactive 3D Lesson</h2>
            <div className="mt-2">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-gray-600 mt-1">
                Step {currentStep + 1} of {steps.length}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 flex">
          {/* Left Panel - Instructions */}
          <div className="w-1/3 p-6 border-r">
            <Card>
              <CardHeader>
                <CardTitle>{steps[currentStep].title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{steps[currentStep].content}</p>

                {steps[currentStep].interactive && (
                  <div className="space-y-2">
                    <p className="font-medium text-sm">Select a shape:</p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={selectedShape === "box" ? "default" : "outline"}
                        onClick={() => setSelectedShape("box")}
                      >
                        Cube
                      </Button>
                      <Button
                        size="sm"
                        variant={selectedShape === "sphere" ? "default" : "outline"}
                        onClick={() => setSelectedShape("sphere")}
                      >
                        Sphere
                      </Button>
                      <Button
                        size="sm"
                        variant={selectedShape === "cylinder" ? "default" : "outline"}
                        onClick={() => setSelectedShape("cylinder")}
                      >
                        Cylinder
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - 3D Scene */}
          <div className="flex-1 p-6">
            <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden">
              {steps[currentStep].interactive ? (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  3D rendering is disabled due to missing dependencies.
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎓</div>
                    <h3 className="text-xl font-semibold text-gray-700">
                      {currentStep === 0 ? "Ready to Learn?" : "Well Done!"}
                    </h3>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${index <= currentStep ? "bg-blue-600" : "bg-gray-300"}`}
              />
            ))}
          </div>

          {currentStep < steps.length - 1 ? (
            <Button onClick={() => setCurrentStep(currentStep + 1)}>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={onClose} className="bg-green-600 hover:bg-green-700">
              Complete Lesson
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
