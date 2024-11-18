// FILE: chains.ts
import { Chain } from "@rainbow-me/rainbowkit";

export const sepolia: Chain = {
  id: 11155111,
  name: "Sepolia Testnet",
  iconUrl: "https://i.imgur.com/Q3oIdip.png",
  iconBackground: "#fff",
  nativeCurrency: { name: "SepoliaETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.sepolia.org"] },
  },
  blockExplorers: {
    default: { name: "Etherscan", url: "https://sepolia.etherscan.io" },
  },
} as const satisfies Chain;
