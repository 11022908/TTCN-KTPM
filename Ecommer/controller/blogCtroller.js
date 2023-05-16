const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMGDBID = require("../utils/validateMongoDb");
const cloudinaryUploadImg = require("../utils/cloudinary");
const fs = require('fs');

//create a new blog
const createBlog = asyncHandler(async(req, res) => {
    try{
        const newBlog = await Blog.create(req.body);
       res.json(newBlog);
    }catch(error){
        throw new Error(error);
    }
});

//update blog
const updateBlog = asyncHandler(async(req, res) => {
    const {id} = req.params;
    validateMGDBID(id);
     try{
        const updateblog = await Blog.findByIdAndUpdate(id, req.body, {
            new: true,
        })
       res.json(updateblog);
    }catch(error){
        throw new Error(error);
    }
});


//get blog
const getBlog = asyncHandler(async(req, res) => {
    const {id} = req.params;
    validateMGDBID(id);
     try{
        const getblog = await Blog.findById(id)
        .populate("likes")
        .populate("dislikes");
        await Blog.findByIdAndUpdate(id, {
            $inc: {numViews : 1},
        }, {
            new : true,
        }
        );
        res.json(getblog);
    }catch(error){
        throw new Error(error);
    }
});


//get all blog
const getAllBlog = asyncHandler(async(req, res) => {
    try{
        const getblogs = await Blog.find();
        res.json(getblogs);
       res.json(newBlog);
    }catch(error){
        throw new Error(error);
    }
});

//delete blog
const deleteBlog = asyncHandler(async(req, res) => {
    const {id} = req.params;
    validateMGDBID(id);
     try{
        const delblog = await Blog.findByIdAndDelete(id);
        res.json(delblog);
    }catch(error){
        throw new Error(error);
    }
});

//like blog
const likeBlog = asyncHandler(async(req, res)=> {
    const {blogId} = req.body;
    validateMGDBID(blogId);

    //find the blog which you want to be like
    const blog = await Blog.findById(blogId);
    //find the login user 
    const loginUserId = req?.user?._id;
    //find if the user has the liked the post
    const isLiked = blog?.isLiked;
    //find if the userr has dislikes the blog
    const alreadyDisLiked = blog?.dislikes?.find(
        ((userId) => userId?.toString() === loginUserId?.toString())
        );
    if(alreadyDisLiked){
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull : {dislikes: loginUserId},
            isDisliked: false
        }, {
            new : true,
        });
        res.json(blog);
    }

    if(isLiked){
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull : {likes: loginUserId},
            isLiked: false,
        }, {
            new : true,
        });
        res.json(blog);
    }else {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull : {likes: loginUserId},
            isLiked: true,
        }, {
            new : true,
        });
        res.json(blog);
    }
});


//dislike blog
const dislikeBlog = asyncHandler(async(req, res)=> {
    const {blogId} = req.body;
    validateMGDBID(blogId);

    //find the blog which you want to be like
    const blog = await Blog.findById(blogId);
    //find the login user 
    const loginUserId = req?.user?._id;
    //find if the user has the liked the post
    const isDisliked = blog?.isDisliked;
    //find if the userr has dislikes the blog
    const alreadyLiked = blog?.likes?.find(
        ((userId) => userId?.toString() === loginUserId?.toString())
        );
    if(alreadyLiked){
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull : {likes: loginUserId},
            isLiked: false
        }, {
            new : true,
        });
        res.json(blog);
    }

    if(isDisliked){
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull : {dislikes: loginUserId},
            isDisliked: false,
        }, {
            new : true,
        });
        res.json(blog);
    }else {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull : {dislikes: loginUserId},
            isDisliked: true,
        }, {
            new : true,
        });
        res.json(blog);
    }
});


//upload image
const uploadImages = asyncHandler(async(req, res) => {
    const {id} = req.params;
    validateMGDBID(id);
    try{
        const uploader = (path) => cloudinaryUploadImg(path, "images");
        const urls = [];
        const files = req.files;
        for(const file of files){
            const {path} = file;
            const newpath = await uploader(path);
            urls.push(newpath);
            //fs.unlinkSync(path);
        }
        const findblog = await Blog.findByIdAndUpdate(id, {
            images: urls.map((file) => {
                return file;
            }),
        },{
            new:true,
        });
        res.json(findblog);
    }catch(error){
        throw new Error(error);
    }
})

module.exports = {
    createBlog,
    updateBlog,
    getBlog,
    getAllBlog,
    deleteBlog,
    likeBlog,
    dislikeBlog,
    uploadImages,
}