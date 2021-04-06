const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const buyerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true // to be generated from email
    },
    password: {
        type: String,
        required: true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    contact: {
        type: String,
        required: true
    },
    verifyToken: String,
    resetToken: String,
    expireToken: Date,
    cart: [
        {
            type: ObjectId,
            ref: "Product"
        }
    ],
    addresses: [
        {
            type: ObjectId,
            ref: "Address"
        }
    ],
    orders: [
        {
            type: ObjectId,
            ref: "Product"
        }
    ] // better to make a separate schema for purchased products, with reference
      // to Product, and having purchase date, delivery status, etc..

    // products array needed only when particular seller's
    // items are to be shown together....
})

module.exports = mongoose.model("Buyer", buyerSchema);

