// api.js
import axios from "axios";
import { GET_ALL_BOOKS, GET_ONE_BOOK, GET_BOOK_BY_GONRE } from "../constant";

export const fetchBooks = async ({
    sortOption,
    sortOrder,
    searchData,
    page,
    limit
}) => {
    try {
        const response = await fetch(`${GET_ALL_BOOKS}?page=${page}&limit=${limit}&search=${searchData}&sortType=${sortOrder}&sortKey=${sortOption}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch books: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const fetchOneBook = async (id) => {
    try {
        const response = await axios.get(GET_ONE_BOOK + id);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const getBookByGonre = async (gonre) => {
    try {
        const response = await axios.get(GET_BOOK_BY_GONRE + gonre);
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        throw error;

    }
}