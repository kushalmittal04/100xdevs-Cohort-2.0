const { Router } = require("express");
const { User, Course } = require("../db/index");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    await User.create({
        username,
        password
    });

    res.json({
        msg: "User Created Successfully"
    });
});


router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({
        username: username,
        password: password
    });

    if (user) {
        token = jwt.sign({
            username: username
        }, JWT_SECRET);
        res.json({
            msg: "Token Created Successfully",
            token: token
        });
    } else {
        res.status(411).json({
            msg: "Incorrect User Email or Password"
        });
    }

});


router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const allCourses = await Course.find({});

    res.json({
        courses: allCourses
    });
});


router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.username;
    
    await User.updateOne({
        username
    },{
        $push: {
            purchasedCourses: courseId
        }
    });

    res.json({
        msg: "Purchased Completed"
    });
});


router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.username
    });

    const courses = await Course.find({
        _id: {
            "$in" : user.purchasedCourses
        } 
    });

    res.json({
        courses: courses
    });
});

module.exports = router