import axios from "axios";
import { USER_CART_ADD } from "../constant";
import { toast } from "react-toastify";

export const addManyToCart = async (token, books) => {
    console.log(token);
    try {
        const response = await axios.post(USER_CART_ADD, books, {
            headers: {
                "x-auth-token": token,
            },
        });
        console;
        return response.data;
    } catch (error) {
        console.error(error);
        return error.response.data;
        // toast.error(error.response.data.message);
    }
};

export const checkoutCart = async (token) => {
    try {
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "http://15.237.128.241:8000/user/transactions",
            headers: {
                "x-auth-token": token,
            },
        };

        const response = await axios.request(config);
        console.log("API Response:", response);
        return response.data;
    } catch (error) {
        console.error(error);
        toast.error(error.response.data.message);
    }
};
