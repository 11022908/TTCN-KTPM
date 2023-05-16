const express = require('express');
const { 
    createProdCatergory,
    updateProdCatergory,
    deleteProdCatergory,
    getProdCatergory,
    getAllProdCatergory,

} = require('../controller/prod_catergoryController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get("/:id", getProdCatergory);
router.get("/", getAllProdCatergory);

router.post("/create",authMiddleware, isAdmin, createProdCatergory);
router.put("/update/:id", authMiddleware, isAdmin, updateProdCatergory);
router.delete("/delete/:id", authMiddleware, isAdmin, deleteProdCatergory);


module.exports = router;