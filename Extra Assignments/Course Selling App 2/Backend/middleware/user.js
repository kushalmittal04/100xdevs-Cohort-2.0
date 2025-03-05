const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config");

function userMiddleware(req, res, next) {
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];

    try {
        const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
        if(decodedValue.username) {
            // Passing the username
            req.username = decodedValue.username;
            next();
        }
        else {
            res.status(401).json({
                msg: "You are not authenticated"
            });
        }
    } catch (err) {
        res.json({
            msg: "Incorrect inputs"
        })
    }
}

module.exports = userMiddleware;