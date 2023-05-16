const Brand = require('../models/brandModel');
const validateMGDBID = require('../utils/validateMongoDb');
const asyncHandler = require("express-async-handler");

//create new brand
const createBrand = asyncHandler(async(req, res) => {
    try{
        const newBrand = await Brand.create(req.body);
        res.json(newBrand);
    }catch(error){
        throw new Error(error);
    }
});

//update brand
const updateBrand = asyncHandler(async(req, res) => {
    const {id} = req.params;
    validateMGDBID(id);
    try{
        const updateBrand = await Brand.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updateBrand);
    }catch(error){
        throw new Error(error);
    }
});

//delete brand
const deleteBrand = asyncHandler(async(req, res) => {
    const {id} = req.params;
    validateMGDBID(id);
    try{
        const deleteBrand = await Brand.findByIdAndDelete(id);
        res.json(deleteBrand);
    }catch(error){
        throw new Error(error);
    }
});


//get brand
const getBrand = asyncHandler(async(req, res) => {
    const {id} = req.params;
    validateMGDBID(id);
    try{
        const getBrand = await Brand.findById(id);
        res.json(getBrand);
    }catch(error){
        throw new Error(error);
    }
});

//get all brand
const getAllBrand = asyncHandler(async(req, res) => {
    try{
        const getAllBrand = await Brand.find();
        res.json(getAllBrand);
    }catch(error){
        throw new Error(error);
    }
});


module.exports = {
    createBrand,
    updateBrand,
    deleteBrand,
    getBrand,
    getAllBrand,
}