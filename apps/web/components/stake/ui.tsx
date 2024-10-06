"use client";

import { Img } from "../Img";
import Card from "./card";
import Verifier from "@/assets/images/stake/verifier.svg";
import LeftArrow from "@/assets/images/stake/left-arrow.svg";
import RightArrow from "@/assets/images/stake/right-arrow.svg";
import { useRouter } from "next/navigation";

export default function StakePage() {
  const router = useRouter();
  const handleTravel = () => {
    router.push("/stake/address");
  };
  return (
    <div
      className="relative w-full min-h-screen bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `url('/bg.svg')`, // 背景图路径
        backgroundSize: "60% auto", // 将背景图的大小缩小到 80%
        backgroundPosition: "top center", // 背景图从顶部居中显示
      }}
    >
      <Img
        src={LeftArrow}
        alt="Left Arrow"
        isStatic={true}
        className="absolute left-[5%] top-[52%] transform -translate-y-1/2 w-[30%] h-auto object-contain md:w-[30%]"
      />
      <Img
        src={RightArrow}
        alt="Right Arrow"
        isStatic={true}
        className="absolute right-0 top-[30%] transform -translate-y-1/2 w-[70%] h-auto object-contain md:w-[30%]"
      />

      <div className="flex items-center justify-center h-full w-full px-5 pt-[5%]">
        <div className="flex w-[62%] gap-[60px] justify-center relative z-10 md:flex-col md:w-full">
          <Card onClick={handleTravel} />
          <Card
            userImage={Verifier}
            userRoleText="I'm the verifier"
            stakeButton="Stake for Verify"
            pledgeDescription="By choosing to pledge here, you will become a verifier and make efforts for the entire property agreement..."
          />
        </div>
      </div>
    </div>
  );
}
