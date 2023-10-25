import { useEffect } from "react";
import "./auth.scss";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import LoginLogic from "../../utils/LoginLogic";
import useCookie from "../../hooks/useCookie";
import { useForm, Controller } from "react-hook-form";

export default function SignupPage() {
    const { user, login } = useUser();
    const navigate = useNavigate();
    const { handleSignup } = LoginLogic({});

    useEffect(() => {
        window.scrollTo({
            top: 125,
            behavior: "smooth",
        });
    }, []);

    const { getCookie } = useCookie("jwtToken");
    const {
        control,
        formState: { errors },
        handleSubmit,
        setError,
        watch,
    } = useForm();

    const onSubmit = async (data) => {
        await handleSignup(data);
    };

    useEffect(() => {
        if (user?.token) {
            navigate("/");
        } else {
            const data = getCookie();
            if (data?.token) {
                login({
                    email: data.email,
                    token: data.token,
                    role: data.role,
                    userId: data.userId,
                });
                navigate("/");
            }
        }
    }, []);

    return (
        <div className="loginPageContainer">
            <div className="overlay">
                <form onSubmit={handleSubmit(onSubmit)} className="loginHolder">
                    <h1>Signup Page</h1>
                    <div className="input-container">
                        <label htmlFor="email">Email</label>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: "Invalid email address",
                                },
                            }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="input"
                                    type="text"
                                    placeholder="email"
                                    value={field.value}
                                />
                            )}
                        />
                        {
                            <span className="error">
                                {errors.email && errors.email.message}
                            </span>
                        }
                    </div>
                    <div className="input-container">
                        <label htmlFor="email">Password</label>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: {
                                    value: 6,
                                    message: "Minimum 6 character",
                                },
                            }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="password"
                                    className="input"
                                    placeholder="password"
                                    value={field.value}
                                />
                            )}
                        />
                        {
                            <span className="error">
                                {errors.password && errors.password.message}
                            </span>
                        }
                        <i
                            onClick={() => {
                                const password = document.querySelector(
                                    "input[name='password']"
                                );
                                if (password.type === "password") {
                                    password.type = "text";
                                } else {
                                    password.type = "password";
                                }
                            }}
                            className="fa fa-eye"
                        ></i>
                    </div>
                    <div className="input-container">
                        <label htmlFor="email">Confirm Password</label>
                        <Controller
                            name="confirmPassword"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: {
                                    value: 6,
                                    message: "Minimum 6 character",
                                },
                                validate: (value) => {
                                    value === watch("password") ||
                                        "Password don't match";
                                },
                            }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="password"
                                    className="input"
                                    placeholder=""
                                    value={field.value}
                                />
                            )}
                        />
                        {
                            <span className="error">
                                {errors.confirmPassword &&
                                    errors.confirmPassword.message}
                            </span>
                        }
                        <i
                            onClick={() => {
                                const password = document.querySelector(
                                    "input[name='confirmPassword']"
                                );
                                if (password.type === "password") {
                                    password.type = "text";
                                } else {
                                    password.type = "password";
                                }
                            }}
                            className="fa fa-eye"
                        ></i>
                    </div>
                    <button type="submit">Submit</button>
                    <div className="login-option">
                        Already have an account?{" "}
                        <span
                            onClick={() => navigate("/login")}
                            className="link"
                        >
                            Login
                        </span>
                    </div>
                    <div className="login-option">
                        Verify Email{" "}
                        <span
                            onClick={() => navigate("/auth/confirmEmail")}
                            className="link"
                        >
                            Click Here
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}
