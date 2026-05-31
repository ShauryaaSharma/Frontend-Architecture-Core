const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course, User } = require("../db")
const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    Admin.create({
        username,
        password
    })
    .then(function() {
        res.json({
            msg: 'Admin Created Successfully'
        })
    })
    .catch(function() {
        res.json({
            msg: 'Admin NOT Created'    
        })
    })

});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    try{
        const newCourse = await Course.create({
            title,
            description, 
            price, 
            imageLink
        })
        res.json({
            msg: 'Course added successfully',
            courseId: newCourse._id
        });
    }  
    catch (err) {
        res.status(500).json({
            message: 'Course NOT added'
        });
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({});

    res.json({
        course: response
    })
});

module.exports = router;