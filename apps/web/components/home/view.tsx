'use client';
import { Button, Text, Heading, Img } from '@/components/index';
import ArrowImg from '@/assets/images/home-arrow.svg';
import HomeImg from '@/assets/images/home.svg';
import StakeIcon from '@/assets/icons/stake.svg';
import RentIcon from '@/assets/icons/rent.svg';
import MiniIcon from '@/assets/icons/mini-house.svg';
import InvestIcon from '@/assets/icons/investment.svg';
import { useRouter } from 'next/navigation';

const data = [
  {
    title: 'Stake',
    description: 'Pledge your property for income',
    icon: StakeIcon,
    link: '/stake',
  },
  {
    title: 'Rent',
    description: 'Blockchain short-term rental',
    icon: RentIcon,
    link: '/rent',
    isHighlighted: true,
  },
  {
    title: 'Mint House',
    description: 'Upload houses to earn income',
    icon: MiniIcon,
    link: '/mini-house',
  },
  {
    title: 'Investment',
    description: 'Invest in blockchain property',
    icon: InvestIcon,
    link: '/investment',
  },
];

export default function View() {
  const router = useRouter();

  const handleHref = (d: { title: string; link: string }) => {
    router.push(d.link);
  };
  return (
    <>
      <div className="self-stretch">
        <div className="flex items-start md:flex-col">
          <div className="flex-1 md:self-stretch">
            <div className="flex flex-col">
              <div className="flex items-start self-stretch md:flex-col">
                <Heading
                  size="headinglg"
                  as="h1"
                  className="mt-9 text-[24px] font-bold text-lime-400  lg:text-[20px]"
                >
                  <span className="text-lime-400">
                    Earn Fixed Income with Blockchain
                  </span>
                </Heading>
                <Img
                  width={464}
                  height={216}
                  src={ArrowImg}
                  isStatic={true}
                  alt="Element"
                  className="relative ml-[-72px] h-[216px] w-[52%] self-center object-contain md:ml-0 md:w-full"
                />
              </div>
              <Heading
                size="heading4xl"
                as="h2"
                className="flex items-start relative mt-[-130px] text-[64px] font-extrabold leading-[96px] text-white-a700 lg:text-[48px] md:text-[48px]"
              >
                <span className="text-white-a700">
                  <>
                    Unlocaking Commerical <br />
                  </>
                  <span className="text-lime-400">Your real Estate</span>
                </span>
              </Heading>
            </div>
            <div className="relative mr-5  flex flex-col items-start md:mr-0">
              <Text
                className="w-full font-rubik text-[16px] font-normal leading-[31px] text-gray-400 lg:text-[13px] mb-8"
                as="p"
              >
                Robinland provides fixed passive income to retail investors by
                tokenizing institutional-grade commercial real estate in a legal
                and decentralized fashion.
              </Text>
              <Button
                size="md"
                variant="outline"
                shape="round"
                className=" relative mt-[-8px] main-w-[154px] rounded-lg !border px-[33px] font-semibold sm:px-4"
              >
                Get Start
              </Button>
            </div>
          </div>
          <Img
            src={HomeImg}
            width={668}
            height={464}
            alt=""
            isStatic={true}
            className="h-[464px] w-[44%] self-center object-contain md:w-full"
          />
        </div>
      </div>
      <div className="container-xs flex gap-7 md:flex-col">
        {data.map((d, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center w-[24%] md:w-full gap-7 p-[38px] sm:p-4 bg-gray-900_02 rounded-[20px]`}
            onClick={() => handleHref(d)}
          >
            <div className="flex rounded-md bg-lime-400_23 p-3">
              <Img
                src={d.icon}
                width={36}
                height={36}
                alt={d.title}
                isStatic={true}
                className="h-[36px] w-[36px]"
              />
            </div>
            <div className="flex flex-col items-center gap-3 self-stretch">
              <Heading
                as="h4"
                size="headinglg"
                className="text-[24px] font-bold text-white-a700"
              >
                {d.title}
              </Heading>
              <Text
                as="p"
                className="font-rubik text-[16px] font-normal text-gray-400"
              >
                {d.description}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
