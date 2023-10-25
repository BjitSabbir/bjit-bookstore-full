/* eslint-disable no-empty */
import { createSlice } from "@reduxjs/toolkit";

const compareSlice = createSlice({
    name: "compare",
    initialState: [],
    reducers: {
        addBookToCompare: (state, action) => {
            const bookToAdd = action.payload;
            const existingBook = state.find(
                (book) => book._id === bookToAdd._id
            );

            if (existingBook) {
                alert("Book already added to compare");
            } else {
                //if already 3 books added
                if (state.length >= 3) {
                    alert("You can't add more than 3 books to compare");
                } else {
                    state.push(bookToAdd);
                }
            }
        },
        removeBookToCompare: (state, action) => {
            return state.filter((book) => book._id !== action.payload);
        },
        clearState: (state) => [],
    },
});

export const { addBookToCompare, removeBookToCompare, clearState } =
    compareSlice.actions;
export default compareSlice.reducer;
