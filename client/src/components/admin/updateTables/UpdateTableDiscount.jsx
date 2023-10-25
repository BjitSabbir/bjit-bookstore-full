import React, { useState } from "react";
import DiscountForm from "../../discountForm/DiscountForm";
import { useUser } from "../../../context/UserContext";
import {
    deleteDiscount,
    disableDiscount,
    updateDiscount,
} from "../../../apis/admin/admin.discount.api";
import LoadingComponent from "../../loading/LoadingComponent";

export default function UpdateTableDiscount({
    discounts,
    fetchAllDiamondDiscounts,
}) {
    const { user } = useUser();
    const [showForm, setShowForm] = useState(false);
    const [discount, setDiscount] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleUpdate = async (data) => {
        try {
            setIsLoaded(true);
            const response = await updateDiscount(data, user.token);

            if (response.status === 200) {
                setShowForm(!showForm);
                setDiscount({});
                await fetchAllDiamondDiscounts();
            }
            setIsLoaded(false);
        } catch (error) {
            console.error(error);
            throw error;
            setIsLoaded(false);
        }
    };

    const handleDelete = async () => {
        setIsLoaded(true);
        const response = await deleteDiscount(discount, user.token);
        if (response.status === 200) {
            await fetchAllDiamondDiscounts();
        }
        setIsLoaded(false);
    };

    const handleDisable = async () => {
        setIsLoaded(true);
        if (discount) {
            const response = await disableDiscount(discount, user.token);
            if (response.status === 200) {
                await fetchAllDiamondDiscounts();
            }
        }
        setIsLoaded(false);
    };

    const handleCancel = () => {
        setShowForm(!showForm);
    };
    return (
        <div className="discount-table">
            {isLoaded && <LoadingComponent />}
            {showForm && (
                <DiscountForm
                    discount={discount}
                    onUpdate={handleUpdate}
                    onCancel={handleCancel}
                />
            )}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Poster</th>
                        <th>Discount Value</th>
                        <th>Activation Date</th>
                        <th>End Date</th>
                        <th>Is Activated</th>
                        <th>Is Disabled</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {discounts.map((discount) => (
                        <tr key={discount._id}>
                            <td>{discount.name}</td>
                            <td>{discount.description}</td>
                            <td>
                                {discount.image ? (
                                    <img src={discount.image} alt="" />
                                ) : (
                                    <i className="fas fa-image"></i>
                                )}
                            </td>
                            <td>{discount.discountValue}%</td>
                            <td>{discount.activationDate.split("T")[0]}</td>
                            <td>{discount.endDate.split("T")[0]}</td>
                            <td>{discount.isActivated ? "Yes" : "No"}</td>
                            <td>{discount.isDisabled ? "Yes" : "No"}</td>
                            <td>
                                <i
                                    className="fas fa-edit"
                                    onClick={() => {
                                        setShowForm(!showForm);
                                        setDiscount(discount);
                                    }}
                                ></i>
                                <i
                                    className="fas fa-ban"
                                    onClick={() => {
                                        setDiscount(discount);
                                        handleDisable();
                                    }}
                                ></i>
                                <i
                                    className="fas fa-trash"
                                    onClick={() => {
                                        setDiscount(discount);
                                        handleDelete();
                                    }}
                                ></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
