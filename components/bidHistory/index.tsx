"use client"

import { format } from "date-fns"
import type { Bid } from "@/types/index"

interface BidHistoryProps {
  bids: Bid[]
}

export default function BidHistory({ bids }: BidHistoryProps) {
  if (bids.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">Nenhum lance registrado ainda.</div>
  }

  return (
    <section className="h-[500px] pr-4 overflow-y-scroll">
      <div className="space-y-4">
        {bids.map((bid) => (
          <div key={bid.id} className="border-b pb-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{bid.userName}</p>
                <p className="text-sm text-muted-foreground">{format(new Date(bid.timestamp), "dd/MM/yyyy HH:mm:ss")}</p>
              </div>
              <p className="font-bold">{Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(bid.amount)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

