const mongoose = require('mongoose');

const enrolSeqSchema = new mongoose.Schema({
    enrolmentSequence: {
        type: Number,
        required: true,
        default: 100000000
    }

});

const enrolSequence = mongoose.model('enrolSeqence', enrolSeqSchema)
module.exports = enrolSequence;