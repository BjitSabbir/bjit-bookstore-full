import { NavLink, Outlet } from "react-router-dom";
import "./outletPage.scss";
import { useUser } from "../../context/UserContext";

import { useEffect } from "react";
import HeaderComponent from "../../components/header/HeaderComponent";
import useCookie from "../../hooks/useCookie";

export default function OutletPage() {
  const { user, login } = useUser();
  const { getCookie } = useCookie("jwtToken");

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    if (user?.token) return;
    const data = getCookie();
    if (data?.token) {
      login({
        email: data.email,
        token: data.token,
        role: data.role,
        userId: data.userId,
      });
    }
  }, []);

  return (
    <div className="outletPage-container">
      <HeaderComponent />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="footerTop">
          <ul>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "footerLink active" : "footerLink"
                }
                to="/privacy-policy"
              >
                Privacy Policy
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "footerLink active" : "footerLink"
                }
                to="/terms-of-service"
              >
                Terms of Service
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="footerBottom">
          <p>&copy; 2023 My Website</p>
          <i className="fa-solid fa-chevron-up" onClick={scrollToTop}></i>
        </div>
      </footer>
    </div>
  );
}
