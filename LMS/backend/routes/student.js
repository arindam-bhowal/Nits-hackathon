const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const CryptoJs = require("crypto-js");

const Student = require('../models/Student')
const { generateAccessToken, verify } = require('../verifyToken')


// ----------------------Adding a new company details in database------------

//REGISTER
router.post("/register", async (req, res) => {
    try {
        //generate new password
        const encryptedPassword = CryptoJs.AES.encrypt(
            req.body.Password,
            process.env.SECRETE_MESSAGE
        ).toString();
        req.body.Password = encryptedPassword;

        //create new user
        const newStudent = new Student(req.body);

        //save user and respond
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

        const actualPassword = await CryptoJs.AES.decrypt(user.password, process.env.SECRETE_MESSAGE)
            // const validPassword = await bcrypt.compare(password, user.password)
            (password !== actualPassword) && res.status(400).json("wrong password")

        //Generate an access token
        const accessToken = generateAccessToken(user);
        // const refreshToken = generateRefreshToken(user);

        // refreshTokens.push(refreshToken);

        res.json({
            student_id: user._id,
            accessToken,
        });

    } catch (error) {
        // We will come to the error page later
        res.status(500).json(error);
    }
});


// ----------------------Get all Companies registered from database ----------------

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

// ---------------------Update a company from database-----------------

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

// ----------------------Delete a company from database ----------------

router.delete("/delete/:userId", verify, async (req, res) => {
    if (req.user.id === req.params.userId) {
        await Student.findByIdAndDelete(req.params.userId);
        res.status(200).json("User has been deleted.");
    } else {
        res.status(403).json("You are not allowed to delete this user!");
    }
});

module.exports = router;