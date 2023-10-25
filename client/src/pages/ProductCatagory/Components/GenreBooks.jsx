/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

export default function GenreBooks({ bookData, title }) {
    const navigation = useNavigate();
    return (
        <div className="genreBook-container">
            <h1 className="bookTitle">{title}</h1>
            <div className="books">
                {bookData &&
                    bookData?.map((book) => (
                        <div key={book._id} className="book">
                            <img
                                src={book.image}
                                alt={book.title}
                                onClick={() => navigation(`/book/${book._id}`)}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
}
