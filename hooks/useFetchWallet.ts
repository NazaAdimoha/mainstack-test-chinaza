import { getWallet } from "@/app/services/api";
import { formatAmount } from "@/utils/helpers";
import { Dispatch, SetStateAction } from "react";
import { useQuery } from "react-query";

export const useFetchWallet = (setWallet: Dispatch<SetStateAction<any>>) => {
  const { isLoading, isError, error } = useQuery("wallet", getWallet, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      const result = data.data;
      setWallet({
        balance: formatAmount(result.balance),
        total_payout: formatAmount(result.total_payout),
        total_revenue: formatAmount(result.total_revenue),
        pending_payout: formatAmount(result.pending_payout),
        ledger_balance: formatAmount(result.ledger_balance),
      });
    },
  });
  return { isLoading, isError, error };
};
