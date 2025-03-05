import { useQuery } from "@tanstack/react-query"
import { api } from "@/service/api"
import type { Auction } from "@/types/index"

export const useAuctions = () => {
  return useQuery<Auction[], Error>({
    queryKey: ["auctions"], // Chave única para identificar a query
    queryFn: async () => {
      const response = await api.get("/auctions")
      return response.data
    },
  })
}