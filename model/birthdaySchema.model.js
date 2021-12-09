const mongoose = require('mongoose');

const BirthdaySchema = new mongoose.Schema(
    {
        profile: {
            type: String
        },
        username: {
            type: String,
            required: true,
        },
        dob: {
            type: String,
            required: true,
        },
        goal: {
            type: String,
        },
        cloudinary_id: {
            type: String
        }
    },
    { timestamps: true },
);

module.exports = mongoose.model('Birthday', BirthdaySchema);
