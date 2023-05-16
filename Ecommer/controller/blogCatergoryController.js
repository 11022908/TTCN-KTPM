const BlogCatergory = require('../models/blogCatergoryModel');
const validateMGDBID = require('../utils/validateMongoDb');
const asyncHandler = require("express-async-handler");

//create new blog catergory
const createBlogCatergory = asyncHandler(async(req, res) => {
    try{
        const newBlogCatergory = await BlogCatergory.create(req.body);
        res.json(newBlogCatergory);
    }catch(error){
        throw new Error(error);
    }
});

//update  blog catergory
const updateBlogCatergory = asyncHandler(async(req, res) => {
    const {id} = req.params;
    validateMGDBID(id);
    try{
        const updateBlogCatergory = await BlogCatergory.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updateBlogCatergory);
    }catch(error){
        throw new Error(error);
    }
});

//delete catergory
const deleteBlogCatergory = asyncHandler(async(req, res) => {
    const {id} = req.params;
    validateMGDBID(id);
    try{
        const deleteBlogCatergory = await BlogCatergory.findByIdAndDelete(id);
        res.json(deleteBlogCatergory);
    }catch(error){
        throw new Error(error);
    }
});


//get blog catergory
const getBlogCatergory = asyncHandler(async(req, res) => {
    const {id} = req.params;
    validateMGDBID(id);
    try{
        const getBlogCatergory = await BlogCatergory.findById(id);
        res.json(getBlogCatergory);
    }catch(error){
        throw new Error(error);
    }
});

//get all blog catergory
const getAllBlogCatergory = asyncHandler(async(req, res) => {
    try{
        const getAllBlogCatergory = await BlogCatergory.find();
        res.json(getAllBlogCatergory);
    }catch(error){
        throw new Error(error);
    }
});


module.exports = {
    createBlogCatergory,
    updateBlogCatergory,
    deleteBlogCatergory,
    getBlogCatergory,
    getAllBlogCatergory,
}