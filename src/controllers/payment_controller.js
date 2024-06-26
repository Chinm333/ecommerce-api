const mongoose = require("mongoose");
const Payment = require("../models/payment_schema.js");
const { generateRandomString } = require("../services/common_service");

// create
const createPayment = async (req, res) => {
    try {
        const { orderId, userId, totalAmount, paymentMethod } = req.body;
        const paymentId = await generateRandomString(4);
        let status = paymentMethod === "COD" ? "Pending" : "Completed";
        const payment = await Payment.create({
            paymentId,
            orderId,
            userId,
            totalAmount,
            paymentMethod,
            status,
        });
        res.status(201).json({
            status: 201,
            message: "Payment created successfully",
            data: payment,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 400,
            message: "Error creating payment",
        });
    }
};
// get
const getPayment = async (req, res) => {
    try {
        const { paymentId, userId, status, paymentMethod, page = 1, limit = 10 } = req.query;

        let query = {};

        if (paymentId) query.paymentId = paymentId;
        if (userId) query.userId = userId;
        if (status) query.status = status;
        if (paymentMethod) query.paymentMethod = paymentMethod;

        if (Object.keys(query).length === 0) {
            const pageNumber = parseInt(page, 10);
            const limitNumber = parseInt(limit, 10);
            const skip = (pageNumber - 1) * limitNumber;
            const payments = await Payment.find().skip(skip).limit(limitNumber);
            const totalPayments = await Payment.countDocuments();
            res.status(200).json({
                status: 200,
                message: "Payments fetched successfully",
                data: payments,
                pagination: {
                    total: totalPayments,
                    page: pageNumber,
                    pages: Math.ceil(totalPayments / limitNumber)
                },
            });
        } else {
            const payment = await Payment.find(query);
            res.status(200).json({
                status: 200,
                message: "Payment fetched successfully",
                data: payment,
            });
        }
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: "Error getting payment",
        })
    }
};
// update
const updatePayment = async (req, res) => {
    try {
        const { status, paymentMethod } = req.body;
        const { paymentId } = req.params;

        const payment = await Payment.findOneAndUpdate(
            { paymentId },
            { status, paymentMethod },
            { new: true, runValidators: true }
        );
        res.status(200).json({
            status: 200,
            message: "Payment updated successfully",
            data: payment,
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: "Error updating payment",
        })
    }
};
// delete

const deletePayment = async (req, res) => {
    try {
        const { paymentId } = req.params;

        const payment = await Payment.findOneAndDelete({ paymentId });
        if (!payment) {
            return res.status(404).json(
                {
                    status: 404,
                    message: 'Payment not found'
                }
            );
        }
        res.status(200).json({
            status: 200,
            message: 'Payment deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Error deleting payment",
        });
    }
};

module.exports = {
    createPayment,
    getPayment,
    updatePayment,
    deletePayment
}
