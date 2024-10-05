import dotenv from "dotenv";
dotenv.config();

export type SiteConfig = typeof siteConfig;
export const isDev = process.env.NODE_ENV === "development";

export const siteConfig = {
  name: "LeaseHub",
  description: "LeaseHub",
  navItems: [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Stake",
      path: "/stake",
    },
    {
      label: "Rent",
      path: "/rent",
    },
    {
      label: "Mint",
      path: "/mint",
    },
    {
      label: "Investment",
      path: "/investment",
    },
  ],
  // shareLink: (inviteCode: string) =>
  //   `${process.env.NEXT_PUBLIC_SHARE_BOT_LINK}?startapp=${inviteCode}`,
  // shareText: process.env.NEXT_PUBLIC_SHARE_TEXT,
};
