/* eslint-disable react/prop-types */
import { useState } from "react";

export default function DropdownViewer({ transaction }) {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const commonStyle = {
        position: "relative",
        display: "inline-block",
        cursor: "pointer",
        width: "100%",
        margin: "5px 0px",
        boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)",
    };

    const openDropdown = {
        ...commonStyle,
        boxShadow:
            "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
    };

    const dropdownHeaderStyle = {
        padding: "0 10px",
        display: "flex",
        alignItems: "center",
        gap: "100px",
        fontSize: "0.8rem",
        fontFamily: "sans-serif",
    };

    const dropdownBodyStyle = {
        display: showDropdown ? "block" : "none",
        backgroundColor: "#eee",
        padding: "10px",
        fontSize: "0.8rem",
    };

    const dropdownItems = {
        display: "flex",
        gap: "10px",
    };

    const dropdownItem = {
        flex: "1",
    };

    const imageStyle = {
        height: "60px",
        objectFit: "contain",
    };

    const pEleStyle = {
        margin: "0px",
    };

    const circleStyleGreen = {
        height: "10px",
        width: "10px",
        borderRadius: "50%",
        backgroundColor: "green",
    };

    const circleStyleRed = {
        height: "10px",
        width: "10px",
        borderRadius: "50%",
        backgroundColor: "red",
    };

    const flex1 = {
        flex: "1",
    };

    return (
        <div style={showDropdown ? openDropdown : commonStyle}>
            <div
                className="dropdown-header"
                style={dropdownHeaderStyle}
                onClick={toggleDropdown}
            >
                <p style={flex1}>ID : {transaction._id}</p>

                <p
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                    }}
                >
                    <div
                        style={
                            transaction.status === "pending"
                                ? { ...circleStyleRed, ...flex1 }
                                : { ...circleStyleGreen, ...flex1 }
                        }
                    ></div>
                    {transaction.status}
                </p>
                <p
                    style={{
                        ...flex1,
                        textAlign: "right",
                    }}
                >
                    Date : {transaction.createdAt.split("T")[0]}
                </p>
            </div>
            <div className="dropdown-body" style={dropdownBodyStyle}>
                <div style={dropdownItems}>
                    <div style={dropdownItem}>
                        <p>Amount : {transaction.total}</p>
                        <p>Address : {transaction.address}</p>
                        <p>User Type : {transaction.userType}</p>
                    </div>
                    {transaction.books && (
                        <div style={dropdownItem}>
                            <p style={pEleStyle}>Books</p>
                            {transaction.books &&
                                transaction.books?.map((book) => (
                                    <div
                                        key={book?._id}
                                        style={{
                                            margin: "5px 0px",
                                        }}
                                    >
                                        {book?.bookId?.image && (
                                            <img
                                                style={imageStyle}
                                                src={book?.bookId?.image}
                                                alt={book?.bookId?.title}
                                            />
                                        )}
                                        <p style={pEleStyle}>
                                            {book?.bookId?.title}
                                        </p>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
