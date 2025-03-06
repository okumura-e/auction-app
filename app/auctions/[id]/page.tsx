"use client"

import { redirect } from "next/navigation"
import AuctionDetail from "@/components/auctionDetail"
import { useAuth } from "@/context/auth-context"
import React from "react"

export default async function AuctionPage({ params }: { params: Promise<{ id: string }> }) {
  const { user } = useAuth()
  const { id: auctionId } = await params

  if (!user) {
    return redirect("/login")
  }

  return (
    <div className="container mx-auto py-8">
      <AuctionDetail id={auctionId} />
    </div>
  )
}
