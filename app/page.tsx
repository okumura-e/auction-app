"use client"

import { redirect } from "next/navigation"
import AuctionList from "@/components/auctionList/index"
import { useContext, useState } from "react"
import { useAuth } from "@/context/auth-context"

export default async function Home() {
  const { user } = useAuth()

  if (!user) {
    redirect("/login")
  }

  return (
    <main className="container mx-auto py-8">
      <AuctionList />
    </main>
  )
}

