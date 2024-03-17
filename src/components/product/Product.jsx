import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Typography from '@mui/material/Typography';
import {memo, useContext, useState} from "react";
import {Grid, IconButton, Stack, Toolbar} from "@mui/material";
import useAuthentication from "../../useAuthentication";
import {generatePath, useNavigate} from "react-router-dom";
import {deleteProduct} from "../../common/store/actions/productActions";
import {useDispatch} from "react-redux";
import CustomDialog from "../../common/custom-dialog/CustomDialog";
import {useSnackbar} from "notistack";

const Product = memo(({product}) => {
    const {AuthCtx} = useAuthentication();
    const {user} = useContext(AuthCtx);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar()

    const [showDialog, setShowDialog] = useState(false);

    const onClickDelete = (e) => {
        e.preventDefault();
        setShowDialog(true);
    }

    const closeDialog = (setShow) => {

        if (typeof setShow === 'function') {
            setShow(false);
        }
        setShowDialog(false);
    }

    const onClickOkDialogCallback = (setOpen) => {
        dispatch(deleteProduct(product.id, user.token, () => {
            closeDialog(setOpen);
            enqueueSnackbar(`Product ${product.name} deleted successfully`, {variant: "success"});
        }, () => closeDialog(setOpen)));
    }

    return (

        <>
            {showDialog && <CustomDialog handleConfirm={onClickOkDialogCallback} handleCancel={closeDialog}/>}
            <Card
                sx={{
                    maxWidth: 300,
                    width: 300,
                    height: "390px",
                    flexDirection: "column",
                    display: "flex",
                }}
            >
                <CardMedia
                    component={"img"}
                    alt={product.name}
                    sx={{height: 190}}
                    image={product.imageUrl}
                    title={product.name}
                />
                <CardContent sx={{height: 110, overflowY: "scroll"}}>
                    <Grid justifyContent="center"
                          alignItems="flex-start"
                          container>
                        <Grid item xs={8} paddingRight={1}>
                            <Typography gutterBottom variant="h6" component="div">
                                {product.name}
                            </Typography></Grid>
                        <Grid item xs={4}>
                            <Typography gutterBottom variant="h6" component="div">
                                &#8377; {product.price}
                            </Typography></Grid>
                    </Grid>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {product.description}
                    </Typography>
                </CardContent>
                <Toolbar
                    sx={{
                        justifyContent: "space-between",
                        marginX: "-5%"
                    }}
                >
                    <CardActions style={{padding: 0}}>
                        <Button
                            onClick={() => navigate(generatePath("/products/:id", {id: product.id}))}
                            variant="contained"
                            sx={{
                                backgroundColor: "#3f51b5", "&:hover": {
                                    backgroundColor: "#3f51b5"
                                }
                            }}
                        >
                            Buy
                        </Button>
                    </CardActions>
                    {user.token && user.roles.includes("ADMIN") ?
                        <Stack direction="row" alignItems="center">
                            <IconButton
                                onClick={() => navigate(generatePath("/products/:id/edit", {id: product.id}))}
                                aria-label="edit">
                                <EditIcon/>
                            </IconButton>
                            <IconButton onClick={(e) => onClickDelete(e)} aria-label="delete">
                                <DeleteIcon/>
                            </IconButton>
                        </Stack> : null}
                </Toolbar>
            </Card></>
    )
})

export default Product;