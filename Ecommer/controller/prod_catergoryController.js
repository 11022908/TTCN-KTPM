const Prod_catergory = require('../models/prod_catergoryModel');
const validateMGDBID = require('../utils/validateMongoDb');
const asyncHandler = require("express-async-handler");

//create new catergory
const createProdCatergory = asyncHandler(async(req, res) => {
    try{
        const newProdCatergory = await Prod_catergory.create(req.body);
        res.json(newProdCatergory);
    }catch(error){
        throw new Error(error);
    }
});

//update catergory
const updateProdCatergory = asyncHandler(async(req, res) => {
    const {id} = req.params;
    validateMGDBID(id);
    try{
        const updateProdCatergory = await Prod_catergory.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updateProdCatergory);
    }catch(error){
        throw new Error(error);
    }
});

//delete catergory
const deleteProdCatergory = asyncHandler(async(req, res) => {
    const {id} = req.params;
    validateMGDBID(id);
    try{
        const deleteProdCatergory = await Prod_catergory.findByIdAndDelete(id);
        res.json(deleteProdCatergory);
    }catch(error){
        throw new Error(error);
    }
});


//get catergory
const getProdCatergory = asyncHandler(async(req, res) => {
    const {id} = req.params;
    validateMGDBID(id);
    try{
        const getProdCatergory = await Prod_catergory.findById(id);
        res.json(getProdCatergory);
    }catch(error){
        throw new Error(error);
    }
});

//get all catergory
const getAllProdCatergory = asyncHandler(async(req, res) => {
    try{
        const getAllProdCatergory = await Prod_catergory.find();
        res.json(getAllProdCatergory);
    }catch(error){
        throw new Error(error);
    }
});


module.exports = {
    createProdCatergory,
    updateProdCatergory,
    deleteProdCatergory,
    getProdCatergory,
    getAllProdCatergory,
}