const express = require('express');
const {
    createUser, 
    loginUserCtrl, 
    getallUser, 
    getAUser, 
    deleteAUser, 
    updateUser,
    blockUser,
    unBlockUser,
    handleRefreshToken,
    logout, 
    updatePassword,
    forgotPasswordToken,
    resetPassword,
    loginAdmin,
    getWishList,
    saveAddress,
    userCart,
    getUserCart,
    emptyCart,
    applyCoupon,
    createOrder,
    getOrders,
    updateOrderStatus,
} = require("../controller/userController");

const {
    authMiddleware, isAdmin
} = require('../middlewares/authMiddleware');

const router = express.Router();


router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.post("/adminlogin", loginAdmin);
router.post("/addtocart", userCart);
router.post("/forgotpassword", forgotPasswordToken);
router.put("/resetpassword/:token", resetPassword);


router.get("/refresh", handleRefreshToken); 
router.get("/logout", logout);
router.get("/getorders", authMiddleware,getOrders);
router.delete("/emptycart", authMiddleware, emptyCart);

router.get('/alluser',authMiddleware, isAdmin, getallUser);
router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/cash-order", authMiddleware, createOrder);
router.get("/wishlist", authMiddleware, getWishList);
router.get("/cart", authMiddleware, getUserCart);
router.put("/order/updateorder/:id",authMiddleware, isAdmin, updateOrderStatus);
router.delete('/:id', authMiddleware, isAdmin,deleteAUser);
router.put("/changepassword", authMiddleware, updatePassword);
router.put('/updateuser',authMiddleware ,updateUser); 
router.put('/saveaddress',authMiddleware ,saveAddress); 

router.get('/:id', authMiddleware, isAdmin,getAUser);


router.put('/blockuser/:id',authMiddleware, isAdmin, blockUser); 
router.put('/unblockuser/:id',authMiddleware , isAdmin,unBlockUser);
module.exports = router;