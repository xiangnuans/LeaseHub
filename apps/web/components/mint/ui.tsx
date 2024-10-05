"use client";
import React from "react";

import RoomCard from "../room/ui";
import RoomHead from "./roomHead";
import RoomLeftDetail from "../room/detail";

export default function RentPage() {
  return (
    <div className="flex items-center gap-[26px] md:flex-col w-full">
      <div className="flex w-[32%] flex-col gap-6 md:w-full">
        <RoomHead />
        <RoomLeftDetail />
      </div>
      <RoomCard />
    </div>
  );
}
