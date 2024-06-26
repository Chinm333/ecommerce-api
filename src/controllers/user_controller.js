const bcrypt = require("bcrypt");
const User = require("../models/user_schema");
const { generateRandomString } = require("../services/common_service");

// create User
const createUser = async (req, res) => {

    try {
        const { name, email, password, phone, address } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            userId: await generateRandomString(4),
            name,
            email,
            password: hashedPassword,
            phone,
            address
        });

        res.status(201).json({
            status: 201,
            message: "User created successfully",
            data: user
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: "Error creating user",
        });
    }

};


// get user
const getUser = async (req, res) => {
    try {
        const { userId, mail, name, phone, page = 1, limit = 10 } = req.query;

        let query = {};
        if (userId) query.userId = userId;
        if (mail) query.mail = mail;
        if (name) query.name = name;
        if (phone) query.phone = phone;

        if (Object.keys(query).length === 0) {
            const pageNumber = parseInt(page, 10);
            const limitNumber = parseInt(limit, 10);
            const skip = (pageNumber - 1) * limitNumber;
            const users = await User.find().skip(skip).limit(limitNumber);
            const totalUsers = await User.countDocuments();
            res.status(200).json({
                status: 200,
                message: "Users fetched successfully",
                data: users,
                pagination: {
                    total: totalUsers,
                    page: pageNumber,
                    pages: Math.ceil(totalUsers / limitNumber)
                },
            });
        } else {
            const user = await User.findOne(query);
            res.status(200).json({
                status: 200,
                message: "User fetched successfully",
                data: user
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
const updateUser = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        const { userId } = req.params;
        if (!name && !email && !phone && !address) {
            return res.status(400).json({
                status: 404,
                message: 'No update fields provided'
            });
        }
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { name, email, phone, address },
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).json(
                {
                    status: 404,
                    message: 'User not found'
                }
            );
        }
        res.status(200).json({
            status: 200,
            message: 'User updated successfully',
            data: user
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: 'Error updating user',
            data: user
        });
    }


};
// delete
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findOneAndDelete({ _id: userId });
        if (!user) {
            return res.status(404).json(
                {
                    status: 404,
                    message: 'User not found'
                }
            );
        }
        res.status(200).json({
            status: 200,
            message: 'User deleted successfully',
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: 'Error deleting user',
        });
    }
};

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
}