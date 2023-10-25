import { createSlice } from "@reduxjs/toolkit";

const localStorage = window.localStorage;

const loadCartState = () => {
    const storedState = localStorage.getItem("cart");
    return storedState ? JSON.parse(storedState) : [];
};

const saveCartState = (state) => {
    localStorage.setItem("cart", JSON.stringify(state));
};

const cartSlice = createSlice({
    name: "cart",
    initialState: loadCartState(),
    reducers: {
        addBookToCart: (state, action) => {
            const bookToAdd = action.payload;
            const existingBook = state.find(
                (book) => book._id === bookToAdd._id
            );

            if (existingBook) {
                existingBook.quantity += 1;
            } else {
                state.push({
                    ...bookToAdd,
                    quantity: 1,
                });
            }
            saveCartState(state);
        },
        removeBookToCart: (state, action) => {
            const filteredState = state.filter(
                (book) => book._id !== action.payload
            );
            saveCartState(filteredState);
            return filteredState;
        },
        increaseQuantity: (state, action) => {
            const bookToUpdate = state.find(
                (book) => book._id === action.payload
            );
            if (
                bookToUpdate &&
                bookToUpdate.quantity < 10 &&
                bookToUpdate.quantity >= 0
            ) {
                bookToUpdate.quantity += 1;
            }
            saveCartState(state);
        },
        decreaseQuantity: (state, action) => {
            const bookToUpdate = state.find(
                (book) => book._id === action.payload
            );
            if (bookToUpdate && bookToUpdate.quantity > 1) {
                bookToUpdate.quantity -= 1;
            }
            saveCartState(state);
        },
        clearCart: (state, action) => {
            state = [];
            saveCartState(state);
            return state;
        },
    },
});

export const {
    addBookToCart,
    removeBookToCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
