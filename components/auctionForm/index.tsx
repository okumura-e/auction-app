"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Input from "@/components/ui/input"
import { useAuctions, useCreateAuction } from "@/hooks/use-auctions"
import { v4 as uuidv4 } from 'uuid';
import toast from "react-hot-toast"
import socket from "@/hooks/use-socket"

const auctionSchema = z.object({
  name: z
    .string()
    .min(3, "Nome inválido"),
  startDateTime: z.date(),
  endDateTime: z.date(),
  startingValue: z.number().nonnegative({ message: "Preço inicial não pode ser negativo" }),
  quantity: z.number().nonnegative({ message: "Quantidade não pode ser negativa" }),
  status: z.enum(["waiting", "open", "closed"]),
})

type AuctionFormValues = z.infer<typeof auctionSchema>

export default function AuctionForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const createAuction = useCreateAuction();
  const { refetch } = useAuctions()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(auctionSchema),
  });

  const onSubmit = (data: AuctionFormValues) => {
    setIsLoading(true)
    const formattedData = {
      ...data,
      id: uuidv4(),
      startDateTime: data.startDateTime.toISOString(),
      endDateTime: data.endDateTime.toISOString(),
      bids: [],
      createdAt: new Date().toISOString(),
    }

    toast.promise(
      createAuction.mutateAsync(formattedData),
      {
        loading: "Criando...",
        success: "Leilão criado com sucesso!",
        error: "Erro ao criar leilão.",
      }
    ).finally(() => {
      setIsLoading(false)
      refetch()
      socket.emit('new-auction', { auction: formattedData });
      router.replace("/")
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Nome do Leilão"
        name="name"
        placeholder="Digite o nome do leilão"
        type="text"
        register={register}
        value={watch("name")}
        errorMessage={errors.name?.message as string}
      />

      <div className="flex gap-4 w-full">
        <Input
          label="Quantidade de itens"
          name="quantity"
          placeholder="Digite a quantidade de itens"
          type="number"
          register={register}
          value={watch("quantity")}
          errorMessage={errors.quantity?.message as string}
        />

        <Input
          label="Preço inicial"
          name="startingValue"
          placeholder="Digite o preço inicial"
          type="number"
          register={register}
          value={Number(watch("startingValue")) || ""}
          errorMessage={errors.startingValue?.message as string}
        />
      </div>

      <div className="flex gap-4 w-full">
        <Input
          label="Data de inicio"
          name="startDateTime"
          placeholder="Digite a data de inicio"
          type="datetime-local"
          register={register}
          value={watch("startDateTime")
            ? new Date(watch("startDateTime")).toLocaleString("sv-SE", { timeZone: "America/Sao_Paulo" }).slice(0, 16)
            : ""}
          errorMessage={errors.startDateTime?.message as string}
        />

        <Input
          label="Data de fim"
          name="endDateTime"
          placeholder="Digite a data de fim"
          type="datetime-local"
          register={register}
          value={watch("endDateTime")
            ? new Date(watch("endDateTime")).toLocaleString("sv-SE", { timeZone: "America/Sao_Paulo" }).slice(0, 16) 
            : ""}
          errorMessage={errors.endDateTime?.message as string}
        />
      </div>

      <select {...register("status")} name="status" id="status" className="border rounded-md p-2 w-1/2">
        <option value="open">Aberto</option>
        <option value="waiting">Aguardando</option>
        <option value="closed">Fechado</option>
      </select>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => router.push("/")} disabled={isLoading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Criando..." : "Criar Leilão"}
        </Button>
      </div>
    </form>
  )
}

