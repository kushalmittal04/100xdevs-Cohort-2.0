const { Router } = require("express");
const userMiddleware = require("../middleware/user");
const { Admin, User, Course } = require("../db");
const { JWT_SECRET } = require("../config");
const router = Router();
const jwt = require("jsonwebtoken");

// User Signup Route
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new User({ username, password, purchasedCourses: [] });
    await newUser.save();

    res.json({ message: "User created successfully" });
});

// User Signin Route
router.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });
    if (user) {
        const token = jwt.sign({ username }, JWT_SECRET);
        res.json({ token });
    } else {
        res.status(401).json({ message: "Incorrect email or password" });
    }
});

// Get all available courses
router.get('/courses', async (req, res) => {
    const courses = await Course.find({});
    res.json({ courses });
});

// Purchase a course (protected route)
router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const user = await User.findOne({ username: req.user.username });
    const course = await Course.findById(req.params.courseId);

    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    if (user.purchasedCourses.includes(course._id)) {
        return res.status(400).json({ message: "Course already purchased" });
    }

    user.purchasedCourses.push(course._id);
    await user.save();

    res.json({ message: "Course purchased successfully" });
});

// Get all purchased courses (protected route)
router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');

    res.json({ purchasedCourses: user.purchasedCourses });
});

module.exports = router;
