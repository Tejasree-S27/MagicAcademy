"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import {
  type User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"
import { auth } from "@/lib/firebase"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: (state: { loading: boolean }) => React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const login = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        throw new Error("Please provide both email and password")
      }
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
      const errorMessage = error.code ? getFirebaseErrorMessage(error.code) : error.message
      throw new Error(errorMessage)
    }
  }

  const signup = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        throw new Error("Please provide both email and password")
      }
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long")
      }
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
      const errorMessage = error.code ? getFirebaseErrorMessage(error.code) : error.message
      throw new Error(errorMessage)
    }
  }

  const getFirebaseErrorMessage = (code: string) => {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'This email is already registered'
      case 'auth/invalid-email':
        return 'Invalid email address'
      case 'auth/operation-not-allowed':
        return 'Email/password accounts are not enabled'
      case 'auth/weak-password':
        return 'Password is too weak'
      case 'auth/user-disabled':
        return 'This account has been disabled'
      case 'auth/user-not-found':
        return 'Email or password is incorrect'
      case 'auth/wrong-password':
        return 'Email or password is incorrect'
      default:
        return 'An error occurred during authentication'
    }
  }
  const logout = async () => {
    await signOut(auth)
    window.location.href = '/'
  }

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
  }

  return <AuthContext.Provider value={value}>{children({ loading })}</AuthContext.Provider>
}
