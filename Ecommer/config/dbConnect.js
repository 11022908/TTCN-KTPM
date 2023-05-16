const { default: mongoose } = require("mongoose")

const dbConnet = () =>{
    try{
        const conn = mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected sucessful!");
    } catch(error){
        console.log("Database connect fail");
    }
};

module.exports =dbConnet;
