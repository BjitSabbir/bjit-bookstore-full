/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./walletPage.scss";
import { fetchWalletTransections } from "../../apis/wallet.api";
import TransectionCard from "../../components/transectionCard/TransectionCard";
import TransectionGraph from "../../components/transectionCard/TransectionGraph";

export default function WalletTransectionList({
    showTransection,
    setShowTransection,
    user,
}) {
    function handleClick() {
        setShowTransection(!showTransection);
    }

    const [transections, setTransections] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");

    const fetchData = async () => {
        try {
            const data = await fetchWalletTransections(user.token);
            setTransections(data);
        } catch (error) {
            console.error("Error fetching wallet data:", error);
        }
    };

    useEffect(() => {
        if (user.token && showTransection) {
            fetchData();
        }
    }, [showTransection]);

    const filterTransactionsByDate = () => {
        if (selectedDate) {
            const selectedDateISOString = new Date(selectedDate)
                .toISOString()
                .split("T")[0];
            const filteredTransections = transections.filter((transection) => {
                const transectionDate = new Date(transection.createdAt)
                    .toISOString()
                    .split("T")[0];
                return transectionDate === selectedDateISOString;
            });

            return filteredTransections;
        }
        return transections;
    };

    return (
        <div
            className={`wallet-transections ${
                showTransection ? "transleteLeft" : ""
            }`}
        >
            <div
                className={`transectionContauner ${
                    showTransection ? "" : "hideContent"
                }`}
            >
                <div className="transectionTop">
                    <button onClick={handleClick}>
                        <i className="fas fa-arrow-left"></i>
                    </button>
                    <h3>Wallet Transactions</h3>
                </div>
                <div className="filtering">
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />

                    <i
                        className="fas fa-times"
                        onClick={() => setSelectedDate("")}
                    ></i>
                </div>

                <div className="transectionList">
                    {filterTransactionsByDate().length > 0 && (
                        <TransectionGraph
                            filterTransactionsByDate={filterTransactionsByDate()}
                        />
                    )}

                    <h2>Transections</h2>
                    {filterTransactionsByDate().length > 0 ? (
                        filterTransactionsByDate().map((transection) => (
                            <TransectionCard
                                transection={transection}
                                key={transection._id}
                            />
                        ))
                    ) : (
                        <p className="not-found">
                            No transactions found for the selected date.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
