const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyAuth = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(400).json({ error: "Access Denied! You must login to continue your actions." })
    const token = authHeader.split(' ')[1];
    const userId = jwt.decode(token)._id;
    if (userId == null) return res.status(400).json({ error: "Your Token was broken!" })
    console.log(userId)
    try {
        const user = await User.findOne({ _id: userId })
        if (user) {
            if (user.token === token) {
                req.userId = userId;
                req.token = token;
                next();
            } else {
                res.status(400).json({ error: "Your Token was broken!" })
            }
        }
    }
    catch (err) {
        console.log(err)
    }
}
module.exports = verifyAuth;