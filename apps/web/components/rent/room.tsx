"use client";
import React from "react";

import SearchCard from "../searchCard";
import RoomCard from "../room/ui";

export default function RentRoomPage() {
  return (
    <div className="flex gap-[26px] md:flex-col w-full">
      <SearchCard />
      <RoomCard />
    </div>
  );
}
