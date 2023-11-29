"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { getTransactions } from "../services/api";
import { format } from "date-fns"; // Import the date-fns library
import { timeSeries } from "chartjs-adapter-date-fns";

const LineChart = () => {
  const chartRef = useRef();

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
      <div className="flex justify-start items-center gap-8">
        <div className="flex flex-col items-center justify-center gap-2">
          <p>Available Balance</p>
          <p>USD 120,500.00</p>
        </div>
        <button>Withdraw</button>
      </div>
      <div
        style={{
          width: "765px",
          height: "auto",
          margin: "0 auto",
        }}
        className="md:max-w-2xl md:max-h-58  lg:max-w-3xl lg:max-h-64"
      >
        <canvas ref={chartRef} />;
      </div>
    </section>
  );
};

export default LineChart;
