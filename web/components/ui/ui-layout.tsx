'use client';

import { WalletButton } from '../solana/solana-provider';
import * as React from 'react';
import { ReactNode, Suspense, useEffect, useRef } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// import { AccountChecker } from '../stake/ui';
import {
  ClusterChecker,
  // ClusterUiSelect,
  ExplorerLink,
} from '../cluster/cluster-ui';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';

export function UiLayout({
  children,
  links,
}: {
  children: ReactNode;
  links: { label: string; path: string }[];
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex w-full flex-col items-center gap-[98px] bg-black-900_02 py-[52px] lg:gap-[98px] xl:gap-[160px] md:gap-[73px]  md:py-5 sm:gap-[49px] sm:py-4 mx-auto">
      <div className="w-[76%] lg:px-5 md:px-5">
        <header className="flex justify-between items-center gap-5 sm:flex-col">
          <Link className="flex items-center gap-1" href="/">
            <Image
              className="h-[50px]"
              width={186}
              height={50}
              alt="Logo"
              src="/logo.png"
            />
          </Link>
          <ul className="flex flex-wrap gap-10">
            {links.map(({ label, path }) => (
              <li key={path}>
                <Link
                  className={`${
                    pathname === path ? 'text-[#c5f250]' : 'text-[#b8b8b8]'
                  } text-[17px] font-semibold font-['Poppins']`}
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

      {/* <div className="flex-grow container mx-auto">
        <ClusterChecker>
          <AccountChecker />
        </ClusterChecker>

        <Suspense
          fallback={
            <div className="text-center my-32">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          }
        >
          {children}
        </Suspense>
      </div> */}

      {/* Toast 通知 */}
      {/* <Toaster position="bottom-right" /> */}
    </div>
  );
}

export function AppModal({
  children,
  title,
  hide,
  show,
  submit,
  submitDisabled,
  submitLabel,
}: {
  children: ReactNode;
  title: string;
  hide: () => void;
  show: boolean;
  submit?: () => void;
  submitDisabled?: boolean;
  submitLabel?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (!dialogRef.current) return;
    if (show) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [show, dialogRef]);

  return (
    <dialog className="modal" ref={dialogRef}>
      <div className="modal-box space-y-5">
        <h3 className="font-bold text-lg">{title}</h3>
        {children}
        <div className="modal-action">
          <div className="join space-x-2">
            {submit ? (
              <button
                className="btn btn-xs lg:btn-md btn-primary"
                onClick={submit}
                disabled={submitDisabled}
              >
                {submitLabel || 'Save'}
              </button>
            ) : null}
            <button onClick={hide} className="btn">
              Close
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export function AppHero({
  children,
  title,
  subtitle,
}: {
  children?: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
}) {
  return (
    <div className="hero py-[64px]">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          {typeof title === 'string' ? (
            <h1 className="text-5xl font-bold">{title}</h1>
          ) : (
            title
          )}
          {typeof subtitle === 'string' ? (
            <p className="py-6">{subtitle}</p>
          ) : (
            subtitle
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

export function ellipsify(str = '', len = 4) {
  if (str.length > 30) {
    return (
      str.substring(0, len) + '..' + str.substring(str.length - len, str.length)
    );
  }
  return str;
}

export function useTransactionToast() {
  return (signature: string) => {
    toast.success(
      <div className={'text-center'}>
        <div className="text-lg">Transaction sent</div>
        <ExplorerLink
          path={`tx/${signature}`}
          label={'View Transaction'}
          className="btn btn-xs btn-primary"
        />
      </div>
    );
  };
}
