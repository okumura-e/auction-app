"use client"

import { redirect } from "next/navigation"
import AuctionList from "@/components/auctionList/index"
import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth-context"

export default function Home() {
  const { user, isLoading } = useAuth()
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      setIsRedirecting(true)
      redirect("/login")
    }
  }, [user, isLoading])

  if (isLoading || isRedirecting) {
    return <div>Carregando...</div>
  }

  return (
    <main className="container mx-auto py-8">
      <AuctionList />
    </main>
  )
}