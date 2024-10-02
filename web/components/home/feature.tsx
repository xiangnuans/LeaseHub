'use client';
import Image from 'next/image';
import HomeImage from '@/assets/images/home.svg';
import ArrowImage from '@/assets/images/home-arrow.svg';
import Link from 'next/link';

export default function DashboardFeature() {
  const features = [
    {
      title: 'Stake',
      description: 'Pledge your property for income',
      bgColor: '#c5f250/10',
      link: '/stake',
    },
    {
      title: 'Rent',
      description: 'Blockchain short-term rental',
      bgColor: '#c5f250/10',
      link: '/rent',
      isHighlighted: true,
    },
    {
      title: 'Mint House',
      description: 'Upload houses to earn income',
      bgColor: '#c5f250/10',
      link: '/mini-house',
    },
    {
      title: 'Investment',
      description: 'Invest in blockchain property',
      bgColor: '#c5f250/10',
      link: '/investment',
    },
  ];

  return (
    <div className="relative bg-black text-white flex flex-col items-center justify-center w-full px-4">
      {/* 主体内容区域 */}
      <div className="relative w-full flex flex-col lg:flex-row items-center lg:items-start justify-between mt-10 md:mt-20">
        {/* 左侧：文字和按钮 */}
        <div className="flex-1 lg:w-1/2 lg:pr-8 text-center lg:text-left">
          <h1 className="text-[#c5f250] text-2xl md:text-4xl font-bold font-['Poppins'] mb-4">
            Earn Fixed Income with Blockchain
          </h1>
          <h2 className="text-white text-3xl md:text-6xl font-extrabold font-['Poppins'] leading-tight">
            Unlocking Commercial <br />
            <span className="text-[#c5f250]">Your Real Estate</span>
          </h2>

          {/* 描述 */}
          <p className="max-w-xl mt-6 md:mt-8 text-base md:text-lg text-[#b8b8b8] font-normal font-['Rubik'] leading-relaxed">
            Robinland provides fixed passive income to retail investors by
            tokenizing institutional-grade commercial real estate in a legal and
            decentralized fashion.
          </p>

          {/* 按钮 */}
          <div className="mt-8 md:mt-10">
            <button className="px-6 py-2 text-[#c5f250] border border-[#c5f250] rounded-md font-['Poppins'] font-semibold hover:bg-[#c5f250]/10 transition">
              Get Start
            </button>
          </div>
        </div>

        {/* 右侧：HomeImage 图片 */}
        <div className="flex-1 lg:w-1/2 relative hidden lg:block">
          <Image
            src={HomeImage}
            alt="Home Image"
            width={668}
            height={465}
            priority
          />
        </div>
      </div>

      {/* 动态生成区块 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 md:mt-20 w-full">
        {features.map((feature, index) => (
          <Link href={feature.link} key={index} className="w-full">
            <div
              className={`bg-[#1d1d21] rounded-[21px] p-6 text-center cursor-pointer 
          ${feature.isHighlighted ? 'border-2 border-[#c5f250]' : ''}
        `}
            >
              <div
                className={`w-[72px] h-[66px] mx-auto mb-4 rounded-md`}
                style={{ backgroundColor: feature.bgColor }}
              />
              <h3 className="text-white text-2xl font-bold">{feature.title}</h3>
              <p className="text-[#b8b8b8] mt-2">{feature.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
