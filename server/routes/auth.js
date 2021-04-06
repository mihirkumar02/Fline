const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { JWT_SECRET, DOMAIN, EMAIL, PASSWORD } = require('../config/keys');
const router = express.Router();
const Buyer = require('../models/buyer');
const Seller = require('../models/seller');
const isLoggedIn = require('../middleware/auth')

router.get('/protected', isLoggedIn, (req, res) => {
    res.json({ message: "Allowed!"})
})

router.post('/login', (req, res) => {
    const { type, email, password } = req.body;
    // try to implement email/username login later
    if(!email || !password){
        return res.status(422).json({ error: "Please enter required fields" })
    }

    if(type === "buyer"){
        Buyer.findOne({ email: email})
            .then((userFound) => {
                if(!userFound){
                    return res.status(422).json({ error: "User not found!" })
                }
                // check for emailVerified
                if(!userFound.emailVerified){
                    return res.status(422).json({ error: "Please verify your email!" })
                }

                bcrypt.compare(password, userFound.password)
                    .then(isMatch => {
                        if(isMatch){
                            const token = jwt.sign({ _id: userFound._id }, JWT_SECRET);
                            // userFound.addresses.length > 0 ? send addresses to front end, else send no saved addresses 
                            const { _id, username, contact, email /*, orders, addresses(if any), cart(if any) */ } = userFound;
                            res.json({ token, user: { _id, username, contact, email, type }});
                        } else {
                            res.status(422).json({ error: "Wrong password!" })
                        }
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    } 

    if(type === "seller"){
        Seller.findOne({ email: email})
            .then((userFound) => {
                if(!userFound){
                    return res.status(422).json({ error: "User not found!" })
                }

                if(!userFound.emailVerified){
                    return res.status(422).json({ error: "Please verify your email!" })
                }

                bcrypt.compare(password, userFound.password)
                    .then(isMatch => {
                        if(isMatch){
                            const token = jwt.sign({ _id: userFound._id }, JWT_SECRET);
                            // userFound.addresses.length > 0 ? send addresses to front end, else send no saved addresses 
                            const { _id, username, contact, email, storeName /*, branches (if any), adminMessages(if any) */ } = userFound;
                            res.json({ token, user: { _id, username, contact, email, storeName, type }});
                        } else {
                            res.status(422).json({ error: "Wrong password!" })
                        }
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }
}) 

router.post('/register', (req, res) => {
    const { type } = req.body;

    if(type === "buyer"){
        const { 
            name, 
            email, 
            password, 
            confirmpassword,
            contact  
        } = req.body;

        if (!name || !email || !password || !confirmpassword || !contact){
            return res.status(422).json({ error: "Please enter required fields!" })
        }

        // add email validation 
        // (also add password strength logic in frontend)

        Buyer.findOne({ email: email })
            .then((existingUser) => {
                if(existingUser){
                    return res.status(422).json({ error: "User already exists!" })
                }
                // add password strength checker

                if (password !== confirmpassword){
                    return res.status(422).json({ 
                        error: "Passwords do not match!"
                    })
                }

                bcrypt.hash(password, 12)
                    .then(hashedpassword => {
                        const username = email.substring(0, email.lastIndexOf("@"));
                        crypto.randomBytes(32, (err, buffer) => {
                            if(err) console.log(err)
                            const token = buffer.toString("hex")
                            const buyer = new Buyer({
                                name,
                                email,
                                password: hashedpassword,
                                username,
                                contact,
                                verifyToken: token
                            })
                            buyer.save()
                                .then(buyer => {
                                    // send verification mail (make logic)
                                    
                                    let smtpTransport = nodemailer.createTransport({
                                        service: 'Gmail', 
                                        auth: {
                                           user: EMAIL,
                                           pass: PASSWORD
                                        }
                                    });
                                    let mailOptions = {
                                        to: buyer.email,
                                        from: "no-reply@fline.com",
                                        subject: "Registration Success",
                                        html: `
                                            <p>Welcome to Fline! </p>
                                            <h4>Click on this <a href="${DOMAIN}/verify/${token}">link</a> to verify your account.</h4>
                                        `
                                        // make a frontend to receive this link, using React Router
                                        // pass the token in body, and verify in backend, if success
                                        // then redirect to verified page, and show "Go to Login" button
                                    };
                                    smtpTransport.sendMail(mailOptions, (err) => {
                                      console.log('mail sent');
                                    });
                            
                                    res.json({ message: "Please verify your email!" })
                                })
                                .catch(err => console.log(err))
                        })
                    })
            })
            .catch(err => console.log(err))
    } 

    if(type === "seller"){
        const { 
            name, 
            email, 
            password, 
            confirmpassword,
            contact,
            storeName
        } = req.body;

        if (!name || !email || !password || !confirmpassword || !contact || !storeName){
            return res.status(422).json({ error: "Please enter required fields!" })
        }

        // add email validation 
        // (also add password strength logic in frontend)

        Seller.findOne({ email: email })
            .then((existingUser) => {
                if(existingUser){
                    return res.status(422).json({ error: "User already exists!" })
                }
                // add password strength checker

                if (password !== confirmpassword){
                    return res.status(422).json({ 
                        error: "Passwords do not match!"
                    })
                }

                bcrypt.hash(password, 12)
                    .then(hashedpassword => {
                        const username = email.substring(0, email.lastIndexOf("@"));
                        crypto.randomBytes(32, (err, buffer) => {
                            if(err) console.log(err)
                            const token = buffer.toString("hex")
                            const seller = new Seller({
                                name,
                                email,
                                password: hashedpassword,
                                username,
                                contact,
                                storeName,
                                verifyToken: token
                                // expiry not needed, as user can verify anytime
                            })
                            seller.save()
                                .then(seller => {
                                    // send verification mail (make logic)
                                    
                                    let smtpTransport = nodemailer.createTransport({
                                        service: 'Gmail', 
                                        auth: {
                                           user: EMAIL,
                                           pass: PASSWORD
                                        }
                                    });
                                    let mailOptions = {
                                        to: seller.email,
                                        from: "no-reply@fline.com",
                                        subject: "Registration Success",
                                        html: `
                                            <p>Welcome to Fline! </p>
                                            <h4>Click on this <a href="${DOMAIN}/verify/seller/${token}">link</a> to verify your account.</h4>
                                        `
                                        // make a frontend to receive this link, using React Router
                                        // pass the token in body, and verify in backend, if success
                                        // then redirect to verified page, and show "Go to Login" button
                                    };
                                    smtpTransport.sendMail(mailOptions, (err) => {
                                      console.log('mail sent');
                                    });
                            
                                    res.json({ message: "Please verify your email!" })
                                })
                                .catch(err => console.log(err))
                        })
                    })
            })
            .catch(err => console.log(err))
    }
})

router.post('/verifyemail/:token', (req, res) => {
    const { type } = req.body;

    if(type === "buyer"){
        Buyer.findOne({ verifyToken: req.params.token })
            .then(user => {
                if(!user){
                    return res.status(422).json({ error: "Email already verified!" })
                }

                user.emailVerified = true
                user.verifyToken = undefined
                user.save()
                    .then(savedUser => {
                        res.json({ success: true, message: "Account verified!" })
                    })
            })
            .catch(err => console.log(err))
    }

    if(type === "seller"){
        Seller.findOne({ verifyToken: req.params.token })
        .then(user => {
            if(!user){
                return res.status(422).json({ error: "Email already verified!" })
            }

            user.emailVerified = true
            user.verifyToken = undefined
            user.save()
                .then(savedUser => {
                    res.json({ success: true, message: "Account verified!" })
                })
        })
        .catch(err => console.log(err))
    }
})

router.post('/forgot', (req, res) => {
    const { type, email } = req.body;
    // make altogether different sections for buyer and seller

    if(!email){
        return res.status(422).json({ error: "Please enter your email!" })
    }

    crypto.randomBytes(32, (err, buffer) => {
        if(err) console.log(err)

        const token = buffer.toString("hex")
 
        if(type === "buyer"){
            Buyer.findOne({ email: email })
                .then((userFound) => {
                    if(!userFound){
                        return res.status(404).json({ success: false, message: "User not found!" })
                    }

                    userFound.resetToken = token
                    userFound.expireToken = Date.now() + 3600000 //(in millisecond.. 1 hour expiration)
                    userFound.save()
                        .then((result) => {
                            let smtpTransport = nodemailer.createTransport({
                                service: 'Gmail', 
                                auth: {
                                   user: EMAIL,
                                   pass: PASSWORD
                                }
                            });
                            let mailOptions = {
                                to: userFound.email,
                                from: "no-reply@fline.com",
                                subject: "Password Reset",
                                html: `
                                    <h3>You requested for password reset</h3>
                                    <h5>Click on this <a href="${DOMAIN}/reset/${token}">link</a> to reset your password.</h5>

                                    <p>Ignore if it wasn't you. Your password won't be changed.</p>
                                `
                            };
                            // The link will be made using React Router in frontend
                            // useParams to get the token and pass it to backend
                            smtpTransport.sendMail(mailOptions, (err) => {
                              console.log('mail sent');
                            });
                            res.json({ success: true, message: "Check your email!" })
                        })
                })
                .catch(err => console.log(err))
        }

        if(type === "seller"){
            Seller.findOne({ email: email })
            .then((userFound) => {
                if(!userFound){
                    return res.status(404).json({ success: false, message: "User not found!" })
                }

                userFound.resetToken = token
                userFound.expireToken = Date.now() + 3600000 //(in millisecond.. 1 hour expiration)
                userFound.save()
                    .then((result) => {
                        let smtpTransport = nodemailer.createTransport({
                            service: 'Gmail', 
                            auth: {
                               user: EMAIL,
                               pass: PASSWORD
                            }
                        });
                        let mailOptions = {
                            to: userFound.email,
                            from: "no-reply@fline.com",
                            subject: "Password Reset",
                            html: `
                                <h3>You requested for password reset</h3>
                                <h5>Click on this <a href="${DOMAIN}/reset/seller/${token}">link</a> to reset your password.</h5>

                                <p>Ignore if it wasn't you. Your password won't be changed.</p>
                            `
                        };
                        smtpTransport.sendMail(mailOptions, (err) => {
                          console.log('mail sent');
                        });
                        res.json({ success: true, message: "Check your email!" })
                    })
            })
            .catch(err => console.log(err))
        }
    })
}) // send email for password updation

router.post('/passwordupdate/:token', (req, res) => { // we can use put also
    const { type, password, confirmpassword } = req.body;
    // make separate forgot password for buyer and seller (different sections altogether)
    if(!password || !confirmpassword){
        return res.status(422).json({ error: "Please enter all fields!" })
    }

    if(password !== confirmpassword){
        return res.status(422).json({ error: "Passwords do not match!" })
    }

    if(type === "buyer"){
        Buyer.findOne({ resetToken: req.params.token, expireToken:{ $gt:Date.now()} }) 
        // expire token should be greater than current date (update request made before 1 hour)
            .then((user) => {
                if(!user){
                    return res.status(422).json({ error: "Password not changed!" })
                }

                bcrypt.hash(password, 12)
                    .then(hashedpassword => {
                        user.password = hashedpassword
                        user.resetToken = undefined
                        user.expireToken = undefined // for Date format
                        user.save()
                            .then((savedUser) => {
                                res.json({ success: true, message: "Password updated successfully!" })
                            })
                    })
            })
            .catch(err => console.log(err))
    }

    if(type === "seller"){
        Seller.findOne({ resetToken: req.params.token, expireToken:{$gt:Date.now()} }) 
        // expire token should be greater than current date (update request made before 1 hour)
            .then((user) => {
                if(!user){
                    return res.status(422).json({ error: "Password not changed!" })
                }

                bcrypt.hash(password, 12)
                    .then(hashedpassword => {
                        user.password = hashedpassword
                        user.resetToken = undefined
                        user.expireToken = undefined 
                        // using undefined makes the field disappear from mongo document
                        user.save()
                            .then((savedUser) => {
                                res.json({ success: true, message: "Password updated successfully!" })
                            })
                    })
            })
            .catch(err => console.log(err))
    }
}) // update the password

module.exports = router;