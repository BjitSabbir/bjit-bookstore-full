const express = require("express");
const {
    getAllTransections,
    viewAllUserData,
    getAllUsers,
    editUserData,
    deleteUser,
    sellAnalysis,
    updateTransaction,
} = require("../controllers/AdminControllers");
const verifyTokenMiddleware = require("../middleware/AuthMiddleware");
const {
    AdminValidator,
} = require("../database/validation/inputValidationSchema");
const { requestPasswordReset } = require("../controllers/AuthControllers");
const route = express();

// Get transaction of all users
route.get(
    "/fetch/transections",
    AdminValidator.viewTransection,
    verifyTokenMiddleware,
    getAllTransections
);

// View user data
route.get("/fetch/userData", verifyTokenMiddleware, viewAllUserData);

// View all users
route.get(
    "/fetch/allUsers",
    // AdminValidator.viewTransection,
    verifyTokenMiddleware,
    getAllUsers
);

// Edit selected existing user data
route.put(
    "/edit/user/:userId",
    AdminValidator.editUser,
    verifyTokenMiddleware,
    editUserData
);

// Delete user
route.delete(
    "/delete/user/:userId",
    AdminValidator.deleteUser,
    verifyTokenMiddleware,
    deleteUser
);

//analytics
route.get("/analytics", verifyTokenMiddleware, sellAnalysis);

//update transaction
// Update transaction
route.put(
    "/update/transaction/:transectionId",
    verifyTokenMiddleware,
    updateTransaction
);



module.exports = route;
