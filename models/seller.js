const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const sellerSchema = new mongoose.Schema({
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
    storeName: {
        type: String,
        required: true
    },
    verifyToken: String,
    resetToken: String,
    expireToken: Date,
    branches: [
        {
            type: ObjectId,
            ref: "Address" // give option to add later in Setup page
            // 1. Add branches 2. Add first product
        }
    ],
    adminMessages: [
        {
            type: String
        }
    ]
    // products array needed only when particular seller's
    // items are to be shown together....
})

module.exports = mongoose.model("Seller", sellerSchema);

