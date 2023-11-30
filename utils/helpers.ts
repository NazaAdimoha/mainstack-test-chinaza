//Format currency to USD
export const formatAmount = (amount: number): string => {
    return amount.toLocaleString("en", { minimumFractionDigits: 2 });
};