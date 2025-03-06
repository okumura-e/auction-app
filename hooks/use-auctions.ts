import { useMutation, useQuery } from "@tanstack/react-query"
import { api } from "@/service/api"
import type { Auction } from "@/types/index"

export const useAuctions = () => {
  return useQuery<Auction[], Error>({
    queryKey: ["auctions"],
    queryFn: async () => {
      const response = await api.get("/auctions")
      return response.data
    },
  })
}

export const useAuction = (auctionId: string) => {
  return useQuery<Auction, Error>({
    queryKey: ["auction", auctionId],
    queryFn: async () => {
      const response = await api.get(`/auctions/${auctionId}`)
      return response.data
    },
  })
}

export const useCreateAuction = () => {
  return useMutation<Auction, Error, Auction>({
    mutationFn: async (newAuction: Auction) => {
      const response = await api.post("/auctions", newAuction)
      return response.data
    },
    onSuccess: (data) => {
      console.log("Leilão criado com sucesso:", data)
    },
    onError: (error) => {
      console.error("Erro ao criar leilão:", error)
    },
  })
}
