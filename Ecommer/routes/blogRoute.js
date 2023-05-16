const express = require('express');
const { createBlog,
         updateBlog, 
         getBlog,
         getAllBlog,
         deleteBlog,
         likeBlog,
         dislikeBlog,
         uploadImages} = require('../controller/blogCtroller');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const { blogImgResize, uploadPhoto } = require('../middlewares/uploadImage');
const router = express.Router();

router.get("/getblog/:id", getBlog);
router.get("/getallblog", getAllBlog);
router.put("/likes", authMiddleware, likeBlog);
router.put("/dislikes", authMiddleware, dislikeBlog);
router.post("/create", authMiddleware, isAdmin ,createBlog);
router.put("/update/:id", authMiddleware, isAdmin ,updateBlog);
router.delete("/delete/:id", authMiddleware, isAdmin, deleteBlog);
router.put('/upload/:id', authMiddleware, isAdmin, uploadPhoto.array('images', 10), blogImgResize, uploadImages);


module.exports = router;