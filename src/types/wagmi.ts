// FILE: wagmi.ts
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "../utility/chain";

export const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [sepolia],
});
