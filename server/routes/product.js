const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const isLoggedIn = require('../middleware/auth');

// show all products (buyer)
// show category wise (buyer)
// create product (seller)
// my products (seller)
// edit product
// delete product
// search product
// add product review
// delete review
// add to cart
// remove from cart
// order

router.post('/product/new', isLoggedIn, (req, res) => {
    const { name, description, category, quantity, price, discount /*, options, photos*/ } = req.body;
    if(!name || !description || !category || !quantity || !price) {
        return res.status(422).json({ error: "Please enter all fields!" })
    }

    if(quantity < 0 || price < 0){
        return res.status(422).json({ error: "Quantity / Price can't be negative!" })
    }

    if(discount && discount < 0){
        return res.status(422).json({ error: "Discount can't be negative!" })
    }

    req.user.password = undefined;
    const product = new Product({
        name,
        description,
        category,
        quantity,
        price,
        discount,
        //photo: url,
        soldBy: req.user
    })

    product.save()
        .then(result => {
            res.json({ product: result })
        }) 
        .catch(err => {
            console.log(err);
        })
})

// for seller dashboard
router.get('/myproducts', isLoggedIn, (req, res) => {
    Product.find({ soldBy: req.user._id })
    .then(myprods => {
        res.json({ myprods });
    })
    .catch(err => console.log(err))
})


module.exports = router;