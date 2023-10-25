/* eslint-disable react/prop-types */
import { useState } from "react";
import { removeBook, updateBook } from "../../../apis/admin/admin.book.api";
import { useNavigate } from "react-router-dom";

export default function UpdateTableBook({ user, book, fetchBook }) {
  const navigate = useNavigate();
  const handleOnDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Book?"
    );

    if (confirmed) {
      try {
        const response = await removeBook(user.token, id);
        if (response.success) {
          alert(response.message);
          await fetchBook();
        } else {
          alert(response.message);
        }
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  };
  const [editBooks, setEditBooks] = useState(false);
  const [editedBook, setEditedBook] = useState({ ...book });

  const handleEditClick = () => {
    setEditBooks(true);
  };

  const handleCancelEdit = () => {
    setEditBooks(false);
    setEditedBook({ ...book });
  };

  const handleSaveEdit = async () => {
    console.log("Updated Book:", editedBook);
    const response = await updateBook(user.token, editedBook._id, editedBook);
    console.log(response);
    if (response.success) {
      alert("book updated successfully");
      setEditBooks(false);
      await fetchBook();
    } else {
      alert(response.message);
    }
    setEditBooks(false);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name == "authors") {
      value = value.split(",");
    } else if (name == "book_Active_regions") {
      value = value.split(",");
    }

    setEditedBook({
      ...editedBook,
      [name]: value,
    });
  };

  return (
    <tr>
      <td>{book.book_id}</td>
      <td>
        {editBooks ? (
          <input
            type="text"
            name="title"
            value={editedBook.title}
            onChange={handleChange}
          />
        ) : (
          book.title
        )}
      </td>
      <td>
        {editBooks ? (
          <input
            type="text"
            name="image"
            value={editedBook.image}
            onChange={handleChange}
          />
        ) : book.image ? (
          <img src={book.image} alt={book.title} height={100} />
        ) : (
          <p>No image</p>
        )}
      </td>
      <td>
        {editBooks ? (
          <textarea
            type="textArea"
            name="description"
            value={editedBook.description}
            onChange={handleChange}
          />
        ) : (
          <i className="fa-solid fa-eye"></i>
        )}
      </td>

      <td>
        {editBooks ? (
          <input
            type="text"
            name="genre"
            value={editedBook.genre}
            onChange={handleChange}
          />
        ) : (
          book.genre
        )}
      </td>
      <td>
        {editBooks ? (
          <input
            type="text"
            name="authors"
            value={editedBook.authors}
            onChange={handleChange}
          />
        ) : (
          book.authors.join(", ")
        )}
      </td>
      <td>
        {editBooks ? (
          <input
            type="number"
            name="price"
            value={editedBook.price}
            onChange={handleChange}
          />
        ) : (
          `$${book.price}`
        )}
      </td>
      <td>
        {editBooks ? (
          <input
            type="number"
            name="stock_quantity"
            value={editedBook.stock_quantity}
            onChange={handleChange}
          />
        ) : (
          `${book.stock_quantity}`
        )}
      </td>
      <td>
        {editBooks ? (
          <input
            type="text"
            name="book_Active_regions"
            value={editedBook.book_Active_regions}
            onChange={handleChange}
          />
        ) : (
          book.book_Active_regions.join(", ")
        )}
      </td>

      <td>{book.rating}</td>

      <td className="actionHolder">
        {editBooks ? (
          <div className="ButtonHolder">
            <button className="save" onClick={handleSaveEdit}>
              Save
            </button>
            <button className="cancleBtn" onClick={handleCancelEdit}>
              Cancel
            </button>
          </div>
        ) : (
          <button onClick={handleEditClick} className="edit">
            Edit
          </button>
        )}
        <button
          onClick={() => {
            navigate(`/book/${book._id}`);
          }}
          className="view"
        >
          <i className="fas fa-eye"></i>
        </button>
        <button onClick={() => handleOnDelete(book._id)} className="delete">
          <i className="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  );
}
