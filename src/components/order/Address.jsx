import {Box, Button, Container, FormControl, Grid, InputLabel, TextField, Typography} from "@mui/material";
import Select from "react-select";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import useAuthentication from "../../useAuthentication";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {setAddress} from "../../common/store/actions/orderActions";
import {toast} from "react-toastify";

const Address = ({setActiveStep}) => {

    const {address} = useSelector(
        state => state.order, shallowEqual
    );

    const {AuthCtx} = useAuthentication();
    const {user} = useContext(AuthCtx);
    const navigate = useNavigate();
    const [options, setOptions] = useState([]);
    const dispatch = useDispatch();

    const fetchAddress = () => {
        const userId = user.id;

        axios.get("/api/addresses", {
            headers: {
                'Content-Type': 'application/json',
                "x-auth-token": `${user.token}`
            }
        })
            .then(response => {
                const userAddresses = response?.data?.filter(address => address.user === userId);
                if (userAddresses?.length > 0) {
                    const selectOptions = userAddresses.map(add => {
                        return {value: add, label: `${add.name}--->${add.street}, ${add.city}`}
                    });

                    setOptions(selectOptions);
                }
            }).catch(() => setOptions([]))
    }

    useEffect(() => {
        fetchAddress();
    }, []);

    const saveAddressOnSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const payload = {
            user: user.id,
            name: data.get("name"),
            contactNumber: data.get("contact_number"),
            city: data.get("city"),
            landmark: data.get("landmark"),
            street: data.get("street"),
            state: data.get("state"),
            zipcode: data.get("zipcode"),
        };

        const headers = {
            'Content-Type': 'application/json',
            'x-auth-token': `${user.token}`
        }

        axios.post("/api/addresses", payload, {headers: headers})
            .then(() => {
                fetchAddress();
                toast.success("Address saved successfully.");
            })
            .catch(err => {
                let message = "Error while saving address.";

                if (err.response) {
                    message = `${message} Status: ${err.response.status}, Message: ${err.response.data?.error}`;
                } else {
                    message = `${message} Error: ${err.message}`;
                }
                toast.error(message)
            })

        event.currentTarget.reset();
    }

    const nextOnClick = () => {

        if (!address) {
            toast.error("Please select address!");
            return;
        }
        setActiveStep(2);
    }

    return (
        <>
            <Grid
                sx={{paddingX: "1%"}}
                justifyContent="center"
                alignItems="flex-start"
                container
                spacing={2}
            >
                <Grid item xs={8.5}>
                    <Box sx={{marginX: 8, marginY: 2}}>
                        <InputLabel sx={{fontFamily: "inherit", fontWeight: "500"}}>Select Address</InputLabel>
                        <FormControl sx={{minWidth: "100%", zIndex: 2}}>
                            <Select options={options}
                                    value={address}
                                    defaultValue={address}
                                    onChange={(selectedOption) => dispatch(setAddress(selectedOption))}/>
                        </FormControl>
                    </Box>
                </Grid>
            </Grid>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography variant={"body2"} sx={{marginBottom: 2, fontWeight: 600}}>
                        -OR-
                    </Typography>
                    <Typography variant="h6">
                        Add Address
                    </Typography>
                    <Box component="form" onSubmit={saveAddressOnSubmit} sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                        />
                        <TextField
                            type={"number"}
                            margin="normal"
                            required
                            fullWidth
                            name="contact_number"
                            label="Contact Number"
                            id="contact_number"
                            autoComplete="contact"
                            sx={{
                                marginTop: "0.55rem",
                                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                    display: "none",
                                },
                                "& input[type=number]": {
                                    MozAppearance: "textfield",
                                }
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="street"
                            label="Street"
                            name="street"
                            autoComplete="street"
                            sx={{marginTop: "0.55rem"}}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="city"
                            label="City"
                            id="city"
                            autoComplete="city"
                            sx={{marginTop: "0.55rem"}}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="state"
                            label="State"
                            name="state"
                            autoComplete="state"
                            sx={{marginTop: "0.55rem"}}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="landmark"
                            label="Landmark"
                            id="landmark"
                            autoComplete="landmark"
                            sx={{marginTop: "0.55rem"}}
                        />
                        <TextField
                            type={"number"}
                            margin="normal"
                            required
                            fullWidth
                            name="zipcode"
                            label="Zip Code"
                            id="zipcode"
                            autoComplete="zipcode"
                            sx={{
                                marginTop: "0.55rem",
                                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                    display: "none",
                                },
                                "& input[type=number]": {
                                    MozAppearance: "textfield",
                                }
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3, mb: 2, backgroundColor: "#3f51b5", marginTop: "0.90rem", "&:hover": {
                                    backgroundColor: "#3f51b5"
                                }
                            }}
                        >
                            Save Address
                        </Button>
                    </Box>
                </Box>
            </Container>
            <Grid
                sx={{padding: "1.8%"}}
                justifyContent="center"
                alignItems="flex-start"
                container
                spacing={2}
            >
                <Button onClick={() => {
                    navigate(-1)
                }} variant="text">
                    Back
                </Button>
                <Button
                    onClick={nextOnClick}
                    variant="contained"
                    sx={{
                        backgroundColor: "#3f51b5", "&:hover": {
                            backgroundColor: "#3f51b5"
                        }
                    }}
                >
                    Next
                </Button>
            </Grid>
        </>
    )
}

export default Address;