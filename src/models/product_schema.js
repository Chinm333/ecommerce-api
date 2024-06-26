const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    originalPrice: {
        type: Number,
        required: true,
    },
    discountedPrice: {
        type: Number,
        required: true,
    },
    discountPercentage: {
        type: Number,
        required: true,
    },
    image: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    tag: {
        type: [{
            tagId: {
                type: String,
                required: true
            },
            tagName: {
                type: String,
                required: true
            }
        }],
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    moq: {
        type: Number,
        required: true
    },
    createdDate:{
        type: Date,
        default: Date.now,
        required: true
    },
});

productSchema.index({ productId: 'text', name: 'text' });

module.exports = mongoose.model("Product", productSchema);