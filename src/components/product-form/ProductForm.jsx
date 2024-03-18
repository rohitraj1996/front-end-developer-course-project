import {useParams} from "react-router";
import {useContext, useEffect, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {Box, Button, Container, FormControl, Grid, TextField, Typography} from "@mui/material";
import CreatableSelect from "react-select/creatable";
import {addProduct, editProduct, loadCategories} from "../../common/store/actions/productActions";
import useAuthentication from "../../useAuthentication";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const FORM_INITIAL_STATE = {
    id: null,
    category: null,
    name: "",
    manufacturer: "",
    availableItems: "",
    price: "",
    imageUrl: "",
    description: "",
};

const FORM_VALIDATION_INITIAL_STATE = {
    name: false,
    manufacturer: false,
    availableItems: false,
    price: false
};

const ProductForm = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {AuthCtx} = useAuthentication();
    const {user} = useContext(AuthCtx);

    const [product, setProduct] = useState({...FORM_INITIAL_STATE});
    const [formValidation, setFormValidation] = useState({...FORM_VALIDATION_INITIAL_STATE})
    const [categoriesOptions, setCategoriesOptions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const {products, categories} = useSelector(
        state => state.products, shallowEqual
    );

    useEffect(() => {

        if (id && products && products?.length > 0) {
            const tempProducts = products.filter(product => product?.id === id);

            if (tempProducts.length > 0) {

                const tempProduct = tempProducts[0]
                setProduct(tempProduct);
                setSelectedCategory({
                    label: tempProduct.category.charAt(0).toUpperCase() + tempProduct.category.slice(1).toLowerCase(),
                    value: tempProduct.category
                });
            }
        } else {
            setProduct({...FORM_INITIAL_STATE});
            setSelectedCategory(null);
        }

    }, [id, products]);

    useEffect(() => {

        if (categories && categories.length > 0) {
            const formedCategoryOptions = categories
                .filter(category => category.toUpperCase() !== 'ALL')
                .map(category => {
                    return {label: category.charAt(0).toUpperCase() + category.slice(1).toLowerCase(), value: category};
                })

            setCategoriesOptions(formedCategoryOptions);
        }

    }, [categories]);

    const handleOnChangeForTextField = (event) => {

        event.preventDefault();
        const {name, value} = event.target;
        setProduct({
            ...product,
            [name]: value
        });

        if (formValidation.hasOwnProperty(name)) {
            setFormValidation({
                ...formValidation,
                [name]: !value
            })
        }
    }

    const successOnSubmitCallback = (product) => {
        toast.success(`Product ${product.name} ${id ? "modified" : "added"} successfully`);

        setProduct({...FORM_INITIAL_STATE});
        setSelectedCategory(null);
        setFormValidation({...FORM_VALIDATION_INITIAL_STATE});

        dispatch(loadCategories());

        if (id) {
            navigate("/");
        }
    }

    const errorOnSubmitCallback = (errMsg) => {
        toast.error(`Error while modifying product, ${errMsg}`);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        let isValid = true;
        const tempFormValidation = {};

        Object.entries(product).forEach(([k, v]) => {

            if (formValidation.hasOwnProperty(k)) {
                if (!v) {
                    tempFormValidation[k] = true;
                    isValid = false;
                }
            }
        });

        if (selectedCategory == null) {
            isValid = false;
            toast.error("Category is mandatory");
        }

        if (!isValid) {
            setFormValidation({...formValidation, ...tempFormValidation});
            return;
        }

        if (id) {
            dispatch(editProduct(product, user.token, () => successOnSubmitCallback({...product}, e),
                errorOnSubmitCallback));
        } else {
            dispatch(addProduct(product, user.token, () => successOnSubmitCallback({...product}, e),
                errorOnSubmitCallback));
        }
    }

    return (
        <>
            <Grid
                sx={{marginTop: "3%"}}
                justifyContent="center"
                alignItems="flex-start"
                container
                spacing={2}
            >
                <Typography component="h1" variant="h5">
                    {!id ? "Add" : "Modify"} Product
                </Typography>
            </Grid>
            <Container component="main" maxWidth="xs">
                <Box
                    component="form"
                    onSubmit={() => {
                    }}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        value={product.name}
                        label="Name"
                        name="name"
                        placeholder="Product Name"
                        onChange={handleOnChangeForTextField}
                        error={formValidation.name}
                        helperText={formValidation.name && "Mandatory field."}
                        sx={{marginBottom: "0px"}}
                    />
                    <FormControl sx={{minWidth: "100%", marginTop: "16px", zIndex: 2}}>
                        <CreatableSelect options={categoriesOptions}
                                         value={selectedCategory}
                                         onChange={selected => {
                                             setSelectedCategory(selected);
                                             setProduct({...product, category: selected.value});
                                         }}/>
                    </FormControl>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="manufacturer"
                        label="Manufacturer"
                        value={product.manufacturer}
                        name="manufacturer"
                        onChange={handleOnChangeForTextField}
                        error={formValidation.manufacturer}
                        helperText={formValidation.manufacturer && "Mandatory field."}
                        sx={{marginBottom: "0px"}}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="availableItems"
                        label="Available Items"
                        value={product.availableItems}
                        type="items"
                        id="availableItems"
                        onChange={handleOnChangeForTextField}
                        error={formValidation.availableItems}
                        helperText={formValidation.availableItems && "Mandatory field."}
                        sx={{marginBottom: "0px"}}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="price"
                        label="Price"
                        value={product.price}
                        name="price"
                        onChange={handleOnChangeForTextField}
                        sx={{marginBottom: "0px"}}
                        error={formValidation.price}
                        helperText={formValidation.price && "Mandatory field."}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="imageUrl"
                        label="Image URL"
                        value={product.imageUrl}
                        id="imageUrl"
                        onChange={handleOnChangeForTextField}
                        sx={{marginBottom: "0px"}}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="description"
                        value={product.description}
                        label="Product Description"
                        id="description"
                        onChange={handleOnChangeForTextField}
                        sx={{marginBottom: "0px"}}
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
                        onClick={onSubmit}
                    >
                        {!id ? "Save" : "Modify"} Product
                    </Button>
                </Box>
            </Container>
        </>
    )
}

export default ProductForm;