const mongoose = require("mongoose");
const Tracking = require("../models/tracking_order_schema.js");
const { generateRandomString } = require("../services/common_service");

// create
const createTracking = async (req, res) => {
    try {
        const { orderId, delivery_status, delivery_date } = req.body;
        const trackingId = await generateRandomString(4);
        const tracking = await Tracking.create({
            trackingId,
            orderId,
            delivery_status,
            delivery_date
        });

        res.status(201).json({
            status: 201,
            message: "Tracking created successfully",
            data: tracking
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: "Error creating tracking",
        });
    }
};

// read
const getTracking = async (req, res) => {
    try {
        const { trackingId, orderId, delivery_status, delivery_date, page = 1, limit = 10 } = req.query;
        let query = {};
        if (trackingId) query.trackingId = trackingId;
        if (orderId) query.orderId = orderId;
        if (delivery_status) query.delivery_status = delivery_status;
        if (delivery_date) query.delivery_date = delivery_date;
        if (Object.keys(query).length === 0) {
            const pageNumber = parseInt(page, 10);
            const limitNumber = parseInt(limit, 10);
            const skip = (pageNumber - 1) * limitNumber;
            const tracking = await Tracking.find().skip(skip).limit(limitNumber);
            const totalTracking = await Tracking.countDocuments();
            res.status(200).json({
                status: 200,
                message: "Tracking fetched successfully",
                data: tracking,
                pagination: {
                    total: totalTracking,
                    page: pageNumber,
                    pages: Math.ceil(totalTracking / limitNumber)
                },
            });
        } else {
            const tracking = await Tracking.find(query);
            res.status(200).json({
                status: 200,
                message: "Tracking fetched successfully",
                data: tracking
            });
        }
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: "Error fetching tracking",
        });
    }
};
// update
const updateTracking = async (req, res) => {
    try {
        const { delivery_status, delivery_date } = req.body;
        const { orderId } = req.params;
        const tracking = await Tracking.findOneAndUpdate(
            { orderId },
            { delivery_status, delivery_date },
            { new: true, runValidators: true }
        );
        res.status(200).json({
            status: 200,
            message: "Tracking updated successfully",
            data: tracking
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Error updating tracking",
        });
    }
};
// delete

const deleteTracking = async (req, res) => {
    try {
        const { orderId } = req.params;
        const tracking = await Tracking.findOneAndDelete({ orderId });
        if (!tracking) {
            return res.status(404).json({
                status: 404,
                message: "Tracking not found",
            });
        }
        res.status(200).json({
            status: 200,
            message: "Tracking deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Error deleting tracking",
        });
    }
};

module.exports = {
    createTracking,
    getTracking,
    updateTracking,
    deleteTracking
}