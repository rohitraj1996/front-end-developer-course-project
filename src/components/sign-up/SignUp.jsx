import {ThemeProvider} from "@mui/material/styles";
import {Avatar, Box, Button, Container, createTheme, Grid, Link, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "../../common/copyright/Copyright";
import {pink} from "@mui/material/colors";
import {useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const defaultTheme = createTheme();

const SignUp = () => {

    const navigate = useNavigate();

    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [contact, setContact] = useState("");

    const [isFNameValid, setIsFNameValid] = useState(true);
    const [isLNameValid, setIsLNameValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isCPasswordValid, setIsCPasswordValid] = useState(true);
    const [isContactNumberValid, setIsContactNumberValid] = useState(true);
    const [cPasswordErrorMessage, setCPasswordErrorMessage] = useState("");

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validateForm = (event, key) => {

        if (key === "FIRST_NAME") {
            setFName(event.target.value);

            if (event.target.value) {
                setIsFNameValid(true);
            } else {
                setIsFNameValid(false);
            }
        } else if (key === "LAST_NAME") {
            setLName(event.target.value);

            if (event.target.value) {
                setIsLNameValid(true);
            } else {
                setIsLNameValid(false);
            }
        } else if (key === "EMAIL") {
            setEmail(event.target.value);

            if (event.target.value && validateEmail(event.target.value)) {
                setIsEmailValid(true);
            } else {
                setIsEmailValid(false);
            }
        } else if (key === "PASSWORD") {
            setPassword(event.target.value);

            if (event.target.value) {
                if (event.target.value) {
                    setIsPasswordValid(true);
                }
                if (cPassword) {
                    if (event.target.value === cPassword) {
                        setIsCPasswordValid(true);
                        setCPasswordErrorMessage("");
                    } else {
                        setIsCPasswordValid(false);
                        setCPasswordErrorMessage("Password / Confirm Password does not match.");
                    }
                }
            } else {
                setIsPasswordValid(false);
            }
        } else if (key === "C_PASSWORD") {
            setCPassword(event.target.value);

            if (event.target.value) {
                if (password === event.target.value) {
                    setIsCPasswordValid(true);
                    setCPasswordErrorMessage("");
                } else {
                    setIsCPasswordValid(false);
                    setCPasswordErrorMessage("Password / Confirm Password does not match.")
                }
            } else {
                setIsCPasswordValid(false);
                setCPasswordErrorMessage("Please enter value")
            }
        } else if (key === "CONTACT") {
            setContact(event.target.value);

            if (event.target.value) {
                setIsContactNumberValid(true);
            } else {
                setIsContactNumberValid(false);
            }
        } else {
            if (fName) {
                setIsFNameValid(true);
            } else {
                setIsFNameValid(false);
            }

            if (lName) {
                setIsLNameValid(true);
            } else {
                setIsLNameValid(false);
            }

            if (email) {
                setIsEmailValid(true);
            } else {
                setIsEmailValid(false);
            }

            if (password) {
                setIsPasswordValid(true);
            } else {
                setIsPasswordValid(false);
            }

            if (cPassword) {
                setIsCPasswordValid(true);
            } else {
                setIsCPasswordValid(false);
                setCPasswordErrorMessage("Please enter value")
            }

            if (contact) {
                setIsContactNumberValid(true);
            } else {
                setIsContactNumberValid(false);
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        validateForm(null, null);

        if (!isFNameValid || !isLNameValid || !isEmailValid || !isPasswordValid || !isCPasswordValid || !isContactNumberValid) {
            return;
        }

        axios.post("/api/auth/signup", {
            email,
            password,
            firstName: fName,
            lastName: lName,
            contactNumber: contact
        }).then(response => {
            if (response.status === 200) {
                navigate("/");

                if (response.data?.message) {
                    toast.success(response.data?.message);
                } else {
                    toast.success("Registered successfully.");
                }
            } else {
                throw new Error("Unable to signup. Status: " + response.status);
            }
        }).catch(err => {
            let message = "Error while sign-up.";

            if (err.response) {
                message = `${message} Status: ${err.response.status}, Message: ${err.response.data?.error}`;
            } else {
                message = `${message} Error: ${err.message}`;
            }

            toast.error(message);
        });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, backgroundColor: pink[500]}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={fName}
                                    error={!isFNameValid}
                                    helperText={!isFNameValid ? "Please enter value" : ""}
                                    onChange={(event => {
                                        validateForm(event, "FIRST_NAME")
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    value={lName}
                                    error={!isLNameValid}
                                    helperText={!isLNameValid ? "Please enter value" : ""}
                                    onChange={(event => {
                                        validateForm(event, "LAST_NAME")
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type={"email"}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    error={!isEmailValid}
                                    helperText={!isEmailValid ? "Please enter valid email" : ""}
                                    onChange={(event => {
                                        validateForm(event, "EMAIL")
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={password}
                                    error={!isPasswordValid}
                                    helperText={!isPasswordValid ? "Please enter value" : ""}
                                    onChange={(event => {
                                        validateForm(event, "PASSWORD")
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="new-password"
                                    value={cPassword}
                                    error={!isCPasswordValid}
                                    helperText={!isCPasswordValid ? cPasswordErrorMessage : ""}
                                    onChange={(event => {
                                        validateForm(event, "C_PASSWORD")
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="contactNumber"
                                    label="Contact Number"
                                    type="number"
                                    id="contactNumber"
                                    autoComplete="mobile"
                                    value={contact}
                                    error={!isContactNumberValid}
                                    helperText={!isContactNumberValid ? "Please enter value" : ""}
                                    sx={{
                                        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                            display: "none",
                                        },
                                        "& input[type=number]": {
                                            MozAppearance: "textfield",
                                        }
                                    }}
                                    onChange={(event => {
                                        validateForm(event, "CONTACT")
                                    })}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3, mb: 2, backgroundColor: "#3f51b5", "&:hover": {
                                    backgroundColor: "#3f51b5"
                                }
                            }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/signin" variant="body2" sx={{color: "#3f51b5"}}>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 5}}/>
            </Container>
        </ThemeProvider>
    );
}

export default SignUp;