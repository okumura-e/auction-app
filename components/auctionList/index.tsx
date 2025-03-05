import { useEffect, useState } from "react"
import Link from "next/link"
import { useAuctions } from "@/hooks/use-auctions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Auction } from "@/types/index"
import { PlusCircle, Clock } from "lucide-react"
import { api } from "../../service/api"

export default function AuctionList() {
  const [timeRemaining, setTimeRemaining] = useState<Record<string, string>>({})
  const { data: auctions, isLoading, isError, error } = useAuctions()


  if (isLoading) {
    return <div className="text-center py-8">Carregando leilões...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Leilões Disponíveis</h1>
        {/* {user?.role === "admin" && (
          <Link href="/auctions/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Novo Leilão
            </Button>
          </Link>
        )} */}
      </div>

      { auctions && auctions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum leilão disponível no momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctions && auctions.map((auction: Auction) => {
            return (
              <Link href={`/auctions/1`} key={auction.id}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{auction.name}</CardTitle>
                      <StatusBadge status={auction.status} />
                    </div>
                    <CardDescription>Quantidade: {auction.quantity}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{(auction.currentPrice || auction.initialPrice)}</p>
                    <div className="flex items-center mt-2 text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{timeRemaining[auction.startDate] || (auction.endDate)}</span>
                      {/* fazer contagem regressiva aqui */}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="default" className="w-full">
                      Ver detalhes
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
function StatusBadge({ status }: { status: "waiting" | "open" | "closed" }) {
  const variants: Record<string, { label: string; variant: "secondary" | "success" | "destructive" }> = {
    waiting: { label: "Aguardando", variant: "secondary" },
    open: { label: "Aberto", variant: "success" },
    closed: { label: "Encerrado", variant: "destructive" },
  }

  const variant = variants[status]

  if (!variant) {
    throw new Error(`Cannot find variant for status ${status}`)
  }

  const { label, variant: variantValue } = variant

  return <Badge variant={variantValue}>{label}</Badge>
}

