import { useEffect, useState } from "react";
import { getAllUsers } from "../../../apis/admin/admin.users.api";
import { useUser } from "../../../context/UserContext";
import UserPopupContainer from "./UserPopupContainer";

export default function AdminUsersPages() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [sortType, setSortType] = useState("asc");
    const [sortKey, setSortKey] = useState("email");
    const [totalPages, setTotalPages] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [selectedUser, setSelectedUser] = useState(null); // [1]

    const { user } = useUser();
    const [allUsers, setAllUsers] = useState([]);

    const getAllUsersFunction = async () => {
        try {
            const response = await getAllUsers(
                user.token,
                page,
                limit,
                sortType,
                sortKey
            );
            console.log(response);
            setAllUsers(response.data.users);
            setTotalPages(response.data.pagination.totalPages);
            setTotalUsers(response.data.pagination.totalUsers);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        const timeOutFunc = setTimeout(() => {
            if (user.token) {
                getAllUsersFunction();
            }
        }, 500);
        return () => {
            clearTimeout(timeOutFunc);
        };
    }, [sortType, sortKey, page, limit]);

    useEffect(() => {
        if (user.token) {
            getAllUsersFunction();
        }
    }, [user.token]); // Change the dependency to user.token

    return (
        <div className="admin-product-container ">
            <h1>Admin Users Page</h1>

            {selectedUser && selectedUser.email != "admin@gmail.com" && (
                <UserPopupContainer
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    token={user.token}
                    getAllUsersFunction={getAllUsersFunction}
                />
            )}
            <div className="formSearchFilter">
                <div className="holder">
                    <select
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>

                <div className="holder">
                    <select
                        value={sortKey}
                        onChange={(e) => setSortKey(e.target.value)}
                    >
                        <option value="email">Email</option>
                        <option value="name">Name</option>
                        <option value="phone">Phone</option>
                        <option value="address">Address</option>
                    </select>
                </div>

                <div className="holder">
                    <select
                        value={page}
                        onChange={(e) => setPage(e.target.value)}
                    >
                        {[...Array(totalPages).keys()].map((pageNumber) => (
                            <option key={pageNumber + 1} value={pageNumber + 1}>
                                Page {pageNumber + 1}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="holder">
                    <select
                        value={limit}
                        onChange={(e) => setLimit(e.target.value)}
                    >
                        <option value="10">5 per page</option>
                        <option value="10">10 per page</option>
                        <option value="20">20 per page</option>
                        <option value="50">50 per page</option>
                        <option value="100">100 per page</option>
                    </select>
                </div>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Active User</th>
                            <th>Reviews</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Wallet Balance</th>
                            <th>Address</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((userData) => (
                            <tr
                                key={userData.email}
                                onClick={() => setSelectedUser(userData)}
                            >
                                <td>{userData.name || "N/A"}</td>
                                <td>{userData.email}</td>
                                <td>{userData.isActiveUser ? "Yes" : "No"}</td>
                                <td>
                                    {userData.reviews
                                        ? userData.reviews.length
                                        : "N/A"}
                                </td>
                                <td>{userData.createdAt.split("T")[0]}</td>
                                <td>{userData.updatedAt.split("T")[0]}</td>
                                <td>
                                    {userData.walletId.balance.toFixed(2) ||
                                        "N/A"}
                                </td>
                                <td>{userData.address || "N/A"}</td>
                                <td>{userData.phone || "N/A"}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="9">
                                Showing {page * limit - limit + 1} to{" "}
                                {page * limit > totalUsers
                                    ? totalUsers
                                    : page * limit}{" "}
                                of {totalUsers} entries
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
