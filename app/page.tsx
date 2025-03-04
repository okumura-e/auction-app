"use client"

import { redirect } from "next/navigation"
import AuctionList from "@/components/auctionList/index"
import { useState } from "react"

export default async function Home() {
  const [session, setSession] = useState(false)

  if (!session) {
    redirect("/login")
  }

  return (
    <main className="container mx-auto py-8">
      <AuctionList />
    </main>
  )
}

