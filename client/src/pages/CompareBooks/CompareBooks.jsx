import { useSelector, useDispatch } from "react-redux";
import {
  clearState,
  removeBookToCompare,
} from "../../redux/slices/compareSlice";
import "./compareBooks.scss"; // Import the CSS file
import CustomBtnComponent from "../../components/Button/CustomBtnComponent";
import { useNavigate } from "react-router-dom";

export default function CompareBooks() {
  const compareBooks = useSelector((state) => state.compare);
  const dispatch = useDispatch();
  const isMaxReached = compareBooks.length >= 3;
  const navigate = useNavigate();

  return (
    <div className="compare-container">
      <CustomBtnComponent
        text="Clear Comparison"
        onClick={() => dispatch(clearState())}
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          backgroundColor: "#dc3545",
          color: "#fff",
        }}
      />
      <div className="compare-body">
        {compareBooks.map((book, index) => (
          <div className="compare-card" key={index}>
            <div className="card-content">
              <img src={book.image} alt={book.title} className="book-image" />
              <h3>{book.title}</h3>
              <p>
                <strong>Authors:</strong> {book.authors.join(", ")}
              </p>
              <p>
                <strong>Rating:</strong> {book.rating}
              </p>
              <p>
                <strong>Description:</strong> {book.description}
              </p>
              <p>
                <strong>Price:</strong> ${book.price}
              </p>
              <p>
                <strong>Genre:</strong> {book.genre}
              </p>
            </div>

            <CustomBtnComponent
              text="Remove"
              onClick={() => dispatch(removeBookToCompare(book._id))}
            />
          </div>
        ))}

        {!isMaxReached && (
          <div className="compare-card add-more">
            <div className="card-content">
              <p className="add-more-text" onClick={() => navigate("/")}>
                {" "}
                + Add Book
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
