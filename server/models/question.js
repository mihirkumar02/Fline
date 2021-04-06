const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    postedBy: {
        type: ObjectId,
        ref: "Buyer"
    }
})

module.exports = mongoose.model("Question", questionSchema)