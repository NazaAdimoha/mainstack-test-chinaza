
import axios from "axios";

class Transaction {
    amount: any;
    metadata: any;
    paymentReference: any;
    status: any;
    type: any;
    date: any;
    constructor(data: { amount: any; metadata: {}; payment_reference: any; status: any; type: any; date: any; }) {
      this.amount = data.amount;
      this.metadata = data.metadata || {};
      this.paymentReference = data.payment_reference;
      this.status = data.status;
      this.type = data.type;
      this.date = data.date ? new Date(data.date) : null;
    }
  }

//create API services
const API_BASE_URL = "https://fe-task-api.mainstack.io/";

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
    return response;
}

//Get transactions endpoint
export const getTransactions = async () => {
    try {
      const response = await api.get("transactions");
      return response.data.map((transactionData: any) => new Transaction(transactionData));
    } catch (error) {
        console.error(error);   
    }
}
