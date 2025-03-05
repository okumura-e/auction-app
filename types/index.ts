export interface User {
  id: string
  name: string
  cpf: string
  role: "admin" | "user"
}

export interface Auction {
  id: string
  name: string
  quantity: number
  initialPrice: number
  currentPrice: number | null
  startDate: string
  endDate: string
  createdAt: string
  status: "waiting" | "open" | "closed"
}

export interface Bid {
  id: string
  auctionId: string
  userId: string
  userName: string
  amount: number
  createdAt: string
}

