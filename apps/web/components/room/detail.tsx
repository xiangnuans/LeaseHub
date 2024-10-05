import { Button, Heading, Input } from "..";

export default function RoomLeftDetail() {
  return (
    <div className="flex flex-col gap-1.5 rounded-[14px] border-2 border-solid border-lime-400 bg-gray-900_03 p-[18px]">
      <div className="ml-2 flex flex-col gap-6 md:ml-0">
        <div className="flex flex-col items-start gap-2">
          <Heading
            size="headings"
            as="h6"
            className="text-[16px] font-semibold lg:text-[13px]"
          >
            Total amount of house tokens:
          </Heading>
          <Input
            size="xs"
            shape="round"
            name="amount"
            placeholder="2000"
            className="self-stretch rounded-[10px] px-4 font-semibold"
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <Heading
            size="headings"
            as="h6"
            className="text-[16px] font-semibold lg:text-[13px]"
          >
            Evaluate price:
          </Heading>
          <Input
            size="xs"
            shape="round"
            name="amount"
            placeholder="20"
            className="self-stretch rounded-[10px] px-4 font-semibold"
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <Heading
            size="headings"
            as="h6"
            className="text-[16px] font-semibold lg:text-[13px]"
          >
            Review signature:
          </Heading>
          <Input
            size="xs"
            shape="round"
            name="amount"
            placeholder="0xBBB6A734234gyjg66hn9"
            className="self-stretch rounded-[10px] px-4 font-semibold"
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <Heading
            size="headings"
            as="h6"
            className="text-[16px] font-semibold lg:text-[13px]"
          >
            Auditing agency:
          </Heading>
          <Input
            size="xs"
            shape="round"
            name="amount"
            placeholder="XXXXXXXXXX"
            className="self-stretch rounded-[10px] px-4 font-semibold"
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <Heading
            size="headings"
            as="h6"
            className="text-[16px] font-semibold lg:text-[13px]"
          >
            Signer's address:
          </Heading>
          <Input
            size="xs"
            shape="round"
            name="amount"
            placeholder="0xBBB6A7...6hn9"
            className="self-stretch rounded-[10px] px-4 font-semibold"
          />
        </div>
      </div>
      <Button
        size="xl"
        shape="round"
        className="my-8 ml-2 self-stretch rounded-[10px] px-[34px] font-bold md:ml-0 sm:p-4 bg-lime-400 text-black-900"
      >
        Submit
      </Button>
    </div>
  );
}
