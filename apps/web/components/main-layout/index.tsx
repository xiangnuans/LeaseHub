'use client';
import * as React from 'react';
import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { WalletButton } from '@repo/wallet-provider';

export default function UiLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex w-full flex-col items-center gap-[98px] bg-black-900_02 py-[52px] lg:gap-[98px] xl:gap-[160px] md:gap-[73px] md:py-5 sm:gap-[49px] sm:py-4 mx-auto">
      <div className="w-[76%] lg:px-5 md:px-5">
        <header className="flex justify-between items-center gap-5 sm:flex-col">
          <Link className="flex items-center gap-1" href="/">
            <Image
              className="h-[50px]"
              width={186}
              height={50}
              alt="Logo"
              src="/LeaseHub/logo.png"
            />
          </Link>
          <ul className="flex flex-wrap gap-10 relative z-10">
            {siteConfig.navItems.map(({ label, path }) => (
              <li key={path}>
                <Link
                  className={`${
                    path === '/'
                      ? pathname === path // 首页只匹配完全等于 "/"
                        ? 'text-[#c5f250]'
                        : 'text-[#b8b8b8]'
                      : pathname?.startsWith(path) // 其他页面使用 startsWith 进行匹配
                        ? 'text-[#c5f250]'
                        : 'text-[#b8b8b8]'
                  } text-[20px] md:text-[17px] lg:text-[20px] xl:text-[24px] font-semibold font-['Poppins']`}
                  href={path}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <WalletButton />
        </header>
      </div>
      <div className="mb-1 flex w-[76%] flex-col items-center gap-20 lg:w-full lg:gap-20 lg:px-5 md:w-full md:gap-[60px] md:px-5 sm:gap-10">
        {children}
      </div>
    </div>
  );
}
