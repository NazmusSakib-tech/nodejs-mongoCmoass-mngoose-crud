const mongoose = require("mongoose");
const validator = require("validator");

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },

    code: {
        type: String,
        required: true,
        unique: [true, 'course Code duplicate'],
        // validate(value) {
        //     if (!validator.isEmail(value)) {
        //         throw new Error("Invalid Email")
        //     }
        // }
    }

})

//we will create a new collection

const Course = new mongoose.model('Course', courseSchema);

module.exports = Course;