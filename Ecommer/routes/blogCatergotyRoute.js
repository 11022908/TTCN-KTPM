const express = require('express');
const { 
    createBlogCatergory,
    updateBlogCatergory,
    deleteBlogCatergory,
    getBlogCatergory,
    getAllBlogCatergory,

} = require('../controller/blogCatergoryController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get("/:id", getBlogCatergory);
router.get("/", getAllBlogCatergory);

router.post("/create",authMiddleware, isAdmin, createBlogCatergory);
router.put("/update/:id", authMiddleware, isAdmin, updateBlogCatergory);
router.delete("/delete/:id", authMiddleware, isAdmin, deleteBlogCatergory);


module.exports = router;