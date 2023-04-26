const PaymentCard = require('../models/paymentCardModel');

const addPaymentCard = async(req, res) => {
    const newPaymentCard = new PaymentCard(req.body)
    console.log('the new card req:', req.body)
    newPaymentCard.save((err, card) => {
        if (err) {
            console.log('Card Addition Error: ' + err);
            return res.status(400).send({ message: err });
        } else {
            return res.json(card);
        }
    });
};


const deletePaymentCard = async(req, res) => {
    const cardNumber = req.params.cardNumber;
    console.log('Card Number requested for deletion: ', cardNumber);

    PaymentCard.deleteOne({ cardNumber: req.params.cardNumber }, (err, removedCard) => {

        if (err) {
            console.log('Card Deletion Error: ' + err);
            return res.status(400).send({ message: err });
        } else {
            return res.json(removedCard);
        }
    });
};

const updatePaymentCard = async(req, res) => {
    PaymentCard.findOneAndUpdate({ cardNumber: req.params.cardNumber }, req.body, { new: true, useFindAndModify: false }, (err, card) => {
        if (err) {
            console.log('Card Updation Error: ' + err);
            return res.status(400).send({ message: err });
        } else {
            return res.json(card);
        }
    });
};

const showUserPaymentCards = async(req, res) => {

    if (req.user?.email) {
        const email = req.user.email;

        PaymentCard.find({ email: email }, (err, cards) => {
            if (err) {
                console.log('Card Finding (for email) error: ' + err);
                return res.status(400).send({ message: err });
            } else {
                return res.json(cards)
            }
        });
    } else {
        return res.status(400).send({ message: 'Unauthorized user!' });
    }

};

const showCardInformation = async(req, res) => {

    const cardNumber = req.params.cardNumber;

    PaymentCard.find({ cardNumber: cardNumber }, (err, cards) => {
        if (err) {
            console.log('Card Finding (for card Number) error:' + err);
            return res.status(400).send({ message: err })
        } else {
            return res.json(cards)
        }
    });
};

module.exports = {
    addPaymentCard,
    deletePaymentCard,
    updatePaymentCard,
    showUserPaymentCards,
    showCardInformation
};