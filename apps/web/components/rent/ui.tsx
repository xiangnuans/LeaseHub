"use client";
import React from "react";

import Map from "@/components/map";
import SearchCard from "../searchCard";

export default function RentPage() {
  return (
    <div className="flex gap-[26px] md:flex-col w-full">
      <SearchCard />
      <Map />
    </div>
  );
}
