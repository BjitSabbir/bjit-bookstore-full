const BASE_URL = "http://15.237.128.241:8000";

//books
const GET_ALL_BOOKS = `${BASE_URL}/books/getAllBooks`;
const GET_ONE_BOOK = `${BASE_URL}/books/`;
const GET_BOOK_BY_GONRE = `${BASE_URL}/books/getBooksByGenre/`;

// auth
const LOGIN_URL = `${BASE_URL}/auth/login`;
const REGISTER_URL = `${BASE_URL}/auth/register`;
const REQUEST_OTP_URL = `${BASE_URL}/auth/requestOtp`;
const VERIFY_EMAIL_URL = `${BASE_URL}/auth/verifyEmail`;

//review
const ADD_OR_EDIT_REVIEW = `${BASE_URL}/reviews/addReview`;
const DELETE_REVIEW = `${BASE_URL}/reviews/deleteReview`;

//user wallet
const GET_WALLET = `${BASE_URL}/user/wallet`;
const TOPUP_WALLET = `${BASE_URL}/user/wallet/topup`;
const GET_WALLET_TRANSECTIONS = `${BASE_URL}/user/wallet/transections`;

//user Profile
const GET_USER_PROFILE = `${BASE_URL}/user/profile`;
const UPDATE_USER_PROFILE = `${BASE_URL}/user/profile/update`;

//user cart
const USER_CART_ADD = `${BASE_URL}/user/cart/addMany`;
const USER_CART_CHECKOUT = `${BASE_URL}/user/transactions`;

//admin
const GET_ALL_USERS = `${BASE_URL}/admin/fetch/allUsers`;
const UPDATE_USERS_DATA = `${BASE_URL}/admin/edit/user`;
const GET_ANALYTICS = `${BASE_URL}/admin/analytics`;

//discount
const GET_ALL_DISCOUNTS = `${BASE_URL}/admin/discount/all`;
const ADD_DISCOUNT = `${BASE_URL}/admin/discount/add`;
const DELETE_DISCOUNT_BY_ID = `${BASE_URL}/admin/discount/remove`;
const GET_DISCOUNT_BY_ID = `${BASE_URL}/admin/discount/get`;
const UPDATE_DISCOUNT_BY_ID = `${BASE_URL}/admin/discount/update`;
const DISABLE_DISCOUNT_BY_ID = `${BASE_URL}/admin/discount/disable`;

//transections
const GET_ALL_USERS_TRANSECTIONS = `${BASE_URL}/admin/fetch/transections`;
const UPDATE_TRANSECTION_BY_ID = `${BASE_URL}/update/transaction/`;

export {
    GET_ALL_BOOKS,
    GET_ONE_BOOK,
    LOGIN_URL,
    REGISTER_URL,
    REQUEST_OTP_URL,
    VERIFY_EMAIL_URL,
    ADD_OR_EDIT_REVIEW,
    DELETE_REVIEW,
    GET_WALLET,
    TOPUP_WALLET,
    GET_USER_PROFILE,
    UPDATE_USER_PROFILE,
    GET_WALLET_TRANSECTIONS,
    GET_ALL_USERS,
    USER_CART_ADD,
    GET_ANALYTICS,
    GET_BOOK_BY_GONRE,
    USER_CART_CHECKOUT,
    GET_ALL_DISCOUNTS,
    ADD_DISCOUNT,
    DELETE_DISCOUNT_BY_ID,
    GET_DISCOUNT_BY_ID,
    UPDATE_DISCOUNT_BY_ID,
    DISABLE_DISCOUNT_BY_ID,
    UPDATE_USERS_DATA,
    GET_ALL_USERS_TRANSECTIONS,
    UPDATE_TRANSECTION_BY_ID
};
