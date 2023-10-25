import axios from "axios";
import { GET_ALL_USERS_TRANSECTIONS } from "../../constant";

export const getAllUsersTransactions = async (token) => {
    try {
        const response = await axios.get(GET_ALL_USERS_TRANSECTIONS, {
            headers: {
                "x-auth-token": token,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateTransaction = async (id, status, token) => {
    const UPDATE_TRANSECTION_BY_ID = 'http://localhost:8000/admin/update/transaction/';
    const url = UPDATE_TRANSECTION_BY_ID + id;

    try {
        const response = await axios.put(url, { status: status }, {
            headers: {
                'x-auth-token': token,
                'Content-Type': 'application/json',
            },
        });

        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const getTop3Discounts = async () => {

    try {
        const response = await axios.get("http://localhost:8000/admin/discount/getLatestActiveDiscount");
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}