import { useEffect, useState } from "react";
import { fetchUserProfile } from "../apis/user.api";

const useUserData = (user) => {
    // console.log("user->", user);
    const [userData, setUserData] = useState(null);
    const [userReviews, setUserReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [transactionHistory, setTransactionHistory] = useState([]);

    useEffect(() => {
        if (user.token) {
            console.log("user->", user);
            fetchUserProfile(user.token).then((result) => {
                if (result) {
                    setUserData(result.user);
                    setTransactionHistory(result.usersTransections);
                    setUserReviews(result.user.reviews);
                    setLoading(false);
                    console.log(result);
                } else {
                    setUserData(null);
                    setLoading(false);
                }
            });
        } else {
            setUserData(null);
            setLoading(false);
        }
    }, [user]);

    return { userData, userReviews, setUserData, transactionHistory, loading };
};

export default useUserData;
