import {ThemeProvider} from "@mui/material/styles";
import {Avatar, Box, Button, Container, createTheme, Grid, Link, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {pink} from "@mui/material/colors";
import Copyright from "../../common/copyright/Copyright";
import {useContext, useState} from "react";
import useAuthentication from "../../useAuthentication";
import {useNavigate} from "react-router-dom";
import {useSnackbar} from "notistack";

const defaultTheme = createTheme();

const SignIn = () => {

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const {AuthCtx} = useAuthentication();
    const {login} = useContext(AuthCtx);
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar()

    const enqueueSnackBarCallBack = (error) => {
        const key = enqueueSnackbar(error, {variant: "error"})
        console.log(key);
    }

    const successLoginCallback = () => {
        navigate("/");
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!email) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }

        if (!password) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }

        if (emailError || passwordError) {
            return;
        }

        login(email, password, successLoginCallback, enqueueSnackBarCallBack);
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
                    <Avatar sx={{m: 1, bgcolor: pink[500]}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={event => {
                                setEmail(event.target.value)
                                if (event.target.value && emailError) {
                                    setEmailError(false);
                                } else if (!event.target.value) {
                                    setEmailError(true);
                                }
                            }}
                            error={emailError}
                            helperText={emailError ? "Please enter value" : ""}

                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={event => {
                                setPassword(event.target.value)
                                if (event.target.value && passwordError) {
                                    setPasswordError(false);
                                } else if (!event.target.value) {
                                    setPasswordError(true);
                                }
                            }}
                            error={passwordError}
                            helperText={passwordError ? "Please enter value" : ""}
                        />
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
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/signup" variant="body2" sx={{color: "#3f51b5"}}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 8, mb: 4}}/>
            </Container>
        </ThemeProvider>
    );
}

export default SignIn;