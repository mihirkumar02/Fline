const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGO_URI } = require('./config/keys');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');

mongoose.connect(MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(console.log("CONNECTED TO DB"))
.catch(err => console.log("Error in DB CONNECTION"));

app.use(express.json());
app.use(authRoutes);
app.use(productRoutes);

const PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV == "production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})