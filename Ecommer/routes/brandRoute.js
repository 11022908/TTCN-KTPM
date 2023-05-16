const express = require('express');
const { 
    createBrand,
    updateBrand,
    deleteBrand,
    getBrand,
    getAllBrand,

} = require('../controller/brandController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get("/:id", getBrand);
router.get("/", getAllBrand);

router.post("/create",authMiddleware, isAdmin, createBrand);
router.put("/update/:id", authMiddleware, isAdmin, updateBrand);
router.delete("/delete/:id", authMiddleware, isAdmin, deleteBrand);


module.exports = router;