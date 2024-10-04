'use client';
import React from 'react';
import { Img, Button, Heading } from '@/components/';
import AccordionComponent from './accordion';
import Map from './map';
// import { DatePicker } from '@nextui-org/date-picker';

export default function RentPage() {
  return (
    <div className="flex gap-[26px] md:flex-col">
      <div className="w-[32%] md:flex-col">
        <div className="flex flex-col gap-3 rounded-[14px] border-2 border-solid border-lime-400 p-[22px] sm:p-4">
          <div className="row-border border-2  border-solid border-lime-400 rounded-[20px] bg-gradient2 p-5">
            <div className="mt-1 flex flex-col gap-6 self-end">
              <div className="flex flex-wrap items-center gap-[31px]">
                <Heading
                  as={'h1'}
                  className=" text-[20px] font-semibold text-white-a700 lg:text-[17px]"
                >
                  Traveler:
                </Heading>
                <Heading
                  as={'h2'}
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
          {/* <div className="flex items-center justify-center rounded-[14px] border border-solid border-black-900_04 bg-gray-900_03 p-3">
            <div className=" flex flex-1 flex-wrap justify-center gap-[22px] px-1.5">
              <Heading
                as="h5"
                className="text-[20px] font-semibold text-white-a700 lg:text-[17px]"
              >
                日期 TODO
              </Heading>
            </div>
          </div> */}
          {/* <DatePicker label="Birth date" className="max-w-[284px]" /> */}
          <div>End Date</div>
          <div className=" flex items-center justify-center rounded-[14px] border border-solid border-black-900_04 bg-gray-900_03 p-3">
            <div>People</div>
          </div>
          <div>Price</div>
          <div className="flex flex-col gap-[22px]">
            <AccordionComponent />
            <Button
              size="xl"
              shape="round"
              className="self-stretch rounded-[10px] px-[34px] font-bold sm:px-4 bg-lime-400 text-black-900"
            >
              View listings
            </Button>
          </div>
        </div>
      </div>
      <Map />
    </div>
  );
}
