import React from 'react';
import { Img, Heading, Button, Text } from '../';
import TravelImage from '@/assets/images/stake/travel.svg';

interface Props {
  className?: string;
  userImage?: string;
  userRoleText?: React.ReactNode;
  stakeButton?: string;
  pledgeDescription?: React.ReactNode;
}

export default function StakeCard({
  userImage = TravelImage,
  userRoleText = 'I am a passenger',
  stakeButton = 'Stake for Travel',
  pledgeDescription = 'Choose to pledge here and you can earn reward tokens, which can be used to pay for the room you rent...',
  ...props
}: Props) {
  return (
    <div
      {...props}
      className={`${props.className} flex flex-col items-center w-[50%] md:w-full px-8 py-10 sm:p-4 bg-gray-900_02 rounded-[20px]`}
    >
      <Img
        isStatic={true}
        src={userImage}
        width={200}
        height={180}
        alt="I am a"
        className="ml-[58px] mr-11 h-[180px] w-full"
      />
      <Heading
        size="headingmd"
        as="h5"
        className="mt-4 text-[20px] font-semibold text-white-a700"
      >
        {userRoleText}
      </Heading>
      <Button
        size="lg"
        variant="outline"
        shape="round"
        className="ml-[18px] mr-2.5 mt-11 self-stretch rounded-[10px] !border px-[33px] font-semibold sm:px-5"
      >
        {stakeButton}
      </Button>
      <Text
        size="texts"
        as="p"
        className="mb-3 mt-8 w-[92%] self-end text-[14px] font-normal leading-[31px] text-gray-400"
      >
        {pledgeDescription}
      </Text>
    </div>
  );
}
