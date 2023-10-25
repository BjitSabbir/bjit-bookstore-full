import React, { useState } from "react";
import "./adminUsersPages.scss";
import { updateUsersData } from "../../../apis/admin/admin.users.api";

export default function UserPopupContainer({
    selectedUser,
    setSelectedUser,
    token,
    getAllUsersFunction,
}) {
    // State to manage the "isActive" radio button
    const [isActive, setIsActive] = useState(selectedUser.isActiveUser);
    const [updatedUser, setUpdatedUser] = useState(selectedUser);

    const handleIsActiveChange = (event) => {
        setIsActive(event.target.value === "true");
        setUpdatedUser({
            ...updatedUser,
            isActiveUser: event.target.value === "true",
        });
    };

    const handleUpdateClick = async () => {
        console.log("updated user", updatedUser);
        try {
            const response = await updateUsersData(
                token,
                selectedUser._id,
                updatedUser
            );
            // Log the updated user data
            console.log("update user", response);
            if (response.success) {
                await getAllUsersFunction();
                setSelectedUser(null);
            } else {
                alert("Error updating user");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="selectedUserContainer">
            <div className="selectedUserContainer__body">
                <i
                    className="fas fa-times toggle_modal"
                    onClick={() => setSelectedUser(null)}
                ></i>
                <div className="input-container">
                    <label>Name: </label>
                    <input
                        type="text"
                        value={updatedUser.name}
                        onChange={(e) =>
                            setUpdatedUser({
                                ...updatedUser,
                                name: e.target.value,
                            })
                        }
                    />
                </div>

                <div className="input-container">
                    <label>Email: </label>
                    <input
                        type="text"
                        value={updatedUser.email}
                        onChange={(e) =>
                            setUpdatedUser({
                                ...updatedUser,
                                email: e.target.value,
                            })
                        }
                    />
                </div>

                <div className="input-container">
                    <label>Phone: </label>
                    <input
                        type="text"
                        value={updatedUser.phone}
                        onChange={(e) =>
                            setUpdatedUser({
                                ...updatedUser,
                                phone: e.target.value,
                            })
                        }
                    />
                </div>

                <div className="input-container">
                    <label>Address: </label>
                    <input
                        type="text"
                        value={updatedUser.address}
                        onChange={(e) =>
                            setUpdatedUser({
                                ...updatedUser,
                                address: e.target.value,
                            })
                        }
                    />
                </div>

                <div className="input-container">
                    <label>Active: </label>
                    <label>
                        <input
                            type="radio"
                            value="true"
                            checked={isActive === true}
                            onChange={handleIsActiveChange}
                        />{" "}
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="false"
                            checked={isActive === false}
                            onChange={handleIsActiveChange}
                        />{" "}
                        No
                    </label>
                </div>

                <button className="btn btn-primary" onClick={handleUpdateClick}>
                    Update
                </button>
            </div>
        </div>
    );
}
