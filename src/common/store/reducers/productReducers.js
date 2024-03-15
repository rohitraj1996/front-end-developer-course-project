const initState = {
    products: [],
    errorWhileLoadingProducts: null,
    categories: ["ALL"],
    errorWhileLoadingCategories: null,
    filter: "ALL"
}

export default function (state = initState, action) {

    switch (action.type) {

        case "LOAD_PRODUCTS": {
            return {
                ...state,
                products: [...action.products],
                errorWhileLoadingProducts: action.errorWhileLoadingProducts
            }
        }

        case "ADD_PRODUCT": {
            state.products.push(action.products);
            return state;
        }

        case "EDIT_PRODUCT": {
            state.products[action.product.id] = action.product;
            return state;
        }

        case "DELETE_PRODUCT": {
            state.products.filter(product => product.id !== action.id);
            return state;
        }

        case "LOAD_CATEGORIES": {
            return {
                ...state,
                categories: ["ALL", ...action.categories],
                errorWhileLoadingCategories: action.errorWhileLoadingCategories
            }
        }

        case "SET_FILTER": {
            return {
                ...state,
                filter: action.filter
            }
        }

        default: {
            return state;
        }
    }
}