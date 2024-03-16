import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Typography from '@mui/material/Typography';
import {memo, useContext} from "react";
import {Box, Grid, IconButton, Stack, Toolbar} from "@mui/material";
import useAuthentication from "../../useAuthentication";
import {generatePath, useNavigate} from "react-router-dom";

const Product = memo(({product}) => {
    const {AuthCtx} = useAuthentication();
    const {user} = useContext(AuthCtx);
    const navigate = useNavigate();


    return (
        <Card
            sx={{
                width: "18rem",
                height: "24",
                flexDirection: "column",
                display: "flex",
            }}
        >
            <CardMedia
                component={"img"}
                alt={product.name}
                sx={{height: 250}}
                image={product.imageUrl}
                title={product.name}
            />
            <CardContent>
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
                    style={{height: "9rem", overflow: "hidden"}}
                >
                    {product.description}
                </Typography>
            </CardContent>
            <Box style={{"flexGrow": "1"}}/>
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
                        sx={{backgroundColor: "#3f51b5"}}
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
                        <IconButton onClick={(e) => console.log("Delete clicked " + e)} aria-label="delete">
                            <DeleteIcon/>
                        </IconButton>
                    </Stack> : null}
            </Toolbar>
        </Card>
    )
})

export default Product;