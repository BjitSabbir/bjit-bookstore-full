import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Transaction Data",
        },
    },
};

export default function TransactionGraph({ filterTransactionsByDate }) {
    if (!filterTransactionsByDate || filterTransactionsByDate.length === 0) {
        return (
            <div className="transaction-graph">
                <p>No data available.</p>
            </div>
        );
    }

    // Separate data for "Topup" and "Purchase"
    const aggregatedData = filterTransactionsByDate.reduce(
        (accumulator, data) => {
            const date = data.createdAt.split("T")[0];
            const amount =
                data.transectionType === "topup" ? data.amount : -data.amount;

            if (!accumulator[date]) {
                accumulator[date] = { topup: 0, purchase: 0 };
            }

            if (data.transectionType === "topup") {
                accumulator[date].topup += amount;
            } else {
                accumulator[date].purchase += amount;
            }

            return accumulator;
        },
        {}
    );

    const dates = Object.keys(aggregatedData);

    // Separate data for "Topup" and "Purchase"
    const topupData = dates.map((date) => aggregatedData[date].topup);
    const purchaseData = dates.map((date) => aggregatedData[date].purchase);

    const data = {
        labels: dates,
        datasets: [
            {
                label: "Topup Amount",
                data: topupData,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "Purchase Amount",
                data: purchaseData,
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.5)",
            },
        ],
    };

    return (
        <div
            style={{
                height: "300px",
                borderBottom: "1px solid #ccc",
                padding: "1rem",
            }}
        >
            <Line options={options} data={data} />
        </div>
    );
}
