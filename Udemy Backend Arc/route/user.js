const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db")


// User Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.username;

    try{
        const creation = await User.create({
            username,
            password
        })
        res.json({
            msg: "User Created Successfully"
        })
    }
    catch(err){
        res.status(500).json({
            msg: "User NOT Created"
        });
    }

});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const courseAvail = await Course.find({});

    res.json({
        course: courseAvail
    })
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
    const madePurchase = await User.updateOne({
        username: username
    }, {
        $push: {
            purchasedCourses: courseId
        }
    })
    res.json({
        msg: "Purchase was made successfully"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    });

    const coursePur = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    })
    res.json({
        courses: coursePur
    })
});

module.exports = router;