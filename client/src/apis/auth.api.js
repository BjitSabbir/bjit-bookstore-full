import axios from "axios";
import {
    LOGIN_URL,
    REGISTER_URL,
    VERIFY_EMAIL_URL,
    REQUEST_OTP_URL,
} from "../constant";
import { toast } from "react-toastify";

export const loginApi = async ({ email, password }) => {
    try {
        const response = await axios.post(LOGIN_URL, {
            email: email,
            password: password,
        });

        console.log("login response", response);

        const data = response.data;

        if (data.success == false) {
            toast.error(data.message);
        } else if (data.success == true) {
            return data.data;
        }
    } catch (error) {
        console.error(error);
    }
};

export const SignupApi = async ({ email, password }) => {
    console.log(email, password);
    try {
        const response = await axios.post(REGISTER_URL, {
            email: email,
            password: password,
        });

        console.log("Signup response", response);

        const data = response.data;

        if (data.success == false) {
            toast.error(data.message);
        } else if (data.success == true) {
            return data;
        }
    } catch (error) {
        console.error(error);
    }
};

export const verifyEmailApi = async ({ email, otp }) => {
    try {
        const response = await axios.post(VERIFY_EMAIL_URL, {
            email: email,
            otp: otp,
        });

        console.log("verify email response", response);

        const data = response.data;

        if (data.success == false) {
            toast.error(data.message);
        } else if (data.success == true) {
            toast.success("Email verified successfully");
            return data;
        }
    } catch (error) {
        toast.error(error.response.data.message);
        console.error(error);
    }
};

export const requestOtpApi = async ({ email }) => {
    console.log(email);
    try {
        console.log("request otp api", REQUEST_OTP_URL);
        const response = await axios.post(REQUEST_OTP_URL, {
            email: email,
        });

        console.log("request otp response", response);

        const data = response.data;

        if (data.success == false) {
            toast.error(data.message);
        } else if (data.success == true) {
            toast.success("OTP fetched successfully");
            return data;
        }
    } catch (error) {
        toast.error(error.response.data.message);
        console.error(error);
    }
};



export const requestForgotPassword = async (email) => {
    try {
        const response = await axios.post("http://localhost:8000/auth/requestPasswordReset", {
            email: email,
        });

        const data = response.data;

        if (data.success === true) {
            toast.success("Password reset link sent successfully");
            return data.data;
        } else {
            toast.error(data.message || "Something went wrong. Please try again.");
            return null;
        }
    } catch (error) {
        toast.error("An error occurred. Please try again.");
        console.error(error);
        return null;
    }
}

export const updatePassword = async (resetToken, userId, password) => {
    try {
        const response = await axios.post("http://localhost:8000/auth/resetPassword", {
            resetToken,
            userId,
            password,
        });

        const data = response.data;
        console.log(data);

        if (data && data.success) {
            toast.success("Password reset successful");
            return data;
        } else {
            toast.error(data.message || "Something went wrong. Please try again.");
            return null;
        }
    } catch (error) {
        console.error(error);
        toast.error("An error occurred. Please try again.");
        return null;
    }
}

export const checkPasswordResetToken = async (resetToken, userId) => {
    try {
        const response = await axios.post("http://localhost:8000/auth/checkPasswordResetToken", {
            resetToken: resetToken,
            userId: userId,
        });

        const data = response.data;
        console.log(data);

        if (data.success === true) {
            return data;
        } else {
            toast.error(data.message || "Something went wrong. Please try again.");
            return null;
        }

    } catch (error) {
        console.error(error);
        return null;
    }
}