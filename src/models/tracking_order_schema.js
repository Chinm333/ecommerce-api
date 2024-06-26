const mongoose = require("mongoose");

const trackingSchema = new mongoose.Schema({
    trackingId: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    delivery_status: {
        type: String, // on the way, delivered,cancelled
        required: true
    },
    delivery_date: {
        type: Date,
        required: true
    }
});

trackingSchema.index({ orderId: 'text', delivery_date: 'text'});

module.exports = mongoose.model("Tracking", trackingSchema);

