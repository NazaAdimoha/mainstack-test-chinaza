// Desc: This file contains the balance component
"use client";
import { paymentData } from "@/data/paymentData";
import Image from "next/image";
import Info from "../../../public/info.svg";
import { useState } from "react";
import { useFetchWallet } from "@/hooks/useFetch";
import { formatAmount } from "@/utils/helpers";

//mock API Data replica
// {
//     "balance": 750.56,
//     "total_payout": 500,
//     "total_revenue": 1250.56,    
//     "pending_payout": 0,
//     "ledger_balance": 500
// }

const Balance = () => {
    const [wallet, setWallet] = useState({
        balance: "0",
        total_payout: "0",
        total_revenue: "0",
        pending_payout: "0",
        ledger_balance: "0"
    });

    const onSuccessWalletRetrieval = (res:any) => {
        const result = res.data;
        console.log("result", result)
        setWallet(
            {
                balance: formatAmount(result.balance) ,
                total_payout: formatAmount(result.total_payout),
                total_revenue: formatAmount(result.total_revenue),
                pending_payout: formatAmount(result.pending_payout),
                ledger_balance: formatAmount(result.ledger_balance)
            }
        )
    };

    const onErrorWalletRetrieval = (err:any) => {
        console.log(err);
    };


    const walletQuery = useFetchWallet(
        onSuccessWalletRetrieval,
        onErrorWalletRetrieval,
    );

  return (
    <div className="">
      <div className="flex flex-col w-full items-start lg:gap-14">
        {
            <div className="">
              <div className="flex justify-between items-center lg:gap-16 mb-6">
                <div className="rounded-md  mr-2 gap-4">
                  <p className="text-start text-[#56616B] text-sm font-medium leading-4 mb-2">
                    Ledger Balance
                  </p>
                  
                  <p className="text-start text-[#131316] text-lg font-bold leading-9">
                    USD {wallet?.ledger_balance}
                  </p>
                </div>
                <Image
                  className="flex items-center"
                  src={Info}
                  alt="Info Icon"
                  width={20}
                  height={20}
                />
              </div>

              <div className="flex justify-between items-center lg:gap-16 mb-6">
                <div className="rounded-md  mr-2 gap-4">
                  <p className="text-start text-[#56616B] text-sm font-medium leading-4 mb-2">
                    Total Payout
                  </p>
                  
                  <p className="text-start text-[#131316] text-lg font-bold leading-9">
                    USD {wallet?.total_payout}
                  </p>
                </div>
                <Image
                  className="flex items-center"
                  src={Info}
                  alt="Info Icon"
                  width={20}
                  height={20}
                />
              </div>

              <div className="flex justify-between items-center lg:gap-16 mb-6">
                <div className="rounded-md  mr-2 gap-4">
                  <p className="text-start text-[#56616B] text-sm font-medium leading-4 mb-2">
                    Total Revenue
                  </p>
                  
                  <p className="text-start text-[#131316] text-lg font-bold leading-9">
                    USD {wallet?.total_revenue}
                  </p>
                </div>
                <Image
                  className="flex items-center"
                  src={Info}
                  alt="Info Icon"
                  width={20}
                  height={20}
                />
              </div>

              <div className="flex justify-between items-center lg:gap-16">
                <div className="rounded-md  mr-2 gap-4">
                  <p className="text-start text-[#56616B] text-sm font-medium leading-4 mb-2">
                    Pending Payout
                  </p>
                  
                  <p className="text-start text-[#131316] text-lg font-bold leading-9">
                    USD {wallet?.pending_payout}
                  </p>
                </div>
                <Image
                  className="flex items-center"
                  src={Info}
                  alt="Info Icon"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          }
      </div>
    </div>
  );
};

export default Balance;
