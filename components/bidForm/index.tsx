
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import Input from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAddBid } from "@/hooks/use-auctions"
import { Auction, Bid } from "@/types/index"
import { v4 as uuidv4 } from 'uuid';

interface BidFormProps {
    auction: Auction
    bids: Bid[]
    currentPrice: number
    userId: string
    userName: string
}

export default function BidForm({ auction, bids, currentPrice, userId, userName }: BidFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [cooldownRemaining, setCooldownRemaining] = useState(0)

    const bidSchema = z.object({
        amount: z.coerce
            .number()
            .positive("O valor deve ser positivo")
            .min(currentPrice + 1, `O lance deve ser maior que ${Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(currentPrice)}`),
    })
    type BidFormValues = z.infer<typeof bidSchema>

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(bidSchema),
    });
    const { mutateAsync: addBid } = useAddBid()

    const onSubmit = async (data: BidFormValues) => {
        setIsLoading(true)
        setCooldownRemaining(5)
        try {
            const bidWithTimestamp = {
                ...data,
                timestamp: new Date().toISOString(),
                userId: userId,
                userName: userName,
                id: uuidv4(),
                auctionId: auction.id
            }
            await addBid({ auction, bids, bid: bidWithTimestamp })
        } catch (error) {
            console.error("Erro ao adicionar lance:", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (cooldownRemaining === 0) return
        const timer = setInterval(() => {
            setCooldownRemaining((prev) => prev - 1)
        }, 1000)
        return () => clearInterval(timer)
    }, [cooldownRemaining])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Enviar Lance</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Lance atual</p>
                            <p className="text-xl font-bold">{Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(currentPrice || auction.startingValue)}</p>
                        </div>

                        <Input
                            label="Seu lance (R$)"
                            placeholder="Digite seu lance"
                            name="amount"
                            type="text"
                            register={register}
                            value={watch("amount")}
                            errorMessage={errors.amount?.message as string}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full" disabled={isLoading || cooldownRemaining > 0}>
                        {cooldownRemaining > 0
                            ? `Aguarde ${cooldownRemaining}s para novo lance`
                            : isLoading
                                ? "Enviando..."
                                : "Enviar Lance"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

