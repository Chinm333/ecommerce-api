const mongoose = require("mongoose");
const Order = require("../models/order_schema.js");
const { generateRandomString } = require("../services/common_service");

// create
const createOrder = async (req, res) => {
    try {
        const { userId, productIds, quantity, totalAmount, orderAddress, shippingAddress } = req.body;
        const orderId = await generateRandomString(4);
        const status = "Completed";
        const order = await Order.create({
            orderId,
            userId,
            productIds,
            status,
            totalAmount,
            quantity,
            orderDate,
            orderAddress,
            shippingAddress
        });
        res.status(201).json({
            status: 201,
            message: "Order created successfully",
            data: order,
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: "Error creating order",
        });
    }
};
// read
const getOrder = async (req, res) => {
    try {
        const { orderId, userId, page = 1, limit = 10 } = req.query;
        let query = {};

        if (orderId) query.orderId = orderId;
        if (userId) query.userId = userId;

        if (Object.keys(query).length === 0) {
            const pageNumber = parseInt(page, 10);
            const limitNumber = parseInt(limit, 10);
            const skip = (pageNumber - 1) * limitNumber;
            const orders = await Order.find().skip(skip).limit(limitNumber);
            const totalOrders = await Order.countDocuments();
            res.status(200).json({
                status: 200,
                message: "Orders fetched successfully",
                data: orders,
                pagination: {
                    total: totalOrders,
                    page: pageNumber,
                    pages: Math.ceil(totalOrders / limitNumber)
                },
            });
        } else {
            const order = await Order.find(query);
            res.status(200).json({
                status: 200,
                message: "Order fetched successfully",
                data: order,
            });
        }

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Error getting order",
        });
    }
};
// update
const updateOrder = async (req, res) => {
    try {
        const { status, quantity, totalAmount, productIds, orderAddress, shippingAddress } = req.body;
        const { orderId } = req.params;
        const order = await Order.findOneAndUpdate(
            { orderId },
            { status, quantity, totalAmount, productIds, orderAddress, shippingAddress },
            { new: true, runValidators: true }
        );
        if (!order) {
            return res.status(404).json({
                status: 404,
                message: "Order not found",
            });
        }
        res.status(200).json({
            status: 200,
            message: "Order updated successfully",
            data: order,
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: "Error updating order",
        });
    }
};
// delete
const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findOneAndDelete({ orderId });
        if (!order) {
            return res.status(404).json({
                status: 404,
                message: "Order not found",
            });
        }
        res.status(200).json({
            status: 200,
            message: "Order deleted successfully",
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: "Error deleting order",
        });
    }
};

module.exports = {
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder,
}