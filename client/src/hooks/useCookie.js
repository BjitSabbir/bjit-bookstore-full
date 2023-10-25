import Cookies from 'js-cookie';

function useCookie(cookieName) {

    const setCookie = (value, options = {}) => {
        console.log("value->", value);
        const stringifyValue = JSON.stringify(value);
        Cookies.set(cookieName, stringifyValue, { sameSite: 'None', secure: true, ...options });
    };
    const getCookie = () => {
        const cookieValue = Cookies.get(cookieName);
        if (cookieValue) {
            return JSON.parse(cookieValue);
        } else {
            return null;
        }
    };
    const removeCookie = () => {
        Cookies.remove(cookieName);
    };


    return { setCookie, getCookie, removeCookie };
}

export default useCookie;
