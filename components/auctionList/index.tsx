
import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Auction } from "@/types/index"
import { PlusCircle, Clock } from "lucide-react"

export default function AuctionList() {
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const [timeRemaining, setTimeRemaining] = useState<Record<string, string>>({})
  const [auctions, setAuctions] = useState<Auction[]>([
    {
      id: "1",
      name: "Leil o de Carro",
      quantity: 1,
      initialPrice: 10000,
      currentPrice: null,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
      createdAt: new Date().toISOString(),
      status: "waiting",
    },
    {
      id: "2",
      name: "Leil o de Bicicleta",
      quantity: 1,
      initialPrice: 500,
      currentPrice: 600,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
      createdAt: new Date().toISOString(),
      status: "open",
    },
    {
      id: "3",
      name: "Leil o de Livro",
      quantity: 1,
      initialPrice: 20,
      currentPrice: 30,
      startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
      endDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      status: "closed",
    },
  ])


  if (isLoading) {
    return <div className="text-center py-8">Carregando leilões...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Leilões Disponíveis</h1>
        {user?.role === "admin" && (
          <Link href="/auctions/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Novo Leilão
            </Button>
          </Link>
        )}
      </div>

      {auctions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum leilão disponível no momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctions.map((auction: Auction) => {
            const status = auction.id
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
  const variants = {
    waiting: { label: "Aguardando", variant: "secondary" as const },
    open: { label: "Aberto", variant: "success" as const },
    closed: { label: "Encerrado", variant: "destructive" as const },
  }

  const { label, variant } = variants[status]

  return <Badge variant={variant}>{label}</Badge>
}

