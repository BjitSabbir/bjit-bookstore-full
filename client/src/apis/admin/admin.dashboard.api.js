import axios from "axios";
import { GET_ANALYTICS } from "../../constant";

export const getAdminAnalytics = async (token) => {
    console.log(token);
    try {
        const response = await axios.get(GET_ANALYTICS, {
            headers: {
                "x-auth-token": token,
            },
        });
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}