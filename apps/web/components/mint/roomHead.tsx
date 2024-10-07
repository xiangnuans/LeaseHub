import { Heading, Input } from "..";

export default function RoomHead() {
  return (
    <div className="row-border border-2 border-solid border-lime-400 flex flex-col gap-3 rounded-[20px] bg-gradient2 p-[26px] sm:p-4">
      <div className="flex flex-wrap items-center gap-5">
        <Heading
          as={"h1"}
          className=" text-[20px] font-semibold text-white-a700 lg:text-[17px]"
        >
          Possessor:
        </Heading>
        <Heading
          as={"h2"}
          size="headings"
          className="text-[16px] font-semibold text-white-a700 lg:text-[13px]"
        >
          0xBBB6A7...6hn9
        </Heading>
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        <Heading
          as="h3"
          className="text-[20px] font-semibold text-white-a700 lg:text-[17px]"
        >
          Lock in equity:
        </Heading>
        <Input value={20} />
        <Heading
          as="h5"
          className="text-[20px] font-semibold text-white-a700 lg:text-[17px]"
        >
          %
        </Heading>
      </div>
      <div className=" flex felx-wrap gap-4">
        <Heading
          as="h6"
          className="text-[20px] font-semibold text-white-a700 lg:text-[17px]"
        >
          Release equity:
        </Heading>
        <Heading
          as="h5"
          className="text-[20px] font-semibold !text-lime-400 lg:text-[17px]"
        >
          80%
        </Heading>
      </div>
    </div>
  );
}
