
// Compare this snippet from app/types/transactionType.ts:
export interface TransactionType {
    amount: number;
    metadata: {
        name: string;
        type: string;
        email: string;
        quantity: number;
        country: string;
        product_name: string;
    };
    payment_reference: string;
    status: string;
    type: string;
    date: string;
}