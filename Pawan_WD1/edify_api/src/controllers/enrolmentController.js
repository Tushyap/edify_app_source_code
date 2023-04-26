const Enrolment = require('../models/enrolmentModel');
const EnrolSeqModel = require('../models/enrolSeqModel');

const updateUserEnrolStatus = () => {

    const todayDate = new Date();
    console.log('todays date: ', todayDate);
    // let dayToday = todayDate.getDate();
    let monthToday = todayDate.getMonth() + 1; // as it is 0 (JAN) - 11 (DEC)
    let yearToday = todayDate.getFullYear();

    let batchEndStr = "";
    let batchEndDayStr = "25"; // in two digits as it is always gonna be 15. for testing 01, 22, 15 etc


    let batchEndMonthStr = "";
    if (monthToday.toString().length === 1) {
        batchEndMonthStr += "0" + monthToday.toString();
    } else
        batchEndMonthStr += monthToday.toString();

    let batchEndYearStr = yearToday.toString();

    batchEndStr += batchEndDayStr + "/" + batchEndMonthStr + "/" + batchEndYearStr;
    console.log('Inside updateUserEnrolStatus; batchEndStr: ', batchEndStr);
    const query = { batchEndDate: batchEndStr };

    const updateCondition = { $set: { userEnrolStatus: "inactive" } };

    Enrolment.updateMany(query, updateCondition, (err, answer) => {
        if (err) {
            console.log('Error in enrolStatusUpdation updation: ' + err);
        }
        console.log('answer in userEnrolStatus: ', answer)
    });

}

const getAllEnrolment = async(req, res) => {
    Enrolment.find((err, data) => {
        if (err) {
            res.status(500).json({ err });
        }

        res.status(200).json(data);
    });
}

const getSingleUserEnrolment = async(req, res) => {
    const query = req.body;
    console.log('query: ', query)
    Enrolment.find(query, (err, answer) => {
        if (err) {
            console.log('The error in handling this is: ' + err);
            res.status(500).send({ message: err });
        } else {
            res.status(200).send(answer)
            console.log(answer)
        }
    });
};
const getUserEnrolment = async(req, res) => {
    // const query = req.body;
    // console.log('query: ', query)
    // Enrolment.find(query, (err, answer) => {
    //     if (err) {
    //         console.log('The error in handling this is: ' + err);
    //         res.status(500).send({ message: err });
    //     } else {
    //         res.status(200).send(answer)
    //         console.log(answer)
    //     }
    // });
    const email = req.user?.email;

    Enrolment.findOne({ email: email }, (err, user) => {
        if (err) {
            return res.status(500).json({ err });
        }
       
        res.status(200).json(user);
    });
};

const addEnrolment = async(req, res) => {
    console.log('enrolment addition req.body: ', req.body)
    let createNewEnrolment = new Enrolment(req.body);

    createNewEnrolment.save((err, enrolmentData) => {
        if (err) {
            res.status(400).send({ message: err });
        } else {

            res.json(enrolmentData);
        }
    });
}

const getAllBatches = async(req, res) => {
    Enrolment.distinct("batchId", (err, data) => {
        if (err) {
            res.status(500).json({ err });
        }

        res.status(200).json(data);
    });
}

const showEnrolmentBatchWise = async(req, res) => {

    const query = req.body;
    console.log('query: ', query)
    Enrolment.find(query, (err, answer) => {
        if (err) {
            console.log('The error in handling this is: ' + err);
            return res.status(500).send({ message: err });
        } else {
            return res.status(200).send(answer)

        }
    });

};

const getEnrolStatusCourseWise = async(req, res) => {
    const userEnrolStatus = req.params.userEnrolStatus
    const enrolStatus = req.params
    console.log(enrolStatus)
    Enrolment.aggregate([
        { $match: { userEnrolStatus: { $eq: enrolStatus.status } } },
        { $group: { _id: "$courseName", active: { $sum: 1 } } }
    ], (err, answer) => {
        if (err) {
            console.log('The error in handling this is: ' + err);
            return res.status(500).send({ message: err });
        } else {
            console.log(answer)
            return res.status(200).send(answer)
        }
    });
};

module.exports = {
    getAllEnrolment,
    getAllBatches,
    addEnrolment,
    showEnrolmentBatchWise,
    updateUserEnrolStatus,
    getEnrolStatusCourseWise,
    getSingleUserEnrolment,
    updateUserEnrolStatus,
    getUserEnrolment
};