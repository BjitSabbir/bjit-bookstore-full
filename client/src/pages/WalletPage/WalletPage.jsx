import "./walletPage.scss";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { fetchWallet, topupWallet } from "../../apis/wallet.api";
import WalletTransectionList from "./WalletTransectionList";
import WalletImg from "../../assets/images/wallet.png";
import LoadingComponent from "../../components/loading/LoadingComponent";
import { toast } from "react-toastify";

export default function WalletPage() {
    const { user } = useUser();
    const [wallet, setWallet] = useState(0);
    const [showTransection, setShowTransection] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchData = async () => {
        try {
            setIsLoaded(true);
            const data = await fetchWallet(user.token);
            setWallet(data.balance);
            console.log("wallet->", data);
            setIsLoaded(false);
        } catch (error) {
            console.error("Error fetching wallet data:", error);
            setIsLoaded(false);
        }
    };

    useEffect(() => {
        if (user.token) {
            fetchData();
        }
    }, [user.token]);

    const handleTopup = async () => {
        const topupAmount = 100;

        try {
            const data = await topupWallet(user.token, topupAmount);
            if (data && data.success === false) {
                console.log(data.message);
                toast.error(data.message);
            } else {
                setWallet(wallet + topupAmount);
                toast.success("Wallet topped up successfully!");
            }
        } catch (error) {
            toast.error("Error topping up wallet!");
        }
    };

    return (
        <div className="wallet-container">
            {isLoaded && <LoadingComponent />}

            <div className="wallet-balance">
                <div className="wallet-img">
                    <img src={WalletImg} alt="No Image" />
                </div>
                {wallet && (
                    <h1>
                        {wallet.toFixed(2)}
                        <i className="fa-solid fa-coins"></i>{" "}
                    </h1>
                )}
                <div className="wallet-buttons">
                    <button onClick={handleTopup} className="topup-button">
                        Topup
                    </button>
                    <button
                        className="view-transaction-button"
                        onClick={() => setShowTransection(!showTransection)}
                    >
                        Transections
                    </button>
                </div>
            </div>

            <WalletTransectionList
                setShowTransection={setShowTransection}
                showTransection={showTransection}
                user={user}
            />
        </div>
    );
}
