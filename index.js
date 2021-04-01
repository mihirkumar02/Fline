const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGO_URI } = require('./config/dev');
const authRoutes = require('./routes/auth');

mongoose.connect(MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json());
app.use(authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})