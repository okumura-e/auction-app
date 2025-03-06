
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import BidForm from "@/components/bidForm"
import BidHistory from "@/components/bidHistory"
import AuctionTimer from "@/components/auctionTimer"
import type { Bid } from "@/types/index"
import { useAuction } from "@/hooks/use-auctions"
import { format } from "date-fns"

interface AuctionDetailProps {
  id: string
}

export default function AuctionDetail({ id }: AuctionDetailProps) {
  const [bids, setBids] = useState<Bid[]>([])
  const [status, setStatus] = useState<"waiting" | "open" | "closed">("waiting")
  const [winner, setWinner] = useState<{ name: string; amount: number } | null>(null)

  const { data: auction, isLoading, isError, error } = useAuction(id as string)
  
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
          <StatusBadge status={auction.status} />
          <AuctionTimer endDate={auction.endDateTime} status={auction.status} />
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
                <p className="text-3xl font-bold">{Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(auction.startingValue)}</p>
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
                    {(winner.amount)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {auction.status === "open" && (
            <BidForm
              auctionId={id}
              currentPrice={auction.startingValue}
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
              <BidHistory bids={auction.bids} />
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

