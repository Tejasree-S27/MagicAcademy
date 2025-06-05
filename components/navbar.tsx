"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Sparkles, User, LogOut, Wand2 } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <nav className="bg-gradient-to-r from-purple-900/95 to-indigo-900/95 backdrop-blur-md shadow-lg fixed w-full top-0 z-50 border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                <Wand2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                Magic Academy
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/courses"
              className="text-purple-200 hover:text-pink-300 transition-colors duration-200 font-medium"
            >
              Spell Books
            </Link>
            <Link
              href="/about"
              className="text-purple-200 hover:text-pink-300 transition-colors duration-200 font-medium"
            >
              About Magic
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="text-purple-200 hover:text-white hover:bg-purple-500/20">
                    <User className="h-4 w-4 mr-2" />
                    My Grimoire
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-purple-200 hover:text-white hover:bg-purple-500/20"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Leave Academy
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth/login">
                  <Button variant="ghost" className="text-purple-200 hover:text-white hover:bg-purple-500/20">
                    Enter Academy
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Join Magic
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-purple-200 hover:text-pink-300 transition-colors duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-r from-purple-800/95 to-indigo-800/95 backdrop-blur-md border-t border-purple-500/20 rounded-b-lg">
              <Link
                href="/courses"
                className="block px-3 py-2 text-purple-200 hover:text-pink-300 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Spell Books
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-purple-200 hover:text-pink-300 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                About Magic
              </Link>
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 text-purple-200 hover:text-pink-300 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    My Grimoire
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      setIsOpen(false)
                    }}
                    className="block w-full text-left px-3 py-2 text-purple-200 hover:text-pink-300 transition-colors duration-200"
                  >
                    Leave Academy
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="block px-3 py-2 text-purple-200 hover:text-pink-300 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Enter Academy
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="block px-3 py-2 text-purple-200 hover:text-pink-300 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Join Magic
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
