/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./bookCard.scss";

export default function BookCard({ book }) {
  return (
    <Link
      key={book._id}
      to={`/book/${book._id}`}
      className="bookCard-container"
    >
      <div className="overlay">
        <div className="desktop-view">
          <p className="title">{book.title}</p>
          <p className="author">{book.authors[0]}</p>
          <p className="price">
            ${book.price}{" "}
            <span className="rating">
              <i className="fa-solid fa-star"></i>
              {book.rating}
            </span>
          </p>
        </div>
      </div>
      {book.image ? (
        <img className="image" src={book.image} alt={book.title} />
      ) : (
        <img
          className="image"
          src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
          alt={book.title}
        />
      )}
      <div className="mobile-view">
        <p className="title">{book.title}</p>
        <p className="author">{book.authors[0]}</p>
        <p className="price">
          ${book.price}{" "}
          <span className="rating">
            <i className="fa-solid fa-star"></i>
            {book.rating}
          </span>
        </p>
      </div>
    </Link>
  );
}
