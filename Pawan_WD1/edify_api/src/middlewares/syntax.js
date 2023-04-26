/**
 * SyntaxChecker middleware checks if there is a syntax error
 * For example, if the req body has invalid json syntax returns 400 with error message
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const syntaxChecker = (err, req, res, next) => {
    if (err instanceof SyntaxError)
        return res.status(400).json({ error: 'Request body is not valid!' });

    res.status(500).send(err);
};

module.exports = { syntaxChecker };