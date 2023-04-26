const mongoose = require('mongoose');

const paymentCardSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true
    },
    cardNumber: {
        type: String,
        required: true,
        unique: true,
    },
    expiryDate: {
        type: String,
        required: true
    },
    cardCVV: {
        type: String,
        required: true
    }

}, { timestamps: true });

const PaymentCard = mongoose.model('PaymentCard', paymentCardSchema)
module.exports = PaymentCard;