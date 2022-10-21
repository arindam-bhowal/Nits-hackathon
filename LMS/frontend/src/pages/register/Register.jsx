import React, { useState } from "react";
import './register.scss'
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios'


const Register = () => {
    const navigate = useNavigate()
    //   const classes = useStyles();
    //   const auth= useSelector((state) => state.auth);
    //   const dispatch = useDispatch();
    const [creds, setCreds] = useState({
        name: "",
        email: "",
        password: "",
        rollNo: "",
        courseName: "",
        deptName: "",
        phoneNumber: "",
        semester: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios
            .post(`${process.env.REACT_APP_HOST}/student/register`, {
                name: creds.name,
                email: creds.email,
                password: creds.password,
                rollNo: creds.rollNo,
                courseName: creds.courseName,
                deptName: creds.deptName,
                phoneNumber: creds.phoneNumber,
                semester: creds.semester,
            })
            .catch((err) => {
                alert('Registration Failed');
                navigate('0');
            });
        // navigate('/login');
    };

    //   if (auth._id) return <Redirect to="/" />;

    return (
        <div className="register">
            <form
                noValidate
                autoComplete="off"
                className="formStyle"
                onSubmit={handleSubmit}
            >

                <Typography variant="h5">Sign Up;</Typography>
                <TextField
                    className="spacing"
                    label="Enter Name"
                    variant="outlined"
                    fullWidth
                    value={creds.name}
                    onChange={(e) => setCreds({ ...creds, name: e.target.value })}
                />
                <TextField
                    className="spacing"
                    label="Enter Email"
                    variant="outlined"
                    fullWidth
                    value={creds.email}
                    onChange={(e) => setCreds({ ...creds, email: e.target.value })}
                />
                <TextField
                    className="spacing"
                    label="Enter RollNo"
                    variant="outlined"
                    fullWidth
                    value={creds.rollNo}
                    onChange={(e) => setCreds({ ...creds, rollNo: e.target.value })}
                />
                <TextField
                    className="spacing"
                    label="Enter Course Name"
                    variant="outlined"
                    fullWidth
                    value={creds.courseName}
                    onChange={(e) => setCreds({ ...creds, courseName: e.target.value })}
                />
                <TextField
                    className="spacing"
                    label="Enter Department Name"
                    variant="outlined"
                    fullWidth
                    value={creds.deptName}
                    onChange={(e) => setCreds({ ...creds, deptName: e.target.value })}
                />
                <TextField
                    className="spacing"
                    label="Enter Phone Number"
                    variant="outlined"
                    fullWidth
                    value={creds.phoneNumber}
                    onChange={(e) => setCreds({ ...creds, phoneNumber: e.target.value })}
                />
                <TextField
                    className="spacing"
                    label="Semester"
                    variant="outlined"
                    fullWidth
                    value={creds.semester}
                    onChange={(e) => setCreds({ ...creds, semester: e.target.value })}
                />
                <TextField
                    className="spacing"
                    type="password"
                    label="Enter Password"
                    variant="outlined"
                    fullWidth
                    value={creds.password}
                    onChange={(e) => setCreds({ ...creds, password: e.target.value })}
                />
                <Button
                    variant="contained"
                    color="primary"
                    className="spacing"
                    type="submit"
                >
                    Sign Up
                </Button>
            </form>
        </div>
    );
};

export default Register;
