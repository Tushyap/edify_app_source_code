const jwt = require('jsonwebtoken');

/**
 * Keeps token secret value which is in environment variable for token signing purpose
 */
const { TOKEN_SECRET } = process.env;

/**
 * Checks if the req has authorization and JWT token, then verifies the token value.
 * If token is valid puts the decoded value in the req
 * or if provided token is not valid makes sure the req will not have a user value lastly redirects to next route.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const verifyToken = (req, res, next) => {
    if (
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'JWT'
    ) {
        jwt.verify(
            req.headers.authorization.split(' ')[1],
            TOKEN_SECRET,
            (err, decode) => {
                if (err) req.user = undefined;
                req.user = decode;
                next();
            }
        );
    } else {
        req.user = undefined;
        next();
    }
};

/**
 * Checks whether the user is logged in the incoming request
 * If the user is not logged in returns 401 with error message otherwise redirects to next route
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};

/**
 * Checks whether the user is logged in the incoming request
 * If the user is not logged in returns 401 with error message otherwise redirects to next route
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */ 
const onlyAdminRequired = (req, res, next) => {
    if (req.user?.role === 'admin') {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};

module.exports = { verifyToken, loginRequired, onlyAdminRequired };
