const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const reviewSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    postedBy: {
        type: ObjectId,
        ref: "Buyer"
    }
    // stars: {
    //     type: Number
    // }
})

module.exports = mongoose.model("Review", reviewSchema)