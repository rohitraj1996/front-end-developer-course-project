import {Box, Button, Container, Grid, InputLabel, TextField, Typography} from "@mui/material";
import Select from "react-select";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import useAuthentication from "../../useAuthentication";
import {useSnackbar} from "notistack";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {setAddress} from "../../common/store/actions/orderActions";

const Address = ({setActiveStep}) => {

    const {address} = useSelector(
        state => state.order, shallowEqual
    );

    const {AuthCtx} = useAuthentication();
    const {user} = useContext(AuthCtx);
    const navigate = useNavigate();
    const [options, setOptions] = useState([]);
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch();

    const fetchAddress = () => {
        const userId = user.id ? user.id : "65ed74ecc5bd2539d2ba66d7";

        axios.get("http://localhost:8080/api/addresses", { headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            }})
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
            user: user.id ? user.id : "65ed74ecc5bd2539d2ba66d7",
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
            'Authorization': `Bearer ${user.token}`
        }

        axios.post("http://localhost:8080/api/addresses", payload, {headers: headers})
            .then(data => {
                fetchAddress();
            })
            .catch(err => {enqueueSnackbar("Error while saving address.", {variant: "error"})})

        event.currentTarget.reset();
    }

    const nextOnClick = () => {

        if (!address) {
            enqueueSnackbar("Please select address!", {variant: "error"});
            return;
        }
        setActiveStep(2);
    }

    return (
        <>
            <Grid
                sx={{padding: "1%"}}
                justifyContent="center"
                alignItems="flex-start"
                container
                spacing={2}
            >
                <Grid item xs={6}>
                    <Box sx={{marginX: 8, marginY: 2}}>
                        <InputLabel sx={{fontFamily: "inherit", fontWeight: "500"}}>Select Address</InputLabel>
                        <Select options={options}
                                value={address}
                                defaultValue={address}
                                onChange={(selectedOption) => dispatch(setAddress(selectedOption))}/>
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
                    <Typography component="h1" variant="h5">
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
                            margin="normal"
                            required
                            fullWidth
                            name="contact_number"
                            label="Contact Number"
                            id="contact_number"
                            autoComplete="contact_number"
                            sx={{marginTop: "0.55rem"}}
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
                            margin="normal"
                            required
                            fullWidth
                            name="zipcode"
                            label="Zip Code"
                            id="zipcode"
                            autoComplete="zipcode"
                            sx={{marginTop: "0.55rem"}}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2, backgroundColor: "#3f51b5", marginTop: "0.90rem"}}
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
                    sx={{backgroundColor: "#3f51b5"}}
                >
                    Next
                </Button>
            </Grid>
        </>
    )
}

export default Address;