import { useMutation, useQuery } from "@tanstack/react-query"
import { api } from "@/service/api"
import type { AddBidParams, Auction, Bid } from "@/types/index"
import socket from "./use-socket"

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

export const useAddBid = () => {
  return useMutation<Auction, Error, AddBidParams>({
    mutationFn: async ({ auction, bids, bid }) => {
      const response = await api.put(`/auctions/${auction.id}`, { 
        ...auction, 
        bids: [bid, ...bids]
      });
      return response.data;
    },
    onSuccess: (updatedAuction, variables) => {
      const { bid } = variables;
      socket.emit('new-bid', { bid, auction: updatedAuction });
    },
    onError: (error) => {
      console.error("Failed to add bid:", error);
    },
  });
};

