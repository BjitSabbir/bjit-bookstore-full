/* eslint-disable react/prop-types */
import { useState } from "react";
import { useUser } from "../../context/UserContext";
import "./headerComponent.scss";
import HeaderNav from "./headerNav/HeaderNav";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useCookie from "../../hooks/useCookie";
import { FaSignOutAlt, FaUsersCog } from "react-icons/fa";
import { SlHome, SlBag, SlWallet } from "react-icons/sl";
import { GoGitCompare } from "react-icons/go";
import { ImBooks } from "react-icons/im";
import { MdDashboard } from "react-icons/md";
import logo from "../../assets/images/logo.png";
import { clearCart } from "../../redux/slices/cartSlice";

export default function HeaderComponent() {
  const bookDataFromRedux = useSelector((state) => state.cart);
  const { user, logout } = useUser();
  const { removeCookie } = useCookie("jwtToken");
  const navigation = useNavigate();
  const [showOption, setShowOption] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="header-container">
      <div className="headertop">Welcome to the Book Shop</div>
      <div className="headermiddle">
        <div className="left" onClick={() => navigation("/")}>
          <img src={logo} alt="logo" />
        </div>
        <div className="right">
          <HeaderNav icon={<SlHome size={22} />} link="/" />
          <HeaderNav
            icon={<GoGitCompare size={22} />}
            link="/products/compare"
          />
          <HeaderNav
            link="/user/cart"
            icon={<CartIcon bookCount={bookDataFromRedux.length} />}
          />
          <HeaderNav link="/user/wallet" icon={<SlWallet size={22} />} />
          {user.token && (
            <div className="user" onClick={() => setShowOption(!showOption)}>
              <img
                src={`https://robohash.org/${user.email}?size=150x150`}
                alt=""
                className="userImgCircle"
                height={"30px"}
                width={"30px"}
                style={{
                  borderRadius: "50%",
                }}
              />
              {showOption && (
                <div className="floatingWindow">
                  {user && <HeaderNav text="Profile" link="/user/profile/me" />}
                  <LogoutButton
                    removeCookie={removeCookie}
                    logout={logout}
                    navigation={navigation}
                    dispatch={dispatch}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="headerbottom">
        <UserLinks />
        {user.token && user.role === 1 && <AdminLinks />}
        {!user.token && <HeaderNav text="Login" link="/login" />}
        {!user.token && <HeaderNav text="Register" link="/register" />}
      </div>
    </div>
  );
}

function CartIcon({ bookCount }) {
  return (
    <div style={{ position: "relative" }}>
      <SlBag size={22} />
      {bookCount > 0 && <div className="cartItemCount">{bookCount}</div>}
    </div>
  );
}

function LogoutButton({ removeCookie, logout, navigation, dispatch }) {
  return (
    <div
      onClick={() => {
        removeCookie();
        logout();
        navigation("/login");
        dispatch(clearCart());
      }}
      className="logout"
    >
      <span>Logout</span>
      <FaSignOutAlt size={22} />
    </div>
  );
}

function AdminLinks() {
  return (
    <>
      <HeaderNav icon={<MdDashboard size={22} />} link="/admin/dashboard" />
      <HeaderNav icon={<ImBooks size={22} />} link="/admin/products" />
      <HeaderNav icon={<FaUsersCog size={22} />} link="/admin/users" />
      <HeaderNav
        icon={<i className="fa-solid fa-chart-line"></i>}
        link="/admin/transaction"
      />
    </>
  );
}

function UserLinks() {
  return (
    <>
      <HeaderNav
        text={"Editors Choice"}
        type={"s"}
        link="books/gonre/editors-choice"
      />
      <HeaderNav text={"New Books"} type={"s"} link="books/gonre/new-books" />
      <HeaderNav text={"Offers"} type={"s"} link="books/gonre/offers" />
      <HeaderNav text={"Comedy"} type={"s"} link="books/gonre/Comedy" />
      <HeaderNav text={"Fictions"} type={"s"} link="books/gonre/fiction" />
      <HeaderNav
        text={"Non-Fictions"}
        type={"s"}
        link="books/gonre/non-fiction"
      />
      <HeaderNav text={"Mystery"} type={"s"} link="books/gonre/Mystery" />
      <HeaderNav text={"Galery"} type={"s"} link="" />
      <HeaderNav text={"Games & Puzzles"} type={"s"} link="" />
      <HeaderNav text={"Wishlist"} type={"s"} link="" />
    </>
  );
}
