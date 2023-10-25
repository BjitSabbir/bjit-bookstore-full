import "./completeTransectionPage.scss";
import { useLocation } from "react-router-dom";

export default function CompleteTransectionPage() {
  const location = useLocation();
  const data = location.state;

  return (
    <div className="completeTransectionContainer">
      {/* {JSON.stringify(data)} */}
      <div className="completeTransectionBody">
        <div className="completeTransectionBodyLeft">
          <img
            src="https://iconicwp.com/wp-content/uploads/2020/09/guest-checkout.png"
            alt=""
          />
          <h1>Thank you for your order!</h1>
          <p>We have received your order and will process it shortly.</p>
        </div>
        <div className="completeTransectionBodyRight">
          <div className="completeTransectionMemo">
            <h1>Order Memo</h1>
            <p>Order ID: {data.data._id}</p>
            <p>Amount: ${data.data.total}</p>
            <p>User Type: {data.data.userType}</p>
            <p>Status: {data.data.status}</p>
            <p>Payment Method: {data.data.payment}</p>
            <p>Shipping Address: {data.data.address}</p>
            <p>Created At: {new Date(data.data.createdAt).toLocaleString()}</p>

            <h2>Books:</h2>
            <ul className="completeTransectionBooks">
              {data.data.books.map((book, index) => (
                <li key={index}>
                  Book ID: {book.bookId}
                  <br />
                  Price: ${book.price}
                  <br />
                  Quantity: {book.quantity}
                  <br />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
