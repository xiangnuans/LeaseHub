"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { ReactQueryProvider } from "@repo/react-query";
import { SolanaProvider } from "@repo/wallet-provider";
import MainLayout from "@/components/main-layout";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <ReactQueryProvider>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>
          <SolanaProvider>
            <MainLayout>{children}</MainLayout>
          </SolanaProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </ReactQueryProvider>
  );
}
