import axios from "axios";
import { GET_ALL_USERS, UPDATE_USERS_DATA } from "../../constant";
import { toast } from "react-toastify";

export const getAllUsers = async (token, page, limit, sortType, sortKey) => {
    try {
        const response = await axios.get(
            GET_ALL_USERS +
                `?page=${page}&limit=${limit}&sortType=${sortType}&sortKey=${sortKey}`,
            {
                headers: {
                    "x-auth-token": token,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateUsersData = async (token, userId, updatedUser) => {
    try {
        const response = await axios.put(
            UPDATE_USERS_DATA + "/" + userId,
            updatedUser,
            {
                headers: {
                    "x-auth-token": token,
                },
            }
        );
        if (response.data.success) {
            toast.success(response.data.message);
            return response.data;
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};
