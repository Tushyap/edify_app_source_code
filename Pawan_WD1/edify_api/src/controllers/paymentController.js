const Razorpay = require('razorpay');
const crypto = require('crypto');
const RazorpayModel = require('../models/razorpayModel');

const getRazorpayInstance = async () => {
    try {
        let data = await RazorpayModel.findOne({});
        let instance = new Razorpay({
            key_id: data.key_id,
            key_secret: data.key_secret,
        });

        return instance;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const createOrder = async (req, res) => {
    let amount = req.body.amount;
    amount = parseInt(amount);
    amount = amount * 100;

    const options = {
        amount: amount,
        currency: 'INR',
        notes: {
            course: req.body.courseName,
            courseId: req.body.courseId,
        },
    };
    // create order
    let instance = await getRazorpayInstance();

    instance.orders.create(options, (err, order) => {
        if (err) {
            return res.status(500).json({ message: 'An error occured!' });
        }
        res.status(200).json(order);
    });
};

const verifyPayment = async (req, res) => {
    let body = req.body.razorpay_order_id + '|' + req.body.razorpay_payment_id;

    let instance = await getRazorpayInstance();

    var expectedSignature = crypto
        .createHmac('sha256', instance.key_secret)
        .update(body.toString())
        .digest('hex');

    console.log('sig received ', req.body.razorpay_signature);
    console.log('sig generated ', expectedSignature);

    var response = { signatureIsValid: 'false' };

    if (expectedSignature === req.body.razorpay_signature) {
        response = { signatureIsValid: 'true' };
    } else {
        response = { signatureIsValid: 'false' };
    }
    res.send(response);
};

const getPayments = async (req, res) => {
    // https://razorpay.com/docs/api/orders/#create-an-order/
    let instance = await getRazorpayInstance();
    instance.payments.all(
        { from: '2022-02-01', to: '2022-04-01' },
        (error, response) => {
            if (error) {
                return res
                    .status(500)
                    .json({ message: 'An error occured!', error: error });
            } else {
                res.status(200).json(response);
            }
        }
    );
};

module.exports = { createOrder, verifyPayment, getPayments };
