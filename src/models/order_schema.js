const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
});

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    productIds: [{
        type: String,
        required: true,
    }],
    quantity: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    orderAddress: {
        type: addressSchema,
        required: true,
    },
    shippingAddress: {
        type: addressSchema,
        required: true,
    },
    orderDate:{
        type: Date,
        required: true,
        default: Date.now,
    },
});

orderSchema.index({ orderId: 'text', userId: 'text'});

module.exports = mongoose.model("Order", orderSchema);

