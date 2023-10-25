/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";
import "./adminProductPage.scss";
import AddBookPopup from "../../../components/popupViewer/AddBookPopup";
import UpdateTableBook from "../../../components/admin/updateTables/UpdateTableBook";
import { fetchBooks } from "../../../apis/book.api";
import { useNavigate } from "react-router-dom";

export default function AdminProductPage() {
    const { user } = useUser();
    const [bookData, setBookData] = useState([]);
    const [filter, setFilter] = useState("All");
    const [sortOption, setSortOption] = useState("rating");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchData, setSearchData] = useState("");
    const [showAddBookPopup, setShowAddBookPopup] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPage, setTotalPage] = useState(0);
    const navigate = useNavigate();

    const fetchBook = async () => {
        try {
            const books = await fetchBooks({
                sortOption,
                sortOrder,
                searchData,
                page,
                limit,
            });
            setTotalPage(books.totalPages);
            setPage(books.page);
            setBookData(books.books);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    useEffect(() => {
        const timeOutFunc = setTimeout(() => {
            fetchBook();
        }, 500);
        return () => {
            clearTimeout(timeOutFunc);
        };
    }, [sortOption, sortOrder, searchData, page, limit]);

    useEffect(() => {
        fetchBook();
    }, []);

    const handlePageChange = (event) => {
        setPage(event.target.value);
    };

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    return (
        <div className="admin-product-container">
            {showAddBookPopup && (
                <AddBookPopup
                    updatePopup={(val) => setShowAddBookPopup(val)}
                    fetchBook={fetchBook}
                />
            )}
            <h1>Admin Books Page</h1>
            <div className="formSearchFilter">
                <div className="holder">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchData}
                        onChange={(e) => setSearchData(e.target.value)}
                    />
                </div>
                <div className="holder">
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="price">Price</option>
                        <option value="rating">Rating</option>
                    </select>
                </div>
                <div className="holder">
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
                <div className="holder">
                    <select value={page} onChange={handlePageChange}>
                        {/* Generate options based on totalPage */}
                        {Array.from({ length: totalPage }, (_, index) => (
                            <option key={index + 1} value={index + 1}>
                                Page {index + 1}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="holder">
                    <select value={limit} onChange={handleLimitChange}>
                        <option value="10">10 per page</option>
                        <option value="20">20 per page</option>
                        <option value="30">30 per page</option>
                    </select>
                </div>
                <button
                    className="AddNewBook"
                    onClick={() => {
                        setShowAddBookPopup(true);
                    }}
                >
                    Add New Book
                </button>
                <button
                    className="AddNewBook"
                    onClick={() => {
                        navigate("/admin/discounts");
                    }}
                >
                    Add Discount
                </button>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Genre</th>
                            <th>Author</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Book Active Region</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookData.map((book) => (
                            <UpdateTableBook
                                user={user}
                                fetchBook={fetchBook}
                                book={book}
                                key={book._id}
                            />
                        ))}
                        <tr>
                            <td colSpan="11">
                                <div className="pagination">
                                    <span>
                                        Page {page} of {totalPage}
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
