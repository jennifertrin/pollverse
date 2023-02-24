import React, { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/router";
import {
  createQR,
  encodeURL,
  TransferRequestURLFields,
  findReference,
  validateTransfer,
  FindReferenceError,
  ValidateTransferError,
} from "@solana/pay";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";
import { ourAddress } from "@/util/SolanaPayUtils";
import BigNumber from "bignumber.js";
import VoteItem from "./VoteItem";

interface Props {
  imageAlt?: string;
  imageLink?: string;
  linkUrl: any;
  id: string;
  amount: number;
}

export default function PayItem({
  amount,
  id,
  imageAlt,
  imageLink,
  linkUrl,
}: Props) {
  const router = useRouter();

  const reference = useMemo(() => Keypair.generate().publicKey, []);

  const qrRef = useRef<HTMLDivElement>(null);

  const price = amount ? new BigNumber(amount) : new BigNumber(1);

  const network = WalletAdapterNetwork.Devnet;
  const endpoint = clusterApiUrl(network);
  const connection = new Connection(endpoint);

  const urlParams: TransferRequestURLFields = {
    recipient: ourAddress,
    amount: price,
    reference,
    label: "Pollverse",
    message: "Thanks for your donation!",
  };

  const url = encodeURL(urlParams);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        // Check if there is any transaction for the reference
        const signatureInfo = await findReference(connection, reference, {
          finality: "confirmed",
        });
        // Validate that the transaction has the expected recipient, amount and SPL token
        await validateTransfer(
          connection,
          signatureInfo.signature,
          {
            recipient: ourAddress,
            amount: price,
            reference,
          },
          { commitment: "confirmed" }
        );
        router.push("/shop/confirmed");
      } catch (e) {
        if (e instanceof FindReferenceError) {
          // No transaction found yet, ignore this error
          return;
        }
        if (e instanceof ValidateTransferError) {
          // Transaction is invalid
          console.error("Transaction is invalid", e);
          return;
        }
        console.error("Unknown error", e);
      }
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, [amount]);

  useEffect(() => {
    const qr = createQR(url, 250, "transparent");
    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qr.append(qrRef.current);
    }
  });

  return (
    <div className="bg-slate-400 card w-3/4 shadow-xl flex flex-row gap-4 justify-between">
      <div className="flex flex-col w-1/4">
        <figure className="px-6 pt-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            onClick={() => router.push(linkUrl)}
            src={imageLink}
            alt={imageAlt}
            className="rounded-xl cursor-pointer"
          />
        </figure>
        <div className="card-body items-center text-center">
          <div className="card-actions">
            <button
              onClick={() => router.push(linkUrl)}
              className="btn btn-primary"
            >
              Explore design
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-3/4 justify-between">
        <div className="flex w-full"><VoteItem /></div>
        <div className="flex flex-col w-1/2 justify-end">
          <div className="flex mt-2 font-bold">Donate to this community project:</div>
          <div className="flex" ref={qrRef} />
        </div>
      </div>
    </div>
  );
}
