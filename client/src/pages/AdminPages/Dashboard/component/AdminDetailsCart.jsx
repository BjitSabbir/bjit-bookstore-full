/* eslint-disable react/prop-types */
import { Bar } from "react-chartjs-2";

import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

export default function AdminDetailsCart({
  salesByBook = [],
  topPayedUsers = [],
}) {
  const bookTitles = salesByBook.map((item) => {
    if (item.bookTitle) {
      if (item.bookTitle.length > 3) {
        return item.bookTitle.split(" ").slice(0, 3).join(" ") + "...";
      } else {
        return item.bookTitle;
      }
    } else {
      return item.bookTitle;
    }
  });
  const totalSales = salesByBook.map((item) => item.totalSales);

  const userNames = topPayedUsers.map((item) => item.userName);
  const totalPurchases = topPayedUsers.map((item) => item.totalPaymentAmount);

  console.log(bookTitles, totalSales, userNames, totalPurchases);

  const data = {
    labels: bookTitles,
    datasets: [
      {
        label: "Total Sales by Book",
        data: totalSales,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const totalUsers = {
    labels: userNames,
    datasets: [
      {
        label: "Total Purchases",
        data: totalPurchases,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // You can customize the legend as needed
      },
      title: {
        display: true,
        text: "Top Selling Books",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Sales",
        },
      },
      x: {
        title: {
          display: true,
          text: "Books",
        },
      },
    },
  };

  const options2 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top Users",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Purchases",
        },
      },
      x: {
        title: {
          display: true,
          text: "Users",
        },
      },
    },
  };

  return (
    <div className="admin-details-cart">
      <div className="admin-details-cart-container">
        <Bar data={data} options={options} />
      </div>

      <div className="admin-details-cart-container">
        <Bar data={totalUsers} options={options2} />
      </div>
    </div>
  );
}
