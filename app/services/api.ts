
import axios from "axios";

//create API services
const API_BASE_URL = "https://assignment-api-spxd.onrender.com/api/";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//Get user endpoint
export const getUser = async () => {
    const response = await api.get("user");
    return response.data;
}

//Get wallet endpoint
export const getWallet = async () => {
    const response = await api.get("wallet");
    return response.data;
}

//Get transactions endpoint
export const getTransactions = async () => {
    const response = await api.get("transactions");
    return response.data;
}

//Filter transactions by date
export const filterTransactions = async (date: string | number) => {
    const response = await api.get(`transactions?date=${date}`);
    return response.data;
}

//Filter transactions by transaction type
export const filterTransactionsByType = async (type: string) => {
    const response = await api.get(`transactions?type=${type}`);
    return response.data;
}
