import { useState } from "react";
import { requestForgotPassword } from "../../apis/auth.api";
import LoadingComponent from "../../components/loading/LoadingComponent";

export default function RequestResetPassword() {
  const [isRequesting, setIsRequesting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;

    if (!email) {
      setEmailError("Email is required");
    } else if (!isValidEmail(email)) {
      setEmailError("Invalid email address");
    } else {
      setIsRequesting(true);
      setEmailError("");
      setIsLoading(true);
      await requestForgotPassword(email);
      setIsLoading(false);
    }
  };

  // Helper function to validate email format
  const isValidEmail = (email) => {
    // Use a regex pattern for basic email format validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  return (
    <div className="loginPageContainer">
      {isLoading && <LoadingComponent />}
      <div className="auth_page_container">
        <div
          className="auth_page_content"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {!isRequesting ? (
            <div>
              <h1>Reset Password</h1>
              <p>Enter your email address to reset your password.</p>
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
                onSubmit={handleSubmit}
              >
                <input
                  style={{
                    height: "40px",
                    margin: "10px 0",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    outline: "none",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                />
                <div style={{ color: "red" }}>{emailError}</div>
                <button
                  style={{
                    width: "100%",
                    margin: "10px 0",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "none",
                    backgroundColor: "#007bff",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                  type="submit"
                >
                  Reset Password
                </button>
              </form>
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                fontSize: "24px",
                fontWeight: "bold",
                color: "green",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <i className="fas fa-check"></i>
              Check your email to reset your password
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
