'use client';
import React from 'react';
import { Img, Button, Heading, Text, Input } from '@/components/';
import BoxImage from '@/assets/images/stake/travel-box.svg';
import SolIcon from '@/assets/icons/travel-sol.svg';
import BackIcon from '@/assets/icons/travel-back-arrow.svg';
import CopyIcon from '@/assets/icons/copy.svg';
import RightArrowIcon from '@/assets/icons/travel-right-arrow.svg';

export default function StakeTravel() {
  return (
    <div className="relative mb-1 h-[800px] content-center self-stretch lg:h-auto md:h-auto">
      <div className="container-xs flex justify-center lg:px-5 md:px-5">
        <Img
          src={BoxImage}
          alt=""
          width={1448}
          height={800}
          className="h-[800px] w-full lg:h-auto md:h-auto"
        />
      </div>
      <div className="container-xs absolute left-0 right-0 top-[5%] my-auto flex justify-center px-10 lg:px-5 md:px-5">
        <div className="w-full">
          <div className="flex items-center gap-8">
            <Button
              color="black_900_02"
              size="xs"
              className="w-[30px] rounded-[14px] px-1"
            >
              <Img src={BackIcon} width={22} height={22} />
            </Button>
            <Heading
              size="headingxl"
              as="h1"
              className="text-[32px] font-semibold text-white-a700 lg:text-[27px] md:text-[26px] sm:text-[24px]"
            >
              Traveler
            </Heading>
          </div>
          <div className="mx-[66px] mt-[30px] md:mx-0">
            <div className="flex flex-col gap-7">
              <div className="flex items-start justify-center sm:flex-col">
                <div className="flex items-center gap-2.5">
                  <Text
                    size="texts"
                    as="p"
                    className="text-[14px] font-normal text-gray-400"
                  >
                    {'0xBBB6A745sadasd2dsds6hn9'}
                  </Text>
                  <Img
                    src={CopyIcon}
                    width={18}
                    height={18}
                    alt="Image"
                    className="h-[18px] w-[18px]"
                  />
                </div>
                <div className="mt-2 flex flex-1 flex-col  items-start slef-end pl-[120px] pr-14 lg:pl-8 md:px-5 sm:self-stretch sm:px-4">
                  <Img
                    src={SolIcon}
                    width={48}
                    height={48}
                    alt="Image"
                    className="h-[48px] w-[48px] md:ml-0"
                  />
                  <Text
                    size="texts"
                    as="p"
                    className="ml-[38px] mt-6 text-[14px] font-normal text-white-a700 md:ml-0"
                  >
                    Current Stake
                  </Text>
                  <Heading
                    size="heading4xl"
                    as="h2"
                    className="font-dinalternate text-[64px] font-bold !text-lime-400 lg:text-[48px] md:text-[48px]"
                  >
                    456.02
                  </Heading>
                  <Text
                    size="textxl"
                    as="p"
                    className="ml-[70px] text-[20px] font-normal text-white-a700 lg:text-[17px] md:mr-0"
                  >
                    SOL
                  </Text>
                </div>
              </div>
              <div className="rowcurrentstake_border ml-[174px] mr-[170px] flex items-end justify-center rounded-[40px] bg-gradient2 p-6 md:mx-0 md:flex-col sm:p-4">
                <div className="mt-3 flex flex-col items-start gap-2 px-[18px]">
                  <Text
                    size="textlg"
                    as="p"
                    className="text-[14px] font-normal text-white-a700"
                  >
                    Reward available
                  </Text>
                  <Heading
                    size="heading3xl"
                    as={'h3'}
                    className="font-dinalternate text-[36px] font-bold !text-lime-400 lg:text-[30px] md:text-[30px] sm:text-[28px]"
                  >
                    8,560.00
                  </Heading>
                  <Text
                    size="textlg"
                    as="p"
                    className="ml-[30px] text-[14px] font-normal text-white-a700 md:ml-0"
                  >
                    Rewards
                  </Text>
                </div>
                <div className="mb-3 h-[80px] w-[2px] bg-gray_200_99 md:h-[2px] md:w-[80px] md:px-5" />
                <div className="flex flex-col items-end gap-2 pl-14 pr-[74px] lg:pr-8 md:px-5 sm:px-4">
                  <Text
                    size="textlg"
                    as="p"
                    className="text-[14px] font-normal text-white-a700"
                  >
                    Award Received
                  </Text>
                  <Heading
                    size="heading3xl"
                    as={'h4'}
                    className="mr-1.5 font-dinalternate text-[36px] font-bold !text-lime-400 lg:text-[30px] md:mr-0 md:text-[30px] sm:text-[28px]"
                  >
                    230,00
                  </Heading>
                  <Text
                    size="textlg"
                    as="p"
                    className="mr-6 text-[14px] font-normal text-white-a700 md:mr-0"
                  >
                    Rewards
                  </Text>
                </div>
                <Button
                  size="xl"
                  shape="round"
                  rightIcon={
                    <Img
                      src={RightArrowIcon}
                      width={46}
                      height={6}
                      alt=""
                      className="mb-1.5 mt-2.5 h-[6px] w-[46px]"
                    />
                  }
                  className="mb-[22px] min-w-[228px] gap-[26px] rounded-[10px] border border-solid  !border-lime-400 px-[33px] font-semibold !text-black-900_02 md:px-5 bg-lime-400"
                >
                  Harvest
                </Button>
              </div>
              <div className="ml-14 mt-[30px] flex self-stretch md:ml-0 md:flex-col">
                <div className="flex flex-1 flex-col gap-2.5 md:self-stretch">
                  <div className="flex p-2.5">
                    <Text
                      as="p"
                      className="text-[16px] font-medium text-white-a700 lg:text-[13px]"
                    >
                      Augment stake
                    </Text>
                  </div>
                  <div className="flex gap-[22px] sm:flex-col">
                    <div className=" relative h-[56px] w-[52%] content-center lg:h-auto md:h-auto sm:w-full">
                      <Input
                        shape="round"
                        name="inputnumber_one"
                        placeholder={'50'}
                        className="mx-auto flex-grow rounded-[10px] px-4 font-semibold"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        shape="round"
                        className=" absolute bottom-0 right-3.5 top-0 my-auto min-w-[60px] rounded-lg !border px-[15px] font-bold !text-white-a700"
                      >
                        MAX
                      </Button>
                    </div>
                    <Button
                      size="xl"
                      shape="round"
                      className="min-w-[178px] rounded-[10px] px-[34px] font-bold sm:px-4 bg-lime-400"
                    >
                      Augment
                    </Button>
                  </div>
                </div>
                <div className="flex w-[46%] flex-col gap-2.5 md:w-full">
                  <div className="flex p-2.5">
                    <Text
                      as="p"
                      className="text-[16px] font-medium text-white-a700 lg:text-[13px]"
                    >
                      Withdraw stake
                    </Text>
                  </div>
                  <div className="flex justify-center gap-5 sm:flex-col">
                    <div className=" relative h-[56px] flex-1 content-center lg:h-auto md:h-auto sm:w-full sm:flex-none sm:self-stretch">
                      <Input
                        shape="round"
                        name="inputnumber"
                        placeholder={'50'}
                        className="mx-auto rounded-[10px] px-4"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        shape="round"
                        className=" absolute bottom-0 right-3.5 top-0 my-auto min-w-[60px] rounded-lg !border px-[15px] font-bold !text-white-a700"
                      >
                        MAX
                      </Button>
                    </div>
                    <Button
                      size="xl"
                      shape="round"
                      className="min-w-[178px] rounded-[10px] px-[34px] font-bold sm:px-4 bg-lime-400"
                    >
                      Whithdraw
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
