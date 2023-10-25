import { useState } from "react";
import "./userProfile.scss";
import useUserData from "../../hooks/useUserData";
import { useUser } from "../../context/UserContext";
// import { useParams } from "react-router-dom";
import CustomBtnComponent from "../../components/Button/CustomBtnComponent";
import UserHistory from "./components/UserHistory";
import LoadingComponent from "../../components/loading/LoadingComponent";
import { updateUserProfile } from "../../apis/user.api";

export default function UserProfile() {
    // const { uuid } = useParams();
    const { user } = useUser();
    const { userData, setUserData, loading, userReviews, transactionHistory } =
        useUserData(user);
    const [edit, setEdit] = useState(false);

    const handleEditClick = () => {
        setEdit(!edit);
    };

    const handleSaveClick = () => {
        console.log(userData);
        updateUserProfile(user.token, userData);
        setEdit(false);
    };

    return (
        <div className="user-profile-container">
            {loading && <LoadingComponent />}
            <div className="user-profile">
                <div className="user-details">
                    <img
                        src={`https://robohash.org/${user?.email}?size=150x150`}
                        alt=""
                        className="userImgClircle"
                    />

                    {edit ? (
                        <>
                            <div className="input-container">
                                Name:{" "}
                                <input
                                    type="text"
                                    style={{
                                        border: edit ? "1px solid #ff7167" : "",
                                    }}
                                    value={userData.name}
                                    onChange={(e) => {
                                        setUserData({
                                            ...userData,
                                            name: e.target.value,
                                        });
                                    }}
                                />
                            </div>

                            <div className="input-container">
                                Email:{" "}
                                <input
                                    type="text"
                                    style={{
                                        border: edit ? "1px solid #ff7167" : "",
                                    }}
                                    disabled
                                    value={userData.email}
                                    onChange={(e) => {
                                        userData.email = e.target.value;
                                    }}
                                />
                            </div>
                            <div className="input-container">
                                Phone:{" "}
                                <input
                                    type="text"
                                    style={{
                                        border: edit ? "1px solid #ff7167" : "",
                                    }}
                                    value={userData.phone}
                                    onChange={(e) => {
                                        setUserData({
                                            ...userData,
                                            phone: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <div className="input-container">
                                Address:{" "}
                                <input
                                    type="text"
                                    style={{
                                        border: edit ? "1px solid #ff7167" : "",
                                    }}
                                    value={userData.address}
                                    onChange={(e) => {
                                        setUserData({
                                            ...userData,
                                            address: e.target.value,
                                        });
                                    }}
                                />
                            </div>

                            <CustomBtnComponent
                                text="Save"
                                onClick={handleSaveClick}
                                icon={<i className="fas fa-save"></i>}
                                primaryColor="#ff7167"
                                style={{
                                    width: "100%",
                                    marginTop: "10px",
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <div className="input-container">
                                Name:{" "}
                                <input
                                    type="text"
                                    value={userData?.name}
                                    disabled={!edit}
                                />
                            </div>
                            <div className="input-container">
                                Email:{" "}
                                <input
                                    type="text"
                                    value={userData?.email}
                                    disabled={!edit}
                                />
                            </div>
                            <div className="input-container">
                                Phone:{" "}
                                <input
                                    type="text"
                                    value={userData?.phone}
                                    disabled={!edit}
                                />
                            </div>
                            <div className="input-container">
                                Address:{" "}
                                <input
                                    type="text"
                                    value={userData?.address}
                                    disabled={!edit}
                                />
                            </div>

                            <CustomBtnComponent
                                text="Edit"
                                onClick={handleEditClick}
                                icon={<i className="fas fa-edit"></i>}
                                primaryColor="#007bff"
                                style={{
                                    width: "100%",
                                    marginTop: "10px",
                                }}
                            />
                        </>
                    )}
                </div>
                <div className="user-history">
                    <UserHistory
                        reviews={userReviews}
                        usersTransections={transactionHistory}
                    />
                </div>
            </div>
        </div>
    );
}
