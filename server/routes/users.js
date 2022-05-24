
const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
//import middleware 
const verifyAuth = require('../middlewares/verifyAuth');

//signup
router.post('/signup', async (req, res) => {
    try {
        //check data entry
        let userError = {};
        const dataSearch = await User.findOne({ userName: req.body.userName });
        if (dataSearch) userError.userName = "UserName has been used. Please type another one!";
        req.body.userName && req.body.userName.length < 3 ? userError.userName = "Username must be more than 3 characters!" : 1;
        req.body.password && req.body.password.length < 8 ? userError.password = "Password must be more than 8 characters!" : 1;
        if (Object.keys(userError).length > 0) {
            return res.status(400).json(userError);
        }
        // signup user
        const user = new User({
            userName: req.body.userName,
            password: req.body.password
        })
        const data = await user.save()
        return res.json(data)
    } catch (err) {
        res.json(err)
    }

})
//login 
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ userName: req.body.userName });
        if (user) {
            if (user.password == req.body.password.trim()) {
                //update token
                if (!user.token) {
                    //create and assign token 
                    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
                    await User.updateOne({ userName: req.body.userName }, { "token": token });
                    //response data
                    return res.status(200).json({ message: "Login Success", token: token })
                }
                return res.status(200).json({ message: "Login Success", token: user.token })
            } else return res.status(400).json({ error: "Wrong Password!" })

        } else return res.status(400).json({ error: "UserName does not exist in this system!" })
    } catch (err) {
        console.log(err)
        return res.status(400).json(err);
    }
})
//logout
router.get('/logout', verifyAuth, async (req, res) => {
    try {
        console.log(req.userId);
        const user = await User.findByIdAndUpdate(req.userId, { token: null });
        if (!user) return res.status(400).json({ error: "User not exist!" })
        return res.status(200).json({ message: "Logout Success!" })
    } catch (err) {
        console.log(err);
    }

})

router.get("/", verifyAuth, (req, res) => {
    try {
        if (!req.userId) return res.status(400).json({ error: "Can't not get user!" });
        User.findById(req.userId, (err, data) => {
            if (data) return res.status(200).json(data);
            else return res.status(400).json({ error: "User doesnt exist!!" })
        })
    } catch (err) {
        console.log(err)
    }
})
router.put("/password", verifyAuth, (req, res) => {
    try {
        if (!req.userId) return res.status(400).json({ error: "Can't not get user!" });
        User.findByIdAndUpdate(req.userId, { password: req.query.value }, (err, data) => {
            if (err) return res.status(400).json(err);
            return res.status(200).json({ message: "Change password successfully!" })
        })
    } catch (err) {
        console.log(err)
    }
})


module.exports = router;