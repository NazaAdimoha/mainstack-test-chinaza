"use client";
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { getTransactions } from "../services/api";
import { format } from "date-fns"; // Import the date-fns library
import { timeSeries } from "chartjs-adapter-date-fns";
import { useFetchWallet } from "@/hooks/useFetchWallet";

const LineChart = () => {
  const chartRef = useRef();
  const [wallet, setWallet] = useState({
    balance: "0",
    total_payout: "0",
    total_revenue: "0",
    pending_payout: "0",
    ledger_balance: "0",
  })

  const { isLoading, error, data } = useFetchWallet(
    setWallet,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactions = await getTransactions();

        if (transactions && transactions.length > 0) {
          const ctx = chartRef.current?.getContext("2d");

          // Filter transactions for January to December
          const filteredData = transactions.filter((transaction) => {
            return (
              transaction.date instanceof Date && // Check if it's a Date object
              transaction.date.getMonth() >= 4 && // January (0-based index)
              transaction.date.getMonth() <= 11 // December (0-based index)
            );
          });

          console.log("filteredData", filteredData);

          // Extract labels and data for the chart
          const labels = filteredData.map((transaction) =>
            transaction.date.toLocaleDateString()
          );
          console.log("labels", labels);
          const amounts = filteredData.map((transaction) => transaction.amount);

          // Create the line chart if ctx is defined
          if (ctx) {
            new Chart(ctx, {
              type: "line",
              data: {
                labels: transactions.map((transaction) =>
                  format(transaction.date, "MMM-dd-yyyy")
                ),
                datasets: [
                  {
                    label: "Transaction Amount",
                    data: transactions.map((transaction) => transaction.amount),
                    borderColor: "#FF5403",
                    borderWidth: 3,
                    fill: false,
                    borderSkipped: false,
                    tension: 0.8,
                  },
                ],
              },
              options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                },

                scales: {
                  x: {
                    // ticks: {
                    //   display: false,
                    // },
                    grid: {
                      display: false,
                    },
                  },

                  y: {
                    ticks: {
                      display: false,
                    },
                    grid: {
                      display: false,
                    },
                  },
                },
              },
            });
          }
        } else {
          console.error(
            "No transactions or empty array received from the API."
          );
        }
      } catch (error) {
        console.error("Error fetching or processing data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section >
      <div className="flex justify-start items-center gap-6 lg:gap-16 mb-7">
        <div className="flex flex-col items-start justify-center gap-2">
          <p className="text-start text-[#56616B] text-sm font-medium">Available Balance</p>
          <p className="text-start text-[#131316] text-3xl not-italic font-bold">USD <span>{wallet?.balance}</span></p>
        </div>
        <button className="flex justify-center items-center p-2 md:p-3 lg:py-1 lg:px-4 text-sm lg:text-xs not-italic font-semibold leading-4 gap-2 self-stretch rounded-3xl bg-[#131316] text-white">Withdraw</button>
      </div>
      <div
        style={{
          width: "650px",
          height: "auto",
          marginTop: "4rem",
          margin: "auto", 
        }}
        className="max-w-md md:max-w-lg md:max-h-58  lg:max-w-2xl xl:max-w-5xl 2xl:max-w-8xl lg:max-h-64"
      >
        <canvas ref={chartRef} />
      </div>
    </section>
  );
};

export default LineChart;
