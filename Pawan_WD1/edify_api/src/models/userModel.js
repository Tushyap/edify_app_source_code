const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    
    firstName: {
        type: String,
        required: true, 
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
            // unique: true,
    },
    address1: {
        type: String,
        required: true,
        maxlength: 256,
    },
    address2: {
        type: String,
        required: true,
        maxlength: 256,
    },
    postalCode: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'ordinary'],
        default: 'ordinary',
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive', 'suspended'],
        default: 'inactive',
    },
    approved: {
        type: String,
        required: true,
        enum: ['yes', 'no'],
        default: 'no',
    },
    createdBy: {
        type: String,
        required: true,
        enum: ['admin', 'self'],
        default: 'self',
    },
    batch: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
});

UserSchema.methods.comparePassword = (pass, password) =>
    bcrypt.compareSync(pass, password);

module.exports = mongoose.model('Users', UserSchema);