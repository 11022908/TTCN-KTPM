const express = require("express");
const { 
    createCoupon, 
    getAllCoupon,
    updateCoupon,
    deleteCoupon,
 } = require("../controller/couponController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();


router.post("/create", authMiddleware, isAdmin, createCoupon);
router.put("/update/:id", authMiddleware, isAdmin, updateCoupon);
router.delete("/delete/:id", authMiddleware, isAdmin, deleteCoupon);
router.get("/", authMiddleware, isAdmin, getAllCoupon);

module.exports = router;
