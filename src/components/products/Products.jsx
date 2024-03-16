import {Box, Container, InputLabel, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {memo, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {setFilter} from "../../common/store/actions/productActions";
import Select from "react-select";
import Product from "../product/Product";
import {useParams} from "react-router";
import ProductDetails from "../product-details/ProductDetails";

const Products = memo(() => {

    const dispatch = useDispatch();
    const {id} = useParams();
    const {products, errorWhileLoadingProducts, categories, errorWhileLoadingCategories, filter} = useSelector(
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
            {id? <ProductDetails id={id}/> : <>
                <Box sx={{marginX: 8, marginY: 1, maxWidth: "18rem"}}>
                <InputLabel sx={{fontFamily: "inherit", fontWeight: "500"}}>Sort By:</InputLabel>
                <Select options={options}
                        value={sort}
                        onChange={setSort}/>
            </Box>
                <Container>
                    <Box
                        style={{
                            display: "flex",
                            width: "100%",
                            flexWrap: "wrap",
                            gap: 100,
                            justifyContent: "space-evenly",
                            paddingTop: "2rem",
                        }}
                    >
                        {getSortedProducts().filter(product => filter.toUpperCase() === 'ALL' ? true : filter.toUpperCase() === product.category.toUpperCase())
                            .map(product => {
                                return <Product key={product.id} product={product}/>;
                            })}

                    </Box>
                </Container>
            </>}
        </>
    );
});

export default Products;