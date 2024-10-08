'use client';
import React from 'react';

import RoomCard from '../room/ui';
import RoomHead from './roomHead';
import RoomLeftDetail from '../room/detail';
import { Button, Heading, Img } from '..';
import UploadIcon from '@/assets/icons/upload.svg';

export default function RentPage() {
  return (
    <div className="flex gap-[26px] md:flex-col w-full">
      <div className="flex w-[32%] flex-col gap-6 md:w-full">
        <RoomHead />
        <RoomLeftDetail />
      </div>
      <RoomCard>
        <div className="mt-9 flex flex-col items-start">
          <Button
            size="xl"
            variant="outline"
            shape="round"
            leftIcon={
              <Img
                src={UploadIcon}
                width={24}
                height={24}
                alt="upload"
                className="w-[24px] h-[24px]"
              />
            }
            className="ml-1.5 mt-[34px] gap-2 self-stretch rounded-[10px] !border-2 px-8 font-bold md:ml-0 sm:px-4"
          >
            Upload house pictures
          </Button>
          <Button
            size="xl"
            shape="round"
            className="mt-7 self-stretch rounded-[10px] px-[34px] bg-lime-400  text-black-900 font-bold sm:px-4"
          >
            Mint
          </Button>
        </div>
      </RoomCard>
    </div>
  );
}
