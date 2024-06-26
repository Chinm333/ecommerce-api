const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
    },
    paymentId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true, // pending, completed
    },
    paymentDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    paymentMethod: {
        type: String,
        required: true, // cod,upi,bank
    },
});

paymentSchema.index({ orderId: 'text', paymentId: 'text', userId: 'text' });
module.exports = mongoose.model("Payment", paymentSchema);