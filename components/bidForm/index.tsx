
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import Input from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface BidFormProps {
    auctionId: string
    currentPrice: number
    userId: string
    userName: string
}

export default function BidForm({ auctionId, currentPrice, userId, userName }: BidFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [lastBidTime, setLastBidTime] = useState<Date | null>(null)
    const [cooldownRemaining, setCooldownRemaining] = useState(0)

    const bidSchema = z.object({
        amount: z.coerce
        .number()
        .positive("O valor deve ser positivo")
        .min(currentPrice + 1, `O lance deve ser maior que ${(currentPrice)}`),
    })

    // formatar o valor aq
    type BidFormValues = z.infer<typeof bidSchema>

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(bidSchema),
    });


    async function onSubmit(data: BidFormValues) {
        setIsLoading(true)
    }

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
                            <p className="text-xl font-bold">{(currentPrice)}</p>
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

