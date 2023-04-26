const mongoose = require('mongoose');

const InstructorSchema = new mongoose.Schema({
    name: String,
    socialMediaLink: String,
    photoUrl: String,
    studyArea: String,
});

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Course name required'],
    },
    slug: {
        type: String,
        required: [true, 'Slug required'],
        unique: true,
    },
    description: {
        type: String,
    },
    coverPhoto: {
        type: String,
        required: [true, 'Cover photo required'],
    },
    cardPhoto: {
        type: String,
        required: [true, 'Card photo required'],
    },
    price: {
        type: String,
        required: [true, 'Price required'],
    },
    duration: {
        type: String,
        required: [true, 'Duration required'],
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['active', 'inactive', 'suspended'],
            message: '{VALUE} is not supported',
        },
        default: 'inactive',
    },
    instructors: {
        type: [InstructorSchema],
        default: undefined,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Courses', CourseSchema);