import { useEffect, useState } from "react";
import { getAdminAnalytics } from "../../../apis/admin/admin.dashboard.api";
import { useUser } from "../../../context/UserContext";
import AdminDashboardTop from "./component/AdminDashboardTop";
import "./adminDashboard.scss";
import AdminDailySells from "./component/AdminDailySells";
import AdminDetailsCart from "./component/AdminDetailsCart";
import AdminTopDetails from "./component/AdminTopDetails";

export default function AdminDashboard() {
  const { user } = useUser();
  const [responseData, setResponseData] = useState({});

  const getAnalytics = async () => {
    try {
      const response = await getAdminAnalytics(user.token);
      console.log(response);
      setResponseData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAnalytics();
  }, [user.token]);

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-container">
        <AdminDashboardTop
          totalSales={responseData.totalSales}
          totalOrders={responseData.totalOrders}
          totalUsers={responseData.totalUsers}
          totalBooks={responseData.totalBooks}
        />

        <AdminTopDetails
          top5CommentedBooks={responseData.top5CommentedBooks}
          topActiveUsersBasedOnReviews={
            responseData.topActiveUsersBasedOnReviews
          }
        />
        <AdminDailySells />
        {responseData && (
          <AdminDetailsCart
            salesByBook={responseData.salesByBook}
            topPayedUsers={responseData.topPayedUsers}
          />
        )}
      </div>
      {/* {JSON.stringify(responseData)} */}
    </div>
  );
}
