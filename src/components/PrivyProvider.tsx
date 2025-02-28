"use client";

import { PrivyProvider as Privy } from "@privy-io/react-auth";
import { WagmiProvider } from "@privy-io/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { privyClientConfig, config } from "@/lib/privy";

// Create a new QueryClient instance outside of the component
const queryClient = new QueryClient();

export function PrivyProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Privy appId={privyClientConfig.appId}>
        <WagmiProvider config={config}>
          {children}
        </WagmiProvider>
      </Privy>
    </QueryClientProvider>
  );
}
