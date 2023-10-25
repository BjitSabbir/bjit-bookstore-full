import { useEffect, useState } from "react";
import "./adminTransectionPage.scss";
import { useUser } from "../../../context/UserContext";
import {
  getAllUsersTransactions,
  updateTransaction,
} from "../../../apis/admin/admin.transetion.api";

export default function AdminTransectionPage() {
  const { user } = useUser();
  const [allTransections, setAllTransections] = useState([]);

  useEffect(() => {
    const handleGetAllTransections = async () => {
      const response = await getAllUsersTransactions(user.token);
      console.log(response);
      setAllTransections(response.data);
    };

    handleGetAllTransections();
  }, [user.token]);

  const handleUpdate = async (transactionId, status, token) => {
    console.log(transactionId, status, token);
    const response = await updateTransaction(transactionId, status, token);

    console.log(response);
  };

  const handleChangeSelect = (transactionId, selectedStatus) => {
    // Find the transaction by its ID in the state and update its status
    const updatedTransactions = allTransections.map((transaction) =>
      transaction._id === transactionId
        ? { ...transaction, status: selectedStatus }
        : transaction
    );
    handleUpdate(transactionId, selectedStatus, user.token);

    setAllTransections(updatedTransactions);
  };

  return (
    <div className="adminTransectionPage">
      <h1>Transaction Data</h1>
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>User Email</th>
            <th>Total Amount</th>
            <th>User Type</th>
            <th>Status</th>
            <th>Payment Method</th>
            <th>Address</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {allTransections.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction._id}</td>
              <td>{transaction.userId.email}</td>
              <td>${transaction.total.toFixed(2)}</td>
              <td>{transaction.userType}</td>
              <td>
                <select
                  value={transaction.status}
                  onChange={(e) =>
                    handleChangeSelect(transaction._id, e.target.value)
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td>{transaction.payment}</td>
              <td>{transaction.address}</td>
              <td>{new Date(transaction.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
