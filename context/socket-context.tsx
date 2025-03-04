"use client"

import type React from "react"

import { createContext, useEffect, useState } from "react"
import { io, type Socket } from "socket.io-client"

interface SocketContextType {
  socket: Socket | null
  isConnected: boolean
}

export const SocketContext = createContext<SocketContextType | null>(null)

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // In a real app, this would connect to your actual Socket.IO server
    // For demo purposes, we'll create a mock socket
    const socketInstance = io("http://localhost:3001", {
      autoConnect: false,
      transports: ["websocket"],
    })

    // Mock socket events for demo
    const mockSocket = {
      ...socketInstance,
      emit: (event: string, ...args: any[]) => {
        console.log(`[Socket] Emitting ${event}`, args)

        // Mock responses for different events
        if (event === "joinAuction") {
          setTimeout(() => {
            mockHandlers.newBid({
              id: "bid-1",
              auctionId: args[0],
              userId: "user-1",
              userName: "John Doe",
              amount: 1500,
              createdAt: new Date().toISOString(),
            })
          }, 2000)
        }

        if (event === "placeBid") {
          const bidData = args[0]
          setTimeout(() => {
            mockHandlers.newBid({
              id: `bid-${Date.now()}`,
              auctionId: bidData.auctionId,
              userId: bidData.userId,
              userName: bidData.userName,
              amount: bidData.amount,
              createdAt: new Date().toISOString(),
            })
          }, 500)
        }

        return socketInstance
      },
      on: (event: string, callback: (...args: any[]) => void) => {
        console.log(`[Socket] Listening to ${event}`)
        mockHandlers[event] = callback
        return socketInstance
      },
      off: (event: string) => {
        console.log(`[Socket] Stopped listening to ${event}`)
        delete mockHandlers[event]
        return socketInstance
      },
      connect: () => {
        console.log("[Socket] Connected")
        setIsConnected(true)
        return socketInstance
      },
      disconnect: () => {
        console.log("[Socket] Disconnected")
        setIsConnected(false)
        return socketInstance
      },
    }

    setSocket(mockSocket as unknown as Socket)

    // Connect to socket
    mockSocket.connect()

    return () => {
      mockSocket.disconnect()
    }
  }, [])

  return <SocketContext.Provider value={{ socket, isConnected }}>{children}</SocketContext.Provider>
}

// Mock handlers for socket events
const mockHandlers: Record<string, (...args: any[]) => void> = {}

