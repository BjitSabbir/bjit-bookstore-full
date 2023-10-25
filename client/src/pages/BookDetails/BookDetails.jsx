import { useParams } from "react-router-dom";
import "./bookDetails.scss";
import { useEffect, useState } from "react";
import LoadingComponent from "../../components/loading/LoadingComponent";
import { useUser } from "../../context/UserContext";
import RatingsViewer from "../../components/RaringsViewer/RatingsViewer";

import { useDispatch } from "react-redux";
import { fetchOneBook } from "../../apis/book.api";
import { addReview, deleteReview } from "../../apis/review.api";
import { addBookToCart } from "../../redux/slices/cartSlice";
import { addBookToCompare } from "../../redux/slices/compareSlice";
import { toast } from "react-toastify";
import CustomBtnComponent from "../../components/Button/CustomBtnComponent";
import TextToVoiceComponent from "../../components/TextToVoiceComponent/TextToVoiceComponent";

export default function BookDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useUser();
  const [bookData, setBookData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(1);
  const [userReview, setUserReview] = useState("");

  const showSuccessToast = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const fetchOneBookServer = async (mode) => {
    setIsLoading(true);
    try {
      const book = await fetchOneBook(id);
      setBookData(book);
    } catch (error) {
      console.error("Error fetching book details:", error);
    }

    if (mode) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    setIsLoading(false);
  };

  const handleRating = async (e) => {
    e.preventDefault();
    if (!user.token) {
      alert("Please login to add a review");
      return;
    }
    setIsLoading(true);
    const token = user.token;
    try {
      const addRating = await addReview({
        token,
        rating: userRating,
        comment: userReview,
        bookId: id,
      });
      console.log(addRating);
      await fetchOneBookServer();
      setUserRating(1);
      setUserReview("");
      alert(addRating.message);
    } catch (error) {
      console.error("Error posting review:", error);
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    const token = user.token;
    const bookId = id;
    const response = await deleteReview(token, bookId);
    if (response.success) {
      alert(response.message);
      await fetchOneBookServer();
    } else {
      alert(response.message);
    }
  };

  useEffect(() => {
    fetchOneBookServer(true);
  }, [id]);

  const setEdit = ({ rating, comment }) => {
    setUserReview(comment);
    setUserRating(rating);
    const commentInput = document.getElementById("commentsHolder");
    commentInput.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddBookToCart = () => {
    if (!user.token) {
      toast.error("Please login to add a book to cart");
      return;
    } else {
      if (user.role != 1) {
        dispatch(addBookToCart(bookData));
        showSuccessToast("Book added to cart");
      } else {
        toast.error("Admin cannot add books to cart");
      }
    }
  };

  const handleAddBookToCompare = () => {
    if (!user.token) {
      toast.error("Please login to add a book to compare");
      return;
    } else {
      if (user.role != 1) {
        dispatch(addBookToCompare(bookData));
        showSuccessToast("Book added to compare");
      } else {
        toast.error("Admin cannot add books to compare");
      }
    }
  };

  return (
    <div className="bookDetailsContainer">
      {isLoading && <LoadingComponent />}
      {bookData && (
        <div className="bookDetails">
          <div className="bookImage">
            <img src={bookData.image} alt={bookData.title} />
          </div>
          <div className="bookDetailsDescription">
            <h1 className="title">{bookData.title}</h1>
            <p>Authors: {bookData.authors.join(", ")}</p>
            <h3>Format</h3>
            <div className="price-holder">
              Hardcover
              <div className="priceContent">
                {bookData.discount_percentage > 0 ? (
                  <>
                    <p
                      className="regular-price"
                      style={{
                        color: "#de2454",
                      }}
                    >
                      ${bookData.price.toFixed(2)}
                    </p>
                    <p className="offer-price">
                      $
                      {(
                        bookData.price -
                        (bookData.price * bookData.discount_percentage) / 100
                      ).toFixed(2)}
                    </p>
                  </>
                ) : (
                  <p className="offer-price">${bookData.price.toFixed(2)}</p>
                )}
              </div>
              <p>
                {bookData.stock_quantity > 0 ? (
                  <span
                    style={{
                      color: "#4caf50",
                    }}
                  >
                    <i className="fa-solid fa-check"></i>
                    AVAILAVLE
                  </span>
                ) : (
                  <span style={{ color: "#de2454" }}>
                    <i className="fa-solid fa-times"></i> Out of Stock
                  </span>
                )}
              </p>
            </div>

            <CustomBtnComponent
              text="Add Book To Cart"
              icon={<i className="fa-solid fa-cart-shopping"></i>}
              onClick={handleAddBookToCart}
              primaryColor="#de2454"
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                padding: "20px",
              }}
            />
            <CustomBtnComponent
              text="Add Book To Compare"
              icon={<i className="fa-solid fa-bookmark"></i>}
              onClick={handleAddBookToCompare}
              primaryColor="#de2454"
              style={{
                marginTop: "20px",
                marginLeft: "20px",
                marginBottom: "20px",
                padding: "20px",
              }}
            />
            <div className="rating-holder">
              <RatingsViewer rating={bookData.rating} />
            </div>
            <h3>Description</h3>
            <TextToVoiceComponent text={bookData.description} />
            <p> {bookData.description}</p>
            <h3>Product Details</h3>
            <p>Genre: {bookData.genre}</p>
            <p>ISBN: {bookData.isbn}</p>
            <p>Stock Quantity: {bookData.stock_quantity}</p>

            <div id="commentsHolder" className="commentsHolder">
              <h1>Comments & Rating</h1>
              <form>
                <textarea
                  onChange={(e) => setUserReview(e.target.value)}
                  name="comment"
                  id="comment"
                  cols="30"
                  rows="5"
                  placeholder="Write a comment..."
                  value={userReview}
                ></textarea>
                <select
                  className="ratingSelect"
                  onChange={(e) => setUserRating(Number(e.target.value))}
                  name="rating"
                  id="rating"
                  value={userRating}
                >
                  <option value="1">1⭐</option>
                  <option value="2">2⭐</option>
                  <option value="3">3⭐</option>
                  <option value="4">4⭐</option>
                  <option value="5">5⭐</option>
                </select>
                <button
                  onClick={handleRating}
                  className="submit-btn"
                  type="submit"
                >
                  Submit
                </button>
              </form>

              <div>
                <h1>Reviews</h1>

                {bookData?.reviews &&
                  bookData?.reviews.map((review) => (
                    <div key={review._id} className="review">
                      <h3 className="name">
                        <i className="fa-solid fa-user"></i>

                        {review?.userId?.email}
                      </h3>
                      <p className="rating">
                        <RatingsViewer rating={review.rating} />
                      </p>
                      {review.comment && (
                        <p className="comment">
                          <i className="fa-solid fa-comment"></i>
                          {review.comment}
                        </p>
                      )}
                      <p className="date">
                        Post Date: {bookData?.createdAt?.split("T")[0]}
                      </p>{" "}
                      {user.userId === review.userId._id && (
                        <div className="actions">
                          <i
                            className="fa-solid fa-trash"
                            onClick={handleDelete}
                          ></i>
                          <i
                            className="fa-solid fa-pen-to-square"
                            onClick={() =>
                              setEdit({
                                comment: review.comment,
                                rating: review.rating,
                              })
                            }
                          ></i>
                        </div>
                      )}
                      <hr />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
