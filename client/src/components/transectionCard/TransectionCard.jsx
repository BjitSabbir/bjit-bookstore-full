/* TransectionCard.js */

import React from "react";
import "./transectionCard.scss";

export default function TransectionCard({ transection }) {
    const transactionDate = transection.createdAt?.split("T")[0];
    const transactionTime = transection.createdAt?.split("T")[1]?.split(".")[0];

    return (
        <div className="transectionCard">
            <table className="transectionTable">
                <tbody>
                    <tr>
                        <th>Transaction ID:</th>
                        <td>{transection._id}</td>
                    </tr>
                    <tr>
                        <th>Transaction Type:</th>
                        <td>
                            {transection.transectionType === "topup"
                                ? "Topup"
                                : "Purchase"}
                        </td>
                    </tr>
                    <tr>
                        <th>Transaction Amount:</th>
                        <td
                            className={
                                transection.transectionType === "topup"
                                    ? "transectionAmount"
                                    : "transectionAmountDeduct"
                            }
                        >
                            {transection.amount.toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <th>Transaction Date:</th>
                        <td>{transactionDate}</td>
                    </tr>
                    <tr>
                        <th>Transaction Time:</th>
                        <td>{transactionTime}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
