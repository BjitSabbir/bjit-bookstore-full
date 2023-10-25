import "./storePage.scss";
import LoadingComponent from "../../components/loading/LoadingComponent";
import BookCard from "../../components/bookCard/BookCard";
import SliderComponent from "../../components/slider/SliderComponent";
import { useBooks } from "../../hooks/useBooks";
import { useEffect } from "react";
import ProductCatagory from "../ProductCatagory/ProductCatagory";
import ShowDiscountComponent from "../../components/showDiscount/ShowDiscountComponent";

export default function StorePage() {
  const {
    isLoading,
    books,
    sortOption,
    sortOrder,
    setSearchData,
    handleSortOptionChange,
    handleSortOrderChange,
    page,
    limit,
    handlePageChange,
    handleLimitChange,
    totalPage,
  } = useBooks("All", "rating", "asc");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="storePageContainer">
      <SliderComponent />

      <div className="storPageMiddleContainer">
        {isLoading && <LoadingComponent />}
        <div className="sortingOption">
          <div className="sortItem">
            <p>Page</p>
            <select
              className="dropdown"
              onChange={handlePageChange}
              value={page}
            >
              {Array.from({ length: totalPage }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="sortItem">
            <p>Limit</p>
            <select
              className="dropdown"
              onChange={handleLimitChange}
              value={limit}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="sortItem">
            <p>Sort by</p>
            <select
              className="dropdown"
              onChange={handleSortOptionChange}
              value={sortOption}
            >
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          <div className="sortItem">
            <p>Sort order</p>
            <select
              className="dropdown"
              onChange={handleSortOrderChange}
              value={sortOrder}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div className="sortItem">
            <p>Sort order</p>
            <div className="searchHolder">
              <input
                className="search-input"
                type="text"
                placeholder="🔍 Search"
                onChange={(e) => setSearchData(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="bookContainer">
          {books.map((book, index) => {
            return <BookCard key={index} book={book} />;
          })}
        </div>
      </div>

      <ShowDiscountComponent />

      <ProductCatagory component={true} />

      {/* <ImageRotator /> */}
    </div>
  );
}
