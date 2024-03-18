import {Button, Chip, Grid, TextField} from "@mui/material";
import {memo, useEffect, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {addOrder, changeOrderStep, changeQuantity} from "../../common/store/actions/orderActions";
import {generatePath, useNavigate} from "react-router-dom";
import {useParams} from "react-router";
import {toast} from 'react-toastify';

const ProductDetails = memo(() => {

    const {id} = useParams();
    const [product, setProduct] = useState();
    const {quantity} = useSelector(state => state.order);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const {products} = useSelector(
        state => state.products, shallowEqual
    );

    useEffect(() => {
        const pd = products.filter(p => p.id === id)?.[0];
        setProduct(pd);
    }, [id, products]);

    const onQuantityChange = (e) => {
        e.preventDefault();

        const {value} = e.target;

        if (product.availableItems < value) {
            toast.error("Selected Order Quantity greater than Available Items.");
            return;
        }
        dispatch(changeQuantity(value));
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (!quantity) {
            toast.error("Quantity is required");
            return;
        }

        dispatch(addOrder(product, quantity));
        dispatch(changeOrderStep(1));
        navigate(generatePath("/products/:id/order", {id}));
    }

    return (
        (product && <Grid
            sx={{margin: "2%"}}
            justifyContent="center"
            alignItems="flex-start"
            container
            spacing={2}
        >

        <Grid item xs={3} sx={{padding: 5}}>
                <img
                    style={{maxWidth: "-webkit-fill-available", borderRadius: "5%"}}
                    src={product.imageUrl}
                    alt={product.name}
                />
            </Grid>
            <Grid item xs={7}>
                <Grid
                    justifyContent="center"
                    alignItems="flex-start"
                    container
                    spacing={2}
                >
                    <Grid item xs={8}>
                        <Grid
                            justifyContent="flex-start"
                            alignItems="center"
                            container
                            spacing={2}
                        >
                            <Grid item xs={4}>
                                <h1>{product.name} </h1>
                            </Grid>
                            <Grid item xs={4}>
                                <Chip
                                    label={"Available Items: " + product.availableItems}
                                    color={"primary"}
                                    sx={{backgroundColor: "#3f51b5"}}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={8} sx={{paddingTop: "0px !important"}}>
                        <Grid
                            justifyContent="flex-start"
                            alignItems="center"
                            container
                            spacing={2}
                        >
                            <Grid item xs={2}>
                                Category:
                            </Grid>
                            <Grid item xs={4}>
                                <h4>{product.category}</h4>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        sx={{
                            overflowWrap: "break-word",
                            overflowY: "clip",
                            maxHeight: "200px",
                        }}
                        item
                        xs={8}
                    >
                        {product.description}
                    </Grid>
                    <Grid item xs={8} sx={{color: "red"}}>
                        &#8377; {(quantity ? quantity : 1) * product.price}
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="quantity"
                            label="Enter Quantity"
                            id="quantity"
                            value={quantity}
                            onChange={onQuantityChange}
                            autoComplete="quantity"
                            sx={{maxWidth: "60%"}}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={onSubmit}
                            sx={{
                                maxWidth: "30%", backgroundColor: "#3f51b5", "&:hover": {
                                    backgroundColor: "#3f51b5"
                                }
                            }}
                        >
                            Place Order
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>)
    )
})

export default ProductDetails;