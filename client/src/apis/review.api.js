
import axios from "axios";
import { ADD_OR_EDIT_REVIEW, DELETE_REVIEW } from "../constant";

export const addReview = async ({ token, rating, comment, bookId }) => {
    const config = {
        headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
        },
    };

    const data = {
        bookId: bookId,
        rating: rating,
        comment: comment,
    };

    try {
        const response = await axios.post(
            ADD_OR_EDIT_REVIEW,
            data,
            config
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteReview = async (token, bookId) => {
    const config = {
        headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
        },
    };

    const data = {
        bookId: bookId,
    };

    try {
        const response = await axios.delete(
            DELETE_REVIEW,
            {
                ...config,
                data: data,
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};











// export const addReview = async ({
//     token,
//     rating,
//     comment,
//     bookId
// }) => {

//     console.log(token, rating, comment, bookId);
//     var myHeaders = new Headers();
//     myHeaders.append("x-auth-token", token);
//     myHeaders.append("Content-Type", "application/json");

//     var raw = JSON.stringify({
//         "bookId": bookId,
//         "rating": rating,
//         "comment": comment
//     });

//     var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow'
//     };

//     const response = await fetch("http://15.237.128.241:8000/reviews/addReview", requestOptions)
//         .then(response => response.json())

//     console.log(response);

//     return response;

// }

// export const deleteReview = async (token, bookId) => {
//     var myHeaders = new Headers();
//     myHeaders.append("x-auth-token", token);
//     myHeaders.append("Content-Type", "application/json");

//     var raw = JSON.stringify({
//         "bookId": bookId
//     });

//     var requestOptions = {
//         method: 'DELETE',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow'
//     };

//     const response = await fetch("http://15.237.128.241:8000/reviews/deleteReview", requestOptions)
//         .then(response => response.json())

//     return response;



// }