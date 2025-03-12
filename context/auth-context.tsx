"use client"

import type React from "react"

import { createContext, useState, useEffect, useContext } from "react"
import type { User } from "@/types/index"
import { redirect } from "next/navigation"

interface AuthContextType {
  user: User | null
  login: (cpf: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const storedToken = localStorage.getItem("token")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }else {
      redirect("/login")
    }

    setIsLoading(false)
  }, [])

  const login = async (cpf: string, password: string) => {
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (cpf === "123.456.789-00" && password === "password") {
        const user = {
          id: "1",
          name: "Admin User",
          cpf: "123.456.789-00",
          role: "admin" as "admin" | "user",
        }

        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("token", "fake-jwt-token")

        setUser(user)
        return
      }

      if (cpf === "987.654.321-00" && password === "password") {
        const user = {
          id: "2",
          name: "Regular User",
          cpf: "987.654.321-00",
          role: "user" as "user",
        }

        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("token", "fake-jwt-token")

        setUser(user)
        return
      }

      throw new Error("Invalid credentials")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

