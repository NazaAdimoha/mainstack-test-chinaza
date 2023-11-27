
import { getTransactions, getUser, getWallet } from "@/app/services/api";
import { useQuery } from "react-query";
// use react-query to fetch data from the service folder and cache it

export const useFetchUser = (isLoading: any, data: any, isError: any, error: any) => {
    return useQuery("user", getUser, {
        enabled: false,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            isLoading = false;
            data = data;
        },
        onError: (error) => {
            isLoading = false;
            isError = true;
            error = error;
        },
    });
}

export const useFetchWallet = (isLoading: any, data: any, isError: any, error: any) => {
    return useQuery("wallet", getWallet, {
        enabled: false,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            isLoading = false;
            data = data;
        },
        onError: (error) => {
            isLoading = false;
            isError = true;
            error = error;
        },
    });
}

export const useFetchTransactions = (isLoading: any, data: any, isError: any, error: any) => {
    return useQuery("transactions", getTransactions, {
        enabled: false,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            isLoading = false;
            data = data;
        },
        onError: (error) => {
            isLoading = false;
            isError = true;
            error = error;
        },
    });
};