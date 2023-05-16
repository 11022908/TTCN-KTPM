const express = require('express');
const router = express.Router();
const {
    createProduct, 
    getAProduct, 
    getAllProduct, 
    updateProduct, 
    deleteProduct,
    addToWishList,
    rating,
    uploadImages,
    
} = require('../controller/productController');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const { uploadPhoto, productImgResize } = require('../middlewares/uploadImage');

router.put('/upload/:id', authMiddleware, isAdmin, uploadPhoto.array('images', 10), productImgResize, uploadImages);
router.get('/:id', getAProduct);
router.put("/wishlist", authMiddleware, addToWishList);
router.put("/rating", authMiddleware, rating);
router.post('/createproduct', authMiddleware, isAdmin, createProduct);
router.put('/updateproduct/:id',authMiddleware, isAdmin, updateProduct);
router.delete('/deleteproduct/:id',authMiddleware, isAdmin, deleteProduct);
router.get('/', getAllProduct);
module.exports = router;