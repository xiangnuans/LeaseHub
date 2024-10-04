import {
  Accordion,
  AccordionItem,
  AccordionItemPanel,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemState,
} from 'react-accessible-accordion';
import { Heading } from '../heading';
import { Img } from '../Img';
import DownIcon from '@/assets/icons/rent-down-arrow.svg';
import WifiIcon from '@/assets/icons/rent/wifi.svg';
import GroceriedIcon from '@/assets/icons/rent/groceries.svg';
import RestaurantIcon from '@/assets/icons/rent/restaurant.svg';
import LoungeIcon from '@/assets/icons/rent/lounge.svg';
import WashingIcon from '@/assets/icons/rent/washing.svg';
import BathubIcon from '@/assets/icons/rent/bathub.svg';
import ParkingIcon from '@/assets/icons/rent/parking.svg';
import ACIcon from '@/assets/icons/rent/ac.svg';

const accordionData = [
  {
    label: 'Equeipment requirement',
  },
];

export default function AccordionComponent() {
  return (
    <Accordion
      preExpanded={[0]}
      className="flex-col rounded-[10px] bg-gray-900_03 px-6 py-3.5 sm:px-4"
    >
      {accordionData.map((d, i) => (
        <AccordionItem uuid={i} key={`expandableliste${i}`}>
          <div className="mb-3.5 flex flex-1 flex-col gap-8">
            <AccordionItemHeading className="w-full">
              <AccordionItemButton>
                <AccordionItemState>
                  {(props) => (
                    <>
                      <div className="flex items-start justify-center gap-[26px]">
                        <div className="flex flex-1 items-start justify-between gap-5 self-center">
                          <Heading
                            size="headingmd"
                            as={'h6'}
                            className="self-cneter text-[17.76px] font-semibold text-white-a700 lg:text-[14px]"
                          >
                            {d.label}
                          </Heading>
                          <div className="h-[20px] w-px bg-white-a700" />
                        </div>
                        <Img
                          src={DownIcon}
                          width={14}
                          height={14}
                          className="mt-1 h-[14px] w-[14px] rounded-[1px]"
                        />
                      </div>
                    </>
                  )}
                </AccordionItemState>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="mr-4 flex flex-col gap-8 md:mr-0">
                <div className="flex justify-between gap-5">
                  <div className="flex flex-col items-center gap-2.5">
                    <Img
                      src={WifiIcon}
                      width={18}
                      height={14}
                      className="h-[14px]"
                    />
                    <Heading
                      size="headingmd"
                      as="p"
                      className="text-[13.32px] font-medium text-white-a700"
                    >
                      Free Wifi
                    </Heading>
                  </div>
                  <div className="flex flex-col items-center gap-2.5">
                    <Img
                      src={GroceriedIcon}
                      width={18}
                      height={14}
                      className="h-[14px]"
                    />
                    <Heading
                      size="headingmd"
                      as="p"
                      className="text-[13.32px] font-medium text-white-a700"
                    >
                      Groceries
                    </Heading>
                  </div>
                  <div className="flex flex-col items-center gap-2.5">
                    <Img
                      src={RestaurantIcon}
                      width={18}
                      height={14}
                      className="h-[14px]"
                    />
                    <Heading
                      size="headingmd"
                      as="p"
                      className="text-[13.32px] font-medium text-white-a700"
                    >
                      Restaurant
                    </Heading>
                  </div>
                  <div className="flex flex-col items-center gap-2.5">
                    <Img
                      src={LoungeIcon}
                      width={18}
                      height={14}
                      className="h-[14px]"
                    />
                    <Heading
                      size="headingmd"
                      as="p"
                      className="text-[13.32px] font-medium text-white-a700"
                    >
                      Lounge
                    </Heading>
                  </div>
                </div>
                <div className="mr-3 flex items-center justify-between gap-5 md:mr-0">
                  <div className="flex flex-col items-center gap-2.5">
                    <Img
                      src={WashingIcon}
                      width={24}
                      height={20}
                      className="h-[14px]"
                    />
                    <Heading
                      size="headingmd"
                      as="p"
                      className="text-[13.32px] font-medium text-white-a700"
                    >
                      Washing
                    </Heading>
                  </div>
                  <div className="flex flex-col items-center gap-2.5">
                    <Img
                      src={BathubIcon}
                      width={18}
                      height={14}
                      className="h-[14px]"
                    />
                    <Heading
                      size="headingmd"
                      as="p"
                      className="text-[13.32px] font-medium text-white-a700"
                    >
                      Bathub
                    </Heading>
                  </div>
                  <div className="flex flex-col items-center gap-2.5">
                    <Img
                      src={ParkingIcon}
                      width={18}
                      height={14}
                      className="h-[14px]"
                    />
                    <Heading
                      size="headingmd"
                      as="p"
                      className="text-[13.32px] font-medium text-white-a700"
                    >
                      Parking
                    </Heading>
                  </div>
                  <div className="flex flex-col items-center gap-2.5">
                    <Img
                      src={ACIcon}
                      width={18}
                      height={14}
                      className="h-[14px]"
                    />
                    <Heading
                      size="headingmd"
                      as="p"
                      className="text-[13.32px] font-medium text-white-a700"
                    >
                      AC
                    </Heading>
                  </div>
                </div>
              </div>
            </AccordionItemPanel>
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
