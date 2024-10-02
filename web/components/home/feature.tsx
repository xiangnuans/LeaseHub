'use client';
import Image from 'next/image';
import HomeImage from '@/assets/images/home.svg';
import ArrowImage from '@/assets/images/home-arrow.svg';

// const links: { label: string; href: string }[] = [
//   { label: 'Solana Docs', href: 'https://docs.solana.com/' },
//   { label: 'Solana Faucet', href: 'https://faucet.solana.com/' },
//   { label: 'Solana Cookbook', href: 'https://solanacookbook.com/' },
//   { label: 'Solana Stack Overflow', href: 'https://solana.stackexchange.com/' },
//   {
//     label: 'Solana Developers GitHub',
//     href: 'https://github.com/solana-developers/',
//   },
// ];

export default function DashboardFeature() {
  return (
    <div>
      <Image
        src={ArrowImage}
        alt="Arrow Image"
        width={464}
        height={216}
        priority
        className="absolute left-[523px] top-[212px]"
      />
      <Image
        src={HomeImage}
        alt="Home Image"
        width={668}
        height={465}
        priority
        className="absolute right-[212px] top-[212px]"
      />
      <div className="left-[212px] top-[212px] absolute text-[#c5f250] text-2xl font-bold font-['Poppins']">
        Earn Fixed Income with Blockchain
      </div>
      <div className="w-[819px] h-[263px] left-[212px] top-[286px] absolute">
        <span className="text-white text-[64px] font-extrabold font-['Poppins']">
          Unlocking Commercial <br />
        </span>
        <span className="text-[#c5f250] text-[64px] font-extrabold font-['Poppins']">
          Your Real Estate
        </span>
      </div>
      <div className="w-[799px] h-28 left-[212px] top-[486px] absolute text-[#b8b8b8] text-base font-normal font-['Rubik'] leading-[31px]">
        Robinland provides fixed passive income to retail investors by
        tokenizing institutional-grade commercial real estate in a legal and
        decentralized fashion.
      </div>
      <div className="w-[464px] h-[216px] left-[593px] top-[201px] absolute"></div>
      <div className="w-[155.70px] h-[42px] left-[212px] top-[590px] absolute">
        <div className="w-[155.70px] h-[42px] left-0 top-0 absolute rounded-[9px] border border-[#c5f250]" />
        <div className="w-[99.77px] left-[28.72px] top-[8px] absolute text-center text-[#c5f250] text-[17px] font-semibold font-['Poppins']">
          Get Start
        </div>
      </div>
      <div className="w-[340px] h-[245px] left-[212px] top-[746px] absolute">
        <div className="w-[340px] h-[245px] left-0 top-0 absolute bg-[#1d1d21] rounded-[21px]" />
        <div className="left-[135px] top-[135.32px] absolute text-center text-white text-2xl font-bold font-['Poppins']">
          Stake
        </div>
        <div className="left-[50px] top-[178px] absolute text-center text-[#b8b8b8] text-base font-normal font-['Rubik'] leading-[31px]">
          Pledge your property for income
        </div>
        <div className="w-[72px] h-[66px] left-[134px] top-[41.32px] absolute">
          <div className="w-[72px] h-[66px] left-0 top-0 absolute bg-[#c5f250]/10 rounded-md" />
          <div className="w-[37.88px] h-[37.88px] px-[4.73px] py-[3.16px] left-[17px] top-[13.84px] absolute justify-center items-center inline-flex" />
        </div>
      </div>
      <div className="w-[340px] h-[245px] left-[606px] top-[746px] absolute">
        <div className="w-[340px] h-[245px] left-0 top-0 absolute bg-[#1d1d21] rounded-[21px] border-2 border-[#c5f250]" />
        <div className="left-[142px] top-[135.32px] absolute text-center text-white text-2xl font-bold font-['Poppins']">
          Rent
        </div>
        <div className="left-[62px] top-[212px] absolute text-center text-[#b8b8b8] text-base font-normal font-['Rubik'] leading-[31px]">
          Blockchain short-term rental
        </div>
        <div className="w-[72px] h-[66px] left-[134px] top-[41.32px] absolute">
          <div className="w-[72px] h-[66px] left-0 top-0 absolute bg-[#c5f250]/10 rounded-md border" />
          <div className="w-[37.88px] h-[37.88px] left-[17px] top-[13.84px] absolute border" />
        </div>
      </div>
      <div className="w-[340px] h-[245px] left-[974px] top-[746px] absolute">
        <div className="w-[340px] h-[245px] left-0 top-0 absolute bg-[#1d1d21] rounded-[21px]" />
        <div className="left-[101px] top-[135.32px] absolute text-center text-white text-2xl font-bold font-['Poppins']">
          Mint House
        </div>
        <div className="left-[56px] top-[212px] absolute text-center text-[#b8b8b8] text-base font-normal font-['Rubik'] leading-[31px]">
          Upload houses to earn income
        </div>
        <div className="w-[72px] h-[66px] left-[134px] top-[41.32px] absolute">
          <div className="w-[72px] h-[66px] left-0 top-0 absolute bg-[#c5f250]/10 rounded-md" />
          <div className="w-[37.88px] h-[37.88px] left-[17px] top-[13.84px] absolute">
            <div className="w-[14.99px] h-[16.25px] left-[11.94px] top-[11.94px] absolute"></div>
          </div>
        </div>
      </div>
      <div className="w-[340px] h-[245px] left-[1342px] top-[746px] absolute">
        <div className="w-[340px] h-[245px] left-0 top-0 absolute bg-[#1d1d21] rounded-[21px]" />
        <div className="left-[99px] top-[135.32px] absolute text-center text-white text-2xl font-bold font-['Poppins']">
          Investment
        </div>
        <div className="left-[61px] top-[212px] absolute text-center text-[#b8b8b8] text-base font-normal font-['Rubik'] leading-[31px]">
          Invest in blockchain property
        </div>
        <div className="w-[72px] h-[66px] left-[134px] top-[41.32px] absolute">
          <div className="w-[72px] h-[66px] left-0 top-0 absolute bg-[#c5f250]/10 rounded-md" />
          <div className="w-[37.88px] h-[37.88px] pl-[2.26px] pr-[1.94px] pt-[1.94px] pb-[2.33px] left-[17px] top-[13.84px] absolute justify-center items-center inline-flex">
            <div className="w-[33.68px] h-[33.61px] relative"></div>
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto py-6 sm:px-6 lg:px-8 text-center">
        <div className="space-y-2">
          {/* {links.map((link, index) => (
            <div key={index}>
              <a
                href={link.href}
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}
