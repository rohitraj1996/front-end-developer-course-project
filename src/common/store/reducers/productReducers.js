const initState = {
    products: [],
    errorWhileLoadingProducts: null,
    categories: ["ALL"],
    errorWhileLoadingCategories: null,
    filter: "ALL",
    searchKeyword: null
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
            return {
                ...state,
                products: [...state.products, action.product]
            };
        }

        case "EDIT_PRODUCT": {
            return {
                ...state,
                products: state.products.map(p => {
                    if (p.id === action.product.id) {
                        return {
                            ...p,
                            ...action.product
                        };
                    } else {
                        return p
                    }
                })
            };
        }

        case "DELETE_PRODUCT": {
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.id)
            };
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

        case "SET_SEARCH": {
            return {
                ...state,
                searchKeyword: action.searchKeyword
            }
        }

        default: {
            return state;
        }
    }
}