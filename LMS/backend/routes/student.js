const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
// const CryptoJs = require("crypto-js");
const bcrypt = require("bcrypt");

const Student = require('../models/Student')
const { generateAccessToken, verify } = require('../verifyToken')


// ----------------------Adding a new Student details in database------------

//REGISTER
router.post("/register", async (req, res) => {
    try {
        //generate new password
        // const encryptedPassword = CryptoJs.AES.encrypt(
        //     req.body.Password,
        //     process.env.SECRETE_MESSAGE
        // ).toString();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        req.body.password = hashedPassword;

        const newStudent = new Student(req.body);
        await newStudent.save();

        res.status(200).json(newStudent);
    } catch (err) {
        res.status(500).json(err)
    }
});


// ----------------------Login----------------------

// let refreshTokens = [];

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Student.findOne({ email: email });
        !user && res.status(404).json("user not found");

        const validPassword = await bcrypt.compare(password, user.password)
        !validPassword && res.status(400).json("wrong password")

        const accessToken = generateAccessToken(user);

        res.json({
            student_id: user._id,
            accessToken
        });

    } catch (error) {
        // We will come to the error page later
        res.status(500).json(error);
    }
});


// ----------------------Get all Students registered from database ----------------

router.get("/all", async (req, res) => {
    try {
        const allStudents = await Student.find();
        const reqDataAllStudents = [];
        allStudents.map((e) => {
            const { password, ...otherInfo } = e._doc;
            reqDataAllStudents.push(otherInfo);
        });
        res.status(200).json(reqDataAllStudents);
    } catch (error) {
        // We will come to the error page later
        res.status(500).json(error);
    }
});

// ----------------------Get a Students registered from database ----------------

router.get("/get/:userId", verify, async (req, res) => {
    try {
        if (req.user.id === req.params.userId) {
            const reqStudent = await Student.findById(req.params.userId);
            const { password, ...otherInfo } = reqStudent._doc;
            res.status(200).json(otherInfo);
        } else {
            res.status(403).json("You are not allowed to access this site!");
        }
    } catch (error) {
        // We will come to the error page later
        res.status(500).json(error);
    }
});

// ---------------------Update a Student from database-----------------

router.put("/update/:userId", verify, async (req, res) => {
    if (req.user.id === req.params.userId) {
        // await Company.findByIdAndDelete(req.params.userId);
        // res.status(200).json("User has been deleted.");

        if (req.body.Password) {
            const encryptedPassword = CryptoJs.AES.encrypt(
                req.body.Password,
                process.env.SECRETE_MESSAGE
            ).toString();
            req.body.Password = encryptedPassword;
        }
        try {
            const updatedUser = await Student.findByIdAndUpdate(
                req.params.userId,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json(error)
        }

    } else {
        res.status(403).json("You are not allowed to delete this user!");
    }
});

// ----------------------Delete a Student from database ----------------

router.delete("/delete/:userId", verify, async (req, res) => {
    if (req.user.id === req.params.userId) {
        await Student.findByIdAndDelete(req.params.userId);
        res.status(200).json("User has been deleted.");
    } else {
        res.status(403).json("You are not allowed to delete this user!");
    }
});

module.exports = router;