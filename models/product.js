const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    price: {
        type: Number,
        required: true
    },
    soldBy: {
        type: ObjectId,
        ref: "Seller"
    },
    discount: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    photos: [], // schema correction needed
    options: [
        {
            type: String
        }
    ],
    reviews: [
        {
            type: ObjectId,
            ref: "Review"
        }
    ],
    questions: [
        {
            type: ObjectId,
            ref: "Question"
        }
    ],
    // stars: {
    //     type: Number,
    // }
})

module.exports = mongoose.model("Product", productSchema)