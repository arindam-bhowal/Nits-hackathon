

const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type:String, required: true, unique: true},
    password: {type: String, required: true},
    profilePic: String,
    rollNo : {type: String, required: true, unique: true},
    courseName : {type: String, required: true},
    deptName: {type: String, required: true},
    address: {type: String},
    phoneNumber: {type: Number, required: true},
    semester : {type: Number, required: true},
    // assignments: Array,
    // examinations : Array,
    // attendence : Array,
    personal_details: Array
})

module.exports = mongoose.model('Students', studentSchema)