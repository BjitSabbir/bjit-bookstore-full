/* eslint-disable react/prop-types */
import CountUp from "../../../../components/countup/CountUp";

import { BiSolidDollarCircle } from "react-icons/bi";
import { BsHandbagFill } from "react-icons/bs";
import { PiUsersThreeFill } from "react-icons/pi";
import { ImBooks } from "react-icons/im";

const iconSize = 50;
export default function AdminDashboardTop({
  totalSales,
  totalOrders,
  totalUsers,
  totalBooks,
}) {
  return (
    <div className="admin-dashboard-top">
      <p className="admin-dashboard-top-card">
        <BiSolidDollarCircle size={iconSize} className="icon" />
        <div>
          <p>Total Sales</p> <CountUp end={totalSales} />
        </div>
      </p>
      <p className="admin-dashboard-top-card">
        <BsHandbagFill size={iconSize} className="icon" />
        <div>
          <p>Total Orders</p> <CountUp end={totalOrders} />
        </div>
      </p>
      <p className="admin-dashboard-top-card">
        <PiUsersThreeFill size={iconSize} className="icon" />
        <div>
          <p>Total Users</p> <CountUp end={totalUsers} />
        </div>
      </p>
      <p className="admin-dashboard-top-card">
        <ImBooks size={iconSize} className="icon" />
        <div>
          <p>Total Books</p> <CountUp end={totalBooks} />
        </div>
      </p>
    </div>
  );
}
