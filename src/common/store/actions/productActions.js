import axios from "axios";

export const loadProducts = () => dispatch => {

    axios.get("http://localhost:8080/api/products").then(response => {
        if (response?.data?.length > 0) {
            dispatch({
                type: "LOAD_PRODUCTS",
                products: [...response.data],
                errorWhileLoadingProducts: null
            })
        } else {
            dispatch({
                type: "LOAD_PRODUCTS",
                products: [],
                errorWhileLoadingProducts: null
            })
        }
    }).catch(e => {
        let message;
        if (e.response) {
            message = `Error while fetching products. Status: ${e.status}, message: ${e.data}`;
        } else {
            message = `Error while fetching products. Message: ${e.message ? e.message : e}`;
        }

        dispatch({
            type: "LOAD_PRODUCTS",
            products: [],
            errorWhileLoadingProducts: message
        })
    });
};

export const addProduct = (product) => {
    return {
        type: "ADD_PRODUCT",
        product
    }
}

export const editProduct = product => {
    return {
        type: "EDIT_PRODUCT",
        product
    }
}

export const deleteProduct = (id) => {
    return {
        type: "DELETE_PRODUCT",
        id
    }
}

export const loadCategories = () => dispatch => {

    axios.get("http://localhost:8080/api/products/categories").then(response => {
        if (response?.data?.length > 0) {
            dispatch({
                type: "LOAD_CATEGORIES",
                categories: [...response.data],
                errorWhileLoadingCategories: null
            })
        } else {
            dispatch({
                type: "LOAD_CATEGORIES",
                categories: [],
                errorWhileLoadingCategories: null
            })
        }
    }).catch(e => {
        let message;
        if (e.response) {
            message = `Error while fetching categories. Status: ${e.status}, message: ${e.data}`;
        } else {
            message = `Error while fetching categories. Message: ${e.message ? e.message : e}`;
        }

        dispatch({
            type: "LOAD_CATEGORIES",
            categories: [],
            errorWhileLoadingCategories: message
        })
    });
};

export const setFilter = category => {
    return {
        type: "SET_FILTER",
        filter: category
    };
};
