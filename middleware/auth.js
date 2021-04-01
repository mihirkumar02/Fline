const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys');
const Buyer = require('../models/buyer');
const Seller = require('../models/seller');

isLoggedIn = (req, res, next) => {
    const { type, authorization } = req.headers;
    // passed from frontend
    if(!authorization){
        return res.statu(401).json({ error: "You must be logged in!" })
    }

    const token = authorization.replace("Bearer ", "");

    if(type === "buyer"){
        jwt.verify(token, JWT_SECRET, (err, payload) => {
            if(err){
                return res.status(401).json({ error: "You must be logged in!" })
            }

            const { _id } = payload;
            Buyer.findById(_id)
                .then(userdata => {
                    if(!userdata){
                        return res.status(404).json({ error: "You must be logged in!" })
                        // to verify type of user, and reject invalid type, we must use this IF check
                    }
                    req.user = userdata
                    next();
                })
        })
    }

    if(type === "seller"){
        jwt.verify(token, JWT_SECRET, (err, payload) => {
            if(err){
                return res.status(401).json({ error: "You must be logged in!" })
            }

            const { _id } = payload;
            Seller.findById(_id)
                .then(userdata => {
                    if(!userdata){
                        return res.status(404).json({ error: "You must be logged in!" }) 
                    }
                    req.user = userdata
                    next();
                })
        })
    }
}

module.exports = isLoggedIn;