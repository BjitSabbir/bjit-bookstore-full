/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import { getBookByGonre } from "../../apis/book.api";
import { useEffect, useState } from "react";
import "./productCatagory.scss";
import GenreBooks from "./Components/GenreBooks";
import LoadingComponent from "../../components/loading/LoadingComponent";

export default function ProductCatagory({ component }) {
    const { category } = useParams();
    const [gonreBooks, setGonreBooks] = useState([]);
    const [recentBooks, setRecentBooks] = useState([]);
    const [mostCommentedBooks, setMostCommentedBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchBookByGonre = async (gonre) => {
        try {
            setIsLoading(true);
            const response = await getBookByGonre(gonre);
            setGonreBooks(response.data.data.genreBooks);
            setRecentBooks(response.data.data.recentBooks);
            setMostCommentedBooks(response.data.data.mostCommentedBooks);
            setIsLoading(false);
            return response;
        } catch (error) {
            setIsLoading(false);
            console.error(error);
            throw error;
        }
    };

    useEffect(() => {
        fetchBookByGonre(category);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [category]);

    return (
        <div className="productCatagoryContainer">
            {!component && isLoading && <LoadingComponent />}

            {!component && gonreBooks.length > 0 && (
                <GenreBooks
                    bookData={gonreBooks}
                    title={"Book For " + category}
                />
            )}
            <GenreBooks bookData={recentBooks} title="Recent Books" />
            <GenreBooks
                bookData={mostCommentedBooks}
                title="Most Commented Books"
            />
        </div>
    );
}
