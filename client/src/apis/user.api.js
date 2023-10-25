import { toast } from "react-toastify";
import { GET_USER_PROFILE, UPDATE_USER_PROFILE } from "../constant";
import axios from "axios";

export const fetchUserProfile = async (token) => {
    try {
        const response = await axios.get(GET_USER_PROFILE, {
            headers: {
                "x-auth-token": token,
            },
        });

        const result = response.data;

        if (result.success === false) {
            console.log(result.message);
            return {
                success: false,
                message: "An error occurred while making the request.",
            };
        } else if (result.success === true) {
            console.log(result);
            return result.data;
        }
    } catch (error) {
        console.error("Error:", error);
        return {
            success: false,
            message: "An error occurred while making the request.",
        };
    }
};

export const updateUserProfile = async (token, userData) => {
    try {
        const response = await axios.put(UPDATE_USER_PROFILE, userData, {
            headers: {
                "x-auth-token": token,
            },
        });

        const result = response.data;

        if (result.success === false) {
            console.log(result.message);
            toast.error(result.message);
            return {
                success: false,
                message: "An error occurred while making the request.",
            };
        } else if (result.success === true) {
            console.log(result);
            toast.success(result.message);
            return result.data;
        }
    } catch (error) {
        console.error("Error:", error);
        return {
            success: false,
            message: "An error occurred while making the request.",
        };
    }
};
