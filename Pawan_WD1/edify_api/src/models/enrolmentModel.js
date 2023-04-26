const mongoose = require('mongoose');

const EnrolmentSchema = new mongoose.Schema({

    enrolmentId: {
        type: Number,
        required: true,
        default: 100000000
    },
    slug: {
        type: String,
        required: [true, 'Slug required'],
        unique: true,
        validate: {
            validator: function(v) {
                return /^[a-z0-9]+(?:-[a-z0-9]+)*$/g.test(v);
            },
            message: (props) => `${props.value} is not a valid slug!`,
        },
    },
    email: {
        type: String,
        required: true,
        // unique: true,
    },
    userEnrolStatus: {
        type: String,
        required: true,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    userName: {
        type: String,
        required: true,

    },
    paymentId: {
        type: String,
        required: true,

    },
    paymentDate: {
        type: Date,
        default: Date.now(),
        required: true,

    },
    batchStartDate: {
        type: String,
        required: true,
    },
    batchEndDate: {
        type: String,
        required: true,
    },
    // courseId: {
    //     type: String,   
    // },
    courseName: {
        type: String,
        required: true,

    },
    courseAmount: {
        type: String, //datatype
        required: true,

    },
    batchId: {
        type: String,
        required: true,
    },

}, { timestamps: true });

module.exports = mongoose.model('Enrolment', EnrolmentSchema);

// getAllEnrolment
// postSingleEnrolment
// getEnrolmentById (enrolmentId)
// getEnrolmentDataByEmail 
// batchId - generate from frontend
// MAY22Coursename(6)