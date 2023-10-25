import React, { useState } from "react";
import "./auth.scss";
import CustomBtnComponent from "../../components/Button/CustomBtnComponent";
import { requestOtpApi, verifyEmailApi } from "../../apis/auth.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../../components/loading/LoadingComponent";

export default function ConfirmEmail() {
    const [showConfirmEmail, setShowConfirmEmail] = useState(true);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [otpResponse, setOtpResponse] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const apiHandelConfirmEmail = async () => {
        //check regex for email

        const isEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
        if (!isEmail.test(email)) {
            toast.error("Please enter a valid email");
            return;
        }
        setIsLoading(true);
        const response = await verifyEmailApi({ email, otp });
        if (response.success) {
            navigate("/login");
        }
        setIsLoading(false);
    };

    const apiHandleRequestOTP = async () => {
        //check regex for email
        const isEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
        if (!isEmail.test(email)) {
            toast.error("Please enter a valid email");
            return;
        }
        setIsLoading(true);
        const response = await requestOtpApi({ email: email });
        setOtpResponse(response);
        setIsLoading(false);
    };

    const handleConfirmEmail = () => {
        apiHandelConfirmEmail();
    };

    const handleRequestOTP = () => {
        apiHandleRequestOTP();
    };

    return (
        <div className="loginPageContainer">
            {isLoading && <LoadingComponent />}
            <div className="auth_page_container">
                <div className="auth_page_content">
                    <div className="auth_page_navigation">
                        {showConfirmEmail ? (
                            <div>
                                <h1> Confirm Email</h1>
                            </div>
                        ) : (
                            <div>
                                <h1>Request OTP</h1>
                            </div>
                        )}
                        {showConfirmEmail ? (
                            <CustomBtnComponent
                                icon={<i className="fas fa-arrow-right"></i>}
                                onClick={() =>
                                    setShowConfirmEmail(!showConfirmEmail)
                                }
                            />
                        ) : (
                            <CustomBtnComponent
                                icon={<i className="fas fa-arrow-left"></i>}
                                onClick={() =>
                                    setShowConfirmEmail(!showConfirmEmail)
                                }
                            />
                        )}
                    </div>

                    <div className="auth_page_body">
                        <div
                            className={
                                showConfirmEmail
                                    ? "left transformRightToLeft"
                                    : "left transformLeftToRight"
                            }
                        >
                            <img
                                src="https://cuperipe.sirv.com/bookstore/istockphoto-1357207733-612x612.jpg"
                                alt="confirm email"
                            />

                            <div className="inputHolder">
                                <p>
                                    Please insert your email and otp to confirm
                                    your email
                                </p>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                />
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="OTP"
                                />
                                <CustomBtnComponent
                                    style={{
                                        width: "100%",
                                        maxWidth: "250px",
                                        marginTop: "1rem",
                                        padding: "0.5rem 0",
                                    }}
                                    text="Confirm"
                                    onClick={handleConfirmEmail}
                                />
                            </div>
                        </div>
                        <div
                            className={
                                showConfirmEmail
                                    ? "right transformRightToLeft"
                                    : "right transformLeftToRight"
                            }
                        >
                            <img
                                src="https://cuperipe.sirv.com/bookstore/istockphoto-1357207733-612x612.jpg"
                                alt="confirm email"
                            />

                            <div className="inputHolder">
                                <p>
                                    Please insert your email and otp to confirm
                                    your email
                                </p>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    placeholder="Email"
                                />

                                {/* {JSON.stringify(otpResponse.data)} */}

                                {otpResponse?.data && (
                                    <span className="otp-res">
                                        Your OTP is : {otpResponse.data}
                                    </span>
                                )}

                                <CustomBtnComponent
                                    style={{
                                        width: "100%",
                                        maxWidth: "250px",
                                        marginTop: "1rem",
                                        padding: "0.5rem 0",
                                    }}
                                    text="Request OTP"
                                    onClick={handleRequestOTP}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
