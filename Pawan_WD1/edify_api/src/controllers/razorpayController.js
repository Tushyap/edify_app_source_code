const RazorpayModel = require('../models/razorpayModel');

const getRazorpaySettings = async (req, res) => {
    // if status is not inactive
    RazorpayModel.findOne({}, (err, settings) => {
        if (err) {
            return res.status(500).json({ err });
        }
        res.status(200).json(settings);
    });
};

const updateSettings = async (req, res) => {
    let data = req.body;

    RazorpayModel.find({}, (err, settings) => {
        // If there is no record then create new record, if there is a record then update

        if (settings.length > 0) {
            RazorpayModel.findOneAndUpdate(
                {},
                { key_id: data.key_id, key_secret: data.key_secret },
                { new: true, useFindAndModify: false },
                (err, newSettings) => {
                    if (err) {
                        return res.status(500).json({ err });
                    }
                    res.status(200).json(newSettings);
                }
            );
        } else {
            let newSettings = new RazorpayModel({
                key_id: data.key_id,
                key_secret: data.key_secret,
            });

            newSettings.save((err, settings) => {
                if (err) {
                    return res.status(500).json({ err });
                }
                // Return saved course object.
                res.status(200).json(settings);
            });
        }
    });
};

module.exports = {
    getRazorpaySettings,
    updateSettings,
};