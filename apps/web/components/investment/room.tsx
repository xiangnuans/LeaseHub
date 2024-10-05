"use client";
import React from "react";
import RoomCard from "../room/ui";
import InvestmentHead from "./head";
import RoomLeftDetail from "../room/detail";
import { Button, Heading } from "..";

export default function InvestmentRoomPage() {
  return (
    <div className="flex gap-[26px] md:flex-col w-full">
      <div className="flex w-[32%] flex-col gap-6 md:w-full">
        <InvestmentHead />
        <RoomLeftDetail />
      </div>
      <RoomCard>
        <div className="mt-9 flex flex-col items-start">
          <div className="mt-[42px] flex flex-col gap-6">
            <div className="flex flex-wrap gap-4">
              <Heading as="h5">Locked quantity:</Heading>
              <Heading as="h5" className="!text-lime-400">
                2000
              </Heading>
            </div>
            <div className="flex flex-wrap gap-4">
              <Heading as="h5">Tradable quantity:</Heading>
              <Heading as="h5" className="!text-lime-400">
                8000
              </Heading>
            </div>
            <div className="flex flex-wrap gap-4">
              <Heading as="h5">Investment quantity:</Heading>
              <Heading as="h5" className="!text-lime-400">
                300 = 20 SOL
              </Heading>
            </div>
          </div>
          <Button
            size="xl"
            shape="round"
            className="mt-7 self-stretch rounded-[10px] px-[34px] bg-lime-400  text-black-900 font-bold sm:px-4"
          >
            Buy
          </Button>
        </div>
      </RoomCard>
    </div>
  );
}
