"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import BidForm from "@/components/bidForm"
import BidHistory from "@/components/bidHistory"
import AuctionTimer from "@/components/auctionTimer"
import type { Bid } from "@/types/index"
import { useAuction } from "@/hooks/use-auctions"
import { format } from "date-fns"
import { useAuth } from "@/context/auth-context"
import { Button } from "../ui/button"
import socket from "@/hooks/use-socket"

interface AuctionDetailProps {
  id: string
}

export default function AuctionDetail({ id }: AuctionDetailProps) {
  const { data: auction, isLoading } = useAuction(id)
  const [bids, setBids] = useState<Bid[]>([])
  const [currentPrice, setCurrentPrice] = useState<number>(0)
  const [count, setCount] = useState<number>(0)
  const [status, setStatus] = useState<"waiting" | "open" | "closed">("waiting")
  const [winner, setWinner] = useState<{ name: string; amount: number } | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    socket.on("new-bid", (data) => {
      if (id === data.auction.id) {
        setBids((prevBids) => [data.bid, ...prevBids]);
        setCurrentPrice(data.bid.amount)
      }
    });
    return () => {
      socket.off("new-bid");
    };
  }, [setBids]);

  useEffect(() => {
    if (auction) {
      setBids(auction.bids)
      setCurrentPrice(auction?.bids[0]?.amount || auction.startingValue)
      setStatus(auction.status)
    }
  }, [auction])

  useEffect(() => {
    if (auction) {
      const endDate = new Date(auction.endDateTime).getTime()
      const now = new Date().getTime()
      const diff = endDate - now

      if (diff <= 0) {
        setStatus("closed")
        if (auction && bids.length > 0) {
          const lastBid = bids[0];
          setWinner({ name: lastBid.userName, amount: lastBid.amount });
        }
      } else {
        setTimeout(() => {
          setCount((prevCount) => prevCount + 1)
        }, 1000);
      }
    }
  }, [auction, count])

  if (isLoading) {
    return <div className="text-center py-8">Carregando detalhes do leilão...</div>
  }

  if (!auction) {
    return <div className="text-center py-8">Leilão não encontrado</div>
  }

  return (
    <div className="space-y-8">
      <Button type="button" variant="outline" className="w-20" onClick={() => window.history.back()}>Voltar</Button>
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold">{auction.name}</h1>
          <p className="text-muted-foreground">
            Quantidade: {auction.quantity} {auction.quantity > 1 ? "unidades" : "unidade"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={status} />
          <AuctionTimer endDate={auction.endDateTime} status={status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detalhes do Leilão</CardTitle>
              <CardDescription>Criado em {format(new Date(auction.createdAt), "dd/MM/yyyy HH:mm")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Preço Atual</h3>
                <p className="text-3xl font-bold">{Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(currentPrice || auction.startingValue)}</p>
                <p className="text-sm text-muted-foreground">Preço inicial: {Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(auction.startingValue)}</p>
              </div>

              <div>
                <h3 className="font-medium">Período do Leilão</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Início</p>
                    <p>{format(new Date(auction.startDateTime), "dd/MM/yyyy HH:mm:ss")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Término</p>
                    <p>{format(new Date(auction.endDateTime), "dd/MM/yyyy HH:mm:ss")}</p>
                  </div>
                </div>
              </div>

              {winner && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-medium text-green-800">Leilão Encerrado</h3>
                  <p className="text-green-700">
                    Vencedor: <span className="font-bold">{winner.name}</span> com o lance de{" "}
                    {Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(winner.amount)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {status === "open" && (
            <BidForm
              auction={auction}
              bids={bids}
              currentPrice={currentPrice || auction.startingValue}
              userId={user!.id}
              userName={user!.name}
            />
          )}
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Histórico de Lances</CardTitle>
            </CardHeader>
            <CardContent>
              <BidHistory bids={bids} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: "waiting" | "open" | "closed" }) {
  const variants = {
    waiting: { label: "Aguardando", variant: "secondary" as const },
    open: { label: "Aberto", variant: "success" as const },
    closed: { label: "Encerrado", variant: "destructive" as const },
  }

  const { label, variant } = variants[status]

  return <Badge variant={variant}>{label}</Badge>
}