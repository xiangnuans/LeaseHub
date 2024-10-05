"use client";
import React from "react";
import RoomCard from "../room/ui";
import InvestmentHead from "./head";
import RoomLeftDetail from "../room/detail";

export default function InvestmentRoomPage() {
  return (
    <div className="flex gap-[26px] md:flex-col w-full">
      <div className="flex w-[32%] flex-col gap-6 md:w-full">
        <InvestmentHead />
        <RoomLeftDetail />
      </div>
      <RoomCard />
    </div>
  );
}
