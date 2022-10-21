import React, { useState } from "react";
import './login.scss'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



const Login = () => {
    //   const auth= useSelector((state) => state.auth);
    //   const dispatch = useDispatch();
    const [creds, setCreds] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await axios.post(`${process.env.REACT_APP_HOST}/student/login`, {
            email: creds.email,
            password: creds.password,
        })
            .catch((err) => {
                alert('Login Failed');
                // navigate('0');
            });
        localStorage.setItem('Student', JSON.stringify(user.data))
        //     dispatch(signIn(creds.email, creds.password));
        //     setCreds({ email: "", password: "" });
    };

    //   if (auth._id) return <Redirect to="/" />;

    return (
        <div className="login">
            <form
                noValidate
                autoComplete="off"
                className="formStyle"
                onSubmit={handleSubmit}
            >
                <Typography variant="h5">signIn;</Typography>
                <TextField
                    className="spacing"
                    id="enter-email"
                    label="enterEmail"
                    variant="outlined"
                    fullWidth
                    value={creds.email}
                    onChange={(e) => setCreds({ ...creds, email: e.target.value })}
                />
                <TextField
                    className="spacing"
                    id="enter-password"
                    type="password"
                    label="enterPassword"
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
                    SignIn
                </Button>
            </form>
        </div>
    );
};

export default Login;
