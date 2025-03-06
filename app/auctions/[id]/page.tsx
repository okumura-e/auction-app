"use client"

import { redirect } from "next/navigation"
import AuctionDetail from "@/components/auctionDetail"
import { useAuth } from "@/context/auth-context"

interface AuctionPageProps {
  params: {
    id: string
  }
}

export default async function AuctionPage({ params }: AuctionPageProps) {
  const { user } = useAuth()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto py-8">
      <AuctionDetail id={params.id} />
    </div>
  )
}

