// FILE: FreeMode.tsx
import { useState, useEffect } from "react";
import HexBox from "../components/HexBox";
import CTAButton from "../components/CTAButton";
import * as bitcoin from "bitcoinjs-lib";
import ECPairFactory from "ecpair";
import * as ecc from "tiny-secp256k1";
import { Buffer } from "buffer";

const ECPair = ECPairFactory(ecc);

const hexValues = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
];

const targetPublicKey = import.meta.env.VITE_TARGET_PUBLIC_KEY;

const FreeMode = () => {
  const [values, setValues] = useState(Array(17).fill("0"));

  useEffect(() => {
    const newValues = [...values];
    newValues[0] = "4";
    setValues(newValues);
  }, []);

  const [privateKey, setPrivateKey] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [matchFound, setMatchFound] = useState<boolean>(false);

  const handleChange = (index: number, newValue: string) => {
    const newValues = [...values];
    newValues[index] = newValue;
    setValues(newValues);
  };

  const handleCTAButtonClick = () => {
    const hexValue = values.join("");
    const paddedHex = hexValue.padStart(64, "0");

    console.log("Hex value:", hexValue);
    console.log("Padded hex:", paddedHex);

    try {
      const keyPair = ECPair.fromPrivateKey(Buffer.from(paddedHex, "hex"));
      const { address: btcAddress } = bitcoin.payments.p2pkh({
        pubkey: keyPair.publicKey,
      });

      setPrivateKey(keyPair.toWIF());
      setAddress(btcAddress || "");

      console.log("Chiave privata:", keyPair.toWIF());
      console.log("Indirizzo pubblico:", btcAddress);

      if (btcAddress === targetPublicKey) {
        setMatchFound(true);
        console.log("Chiave pubblica trovata! Operazione completata.");
      } else {
        setMatchFound(false);
        console.log("Chiave pubblica non trovata!");
      }
    } catch (error) {
      console.error("Errore nella generazione della chiave privata:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-10 space-y-4">
      <div className="flex justify-center custom-lg:justify-start space-x-4">
        <HexBox
          initial={values[0]}
          range={["4", "5", "6", "7"]}
          onChange={(value: string) => handleChange(0, value)}
        />
      </div>
      <div className="grid grid-cols-4 gap-4 custom-lg:flex custom-lg:space-x-4">
        {[...Array(16)].map((_, i) => (
          <HexBox
            key={i + 1}
            initial={values[i + 1]}
            range={hexValues}
            onChange={(value: string) => handleChange(i + 1, value)}
          />
        ))}
      </div>
      <CTAButton onClick={handleCTAButtonClick} />
      <div className="mt-4 text-center">
        <p>
          <strong>Chiave privata:</strong> {privateKey}
        </p>
        <p>
          <strong>Indirizzo pubblico:</strong> {address}
        </p>
        <p>
          <strong>Indirizzo target:</strong> {targetPublicKey}
        </p>
        {matchFound && (
          <p className="text-green-500">
            La chiave pubblica è stata trovata! Crea un wallet BTC con la chiave
            WIF fornita, ad esempio con Electrum Wallet, e ritira il premio di
            6.7 BTC.
          </p>
        )}
        {!matchFound && (
          <p className="text-red-500">
            La chiave pubblica non è stata trovata!
          </p>
        )}
      </div>
    </div>
  );
};

export default FreeMode;
