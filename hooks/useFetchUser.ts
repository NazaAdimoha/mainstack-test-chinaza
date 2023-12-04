import { getUser } from "@/app/services/api";
import { Dispatch, SetStateAction } from "react";
import { useQuery } from "react-query";

export const useFetchUser = (setUser: Dispatch<SetStateAction<any>>) => {
  const { isLoading, isError, error } = useQuery("user", getUser, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      const result = data.data;
      setUser({
        first_name: result.first_name,
        last_name: result.last_name,
        email: result.email,
      });
    },
  });
    return { isLoading, isError, error };
};
