const express = require('express');
const Student = require('./models/students');
const Course = require('./models/courses');
require('./db/conn');


const app = express();
const port = process.env.PORT || 8000;

//middleware
app.use(express.json());
app.use((err, req, res, next) => {
    console.log(err.message);
})
// create a new student 
app.get('/', (req, res) => {
    res.send('home page inventory test');
});

// using callbak function
// app.post('/student', (req, res) => {
//     console.log(req.body);
//     const user = new Student(req.body);
//     user.save()
//         .then(res.status(201).send(user))
//     // .catch((err) => {
//     //     res.status(400).send(err);
//     // })

// });


// student collection
try {
    app.post('/student', async (req, res) => {
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    })
} catch (err) {
    res.status(400).send(err);
}
try {
    app.get('/student', async (req, res) => {
        const studentData = await Student.find();
        res.send(studentData);
    })
} catch (err) {
    res.send(err);
}

// single student find
try {
    app.get('/student/:id', async (req, res) => {
        const _id = req.params.id;
        console.log(_id);
        const singleStudentData = await Student.findOne({ _id: _id });
        res.send(singleStudentData);
    })
} catch (err) {
    res.send(err);
}

// course collection 

try {
    app.post('/course', async (req, res, next) => {
        const course = new Course(req.body);
        const insertCourse = await course.save();
        res.status(201).send(insertCourse);
        next();
    })
} catch (err) {
    res.status(400).send(err);
    next();
}
try {
    app.get('/course', async (req, res) => {
        const allCourseInfo = await Course.find();
        res.send(allCourseInfo);
    })
} catch (err) {
    res.send(err);
}

// Default Error Handler
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ "error": err });
}
app.use(errorHandler);

app.listen(port, () => {
    console.log('listen port on 8000')
})