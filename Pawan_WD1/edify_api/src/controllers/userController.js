const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/userModel');
const UserMod = require('../models/userModel');


/**
 * Keeps token secret value which is in environment variable for token signing purpose
 */
const { TOKEN_SECRET } = process.env;

/**
 * Sign in a user
 * @param {*} req Provide user email and password according to UserModel
 * @param {*} res Returns 401 if auth fails otherwise returns 200 with jwt token for 2 hours
 */
const login = async(req, res) => {
    UserModel.findOne({ email: req.body.email, approved: 'yes', status: 'active' },
        (err, user) => {
            if (err) throw err;
            if (!user) {
                res.status(401).json({
                    message: 'Auth failed! Invalid credentials!',
                });
            } else if (user) {
                if (!user.comparePassword(req.body.password, user.password)) {
                    res.status(401).json({
                        message: 'Auth failed! Invalid credentials!',
                    });
                } else {
                    jwt.sign({
                            id: user.id,
                            email: user.email,
                            name: user.firstName,
                            role: user.role,
                        },
                        TOKEN_SECRET, { expiresIn: '2h' },
                        (err, token) => {
                            if (err) {
                                return res
                                    .status(500)
                                    .json({ error: 'Error while signing in!' });
                            }
                            res.status(200).json({ token });
                        }
                    );
                }
            }
        }
    );
};

/**
 * Sign up a user
 * @param {*} req Provide user informations according to UserModel
 * @param {*} res Returns the registered user
 */
const register = async(req, res) => {
    const newUser = new UserModel(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    
    newUser.save((err, user) => {
        if (err) {
            return res.status(400).send({ message: err });
        } else {
            user.password = undefined;
            return res.json(user);
        }
    });
};

/**
 * Get user information
 * @param {*} req Req has to include user object. So only logged-in users allowed to get their information
 * @param {*} res Returns the user's information
 */
const getUserInformation = async(req, res) => {
    const email = req.user?.email;

    UserModel.findOne({ email: email }, (err, user) => {
        if (err) {
            return res.status(500).json({ err });
        }
        user.password = undefined;
        res.status(200).json(user);
    });
};

const sendUserInfo = async(req, res) => {
    const id = req.params.userId;
    console.log(req.params);
    UserModel.findById(id, (err, usr) => {
        if (err) {
            console.log('Error findindg details for this specific user:' + err);
            return res.status(400).send({ message: err });
        } else {
            return res.json(usr);
        }
    });

};

const addNewUser = async(req, res) => {
    const createNewUser = new UserModel(req.body);
    createNewUser.password = bcrypt.hashSync(req.body.password, 10);

    createNewUser.save((err, user) => {
        if (err) {
            return res.status(400).send({ message: err });
        } else {
            user.password = undefined;
            return res.json(user);
        }
    });
}

const getAllUsers = async(req, res) => {
    UserModel.find((err, data) => {
        if (err) {
            return res.status(500).json({ err });
        }

        res.status(200).json(data);
    });
}

const updateUserInfo = async(req, res) => {

    console.log('The req.user object: ', req.body);

    UserModel.findOneAndUpdate({ id: req.params.id }, req.body, { new: true, useFindAndModify: true }, (err, usr) => {
        if (err) {
            console.log('Error updating this user' + err);
            return res.status(400).send({ message: err });
        } else {
            res.json(usr);
        }
    });
};

const updateUserInformation = async(req, res) => {

    UserModel.findOneAndUpdate({ _id: req.params.userId },
        req.body, { new: true, useFindAndModify: false },
        (err, user) => {
            if (err) {
                res.status(500).json({ err });
            }
            res.status(200).json(user);
        }
    );
    console.log(req.params.userId)
}

const deleteUser = async(req, res) => {
    const _id = req.params.userId;
    UserModel.findByIdAndDelete(_id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot delete with ${id}.Maybe id is wrong!` })
            } else {
                res.send({ message: `User was deleted successfully!` })
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Could not delete User with id=" + id })
        });
};

const showUnapprovedUsers = async(req, res) => {

    const query = req.body;
    console.log('query: ', query)
    UserModel.find(query, (err, answer) => {
        if (err) {
            console.log('The error in handling this is: ' + err);
            return res.status(500).send({ message: err });
        } else {
            return res.status(200).send(answer)
        }
    });

};

const bulkActivateUsers = async(req, res) => {
    const query = req.body;
    console.log('bulk activate request query: ', query);
    const updateCondition = { $set: { approved: "yes", status: "active" } };

    UserModel.updateMany(query, updateCondition, (err, answer) => {
        if (err) {
            console.log('Error in bulk updation: ' + err);
            return res.status(500).send({ message: err });
        } else {
            return res.status(200).send(answer);
        }
    });
};


const updateUserPassword = async(req, res) => {
    if (req.user?.email) {
        const oldPassword = req.body.oldPassword;
        const newPassword = bcrypt.hashSync(req.body.password, 10);

        UserModel.findOne({ email: req.body.email },
            (err, user) => {
                if (err) throw err;
                if (!user) {
                    res.status(401).json({
                        message: 'Auth failed! Invalid credentials!',
                    });
                } else if (user) {

                    console.log('Exp: ', !user.comparePassword(oldPassword, user.password))
                    if (!user.comparePassword(oldPassword, user.password)) {

                        res.status(401).json({
                            message: 'Authentication Failed. Invalid Password',
                        });
                    } else {
                        delete req.body.email;
                        delete req.body.oldPassword;
                        req.body.password = newPassword;

                        console.log('new req.body: ', req.body)

                        UserMod.findOneAndUpdate({ id: req.params.id }, req.body, { new: false, useFindAndModify: true }, (err, usr) => {
                            if (err) {
                                console.log('Error updating this user' + err);
                                return res.status(400).send({ message: err });
                            } else {
                                res.json(usr);
                            }
                        });
                    }
                }

            }

        );
    }

}


module.exports = {
    login,
    register,
    sendUserInfo,
    getAllUsers,
    updateUserInfo,
    updateUserInformation,
    addNewUser,
    deleteUser,
    updateUserPassword,
    getUserInformation,
    showUnapprovedUsers,
    bulkActivateUsers,

};