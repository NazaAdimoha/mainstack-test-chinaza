"use client";
import Image from "next/image";
import Download from "../../../public/download.svg";
import Expand from "../../../public/expand_more.svg";
import { useState } from "react";
import { useFetchTransactions } from "@/hooks/useFetch";

const Filters = () => {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);

    //integrate useFetchTransactions hook here
     const {isLoading: transactionIsLoading, isError, error: error} = useFetchTransactions(
        setTransactions
     );
     console.log("-----", transactions);
    return (
        <>
            <div className="flex justify-between pb-3 items-center gap-6 border-b-2 outline-0">
                <div className="flex flex-col gap-2">
                    <p className="text-[#131316] text-md font-bold leading-4">24 Transactions</p>
                    <p className="text-[#56616B] text-sm font-medium leading-4">Transactions for the last 7 days</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="flex justify-center items-center gap-3 bg-[#EFF1F6] border rounded-full p-3">
                        <p>Filter</p>
                        <Image src={Expand} alt="Expand Icon" width={20} height={20} />
                    </button>
                    <button className="flex justify-center items-center gap-3 bg-[#EFF1F6] border rounded-full p-3">
                    <p>Export List</p>
                    <Image src={Download} alt="Download Icon" width={20} height={20} />
                    </button>
                </div>

            </div>

            <div className="flex justify-between pb-3 items-center gap-6 mt-4">
                <div className="flex items-center gap-3 ">
                    <div>Bro</div>
                    <div className="flex items-center gap-2">
                        <p>Psychology</p>
                        <p>Rey cash </p>
                    </div>
                </div>
                <div>
                    <p>USD 600</p>
                    <p>Date</p>
                </div>
            </div>   
        </>
    ) 
}

export default Filters;

{/* <div className="flex items-center gap-3 ">
<div>Bro</div>
<div className="flex items-center gap-2">
    <p>Psychology</p>
    <p>Rey cash </p>
</div>
</div>
<div>
<p>USD 600</p>
<p>Date</p>
</div> */}