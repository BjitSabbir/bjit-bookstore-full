import { useEffect, useState, useRef } from "react";
import {
    createDiscount,
    getAllDiscounts,
} from "../../../apis/admin/admin.discount.api";
import { useUser } from "../../../context/UserContext";
import "./adminDiscountPage.scss";
import UpdateTableDiscount from "../../../components/admin/updateTables/UpdateTableDiscount";
import DiscountForm from "../../../components/discountForm/DiscountForm";
import { set } from "react-hook-form";
import LoadingComponent from "../../../components/loading/LoadingComponent";

export default function AdminDiscountPage() {
    const [discounts, setDiscounts] = useState([]);
    const [discount, setDiscount] = useState({});
    const [showForm, setShowForm] = useState(false);
    const { user } = useUser();
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchAllDiamondDiscounts = async () => {
        setIsLoaded(true);
        const response = await getAllDiscounts(user.token);
        console.log(response.data.data);
        setDiscounts(response.data.data);
        console.log(response);
        setIsLoaded(false);
    };

    useEffect(() => {
        if (user.token) fetchAllDiamondDiscounts();
    }, [user.token]);

    const handleAddDiscount = async (data) => {
        setIsLoaded(true);

        const response = await createDiscount(data, user.token);
        if (response.status === 200) {
            setShowForm(!showForm);
            setDiscount({});
            await fetchAllDiamondDiscounts();
        } else {
            console.log(response);
        }
        setIsLoaded(false);
    };

    const handleCancel = () => {
        setShowForm(!showForm);
    };

    return (
        <div className="admin-discount-container">
            {isLoaded && <LoadingComponent />}
            {showForm && (
                <DiscountForm
                    discount={discount}
                    onUpdate={handleAddDiscount}
                    onCancel={handleCancel}
                />
            )}
            <h1>Discounts</h1>

            <div className="container-discount-holder">
                <div className="left">
                    <div className="optionBtn">All Discounts</div>
                    <div
                        className="optionBtn"
                        onClick={() => {
                            console.log("clicked");
                            setShowForm(!showForm);
                        }}
                    >
                        <i className="fas fa-plus-circle"></i>
                        Create Discounts
                    </div>
                </div>

                <div className="right">
                    <UpdateTableDiscount
                        discounts={discounts}
                        fetchAllDiamondDiscounts={fetchAllDiamondDiscounts}
                    />
                </div>
            </div>
        </div>
    );
}
