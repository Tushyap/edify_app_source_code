const {
    login,
    register,
    sendUserInfo,
    getAllUsers,
    updateUserInfo,
    updateUserInformation,
    addNewUser,
    deleteUser,
    showUnapprovedUsers,
    bulkActivateUsers,
    getUserInformation,
    updateUserPassword,
} = require('../controllers/userController');
const { loginRequired, onlyAdminRequired } = require('../middlewares/auth');
const paymentCard = require('../controllers/paymentCardController');

const {
    createOrder,
    verifyPayment,
    getPayments,
} = require('../controllers/paymentController');

const course = require('../controllers/courseController');

const {
    getAllEnrolment,
    addEnrolment,

    getAllBatches,
    showEnrolmentBatchWise,
    getEnrolStatusCourseWise,
    getSingleUserEnrolment,
    getUserEnrolment,
    
} = require('../controllers/enrolmentController');

const razorpaySettings = require('../controllers/razorpayController');

const routes = (app) => {
    // TODO: SEPARATE ALL THE ROUTES INTO EACH FILES

    app.route('/auth/sign-in').post(login);
    app.route('/auth/sign-up').post(register);
    app.route('/auth/sign-up').get(getAllUsers);
    // app.route('/auth/sign-up/:userId').get(sendUserInfo);
    app.route('/auth/me').get(loginRequired, getUserInformation);

    app.route('/payments/create-order').post(createOrder);
    app.route('/payments/verify').post(verifyPayment);
    app.route('/payments/').get(onlyAdminRequired, getPayments);

    app.route('/cards/add-card').post(
        loginRequired,
        paymentCard.addPaymentCard
    );
    app.route('/cards/delete-card/:cardNumber').delete(
        loginRequired,
        paymentCard.deletePaymentCard
    );
    app.route('/cards/update-card/:cardNumber').put(
        loginRequired,
        paymentCard.updatePaymentCard
    );
    app.route('/cards/show-card/').get(
        loginRequired,
        paymentCard.showUserPaymentCards
    );
    app.route('/cards/display-card/:cardNumber').get(
        paymentCard.showCardInformation
    );

    app.route('/courses/').get(course.getCourse);
    app.route('/courses/:slug').get(course.getCourseWithSlug);

    app.route('/admin/courses/slug-check/:slug').get(
        onlyAdminRequired,
        course.checkSlugUniqueness
    );

    app.route('/admin/courses/')
        .get(onlyAdminRequired, course.getAllCourses4Admin)
        .post(course.addNewCourse);

    app.route('/admin/courses/:slug').get(
        onlyAdminRequired,
        course.getCourseWithSlug4Admin
    );

    app.route('/admin/courses/:id')
        .delete(onlyAdminRequired, course.deleteCourse)
        .put(onlyAdminRequired, course.updateCourse);

    // paths for user
    app.route('/user/user-info/:userId').get(sendUserInfo);

    app.route('/user/update-user/:userId')
        .put(updateUserInformation)
        .delete(deleteUser);

    app.route('/user/edit-user/:userId').put(updateUserInformation);
    app.route('/user/update-password/').put(loginRequired, updateUserPassword);
    app.route('/user/query/').put(showUnapprovedUsers);
    app.route('/user/bulk-update/').put(bulkActivateUsers);

    app.route('/admin/enrollments').get(getAllEnrolment);
    app.route('/admin/singleEnrolUser/').put(getSingleUserEnrolment);
    app.route('/admin/EnrolUser/').get(getUserEnrolment);
    app.route('/admin/enrollments/').post(addEnrolment);
    app.route('/admin/enrollments/batchId').get(getAllBatches);
    app.route('/admin/enrollmentBatchWise/').put(showEnrolmentBatchWise);
    app.route('/admin/enrollmentStatus/:status').get(getEnrolStatusCourseWise);

    app.route('/admin/razorpay-settings/')
        .get(onlyAdminRequired, razorpaySettings.getRazorpaySettings)
        .put(onlyAdminRequired, razorpaySettings.updateSettings);
};

module.exports = { routes };