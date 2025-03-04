const { Router } = require("express");
const { User, Course } = require("../db/index");
const router = Router();
const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    
    await User.create({
        username: username,
        password: password
    })

    res.json({
        msg: "User Created Successfully"
    });
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
    const username = req.headers.username;
    const password = req.headers.password;

    await User.updateOne({
        username,
        password
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
        username: req.headers.username,
        password: req.headers.password
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