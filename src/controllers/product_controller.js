const Product = require('../models/product_schema.js');
const { generateRandomString } = require("../services/common_service");
// create product
const createProduct = async (req, res) => {
    try {
        const { name, originalPrice, discountedPrice, discountPercentage, image, description, category, tag, rating, stock, moq } = req.body;
        if (originalPrice > discountedPrice) {
            // only check once in api layer too, i will check in ui on submit
            // but this way it won't be having creating a product with wrong price since it will hamper our application becoz of this.
            res.status(300).json({
                status: 300,
                message: "Original price can't be more than discount price",
            });
        } else {
            try {
                const product = await Product.create({
                    productId: await generateRandomString(4),
                    name,
                    originalPrice,
                    discountedPrice,
                    discountPercentage,
                    image,
                    description,
                    category,
                    tag,
                    rating,
                    stock,
                    moq
                });
                res.status(201).json({
                    status: 201,
                    message: "Product created successfully",
                    data: product
                });
            } catch (error) {
                res.status(400).json({
                    status: 400,
                    message: "Error creating product",
                });
            }
        };
        // discountedPercentage,originalPrice, and  discountedPrice I will settle in frontend 
        // when users will put the orginal then dicount% i will automate the dicount price and
        // same goes to others cases.  
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: "Error creating product",
        });
    }
};
// get product

const getProduct = async (req, res) => {
    try {
        const { productId, name, category, page = 1, limit = 10 } = req.query;
        let query = {};

        if (productId) query.productId = productId;
        if (name) query.name = name;
        if (category) query.category = category;

        if (Object.keys(query).length === 0) {
            const pageNumber = parseInt(page, 10);
            const limitNumber = parseInt(limit, 10);
            const skip = (pageNumber - 1) * limitNumber;
            const products = await Product.find().skip(skip).limit(limitNumber);
            const totalProducts = await Product.countDocuments();
            res.status(200).json({
                status: 200,
                message: "Products fetched successfully",
                data: products,
                pagination: {
                    total: totalProducts,
                    page: pageNumber,
                    pages: Math.ceil(totalProducts / limitNumber)
                },
            });
        } else {
            const product = await Product.find(query);
            res.status(200).json({
                status: 200,
                message: "Product fetched successfully",
                data: product
            });
        }
    } catch (error) {
        res.status(500).
            json({
                status: 500,
                message: error.message
            });
    }
};
// update
const updateProduct = async (req, res) => {
    try {
        const { name, originalPrice, discountedPrice, discountPercentage, image, description, category, tag, rating, stock, moq } = req.body;
        const { productId } = req.params;
        const product = await Product.findOneAndUpdate(
            { _id: productId },
            { name, originalPrice, discountedPrice, discountPercentage, image, description, category, tag, rating, stock, moq },
            { new: true, runValidators: true }
        );
        if (!product) {
            return res.status(404).json({
                status: 404,
                message: "Product not found",
            });
        }
        res.status(200).json({
            status: 200,
            message: "Product updated successfully",
            data: product
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Error updating product",
        })
    }
};
// delete
const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findOneAndDelete({ _id: productId });
        if (!product) {
            return res.status(404).json({
                status: 404,
                message: "Product not found",
            });
        }
        res.status(200).json({
            status: 200,
            message: "Product deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Error deleting product",
        });
    }
};

module.exports = {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
}