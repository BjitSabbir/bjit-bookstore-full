import { useEffect } from "react";
import "./auth.scss";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import LoginLogic from "../../utils/LoginLogic";
import useCookie from "../../hooks/useCookie";
import { useForm, Controller } from "react-hook-form";
import LoadingComponent from "../../components/loading/LoadingComponent";

export default function LoginPage() {
  const { user, login } = useUser();
  const navigate = useNavigate();
  const { handleLogin, isLoaded } = LoginLogic({});

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
  } = useForm();

  const onSubmit = async (data) => {
    const result = await handleLogin(data);

    if (result.error) {
      setError(result.field, { type: "manual", message: result.message });
    } else if (result.token) {
      login({
        email: result.email,
        token: result.token,
        role: result.role,
        userId: result.userId,
      });
      navigate("/");
    }
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

  console.log(errors);

  return (
    <div className="loginPageContainer">
      {isLoaded && <LoadingComponent />}
      <div className="overlay">
        <form onSubmit={handleSubmit(onSubmit)} className="loginHolder">
          <h1>Login Page</h1>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <Controller
              name="email"
              control={control}
              defaultValue="user1@gmail.com"
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
              defaultValue="Sabbir@Xyz1"
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
          <button type="submit">Submit</button>
          <p className="login-option">
            Dont have an account?{" "}
            <span onClick={() => navigate("/register")} className="link">
              Register
            </span>
          </p>

          <p
            className="login-option"
            style={{
              margin: "0",
            }}
          >
            Forgote Password?
            <span
              onClick={() => navigate("/auth/resetPassword")}
              className="link"
            >
              Reset
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
