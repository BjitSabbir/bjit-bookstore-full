import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import OutletPage from "./pages/OutletPage/OutletPage";
import StorePage from "./pages/HomePage/StorePage";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import LoginPage from "./pages/AuthPage/LoginPage";
import SignupPage from "./pages/AuthPage/SignupPage";
import BookDetails from "./pages/BookDetails/BookDetails";
import { UserProvider } from "./context/UserContext";
import WalletPage from "./pages/WalletPage/WalletPage";
import AdminOutlet from "./pages/AdminPages/AdminOutlet";
import AdminProductPage from "./pages/AdminPages/AdminProduct/AdminProductPage";
import CartPage from "./pages/CartPage/CartPage";
import UserProfile from "./pages/UserProfilePage/UserProfile";
import AdminDashboard from "./pages/AdminPages/Dashboard/AdminDashboard";
import AdminUsersPages from "./pages/AdminPages/AdminUsers/AdminUsersPages";
import ProductCatagory from "./pages/ProductCatagory/ProductCatagory";
import CompareBooks from "./pages/CompareBooks/CompareBooks";
import AdminDiscountPage from "./pages/AdminPages/AdminDiscount/AdminDiscountPage";
import ConfirmEmail from "./pages/AuthPage/ConfirmEmail";
import CompleteTransectionPage from "./pages/CompleteTransectionPage/CompleteTransectionPage";
import AdminTransectionPage from "./pages/AdminPages/AdminTransectionPage/AdminTransectionPage";
import ResetPassword from "./pages/AuthPage/ResetPassword";
import RequestResetPassword from "./pages/AuthPage/RequestResetPassword";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OutletPage />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<SignupPage />} />
            <Route path="auth/confirmEmail" element={<ConfirmEmail />} />
            <Route
              path="auth/resetPassword"
              element={<RequestResetPassword />}
            />
            <Route
              path="auth/resetPassword/:token/:userId"
              element={<ResetPassword />}
            />

            <Route index element={<StorePage />} />
            <Route path="book/:id" element={<BookDetails />} />
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="user/wallet" element={<WalletPage />} />
            <Route path="user/cart" element={<CartPage />} />
            <Route path="products/compare" element={<CompareBooks />} />
            <Route path="user/profile/:uuid" element={<UserProfile />} />
            <Route path="books/gonre/:category" element={<ProductCatagory />} />
            <Route
              path="user/checkoutPage"
              element={<CompleteTransectionPage />}
            />
          </Route>
          <Route path="/admin" element={<AdminOutlet />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProductPage />} />
            <Route path="users" element={<AdminUsersPages />} />
            <Route path="discounts" element={<AdminDiscountPage />} />
            <Route path="transaction" element={<AdminTransectionPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
