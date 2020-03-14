const mongoose = require("mongoose");
const {Schema} = mongoose;

const productSchema = new Schema({
    title: {type: String, required: true},
    desc: {type: String, required: true},
    price: Number,
    images: {type: [{type : String , required : true}], default: []},
    user: {type : mongoose.Schema.Types.ObjectId, ref:"user", required: true}
},
{
    timestamps:true
});


const model = mongoose.model("product",productSchema);
module.exports = model;