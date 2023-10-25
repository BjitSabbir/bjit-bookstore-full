import axios from "axios";
import { GET_WALLET, TOPUP_WALLET, GET_WALLET_TRANSECTIONS } from "../constant";

export const fetchWallet = async (token) => {
    try {
        const response = await axios.get(GET_WALLET, {
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

export const topupWallet = async (token, amount) => {
    try {
        const response = await axios.post(
            TOPUP_WALLET,
            { amount },
            {
                headers: {
                    "x-auth-token": token,
                    "Content-Type": "application/json",
                },
            }
        );

        const result = response.data;

        if (result.success === false) {
            console.log(result.message);
            return {
                success: false,
                message: "An error occurred while making the request.",
            };
        } else {
            console.log(result);
            return result;
        }
    } catch (error) {
        console.error("Error:", error);
        return {
            success: false,
            message: "An error occurred while making the request.",
        };
    }
};

export const fetchWalletTransections = async (token) => {
    try {
        const response = await axios.get(GET_WALLET_TRANSECTIONS, {
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
        } else {
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
