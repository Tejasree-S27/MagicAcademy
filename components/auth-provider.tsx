"use client"

import type React from "react"
import { AuthProvider as AuthProviderHook } from "@/hooks/use-auth"
import { Skeleton } from "@/components/ui/skeleton"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProviderHook>
      {(state) => (
        state.loading ? <Skeleton className="h-full w-full" /> : children
      )}
    </AuthProviderHook>
  )
}
