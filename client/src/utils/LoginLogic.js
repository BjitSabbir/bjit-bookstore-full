import { useUser } from "../context/UserContext";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

import useCookie from "../hooks/useCookie";
import { SignupApi, loginApi } from "../apis/auth.api";
import { toast } from "react-toastify";
import { useState } from "react";

export default function LoginLogic() {
    const { login } = useUser();
    const { setCookie, removeCookie } = useCookie("jwtToken");
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);

    const handleLogin = async (data) => {
        setIsLoaded(true);
        const { email, password } = data;
        try {
            const data = await loginApi({
                email: email,
                password: password,
            });
            if (data) {
                const { token } = data;
                const { role, id } = jwt_decode(token);

                removeCookie();
                setCookie({ email, token, role, userId: id });
                login({ email, token, role, userId: id });
                navigate("/");
                toast.success("Login Successful");
                setIsLoaded(false);
            } else {
                toast.error("Invalid Credentials");
                setIsLoaded(false);
            }
        } catch (error) {
            toast.error("Error Logging In");
        }
    };

    const handleSignup = async (data) => {
        const { email, password } = data;
        const response = await SignupApi({ email, password });
        console.log(response.data);

        if (response.success) {
            toast.success("Signup Successful");
            toast.success(`your OTP is : ${response.data}`);
            // navigate("/login");
        } else {
            toast.error("Signup Failed");
        }
    };

    return { handleLogin, handleSignup, isLoaded };
}
