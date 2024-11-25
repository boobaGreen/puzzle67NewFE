// FILE: src/elements/Header.tsx
import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { LuPuzzle } from "react-icons/lu";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useAuth } from "../contexts/AuthContext";
import SwitchSelection from "./SwitchSelection";
import axiosInstance from "../utility/axiosInstance";

export default function Header() {
  const [btcPriceUSD, setBtcPriceUSD] = useState<number | null>(null);
  const [btcPriceEUR, setBtcPriceEUR] = useState<number | null>(null);
  const { address, isConnected } = useAccount();
  const { login } = useAuth();

  useEffect(() => {
    const fetchBtcPrice = async () => {
      try {
        const response = await axiosInstance.get("/btc-price");
        const data = response.data as { bitcoin: { usd: number; eur: number } };
        setBtcPriceUSD(data.bitcoin.usd);
        setBtcPriceEUR(data.bitcoin.eur);
      } catch (error) {
        console.error("Error fetching BTC price:", error);
      }
    };

    fetchBtcPrice();
    const interval = setInterval(fetchBtcPrice, 180000); // Update every 3 minutes

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    if (isConnected && address) {
      login(address);
    }
  }, [isConnected, address, login]);

  const btcAmount = 6.7;
  const usdValue = btcPriceUSD
    ? (btcAmount * btcPriceUSD).toFixed(0)
    : "Loading...";
  const eurValue = btcPriceEUR
    ? (btcAmount * btcPriceEUR).toFixed(0)
    : "Loading...";

  const targetPublicKey = import.meta.env.VITE_TARGET_PUBLIC_KEY; // Use the targetPublicKey from environment variables

  return (
    <header>
      <div className="flex justify-between p-3">
        <IconContext.Provider value={{ color: "black", size: "3em" }}>
          <div>
            <LuPuzzle />
          </div>
        </IconContext.Provider>
        <ConnectButton
          label="ConnectMe!"
          showBalance={false}
          accountStatus={"full"}
          chainStatus={"full"}
        />
      </div>
      <div className="mt-8 font-semibold lg:text-6xl text-4xl w-full flex flex-col items-center">
        <div>PUZZLE 6.7 BTC</div>
        <div className="text-xl lg:text-3xl my-4">
          {`$${usdValue} / €${eurValue}`}
        </div>
      </div>
      <div className="flex w-full justify-center">
        <p>
          <strong>Indirizzo target:</strong> {targetPublicKey}
        </p>
      </div>
      <SwitchSelection />
    </header>
  );
}
