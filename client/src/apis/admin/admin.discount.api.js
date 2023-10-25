import axios from "axios";
import { toast } from "react-toastify";
import {
    ADD_DISCOUNT,
    GET_ALL_DISCOUNTS,
    UPDATE_DISCOUNT_BY_ID,
    DELETE_DISCOUNT_BY_ID,
    DISABLE_DISCOUNT_BY_ID,
} from "../../constant";

export const getAllDiscounts = async (token) => {
    try {
        const response = await axios.get(GET_ALL_DISCOUNTS, {
            headers: {
                "x-auth-token": token,
            },
        });

        return response;
    } catch (error) {
        console.error(error);
        {
            toast.error("Error Fetching Discounts");
        }
        throw error;
    }
};

export const createDiscount = async (data, token) => {
    console.log(data, token);
    try {
        const response = await axios.post(ADD_DISCOUNT, data, {
            headers: {
                "x-auth-token": token,
            },
        });
        if (response.status === 200) {
            toast.success("Discount Created Successfully");
        }
        return response;
    } catch (error) {
        console.error(error);
        toast.error("Error Creating Discount");
        throw error;
    }
};

export const updateDiscount = async (data, token) => {
    console.log(data, token);
    try {
        const response = await axios.put(
            UPDATE_DISCOUNT_BY_ID + "/" + data._id,
            data,
            {
                headers: {
                    "x-auth-token": token,
                },
            }
        );
        if (response.status === 200) {
            toast.success("Discount Updated Successfully");
            return response;
        }
    } catch (error) {
        console.error(error);
        toast.error("Error Updating Discount");
        return error;
    }
};

export const deleteDiscount = async (data, token) => {
    console.log(data, token);
    try {
        const response = await axios.delete(
            DELETE_DISCOUNT_BY_ID + "/" + data._id,
            {
                headers: {
                    "x-auth-token": token,
                },
            }
        );
        if (response.status === 200) {
            toast.success("Discount Deleted Successfully");
            return response;
        }
    } catch (error) {
        console.error(error);
        toast.error("Error Deleting Discount");
        return error;
    }
};

export const disableDiscount = async (data, token) => {
    console.log(data, token);
    try {
        const response = await axios.put(
            DISABLE_DISCOUNT_BY_ID + "/" + data._id,
            data,
            {
                headers: {
                    "x-auth-token": token,
                },
            }
        );
        if (response.status === 200) {
            toast.success("updated discount status");
            return response;
        }
    } catch (error) {
        console.error(error);
        toast.error("Error Disabling Discount");
        return error;
    }
};
