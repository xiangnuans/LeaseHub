'use client';

import { Img } from '../Img';
import Card from './card';
import Verifier from '@/assets/images/stake/verifier.svg';
import LeftArrow from '@/assets/images/stake/left-arrow.svg';
import RgihtArrow from '@/assets/images/stake/right-arrow.svg';

export default function StakePage() {
  return (
    <>
      <Img
        src={RgihtArrow}
        alt=""
        isStatic={true}
        width={1058}
        height={970}
        className="absolute bottom-[7px] right-[11%] m-auto h-[970px] w-[54%] object-contain"
      />
      <div className=" container-xs flex items-center justify-center px-14 lg:px-5 md:flex-col md:px-5">
        <Img
          isStatic={true}
          src={LeftArrow}
          width={560}
          height={584}
          className="mb-[110px] h-[584px] w-[30%] self-end object-contain md:w-full md:self-auto"
        />
        <div
          className={`relative ml-[-534px] flex h-[1080px] w-[64%] items-start justify-center  bg-cover bg-no-repeat px-14 py-[234px] lg:h-auto lg:py-8 md:ml-0 md:h-auto md:w-full md:p-5 sm:p-4`}
          style={{
            backgroundImage: `url('/bg.svg')`,
          }}
        >
          <div className=" mb-[38px] ml-[46px] flex w-[82%] gap-[120px] lg:ml-0 md:ml-0 md:flex-col">
            <Card />
            <Card
              userImage={Verifier}
              userRoleText="I'm the verifier"
              stakeButton="Stake fro Verify"
              pledgeDescription="By choosing to pledge here, you will become a verifier and make efforts for the entire property agreement..."
            />
          </div>
        </div>
      </div>
    </>
  );
}
