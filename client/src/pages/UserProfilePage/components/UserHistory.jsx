/* eslint-disable react/prop-types */
import RatingsViewer from "../../../components/RaringsViewer/RatingsViewer";
import DropdownViewer from "../../../components/dropdownVIewer/DropdownViewer";

export default function UserHistory({ reviews, usersTransections }) {
    return (
        <div className="profile-UserHistory">
            <h1 className="user-title">
                {usersTransections.length > 0
                    ? "User Transections"
                    : "No Transections"}
            </h1>
            <div
                style={{
                    color: "#007bff",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    margin: "10px 0px",
                }}
            >
                Showing Top {usersTransections.length} results
            </div>
            {usersTransections?.map((transaction) => (
                <DropdownViewer
                    key={transaction._id}
                    transaction={transaction}
                />
            ))}

            <h1 className="user-title">
                {reviews.length > 0 ? "Book Reviews" : "No Reviews"}
            </h1>

            <table className="profile-table">
                <thead>
                    <tr>
                        <th>Book Image</th>
                        <th>Book Title</th>
                        <th>Comment</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((review) => (
                        <tr key={review._id} className="profile-item">
                            <td>
                                <img
                                    src={review.bookId.image}
                                    alt={review.bookId.title}
                                    height={70}
                                />
                            </td>
                            <td>{review.bookId.title}</td>
                            <td>{review.comment}</td>
                            <td>
                                <RatingsViewer rating={review.rating} />
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="5" className="profile-item">
                            <div className="profile-item">
                                Showing Top {usersTransections.length} results
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
