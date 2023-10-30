import axios from "axios";

export const addBook = async (token, data) => {
    try {
        console.log("data->", data);
        const {
            title,
            authors,
            description,
            image,
            price,
            genre,
            isbn,
            stock_quantity,
            book_Active_regions,
        } = data;

        console.log(
            title,
            authors,
            description,
            image,
            price,
            genre,
            isbn,
            stock_quantity,
            book_Active_regions
        );

        const response = await axios.post(
            "http://15.237.128.241:8000/books/add",
            {
                title,
                authors,
                description,
                image,
                price,
                genre,
                isbn,
                stock_quantity,
                book_Active_regions,
            },
            {
                headers: {
                    'x-auth-token': token, // Pass the token from the function parameter
                },
            }
        );

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateBook = async (token, id, data) => {
    try {


        const response = await axios.put(
            `http://15.237.128.241:8000/books/edit/${id}`,
            {
                ...data,
            },
            {
                headers: {
                    'x-auth-token': token, // Pass the token from the function parameter
                },
            }
        );

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }


}

export const removeBook = async (token, id) => {
    try {
        const response = await axios.delete(
            `http://15.237.128.241:8000/books/delete/${id}`,
            {
                headers: {
                    'x-auth-token': token,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }

}

