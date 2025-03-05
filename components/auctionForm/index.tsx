"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
// import { createAuction } from "@/lib/api"
import { Button } from "@/components/ui/button"
import Input from "@/components/ui/input"

const auctionSchema = z.object({
  name: z
    .string()
    .min(3, "Nome inválido"),
  startDate: z.date(),
  endDate: z.date(),
  initialPrice: z.number().nonnegative({ message: "Preço inicial não pode ser negativo" }),
  quantity: z.number().nonnegative({ message: "Quantidade não pode ser negativa" }),
  status: z.enum(["waiting", "open", "closed"]),
})

type AuctionFormValues = z.infer<typeof auctionSchema>

export default function AuctionForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(auctionSchema),
  });

  async function onSubmit(data: AuctionFormValues) {
    console.log(123);
    
    setIsLoading(true)
    console.log(data);
    
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
          name="initialPrice"
          placeholder="Digite o preço inicial"
          type="number"
          register={register}
          value={Number(watch("initialPrice")) || ""}
          errorMessage={errors.initialPrice?.message as string}
        />
      </div>

      <div className="flex gap-4 w-full">
        <Input
          label="Data de inicio"
          name="startDate"
          placeholder="Digite a data de inicio"
          type="datetime-local"
          register={register}
          value={watch("startDate") ? new Date(watch("startDate")).toISOString().slice(0, 16) : ""}
          errorMessage={errors.startDate?.message as string}
        />

        <Input
          label="Data de fim"
          name="endDate"
          placeholder="Digite a data de fim"
          type="datetime-local"
          register={register}
          value={watch("endDate") ? new Date(watch("endDate")).toISOString().slice(0, 16) : ""}
          
          errorMessage={errors.endDate?.message as string}
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

