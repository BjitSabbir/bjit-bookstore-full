import { useParams } from "react-router-dom";
import { checkPasswordResetToken, updatePassword } from "../../apis/auth.api";
import { useState, useEffect } from "react";
import LoadingComponent from "../../components/loading/LoadingComponent";

export default function ResetPassword() {
  const { token, userId } = useParams();
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showChangePassPage, setShowChangePassPage] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    // Validation
    if (!password) {
      setPasswordError("Password is required");
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else if (password != confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password is required");
    } else if (password != confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }

    if (!passwordError && !confirmPasswordError) {
      setIsLoading(true);
      const response = await updatePassword(token, userId, password);
      console.log(response);
      setIsLoading(false);
    }
  };
  const checkToken = async () => {
    setIsLoading(true);
    const response = await checkPasswordResetToken(token, userId);
    setIsLoading(false);
    if (response.success) {
      console.log(response);
      setShowChangePassPage(true);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <div className="loginPageContainer">
      {isLoading && <LoadingComponent />}
      <div className="auth_page_container">
        {showChangePassPage ? (
          <div className="auth_page_content" style={{ textAlign: "center" }}>
            <h1>Reset Password</h1>
            <p>Enter your new password to reset your password.</p>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              onSubmit={handleChangePassword}
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
                type="password"
                id="password"
                name="password"
                placeholder="Enter your new password"
              />
              <div style={{ color: "red" }}>{passwordError}</div>

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
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Enter Confirm Password"
              />
              <div style={{ color: "red" }}>{confirmPasswordError}</div>

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
            className="auth_page_content"
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              fontSize: "20px",
            }}
          >
            <i className="fas fa-lock"></i>
            This link has been expired.
          </div>
        )}
      </div>
    </div>
  );
}
