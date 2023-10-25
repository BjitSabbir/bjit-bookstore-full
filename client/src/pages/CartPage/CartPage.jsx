import { useSelector, useDispatch } from "react-redux";
import "./cartPage.scss";
import { toast } from "react-toastify";

import { calculateTotalPrice } from "../../hooks/useCart";
import {
  decreaseQuantity,
  increaseQuantity,
  removeBookToCart,
  clearCart,
} from "../../redux/slices/cartSlice";
import CustomBtnComponent from "../../components/Button/CustomBtnComponent";
import { addManyToCart, checkoutCart } from "../../apis/cart.api";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../../components/loading/LoadingComponent";
import { useState } from "react";

export default function CartPage() {
  const navigation = useNavigate();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const bookDataFromRedux = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleIncrement = (bookId) => {
    dispatch(increaseQuantity(bookId));
  };

  const handleDecrement = (bookId) => {
    dispatch(decreaseQuantity(bookId));
  };

  const handleDelete = (bookId) => {
    dispatch(removeBookToCart(bookId));
  };

  const addManyToCartFun = async () => {
    setIsLoading(true);
    const cartResponse = await addManyToCart(user.token, bookDataFromRedux);

    if (cartResponse.success) {
      const checkoutRes = await checkoutCart(user.token);
      setIsLoading(false);

      if (checkoutRes.success) {
        toast.success(checkoutRes.message);
        navigation("/user/checkoutPage", {
          state: checkoutRes,
        });

        dispatch(clearCart());
      } else {
        toast.error(checkoutRes.message);
      }
    } else {
      toast.error(cartResponse.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="cart-page">
      {isLoading && <LoadingComponent />}
      {bookDataFromRedux.length > 0 ? (
        <div className="cart-container">
          <h1 className="cart-title">Shopping Cart</h1>
          <p className="cart-subtitle">
            Number of Books: {bookDataFromRedux.length}
          </p>

          <div className="action-holder">
            <CustomBtnComponent
              text={`Checkout Total Price: $(${calculateTotalPrice(
                bookDataFromRedux
              ).toFixed()})`}
              onClick={() => {
                addManyToCartFun();
              }}
              style={{
                "border-radius": "0px",
                backgroundColor: "#de2454",
                color: "white",
                "min-width": "200px",
              }}
            />
          </div>
          <div>
            {bookDataFromRedux.map((book) => (
              <div className="cart-item" key={book._id}>
                <img src={book.image} alt={book.title} className="book-image" />
                <div className="book-info">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-price">{book.authors.join(", ")}</p>

                  <p className="book-price">Price: ${book.price}</p>
                  <div className="buttons-container">
                    <button
                      className="increment-button"
                      onClick={() => handleIncrement(book._id)}
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                    <div className="book-quantity">{book.quantity}</div>
                    <button
                      className="decrement-button"
                      onClick={() => handleDecrement(book._id)}
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(book._id)}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="action-holder">
            <h3>Total Price: ${calculateTotalPrice(bookDataFromRedux)}</h3>
          </div>
          <div className="action-holder">
            <CustomBtnComponent
              text="Continue Shopping"
              onClick={() => {
                navigation("/");
              }}
              style={{
                "border-radius": "500px",
                backgroundColor: "#fff",
                color: "#de2454",
                border: "1px solid #de2454",
              }}
            />
            <CustomBtnComponent
              text={`Clear Cart`}
              onClick={() => {
                dispatch(clearCart());
              }}
              style={{
                "border-radius": "500px",
                backgroundColor: "#de2454",
                color: "white",
                "min-width": "200px",
              }}
            />
          </div>
          <p className="cart-subtitle">
            <i
              className="fa-solid fa-info"
              style={{ color: "#de2454", marginRight: "5px" }}
            ></i>
            Remember to update address on your profile and topup wallet before
            checkout
          </p>
        </div>
      ) : (
        <div className="empty-cart">
          <i className="fa-solid fa-cart-shopping"></i>
          <span>Your cart is empty</span>
        </div>
      )}
    </div>
  );
}
