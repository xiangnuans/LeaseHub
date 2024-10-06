"use client";
import React from "react";
import { Img, Heading, Text, Input } from "@/components/";
import SearchIcon from "@/assets/icons/rent/map-search.svg";
import PlaceIcon from "@/assets/icons/rent/search-place.svg";
import SelectImage from "@/assets/images/rent/select-place.svg";
import PointIcon from "@/assets/icons/rent/seclect/point.svg";
import SearchParkingIcon from "@/assets/icons/rent/seclect/parking.svg";
import SearchWashingIcon from "@/assets/icons/rent/seclect/washing.svg";
import SearchBathtubIcon from "@/assets/icons/rent/seclect/baththub.svg";
import SolIcon from "@/assets/icons/travel-sol.svg";
import ArrowDown from "@/assets/icons/rent/seclect/arrow-down.svg";
import MapSizeIcon from "@/assets/icons/rent/map-rate.svg";
import { useRouter } from "next/navigation";

interface Props {
  type: "investment" | "rent";
}

export default function Map({ type }: Props) {
  const router = useRouter();

  const handleSelectPlace = () => {
    if (type === "investment") {
      router.push("/investment/1");
    }
    if (type === "rent") {
      router.push("/rent/1");
    }
  };
  return (
    <>
      <div
        className={`w-full flex-1 rounded-[20px] bg-cover bg-no-repeat lg:h-auto md:h-auto md:self-stretch`}
        style={{
          backgroundImage: `url('/map.svg')`,
        }}
      >
        <div className="mt-7 flex flex-col items-start">
          <Input
            shape="round"
            type="text"
            name="name"
            placeholder="Street Name"
            prefix={
              <div className="flex h-[30px] w-[30px] items-center justify-center">
                <Img
                  src={SearchIcon}
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
            src={PlaceIcon}
            width={50}
            height={50}
            alt=""
            className="mr-[366px] mt-[38px] h-[50px] w-[50px] self-end md:mr-0"
          />
          <div className="mx-[114px] mt-11 flex items-end self-stretch md:mx-0 md:flex-col">
            <Img
              src={PlaceIcon}
              width={50}
              height={50}
              alt=""
              className="mt-[22px] h-[50px] w-[50px] md:w-full"
            />
            <Img
              src={PlaceIcon}
              width={50}
              height={50}
              alt=""
              className="ml-[134px] h-[50px] w-[50px] md:ml-0 md:w-full"
            />
            <Img
              src={PlaceIcon}
              width={50}
              height={50}
              alt=""
              className="ml-28 h-[50px] w-[50px] self-start md:ml-0 md:w-full md:self-auto"
            />
          </div>
          <Img
            src={PlaceIcon}
            width={50}
            height={50}
            alt=""
            className="ml-[334px] mt-[22px] h-[50px] w-[50px] md:ml-0"
          />
          <div className="mx-[138px] mt-[46px] flex items-start justify-end self-stretch md:mx-0 md:flex-col">
            <Img
              src={PlaceIcon}
              width={50}
              height={50}
              alt=""
              className="mt-[52px] h-[50px] w-[50px] md:w-full"
            />
            <div className="flex w-[66%] flex-col items-end self-center md:w-full">
              <div
                onClick={handleSelectPlace}
                className="flex w-[80%] items-center justify-center gap-3.5 rounded-[20px] bg-black-900 p-4 shadow-sm lg:w-full md:w-full"
              >
                <Img
                  src={SelectImage}
                  width={130}
                  height={144}
                  alt=""
                  className="h-[144px] w-[44%] rounded-[16px] object-contain md:ml-0"
                />
                <div className="flex flex-1 flex-col items-start">
                  <Heading
                    size="headings"
                    as={"h6"}
                    className=" text-[16px] font-semibold text-white-a700 lg:text-[13px]"
                  >
                    Center of excellence
                  </Heading>
                  <Heading
                    size="headings"
                    as={"p"}
                    className=" text-[14px] font-semibold text-white-a700"
                  >
                    Residential hostel
                  </Heading>
                  <div className="mt-1 flex items-center gap-1.5 self-stretch">
                    <Img
                      src={PointIcon}
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
                      src={SearchWashingIcon}
                      width={20}
                      height={20}
                      alt=""
                      className="h-[20px] w-[20px] self-center"
                    />
                    <div className="ml-3 h-[12px] w-px bg-gray-300_01" />
                    <Img
                      src={SearchBathtubIcon}
                      width={16}
                      height={12}
                      alt=""
                      className="ml-3 h-[12px] w-[12px]"
                    />
                    <div className="ml-3 h-[12px] w-px bg-gray-300_01" />
                    <Img
                      src={SearchParkingIcon}
                      width={12}
                      height={12}
                      alt=""
                      className="ml-3 h-[12px] w-[12px]"
                    />
                  </div>
                  <div className="mt-3 flex items-center gap-[7px] self-stretch">
                    <Img
                      src={SolIcon}
                      width={26}
                      height={26}
                      alt=""
                      className="h-[26px] w-[26px]"
                    />
                    <Heading
                      size="headingxl"
                      as="h4"
                      className="font-dinalterate text-[24px] font-bold !text-lime-400 lg:text-[20px]"
                    >
                      247.0
                    </Heading>
                  </div>
                </div>
              </div>
              <Img
                src={ArrowDown}
                width={26}
                height={26}
                alt=""
                className=" relative mr-[156px] mt-[-10px] h-[26px] w-[26px] md:mr-0"
              />
            </div>
          </div>
          <div className="flex items-start justify-end seld-stretch">
            <Img
              src={PlaceIcon}
              width={50}
              height={50}
              alt=""
              className="h-[50px] w-[50px]"
            />
            <div className="mt-2.5 flex items-start self-center px-14 md:px-5 sm:px-4">
              <Img
                src={PlaceIcon}
                width={50}
                height={50}
                alt=""
                className="mb-[120px] mt-8  h-[50px] w-[50px]"
              />
              <Img
                src={PlaceIcon}
                width={50}
                height={50}
                alt=""
                className="ml-[50px] h-[50px] w-[50px] self-end"
              />
              <Img
                src={PlaceIcon}
                width={50}
                height={50}
                alt=""
                className="ml-2.5 h-[50px] w-[50px]"
              />
            </div>
          </div>
          <Img
            src={MapSizeIcon}
            width={36}
            height={128}
            alt=""
            className=" absolute bottom-[-100px] mb-[34px] h-[128px]  w-[4%] self-end object-contain"
          />
        </div>
      </div>
    </>
  );
}
