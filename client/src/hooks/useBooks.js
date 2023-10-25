import { useState, useEffect } from "react";
import { fetchBooks } from "../apis/book.api";

export function useBooks(initialFilter, initialSortOption, initialSortOrder) {
    const [isLoading, setIsLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [filter, setFilter] = useState(initialFilter);
    const [sortOption, setSortOption] = useState(initialSortOption);
    const [sortOrder, setSortOrder] = useState(initialSortOrder);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPage, setTotalPage] = useState(0);
    const [searchData, setSearchData] = useState("");

    const handlePageChange = (event) => {
        setPage(event.target.value);
    };

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const fetchBook = async () => {
        setIsLoading(true);
        try {
            const fetchedBooks = await fetchBooks({
                sortOption,
                sortOrder,
                searchData,
                page,
                limit
            }); // Use the fetchBooks function
            console.log(fetchedBooks);
            setBooks(fetchedBooks.books);
            setPage(fetchedBooks.page);
            setTotalPage(fetchedBooks.totalPages);

        } catch (error) {
            console.error("Error fetching books:", error);
        }
        setIsLoading(false);
    };

    useEffect(() => {

        const timeOutFunc = setTimeout(() => {
            fetchBook();
        }, 1000);
        return () => {
            clearTimeout(timeOutFunc);
        };

    }, [sortOption, sortOrder, searchData, page, limit]); // Fetch books whenever these dependencies change

    const handleSortOptionChange = (event) => {
        setSortOption(event.target.value);
    };

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };

    const handleFilters = () => {
        fetchBook();
    };

    return {
        isLoading,
        books,
        filter,
        setFilter,
        sortOption,
        setSortOption,
        sortOrder,
        setSortOrder,
        searchData,
        setSearchData,
        handleSortOptionChange,
        handleSortOrderChange,
        handleFilters,
        page,
        setPage,
        limit,
        setLimit,
        totalPage,
        setTotalPage,
        handlePageChange,
        handleLimitChange,


    };
}
