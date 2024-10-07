import { Suspense } from "react";
import { Button, Heading, Img, Text } from "..";
import RoomImage from "@/assets/images/room/room.svg";
import Room1 from "@/assets/images/room/1.svg";
import { DatePicker } from "@nextui-org/date-picker";
import Accordion from "@/components/accordion";
import DiscountCard from "../discountCard";

const pictureMock = [
  {
    path: Room1,
  },
  {
    path: Room1,
  },
  {
    path: Room1,
  },
  {
    path: Room1,
  },
];

interface Props {
  children?: any;
  className?: string;
}

const RoomCard = ({ children, className }: Props) => {
  return (
    <div className="flex-1 md:self-stretch">
      <div className="flex items-start gap-[22px] rounded-[14px] border-2 border-solid border-lime-400 px-[26px] py-7 md:flex-col sm:p-4">
        <div className="flex-1 md:self-stretch">
          <div className="flex flex-col gap-4">
            <Img
              src={RoomImage}
              width={476}
              height={288}
              alt=""
              className="w-full rounded-[5px] object-cover"
            />
            <div className="flex gap-1.5 md:flex-row sm:flex-col overflow-auto w-full">
              <Suspense fallback={<div>Loading... </div>}>
                {pictureMock.map((d, index) => (
                  <Img
                    key={index}
                    src={d.path}
                    width={135}
                    height={82}
                    alt="room"
                    className="w-[30%] h-[82px] rounded-[5px] object-cover sm:w-full"
                  />
                ))}
              </Suspense>
            </div>
          </div>
          {children ? (
            children
          ) : (
            <div className="mt-9 flex flex-col items-start">
              <DatePicker label="Start Date" />
              <DatePicker label="End date" className="w-full mt-4" />
              <Button
                size="xl"
                shape="round"
                className="mt-7 self-stretch rounded-[10px] px-[34px] bg-lime-400  text-black-900 font-bold sm:px-4"
              >
                Take it
              </Button>
              <Heading
                as="h5"
                className="ml-3 mt-7 text-[20px] font-semibold text-white-a700 lg:text-[17px] md:ml-0"
              >
                Want to investment?
              </Heading>
            </div>
          )}
        </div>
        <div className="mb-2 flex w-[46%] flex-col items-start gap-4 self-center md:w-full">
          <div className="flex flex-col items-start self-stretch">
            <Heading
              as={"h5"}
              className="text-[20px] font-semibold text-white-a700 lg:text-[17px]"
            >
              Room name:
            </Heading>
            <Heading
              size="heading3xl"
              as="h2"
              className="text-[32px] font-semibold text-white-a700 lg:text-[27px] md:text-[26px] sm:text-[24px]"
            >
              GOGO ROOM
            </Heading>
          </div>
          <div className="flex flex-col items-start self-stretch">
            <Heading
              as="h5"
              className="text-[20px] font-semibold text-white-a700 lg:text-[17px]"
            >
              Price:
            </Heading>
            <div className="flex items-center self-stretch">
              <Heading
                size="headingxl"
                as="h4"
                className="text-[24px] font-semibold !text-lime-400 lg:text-[20px] mr-2"
              >
                3000
              </Heading>
              <Heading
                size="textxl"
                as="p"
                className="text-[15px] font-medium text-white-a700"
              >
                Rewards
              </Heading>
              <Heading
                size="textxl"
                as="p"
                className="ml-2.5 text-[15px] font-normal text-white-a700"
              >
                /
              </Heading>
              <div className="flex flex-1 flex-wrap items-center px-2.5">
                <Heading
                  size="headingxl"
                  as="h4"
                  className="text-[24px] font-semibold !text-lime-400 lg:text-[20px] mr-2"
                >
                  400
                </Heading>
                <Heading
                  size="textxl"
                  as="p"
                  className="text-[15px] font-medium text-white-a700"
                >
                  usdt
                </Heading>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 self-stretch">
            <Heading
              as="h5"
              className="text-[20px] font-semibold text-white-a700 lg:text-[17px]"
            >
              Available time:
            </Heading>
            <Heading
              size="headings"
              as="h6"
              className="rounded-[5px] border border-solid border-lime-400 px-1.5 py-0.5 text-[16px] font-semibold text-white-a700 lg:text-[13px]"
            >
              View details:
            </Heading>
          </div>
          <Heading
            size="heading2xl"
            as="h4"
            className="text-[26px] font-semibold text-white-a700 lg:text-[22px]"
          >
            60 m2, 2 rooms 1 hall
          </Heading>
          <div className="w-full">
            <Accordion />
          </div>
          <div className="flex flex-wrap items-center gap-[18px] self-stretch">
            <Heading
              as="h5"
              className="text-[20px] font-semibold text-white-a700 lg:text-[17px]"
            >
              On-chain address:
            </Heading>
            <Heading
              size="headings"
              as="h6"
              className="text-[16px] font-semibold text-white-a700 lg:text-[13px]"
            >
              0xBBB6A7...6hn9
            </Heading>
          </div>
          <div className=" relative h-[220px] self-stretch lg:h-auto md:h-auto">
            <div className="ml-5 mt-2.5 flex flex-1 flex-col items-start gap-3 lg:ml-0 md:ml-0">
              <Heading
                as="h5"
                className="text-[20px] font-semibold text-white-a700 lg:text-[17px]"
              >
                Equity:
              </Heading>
              <div className="mr-[18px] flex gap-[18px] self-stretch md:mr-0 md:flex-row sm:flex-col">
                <DiscountCard />
                <DiscountCard discountPercentage="80%" lockText="Unlock" />
              </div>
            </div>
            <div className=" absolute bottom-0 left-0 right-0 top-0 m-auto h-[220px] flex-1 rounded-[20px] border-2 border-solid border-lime-400" />
          </div>
          <div className="flex flex-wrap items-center gap-[21px] self-stretch">
            <Heading
              as="h5"
              className="text-[20px] font-semibold text-white-a700 lg:text-[17px]"
            >
              Most Position:
            </Heading>
            <Text
              as="p"
              className="text-[16px] font-medium text-white-a700 lg:text-[13px]"
            >
              0xdas651ae65fa61.....
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
