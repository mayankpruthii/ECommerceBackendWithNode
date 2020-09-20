const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const singleProductSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number,
})

const singleProduct = mongoose.model("SingleProductInCart", singleProductSchema);

const orderSchema = new mongoose.Schema({
    products: [singleProductSchema],
    transaction_id: {},
    amount: {
        type: Number
    },
    address: String,
    updated: Date,
    user: {
        type: ObjectId,
        ref: "User"
    }
}, {timestamp: true});

const order = mongoose.model("Order", orderSchema);

module.exports = {
    order,
    singleProduct
};