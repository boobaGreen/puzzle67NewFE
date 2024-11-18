import React, { useEffect, useState } from "react";
import axios from "axios";
import { IconContext } from "react-icons";
import { LuPuzzle } from "react-icons/lu";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import SwitchSelection from "./SwitchSelection";

export default function Header() {
  const [btcPriceUSD, setBtcPriceUSD] = useState<number | null>(null);
  const [btcPriceEUR, setBtcPriceEUR] = useState<number | null>(null);

  useEffect(() => {
    const fetchBtcPrice = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur"
        );
        const data = response.data as { bitcoin: { usd: number; eur: number } };
        setBtcPriceUSD(data.bitcoin.usd);
        setBtcPriceEUR(data.bitcoin.eur);
      } catch (error) {
        console.error("Error fetching BTC price:", error);
      }
    };

    fetchBtcPrice();
    const interval = setInterval(fetchBtcPrice, 180000); // Update every minute

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const btcAmount = 6.7;
  const usdValue = btcPriceUSD
    ? (btcAmount * btcPriceUSD).toFixed(0)
    : "Loading...";
  const eurValue = btcPriceEUR
    ? (btcAmount * btcPriceEUR).toFixed(0)
    : "Loading...";

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
      <SwitchSelection />
    </header>
  );
}
