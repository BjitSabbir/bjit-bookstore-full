/* eslint-disable react/prop-types */
export default function AdminTopDetails({
  top5CommentedBooks = [],
  topActiveUsersBasedOnReviews = [],
}) {
  return (
    <div className="admin-top-details">
      <div className="top-commented-books">
        <h1>Top Commented Books</h1>
        {top5CommentedBooks.map((item) => (
          <div key={item._id} className="top-active-users">
            <img src={item.book.image} alt={item.book.title} />
            <div className="right">
              <h2>{item.book.title}</h2>
              <p>{item.book.createdAt.split("T")[0]}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="top-commented-books">
        <h1>Top Active Users Based on Reviews</h1>
        {topActiveUsersBasedOnReviews.map((item) => (
          <div key={item._id} className="top-active-users">
            <img
              src={`https://robohash.org/${item.user.email}?size=150x150`}
              alt={item.user.email}
            />
            <div className="right">
              <h2>{item.user.email}</h2>
              <p> Total Reviews: {item.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
