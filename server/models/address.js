const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    house: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    landmark: String,
    country: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Address", addressSchema)