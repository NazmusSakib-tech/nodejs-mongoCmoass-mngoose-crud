const express = require('express');
const Student = require('./models/students');
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
// app.post('/student', (req, res) => {
//     console.log(req.body);
//     const user = new Student(req.body);
//     user.save()
//         .then(res.status(201).send(user))
//     // .catch((err) => {
//     //     res.status(400).send(err);
//     // })

// });

try {
    app.post('/student', async (req, res) => {
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    })
} catch (err) {
    res.status(400).send(err);
}



app.listen(port, '192.168.68.129', () => {
    console.log('listen port on 8000')
})