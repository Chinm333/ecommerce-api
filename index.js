const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config();

// importing Routes
const userRoute = require("./src/routes/user_route.js");
const authRoute = require("./src/routes/auth_route.js");
const productRoute = require("./src/routes/product_route.js");
const orderRoute = require("./src/routes/order_route.js");
const paymentRoute = require("./src/routes/payment_route.js");
const trackingOrderRoute = require("./src/routes/tracking_routes.js");

const app = express();
app.use(bodyParser.json());
app.use(express.json());
const port = process.env.PORT || 3000;

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/product', productRoute);
app.use('/api/order', orderRoute);
app.use('/api/payment', paymentRoute);
app.use('/api/trackingOrder', trackingOrderRoute);

function connectToDB(){
    const url = process.env.MONGODB_URL;
    mongoose.connect(url)
    .then(()=>console.log("Connected to DB"))
    .catch((err)=>console.log(err));
}
connectToDB();

app.listen(port, () => {
    console.log(`E-shop app listening on port ${port}`)
})

module.exports = app;