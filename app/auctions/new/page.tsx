"use client"

import { redirect } from "next/navigation"
import AuctionForm from "@/components/auctionForm"
import { useAuth } from "@/context/auth-context"

export default async function NewAuctionPage() {
  const { user } = useAuth()

  if (!user) {
    redirect("/login")
  }

  if (user.role !== "admin") {
    redirect("/")
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Criar Novo Leilão</h1>
        <AuctionForm />
      </div>
    </div>
  )
}

