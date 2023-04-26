const fs = require('fs');
const multer = require('multer');
const { upload } = require('./uploadController');

const Course = require('../models/courseModel');

const { PORT } = process.env;
const API_UPLOAD_FOLDER_URL = `http://localhost:${PORT}/uploads/`;


const getCourse = async (req, res) => {
    // if status is not inactive
    Course.find({ status: { $ne: 'inactive' } }, (err, course) => {
        if (err) {
            return res.status(500).json({ err });
        }
        res.status(200).json(course);
    });
};

const getAllCourses4Admin = async (req, res) => {
    Course.find({}, (err, course) => {
        if (err) {
            return res.status(500).json({ err });
        }
        res.status(200).json(course);
    });
};

const getCourseWithSlug = async (req, res) => {
    Course.findOne(
        { slug: req.params.slug, status: { $ne: 'inactive' } },
        (err, course) => {
            if (err) {
                return res.status(500).json({ err });
            } else if (course === null) {
                return res.status(404).json(null);
            }
            res.status(200).json(course);
        }
    );
};

const getCourseWithSlug4Admin = async (req, res) => {
    Course.findOne({ slug: req.params.slug }, (err, course) => {
        if (err) {
            return res.status(500).json({ err });
        }
        res.status(200).json(course);
    });
};

const addNewCourse = async (req, res) => {
    upload(req, res, function (err) {
        /*
        name: 'course name',
        slug: 'course code',
        description: '<p>course content</p>',
        price: '123 $',
        duration: '1 Month',
        status: 'active',
        instructorName1: 'instructor1 Name',
        socialMediaLink1: 'instructor1 linkedin ',
        studyArea1: 'instructor1 study area',
        instructorName2: 'instructor2 Name',
        socialMediaLink2: 'instructor2 linkedin',
        studyArea2: 'instructor2 study area'

        'card-photo' : [ [Object] ],
        'cover-photo': [ [Object] ],
        'ins-photo-1': [ [Object] ],
        'ins-photo-2': [ [Object] ]
        */
        let data = req.body;

        if (err instanceof multer.MulterError) {
            res.status(500).json(err);
        } else if (err) {
            res.status(500).json(err.message);
        } else {
            // If files have been uploaded then create a course object and save it
            const newCourse = Course({
                name: data.name,
                slug: data.slug,
                description: data.description,
                coverPhoto:
                    API_UPLOAD_FOLDER_URL +
                    req.files['cover-photo'][0].filename,
                cardPhoto:
                    API_UPLOAD_FOLDER_URL + req.files['card-photo'][0].filename,
                price: data.price,
                duration: data.duration,
                status: data.status,
                instructors: [
                    {
                        name: data.instructorName1,
                        socialMediaLink: data.socialMediaLink1,
                        photoUrl: req.files['ins-photo-1']?.[0]?.filename
                            ? API_UPLOAD_FOLDER_URL +
                              req.files['ins-photo-1'][0].filename
                            : '',
                        studyArea: data.studyArea1,
                    },
                    {
                        name: data.instructorName2,
                        socialMediaLink: data.socialMediaLink2,
                        photoUrl: req.files['ins-photo-2']?.[0]?.filename
                            ? API_UPLOAD_FOLDER_URL +
                              req.files['ins-photo-2'][0].filename
                            : '',
                        studyArea: data.studyArea2,
                    },
                ],
            });

            newCourse.save((err, course) => {
                if (err) {
                    // If the course wasn't saved. Delete the uploaded files.

                    let fileKeys = Object.keys(req.files);

                    fileKeys.forEach(function (key) {
                        fs.unlink(req.files[key][0].path, (err) => {
                            console.log(req.files[key][0].path + ' deleted!');
                            if (err) {
                                console.error(err);
                            }
                        });
                    });

                    // Return the reason of not being saved!
                    return res.status(500).json({ err });
                }
                // Return saved course object.
                res.status(200).json(course);
            });
        }
    });
};

const updateCourse = async (req, res) => {
    upload(req, res, function (err) {
        let data = req.body;
        if (err instanceof multer.MulterError) {
            res.status(500).json(err);
        } else if (err) {
            res.status(500).json(err.message);
        } else {
            let course = {
                name: data.name,
                slug: data.slug,
                description: data.description,
                coverPhoto: data.coverPhoto,
                cardPhoto: data.cardPhoto,
                price: data.price,
                duration: data.duration,
                status: data.status,
                instructors: [
                    {
                        name: data.instructorName1,
                        socialMediaLink: data.socialMediaLink1,
                        photoUrl: data.insPhotoUrl1,
                        studyArea: data.studyArea1,
                    },
                    {
                        name: data.instructorName2,
                        socialMediaLink: data.socialMediaLink2,
                        photoUrl: data.insPhotoUrl2,
                        studyArea: data.studyArea2,
                    },
                ],
            };

            if (req.files['cover-photo']) {
                course.coverPhoto =
                    API_UPLOAD_FOLDER_URL +
                    req.files['cover-photo'][0].filename;
            }

            if (req.files['card-photo']) {
                course.cardPhoto =
                    API_UPLOAD_FOLDER_URL + req.files['card-photo'][0].filename;
            }

            if (req.files['ins-photo-1']) {
                course.instructors[0].photoUrl =
                    API_UPLOAD_FOLDER_URL +
                    req.files['ins-photo-1'][0].filename;
            }

            if (req.files['ins-photo-2']) {
                course.instructors[1].photoUrl =
                    API_UPLOAD_FOLDER_URL +
                    req.files['ins-photo-2'][0].filename;
            }

            console.log(course);
            console.log(req.params);

            Course.findOneAndUpdate(
                { _id: req.params.id },
                course,
                { new: true, useFindAndModify: false },
                (err, course) => {
                    console.log(err);
                    if (err) {
                        return res.status(500).json({ err });
                    }
                    res.status(200).json(course);
                }
            );
        }
    });
};

const deleteCourse = async (req, res) => {
    Course.deleteOne({ _id: req.params.id }, (err, removed) => {
        if (err) {
            return res.status(500).json({ err });
        }
        res.status(200).json(removed);
    });
};

const checkSlugUniqueness = async (req, res) => {
    Course.findOne({ slug: req.params.slug }, (err, course) => {
        if (err) {
            return res.status(500).json({ err });
        }
        res.status(200).send({ isUnique: !(course != null) });
    });
};

module.exports = {
    getCourse,
    getAllCourses4Admin,
    getCourseWithSlug,
    getCourseWithSlug4Admin,
    addNewCourse,
    updateCourse,
    deleteCourse,
    checkSlugUniqueness,
};
