"use client";
import React from "react";
import { Img, Button, Heading, Input } from "@/components/";
import AccordionComponent from "./accordion";
import Map from "./map";
import { DatePicker } from "@nextui-org/date-picker";

export default function RentPage() {
  return (
    <div className="flex gap-[26px] md:flex-col">
      <div className="w-[32%] md:flex-col">
        <div className="flex flex-col gap-3 rounded-[14px] border-2 border-solid border-lime-400 p-[22px] sm:p-4">
          <div className="row-border border-2  border-solid border-lime-400 rounded-[20px] bg-gradient2 p-5">
            <div className="mt-1 flex flex-col gap-6 self-end">
              <div className="flex flex-wrap items-center gap-[31px]">
                <Heading
                  as={"h1"}
                  className=" text-[20px] font-semibold text-white-a700 lg:text-[17px]"
                >
                  Traveler:
                </Heading>
                <Heading
                  as={"h2"}
                  size="headings"
                  className="text-[16px] font-semibold text-white-a700 lg:text-[13px]"
                >
                  0xBBB6A7...6hn9
                </Heading>
              </div>
              <div className=" flex felx-wrap gap-[31px]">
                <Heading
                  as="h3"
                  className="text-[20px] font-semibold text-white-a700 lg:text-[17px]"
                >
                  Rewards:
                </Heading>
                <Heading
                  as="h4"
                  className="text-[20px] font-semibold !text-lime-400 lg:text-[17px]"
                >
                  644
                </Heading>
              </div>
            </div>
          </div>
          <DatePicker label="Start Date" />
          <DatePicker label="End date" className="w-full" />
          <Input
            label="People: "
            type="number"
            placeholder="1"
            className="gap-2"
            shape="round"
            min={1}
            value={1}
          />
          <label className="flex flex-col justify-start cursor-text bg-gray-900 text-white-a700 h-[88px] px-3.5 text-[20px] rounded-[10px]">
            <div className="flex my-2">Price:</div>
            <input
              placeholder={"234.00  -   456.00"}
              className="pl-0"
              value={"234.00  -   456.00"}
            />
          </label>
          <div className="flex flex-col gap-[22px] bg-gray-900 rounded-[10px]">
            <AccordionComponent />
          </div>
          <Button
            size="xl"
            shape="round"
            className="self-stretch mt-4 px-[34px] font-bold sm:px-4 bg-lime-400 text-black-900 rounded-[10px]"
          >
            View listings
          </Button>
        </div>
      </div>
      <Map />
    </div>
  );
}
