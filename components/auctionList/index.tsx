"use client"

import { useState } from "react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

export default function AuctionList() {
  const [timeRemaining, setTimeRemaining] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  if (isLoading) {
    return <div className="text-center py-8">Carregando leilões...</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Leilões em andamento</h2>
      </div>
  )
}
