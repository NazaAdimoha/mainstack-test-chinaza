import Info from "../public/info.svg";
interface PaymentData {
    paymentTitle: string,
    amount: number,
    img: any
}

export const paymentData: PaymentData[] = [
    {
        paymentTitle: "Ledger Balance",
        amount: 0.00,
        img: Info
    },
    {
        paymentTitle: "Total Payout",
        amount: 55080.00,
        img: Info
    },
    {
        paymentTitle: "Total Revenue",
        amount: 175580.00,
        img: Info
    },
    {
        paymentTitle: "Pending Payout",
        amount: 0.00,
        img: Info
    },
]