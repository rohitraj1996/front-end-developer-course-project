import {Box, Container, Grid, InputLabel, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {memo, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {setFilter} from "../../common/store/actions/productActions";
import Select from "react-select";
import Product from "../product/Product";

const Products = memo(() => {

    const dispatch = useDispatch();

    const {
        products,
        categories,
        filter,
        searchKeyword
    } = useSelector(
        state => state.products, shallowEqual
    );
    const [sort, setSort] = useState([]);
    const options = [
        {value: 'default', label: 'Default'},
        {value: 'price-high-to-low', label: 'Price: High to Low'},
        {value: 'price-low-to-high', label: 'Price: Low to High'},
        {value: 'newest', label: 'Newest'}
    ]

    const getSortedProducts = () => {

        const sortValue = sort.value;
        const productsToSort = [...products];

        if (sortValue === options[1].value) {
            productsToSort.sort((p1, p2) => p2.price - p1.price);
        } else if (sortValue === options[2].value) {
            productsToSort.sort((p1, p2) => p1.price - p2.price);
        } else if (sortValue === options[3].value) {
            productsToSort.sort((p1, p2) => p1.id > p2.id ? -1 : p2.id > p1.id ? 1 : 0);
        }

        if (searchKeyword) {
            return productsToSort.filter(p => p.name?.toLowerCase().includes(searchKeyword))
        }

        return productsToSort;
    }

    return (
        <>
            <Box sx={{
                minWidth: "max-content",
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <ToggleButtonGroup
                    value={filter ? filter.toUpperCase() : "ALL"}
                    exclusive
                    onChange={(e) => dispatch(setFilter(e.target.value))}
                    aria-label="category"
                >
                    {categories.map((category, index) => {
                        return (
                            <ToggleButton
                                value={category}
                                key={index}
                                selected={category === filter}
                            >
                                {category}
                            </ToggleButton>
                        );
                    })}
                </ToggleButtonGroup>
            </Box>
            <Box sx={{marginX: 8, marginY: 1, maxWidth: "18rem"}}>
                <InputLabel sx={{fontFamily: "inherit", fontWeight: "500"}}>Sort By:</InputLabel>
                <Select options={options}
                        value={sort}
                        onChange={setSort}/>
            </Box>
            <Container maxWidth="xl">
                <Grid container spacing={4}
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-around"}
                      sx={{width: "100%", marginLeft: "0px", marginTop: "-10px"}}
                >
                    {getSortedProducts().filter(product => filter.toUpperCase() === 'ALL' ? true : filter.toUpperCase() === product.category.toUpperCase())
                        .map(product => {
                            return (
                                <Grid sx={{display: "flex", justifyContent: "center", paddingLeft: "0px !important"}}
                                      key={product.id} item xs={12} sm={6} md={4} xl={3}>
                                    <Product product={product}/>
                                </Grid>
                            );
                        })}

                </Grid>
            </Container>
        </>
    );
});

export default Products;