const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var prod_catergorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
});

//Export the model
module.exports = mongoose.model('Prod_catergory', prod_catergorySchema);