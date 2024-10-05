import React from "react";
import { Img, Heading, Button, Text } from "../";
import TravelImage from "@/assets/images/stake/travel.svg";

interface Props {
  className?: string;
  userImage?: string;
  userRoleText?: React.ReactNode;
  stakeButton?: string;
  pledgeDescription?: React.ReactNode;
}

export default function StakeCard({
  userImage = TravelImage,
  userRoleText = "I am a passenger",
  stakeButton = "Stake for Travel",
  pledgeDescription = "Choose to pledge here and you can earn reward tokens, which can be used to pay for the room you rent...",
  ...props
}: Props) {
  return (
    <div
      {...props}
      className={`${props.className} flex flex-col items-center w-full px-8 py-10 sm:p-4 bg-gray-900_02 rounded-[20px]`}
    >
      <div className="flex flex-col items-center h-full w-full">
        {/* 图片部分，响应式调整 */}
        <Img
          isStatic={true}
          src={userImage}
          alt="I am a"
          className="w-[60%] h-auto mb-6 lg:mb-8"
        />

        {/* 角色描述标题 */}
        <Heading
          size="headingmd"
          as="h5"
          className="mt-4 text-[20px] lg:text-[24px] font-semibold text-white-a700 text-center"
        >
          {userRoleText}
        </Heading>

        {/* 按钮部分，响应式调整 */}
        <Button
          size="lg"
          variant="outline"
          shape="round"
          className="mt-8 lg:mt-10 w-full max-w-[300px] py-3 lg:py-4 text-[16px] lg:text-[18px] rounded-[10px] !border px-[20px] font-semibold"
        >
          {stakeButton}
        </Button>

        {/* 描述文本部分 */}
        <Text
          size="texts"
          as="p"
          className="mt-6 lg:mt-8 w-[92%] text-[14px] lg:text-[16px] font-normal leading-[24px] lg:leading-[28px] text-gray-400 text-center"
        >
          {pledgeDescription}
        </Text>
      </div>
    </div>
  );
}
