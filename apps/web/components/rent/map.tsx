'use client';
import React from 'react';
import { Img, Heading, Text, Input } from '@/components/';

export default function Map() {
  return (
    <>
      <div className=" h-[832px] flex-1 rounded-[20px] bg-url() bg-cover bg-no-repeat lg:h-auto md:h-auto md:self-stretch">
        <div className="mt-7 flex flex-col items-start">
          <Input
            color="black_900_03"
            shape="round"
            type="text"
            name="name"
            placeholder="Street Name"
            prefix={
              <div className="flex h-[30px] w-[30px] items-center justify-center">
                <Img
                  src=""
                  width={30}
                  height={28}
                  alt="Contrast"
                  className="h-[28px] w-[30px]"
                />
              </div>
            }
            className="ml-2 w-[44%] gap-5 rounded-[10px] border-2 border-solid border-lime-400 px-[22px] font-medium md:ml-0 sm:px-4"
          />
          <Img
            src={''}
            width={50}
            height={50}
            alt=""
            className="mr-[366px] mt-[38px] h-[50px] w-[50px] self-end md:mr-0"
          />
          <div className="mx-[114px] mt-11 flex items-end self-stretch md:mx-0 md:flex-col">
            <Img
              src={''}
              width={50}
              height={50}
              alt=""
              className="mt-[22px] h-[50px] w-[50px] md:w-full"
            />
            <Img
              src={''}
              width={50}
              height={50}
              alt=""
              className="ml-[134px] h-[50px] w-[50px] md:ml-0 md:w-full"
            />
            <Img
              src={''}
              width={50}
              height={50}
              alt=""
              className="ml-28 h-[50px] w-[50px] self-start md:ml-0 md:w-full md:self-auto"
            />
          </div>
          <Img
            src={''}
            width={50}
            height={50}
            alt=""
            className="ml-[334px] mt-[22px] h-[50px] w-[50px] md:ml-0"
          />
          <div className="mx-[138px] mt-[46px] flex items-start justify-end self-stretch md:mx-0 md:flex-col">
            <Img
              src={''}
              width={130}
              height={144}
              alt=""
              className="h-[144px] w-[44%] rounded-[16px] object-contain md:ml-0"
            />
            <div className="flex flex-1 flex-col items-start">
              <Heading
                size="headings"
                as={'h6'}
                className=" text-[16px] font-semibold text-white-a700 lg:text-[13px]"
              >
                Center of excellence
              </Heading>
              <Heading
                size="headings"
                as={'p'}
                className=" text-[14px] font-semibold text-white-a700"
              >
                Residential hostel
              </Heading>
              <div className="mt-1 flex items-center gap-1.5 self-stretch">
                <Img
                  src={''}
                  width={10}
                  height={12}
                  alt="Linkedin"
                  className="h-[12px] self-end"
                />
                <Text
                  size="texts"
                  as="p"
                  className="text-[12px] font-normal text-blue_gray-400"
                >
                  FuTian, ShenZhen
                </Text>
              </div>
              <div className="mt-2.5 flex items-end self-stretch">
                <Img
                  src={''}
                  width={20}
                  height={20}
                  alt=""
                  className="h-[20px] w-[20px] self-center"
                />
                <div className="ml-3 h-[12px] w-px bg-gray-300_01" />
                <Img
                  src={''}
                  width={16}
                  height={12}
                  alt=""
                  className="ml-3 h-[12px] w-[12px]"
                />
                <div className="ml-3 h-[12px] w-px bg-gray-300_01" />
                <Img
                  src={''}
                  width={12}
                  height={12}
                  alt=""
                  className="ml-3 h-[12px] w-[12px]"
                />
                <div className="ml-3 h-[12px] w-px bg-gray-300_01" />
                <Img
                  src={''}
                  width={14}
                  height={12}
                  alt=""
                  className="ml-3 h-[12px] self-center"
                />
              </div>
              <div className="mt-3 flex items-center gap-[7px] self-stretch">
                <Img
                  src={''}
                  width={26}
                  height={26}
                  alt=""
                  className="h-[26px] w-[26px]"
                />
                <Heading
                  size="headingxl"
                  as="h4"
                  className="font-dinalterate text-[24px] font-bold text-lime-400 lg:text-[20px]"
                >
                  247.0
                </Heading>
              </div>
            </div>
          </div>
          <Img
            src={''}
            width={26}
            height={26}
            alt=""
            className=" relative mr-[156px] mt-[-10px] h-[26px] w-[26px] md:mr-0"
          />
        </div>
      </div>
      <div className="flex items-start justify-end seld-stretch">
        <Img
          src={''}
          width={50}
          height={50}
          alt=""
          className="h-[50px] w-[50px]"
        />
        <div className="mt-2.5 flex items-start self-center px-14 md:px-5 sm:px-4">
          <Img
            src={''}
            width={50}
            height={50}
            alt=""
            className="mb-[120px] mt-8  h-[50px] w-[50px]"
          />
          <Img
            src={''}
            width={50}
            height={50}
            alt=""
            className="ml-[50px] h-[50px] w-[50px] self-end"
          />
          <Img
            src={''}
            width={50}
            height={50}
            alt=""
            className="ml-2.5 h-[50px] w-[50px]"
          />
        </div>
        <Img
          src={''}
          width={36}
          height={128}
          alt=""
          className="mb-[34px] h-[128px]  h-[126px] w-[4%] self-end object-contain"
        />
      </div>
    </>
  );
}
