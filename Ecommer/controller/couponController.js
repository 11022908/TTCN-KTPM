const Coupon = require("../models/couponModel");
const validateMGDBID = require('../utils/validateMongoDb');
const asynHandler = require("express-async-handler");

//create new coupon
const createCoupon = asynHandler(async(req, res) => {
    try{
        const newCoupon = await Coupon.create(req.body);
        res.json(newCoupon);
    }catch(error){
        throw new Error(error);
    }
});


//get all coupon
const getAllCoupon = asynHandler(async(req, res) => {
    try{
        const getAllCoupon = await Coupon.find();
        res.json(getAllCoupon);
    }catch(error){
        throw new Error(error);
    }
});

//update coupon
const updateCoupon = asynHandler(async(req, res) => {
    const {id} = req.params;
    validateMGDBID(id);
    try{
        const updateCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updateCoupon);
    }catch(error){
        throw new Error(error);
    }
});


//delete coupon
const deleteCoupon = asynHandler(async(req, res) => {
    const {id} = req.params;
    validateMGDBID(id);
    try{
        const deleteCoupon = await Coupon.findByIdAndDelete(id);
        res.json(deleteCoupon);
    }catch(error){
        throw new Error(error);
    }
});



module.exports = {
    createCoupon,
    getAllCoupon,
    updateCoupon,
    deleteCoupon,
};