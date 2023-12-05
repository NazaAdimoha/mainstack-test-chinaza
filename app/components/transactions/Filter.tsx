"use client";
import Image from "next/image";
import Download from "../../../public/download.svg";
import Expand from "../../../public/expand_more.svg";
import { useEffect, useState } from "react";
import { useFetchTransactions } from "@/hooks/useFetch";
import { TransactionType } from "@/app/types/transactionType";
import SubFilter from "./SubFilter";
import { formatAmount } from "@/utils/helpers";
import Success from "../../../public/call_received.svg";
import Failed from "../../../public/call_made.svg";
import moment from "moment";

const Filters = () => {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [showSubFilter, setShowSubFilter] = useState(false);

    // Filter state
    const [filters, setFilters] = useState<any>({
        startDate: null,
        endDate: null,
        status: "",
        type: "",
    });

    // Status and type options state
    const [statusOptions, setStatusOptions] = useState<string[]>([]);
    const [typeOptions, setTypeOptions] = useState<string[]>([]);

    // integrate useFetchTransactions hook here
    const { isLoading: transactionIsLoading, isError, error: fetchError } = useFetchTransactions(
        setTransactions
    );
    // console.log("-----", transactions);

     // Fetch status and type options from useFetchTransactions hook
    useEffect(() => {
        if (transactions.length > 0) {
            const status = transactions.map((transaction: TransactionType) => transaction.status);
            console.log("status", status);
            const type = transactions.map((transaction: TransactionType) => transaction.type);
            console.log("type", type);
            setStatusOptions(Array.from(new Set<string>(status)));
            setTypeOptions(Array.from(new Set<string>(type)));
        }
    }, [
        transactions,
    ]);

    // create a function to apply filters
    const applyFilters = (filters: any) => {
        const { startDate, endDate, status, type } = filters;
        let filteredTransactions = transactions;
        if (startDate && endDate) {
            filteredTransactions = filteredTransactions.filter((transaction: TransactionType) => {
                const transactionDate = moment(transaction.date).format("YYYY-MM-DD");
                console.log("transactionDate", transactionDate)
                return transactionDate >= startDate && transactionDate <= endDate;
            });
            console.log("333", filteredTransactions);
        }
        if (status) {
            filteredTransactions = filteredTransactions.filter((transaction: TransactionType) => transaction.status === status);
            console.log("000", filteredTransactions);
        }
        if (type) {
            filteredTransactions = filteredTransactions.filter((transaction: TransactionType) => transaction.type === type);
            console.log("***", filteredTransactions);
        }
    
        setFilteredTransactions(filteredTransactions);
        // setFilters(filters);
        console.log("filteredTransactions", filteredTransactions);
    };
    return (
        <>
            <div className="flex justify-between pb-3 items-center gap-6 border-b-2 outline-0">
                <div className="flex flex-col gap-2">
                    <p className="text-[#131316] text-md font-bold leading-4">24 Transactions</p>
                    <p className="text-[#56616B] text-sm font-medium leading-4">Transactions for the last 7 days</p>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => setShowSubFilter(true)} className="flex justify-center items-center gap-3 bg-[#EFF1F6] border rounded-full p-3">
                        <p>Filter</p>
                        <Image src={Expand} alt="Expand Icon" width={20} height={20} />
                    </button>
                    <button className="flex justify-center items-center gap-3 bg-[#EFF1F6] border rounded-full p-3">
                    <p>Export List</p>
                    <Image src={Download} alt="Download Icon" width={20} height={20} />
                    </button>
                </div>
            </div>

            {
                showSubFilter && (<SubFilter onClose={() => setShowSubFilter(false)} onApply={applyFilters} />)
            }

            {
                transactionIsLoading ? "Fetching Transactions..." : (
                    filteredTransactions?.map((transaction: TransactionType, index) => (
                        <div key={index} className="flex justify-between pb-3 items-center gap-6 mt-4">
                        <div className="flex items-center gap-3 ">
                            <div>
                                {transaction?.status === "successful" ? (
                                    <div className="w-10 h-10 rounded-full bg-[#EFF1F6] flex justify-center items-center">
                                        <Image src={Success} alt="Success Icon" width={20} height={20} />
                                    </div>
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-[#EFF1F6] flex justify-center items-center">
                                        <Image src={Failed} alt="Failed Icon" width={20} height={20} />
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col items-start gap-2">
                                <p className="text-base text-[#131316] not-italic font-medium leading-6 tracking-widest"> 
                                    {transaction?.metadata?.product_name}
                                </p>
                                <p className="text-sm text-[#131316] not-italic font-medium leading-4 tracking-widest">
                                    {transaction?.type}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-start gap-2">
                            <p className="text-[#131316] text-right not-italic font-bold text-base leading-6">
                                USD {formatAmount(transaction?.amount)}
                            </p>
                            <p className="text-[#56616B] text-sm not-italic font-medium leading-4">
                                {moment(transaction.date).format("DD MMM YYYY")}
                            </p>
                        </div>
                    </div>
                    ))
                )
            }

   
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