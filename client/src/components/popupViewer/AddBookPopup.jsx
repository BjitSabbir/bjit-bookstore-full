import { useUser } from "../../context/UserContext";
import { addBook } from "../../apis/admin/admin.book.api";
import "./popupViewer.scss";
import { useForm, Controller } from "react-hook-form";

// eslint-disable-next-line react/prop-types
export default function AddBookPopup({ updatePopup, fetchBook }) {
  const { user } = useUser();
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      title: "",
      authors: "",
      description: "",
      image: "",
      price: 10,
      genre: "",
      isbn: "",
      confirmIsbn: "",
      stock_quantity: 10,
      book_Active_regions: "",
    },
  });

  const onSubmit = async (data) => {
    data.authors = data.authors.split(",").map((author) => author.trim());
    data.book_Active_regions
      ? (data.book_Active_regions = data.book_Active_regions
          .split(",")
          .map((region) => region.trim()))
      : (data.book_Active_regions = []);

    const response = await addBook(user.token, data);
    if (response.success) {
      alert(response.message);
      updatePopup(false);
      fetchBook();
    } else {
      alert(response.message);
    }
    console.log(data);
  };

  return (
    <div className="popupContainer">
      <div className="popupHolder">
        <i
          className="fa-solid fa-xmark"
          onClick={() => {
            updatePopup(false);
          }}
        ></i>
        <h1 className="popupTitle">Add Book</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
          <div className={`form-group ${errors.title ? "error" : ""}`}>
            <label>Title</label>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{ required: "Title is required" }}
              render={({ field }) => <input {...field} />}
            />
            {errors.title && (
              <span className="error-message">{errors.title.message}</span>
            )}
          </div>

          <div className={`form-group ${errors.authors ? "error" : ""}`}>
            <label>Authors</label>
            <Controller
              name="authors"
              control={control}
              defaultValue=""
              rules={{ required: "Authors are required" }}
              render={({ field }) => <input {...field} />}
            />
            {errors.authors && (
              <span className="error-message">{errors.authors.message}</span>
            )}
          </div>

          <div className={`form-group ${errors.description ? "error" : ""}`}>
            <label>Description</label>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{ required: "Description is required" }}
              render={({ field }) => <textarea {...field} />}
            />
            {errors.description && (
              <span className="error-message">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className={`form-group ${errors.image ? "error" : ""}`}>
            <label>Image URL</label>
            <Controller
              name="image"
              control={control}
              defaultValue=""
              rules={{ required: "Image URL is required" }}
              render={({ field }) => <input {...field} />}
            />
            {errors.image && (
              <span className="error-message">{errors.image.message}</span>
            )}
          </div>

          <div className={`form-group ${errors.price ? "error" : ""}`}>
            <label>Price</label>
            <Controller
              name="price"
              control={control}
              defaultValue=""
              rules={{
                required: "Price is required",
                min: 10,
                max: 1000,
              }}
              render={({ field }) => <input {...field} type="number" />}
            />
            {errors.price && (
              <span className="error-message">
                {errors.price.message} and must be between 10 and 1000
              </span>
            )}
          </div>

          <div className={`form-group ${errors.isbn ? "error" : ""}`}>
            <label>ISBN</label>
            <Controller
              name="isbn"
              control={control}
              defaultValue=""
              rules={{ required: "ISBN is required" }}
              render={({ field }) => <input {...field} />}
            />
            {errors.isbn && (
              <span className="error-message">{errors.isbn.message}</span>
            )}
          </div>

          <div className={`form-group ${errors.stock_quantity ? "error" : ""}`}>
            <label>Stock Quantity</label>
            <Controller
              name="stock_quantity"
              control={control}
              defaultValue=""
              rules={{
                required: "Stock Quantity is required",
                min: 10,
                max: 1000,
              }}
              render={({ field }) => <input {...field} type="number" />}
            />
            {errors.stock_quantity && (
              <span className="error-message">
                {errors.stock_quantity.message} and must be between 10 and 1000
              </span>
            )}
          </div>
          <div className={`form-group ${errors.title ? "error" : ""}`}>
            <label>Genre</label>
            <Controller
              name="genre"
              control={control}
              defaultValue=""
              rules={{ required: "Genre is required" }}
              render={({ field }) => <input {...field} />}
            />
            {errors.title && (
              <span className="error-message">{errors.title.message}</span>
            )}
          </div>
          <div className={`form-group ${errors.title ? "error" : ""}`}>
            <label>Book Active Regions</label>
            <Controller
              name="book_Active_regions"
              control={control}
              defaultValue=""
              rules={{ required: false }}
              render={({ field }) => <input {...field} />}
            />
          </div>

          <input type="submit" value="Add Book" className="submit" />
        </form>
      </div>
    </div>
  );
}
