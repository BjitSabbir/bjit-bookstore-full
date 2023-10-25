/* eslint-disable react/prop-types */
import "./customBtn.scss";

export default function CustomBtnComponent({
    icon, // Icon element (e.g., <i className="fas fa-icon"></i>)
    text,
    onClick,
    primaryColor,
    secondaryColor,
    width,
    style,
}) {
    const buttonStyles = {
        backgroundColor: primaryColor || "#007bff",
        color: secondaryColor || "#fff",
        width: width || "auto",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s",
        outline: "none",
        position: "relative",
    };

    const mergedStyles = { ...buttonStyles, ...style };

    return (
        <button style={mergedStyles} className="custom-btn" onClick={onClick}>
            {icon && icon} {/* Display the icon if provided */}
            {text}
        </button>
    );
}
