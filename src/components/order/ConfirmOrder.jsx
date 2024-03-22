import {Box, Button, Divider, Grid, Typography} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {useContext, useEffect} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {changeOrderStep, deleteOrder} from "../../common/store/actions/orderActions";
import useAuthentication from "../../useAuthentication";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {setFilter} from "../../common/store/actions/productActions";
import {toast} from "react-toastify";

const ConfirmOrder = ({setActiveStep}) => {

    const {AuthCtx} = useAuthentication();
    const {user} = useContext(AuthCtx);
    const navigate = useNavigate();
    const {product, quantity, totalOrder, address} = useSelector(
        state => state.order, shallowEqual
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (!product) {
            dispatch(changeOrderStep(1))
        }
    }, [product]);

    const onClickPlaceOrder = (e) => {
        e.preventDefault();

        const userId = user.id ? user.id : "65ed74ecc5bd2539d2ba66d7";
        const payload = {
            user: userId,
            product: product?.id,
            address: address?.value?.id,
            quantity: quantity
        }

        const headers = {
            'Content-Type': 'application/json',
            'x-auth-token': `${user.token}`
        }


        axios.post("/api/orders", payload, {headers: headers})
            .then(response => {
                dispatch(setFilter("ALL"));
                dispatch(deleteOrder());
                toast.success("Order placed successfully")
                navigate("/");
            })
            .catch(e => {
                toast.error("Error while placing order")
            })
    }


    return (
        <Box>
            <Card
                variant="outlined"
                sx={{
                    marginTop: "8px",
                    minWidth: 275,
                }}
            >
                <CardContent sx={{paddingBottom: "0px !important"}}>
                    <Grid
                        sx={{marginLeft: "0.5%"}}
                        alignItems="flex-start"
                        container
                        spacing={2}
                    >
                        <Grid justifyContent="flex-start" item xs={7} maxWidth={"100% !important"}
                              sx={{paddingBottom: "75px"}}>
                            <Grid
                                justifyContent="flex-start"
                                alignItems="flex-start"
                                container
                                spacing={2}
                            >
                                <Grid item xs={12}>
                                    <h1>{product?.name} </h1>
                                </Grid>
                                <Grid item xs={12} sx={{paddingTop: "0px !important"}}>
                                    Quantity: <b>{quantity}</b>
                                </Grid>
                                <Grid item xs={12}>
                                    Category: <b>{product?.category}</b>
                                </Grid>
                                <Grid
                                    sx={{
                                        overflowWrap: "break-word",
                                        overflowY: "clip",
                                        maxHeight: "200px",
                                    }}
                                    item
                                    xs={12}
                                >
                                    {product?.description}
                                </Grid>
                                <Grid item xs={12} style={{color: "red"}}>
                                    <Typography variant={"h6"} sx={{fontWeight: 600}}>
                                        Total Price : &#8377; {totalOrder}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider orientation="vertical" flexItem/>
                        <Grid item xs={4}>
                            <Grid
                                alignItems="flex-start"
                                container
                                spacing={1}
                            >
                                <Grid item xs={12}>
                                    <h1>Address Details : </h1>
                                </Grid>
                                <Grid item xs={12} sx={{paddingTop: "0px !important"}}>
                                    {address?.value?.name}
                                </Grid>
                                <Grid item xs={12} sx={{paddingTop: "2px !important"}}>
                                    Contact Number: {address?.value?.contactNumber}
                                </Grid>
                                <Grid item xs={12} sx={{paddingTop: "2px !important"}}>
                                    {address?.value?.street}
                                    {", "} {address?.value?.city}
                                </Grid>
                                <Grid item xs={12} sx={{paddingTop: "2px !important"}}>
                                    {address?.value?.state}
                                </Grid>
                                <Grid item xs={12} sx={{paddingTop: "2px !important"}}>
                                    {address?.value?.zipcode}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Grid
                sx={{padding: 0.6, marginTop: "2px"}}
                justifyContent="center"
                alignItems="flex-start"
                container
                spacing={2}
            >
                <Button onClick={() => setActiveStep(1)} variant="text" sx={{color: "#3f51b5"}}>
                    <b>BACK</b>
                </Button>
                <Button onClick={onClickPlaceOrder} variant="contained" type="submit" sx={{
                    backgroundColor: "#3f51b5", "&:hover": {
                        backgroundColor: "#3f51b5"
                    }
                }}>
                    Place Order
                </Button>
            </Grid>
        </Box>
    )
}

export default ConfirmOrder;