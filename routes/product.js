const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const isLoggedIn = require('../middleware/auth');

// show all products (buyer)
// show category wise (buyer)
// search product (buyer)
// add product review (buyer)
// delete review (buyer)
// add to cart 
// remove from cart
// order

router.post('/product/new', isLoggedIn, (req, res) => {
    const { name, description, category, quantity, price, discount, urls /*, options */ } = req.body;
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
        photos: urls, 
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

// to fetch details in edit form
router.get('/product/:id', isLoggedIn, (req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            res.json({ product })
        })
        .catch(err => console.log(err))
})

// to save edit details
router.put('/product/:id', isLoggedIn, (req, res) => {
    const {name, description, quantity, price, discount, urls} = req.body;

    if(!name || !description || !quantity || !price || !discount){
        return res.status(422).json({ error: "Please enter all fields! "})
    }

    Product.findByIdAndUpdate(req.params.id, {
        name,
        description,
        quantity,
        price,
        discount,
        photos: urls
    })
        .then(product => {
            res.json({ success: true, product})
        })
        .catch(err => console.log(err))
});

router.delete('/product/:id', isLoggedIn, (req, res) => {
    Product.findByIdAndRemove(req.params.id)
        .then(result => {
            res.json({ success: true })
        })
        .catch(err => console.log(err))
})

router.get('/allproducts', isLoggedIn, (req, res) => {
    Product.find()
        .then(products => {
            res.json({ products })
        })
        .catch(err => console.log(err))
})

module.exports = router;