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
      text: "Daily Sales",
    },
  },
};

export default function AdminDailySells() {
  const dailySales = [
    {
      _id: "2023-09-01",
      totalSales: 750.234,
    },
    {
      _id: "2023-09-02",
      totalSales: 580.123,
    },
    {
      _id: "2023-09-03",
      totalSales: 920.554,
    },
    {
      _id: "2023-09-04",
      totalSales: 325.789,
    },
    {
      _id: "2023-09-05",
      totalSales: 465.321,
    },
    {
      _id: "2023-09-06",
      totalSales: 550.987,
    },
    {
      _id: "2023-09-07",
      totalSales: 680.432,
    },
    {
      _id: "2023-09-08",
      totalSales: 340.123,
    },
    {
      _id: "2023-09-09",
      totalSales: 820.654,
    },
    {
      _id: "2023-09-10",
      totalSales: 710.987,
    },
  ];

  const dates = dailySales.map((data) => data._id);
  const salesData = dailySales.map((data) => data.totalSales);

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Total Sales",
        data: salesData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="admin-dashboard-sells">
      <Line options={options} data={data} />
    </div>
  );
}
