
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import BidForm from "@/components/bidForm"
import BidHistory from "@/components/bidHistory"
import AuctionTimer from "@/components/auctionTimer"
import type { Auction, Bid } from "@/types/index"

interface AuctionDetailProps {
  id: string
}

export default function AuctionDetail({ id }: AuctionDetailProps) {
  const [auction, setAuction] = useState<Auction | null>({
    id: "1",
    name: "Leil o de Carro",
    quantity: 1,
    initialPrice: 10000,
    currentPrice: 15000,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
    createdAt: new Date().toISOString(),
    status: "open",
  })
  const [bids, setBids] = useState<Bid[]>([])
  const [timeRemaining, setTimeRemaining] = useState("")
  const [status, setStatus] = useState<"waiting" | "open" | "closed">("waiting")
  const [winner, setWinner] = useState<{ name: string; amount: number } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  if (isLoading) {
    return <div className="text-center py-8">Carregando detalhes do leilão...</div>
  }

  if (!auction) {
    return <div className="text-center py-8">Leilão não encontrado</div>
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold">{auction.name}</h1>
          <p className="text-muted-foreground">
            Quantidade: {auction.quantity} {auction.quantity > 1 ? "unidades" : "unidade"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={status} />
          <AuctionTimer endDate={auction.endDate} status={status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detalhes do Leilão</CardTitle>
              <CardDescription>Criado em {(auction.createdAt)}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Preço Atual</h3>
                <p className="text-3xl font-bold">{(auction.currentPrice || auction.initialPrice)}</p>
                <p className="text-sm text-muted-foreground">Preço inicial: {(auction.initialPrice)}</p>
              </div>

              <div>
                <h3 className="font-medium">Período do Leilão</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Início</p>
                    <p>{(auction.startDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Término</p>
                    <p>{(auction.endDate)}</p>
                  </div>
                </div>
              </div>

              {winner && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-medium text-green-800">Leilão Encerrado</h3>
                  <p className="text-green-700">
                    Vencedor: <span className="font-bold">{winner.name}</span> com o lance de{" "}
                    {(winner.amount)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {auction.status === "open" && (
            <BidForm
              auctionId={id}
              currentPrice={auction.currentPrice || auction.initialPrice}
              userId={"1"}
              userName={"John Doe"}
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

