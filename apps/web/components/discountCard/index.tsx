"use client";
import { Heading } from "../heading";

interface Props {
  className?: string;
  discountPercentage?: React.ReactNode;
  lockText?: React.ReactNode;
}

export default function DiscountCard({
  discountPercentage = "20%",
  lockText = "Lock",
  ...props
}: Props) {
  return (
    <div
      {...props}
      className="flex flex-col justify-center w-[50%] sm:w-full gap-2 p-[26px] sm:p-4 bg-lime-400_33 rounded-[10px]"
    >
      <Heading
        size="heading3xl"
        as="h2"
        className="text-[32px] font-semibold !text-lime-400"
      >
        {discountPercentage}
      </Heading>
      <Heading as="h5" className="text-[20px] font-semibold text-white-a700">
        {lockText}
      </Heading>
    </div>
  );
}
