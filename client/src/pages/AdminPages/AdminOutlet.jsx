import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useEffect } from "react";
import useCookie from "../../hooks/useCookie";
import HeaderComponent from "../../components/header/HeaderComponent";

export default function AdminOutlet() {
  const { user, login } = useUser();
  const navigation = useNavigate();
  const { getCookie } = useCookie("jwtToken");

  useEffect(() => {
    const data = getCookie();
    if (data?.role !== 1) {
      navigation("/");
    } else if (!user?.role && data?.token) {
      login({
        email: data.email,
        token: data.token,
        role: data.role,
        userId: data.userId,
      });
    }
  }, []);

  return (
    <div>
      <HeaderComponent />
      <Outlet />
    </div>
  );
}
