"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

interface AuctionTimerProps {
  endDate: string
  status: "waiting" | "open" | "closed"
}

function calculateTimeRemaining(endDate: string): string {
  const total = Date.parse(endDate) - Date.now();
  if (total <= 0) {
    return "Encerrado";
  }

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return (
    (days > 0 ? `${days}d ` : "") +
    (hours > 0 ? `${hours}h ` : "") +
    (minutes > 0 ? `${minutes}m ` : "") +
    `${seconds}s`
  );
}

export default function AuctionTimer({ endDate, status }: AuctionTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState("")

  useEffect(() => {
    if (status === "closed") {
      setTimeRemaining("Encerrado")
      return
    }

    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(endDate))
    }, 1000)

    return () => clearInterval(interval)
  }, [endDate, status])

  return (
    <div className="flex items-center gap-1 text-muted-foreground">
      <Clock className="h-4 w-4" />
      <span>{timeRemaining}</span>
    </div>
  )
}

