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
  startingValue: number
  startDateTime: string
  endDateTime: string
  createdAt: string
  status: "waiting" | "open" | "closed"
  bids: Bid[]
}

export interface Bid {
  id: string
  userId: string
  userName: string
  amount: number
  timestamp: string
}

export interface AddBidParams {
  auction: Auction
  bid: Bid
  bids: Bid[]
}