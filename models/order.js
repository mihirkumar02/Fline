const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const productCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number, // in cart
    price: Number // total price in cart for that product
    // delivery date, size, etc
})

const ProductCart = mongoose.model("ProductCart", productCartSchema)

const orderSchema = new mongoose.Schema({
    products: [productCartSchema],
    transactionId: String,
    amount: {
        type: Number
    },
    updated: Date,
    address: String,
    orderBy: {
        type: ObjectId,
        ref: "Buyer"
    }
}, {
    timestamps: true
})

const Order = mongoose.model("Order", orderSchema)

module.exports = { ProductCart, Order }