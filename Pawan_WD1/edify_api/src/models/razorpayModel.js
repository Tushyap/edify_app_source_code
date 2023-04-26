const mongoose = require('mongoose');

const RazorpaySchema = new mongoose.Schema(
    {
        key_id: {
            type: String,
            required: true,
        },
        key_secret: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('razorpay_setting', RazorpaySchema);