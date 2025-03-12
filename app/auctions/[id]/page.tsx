"use client";

import AuctionDetail from "@/components/auctionDetail";
import React, { use } from "react";

export default function AuctionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: auctionId } = use(params);

  return (
    <div className="container mx-auto py-8">
      <AuctionDetail id={auctionId} />
    </div>
  );
}
