import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

// Configure wagmi config for Web3
export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

// Privy configuration
export const privyClientConfig = {
  appId: process.env.NEXT_PUBLIC_PRIVY_APP_ID as string,
  loginMethods: ["email", "google", "github", "discord", "wallet"],
  appearance: {
    theme: "dark",
    accentColor: "#3B82F6", // blue-500
    logo: "/logo.png",
    showWalletLoginFirst: false,
    defaultWalletLoginButtonLabel: "Connect Wallet",
  },
  supportedChains: [mainnet, sepolia],
  defaultChain: mainnet,
};

// Types for Privy user
export interface PrivyUser {
  id: string;
  email?: string;
  google?: {
    email: string;
    name: string;
    picture: string;
  };
  github?: {
    email: string;
    username: string;
    avatar_url: string;
  };
  discord?: {
    email: string;
    username: string;
    avatar_url: string;
  };
}
