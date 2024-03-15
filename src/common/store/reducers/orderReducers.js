const initState = {
    product: null,
    address: null,
    quantity: 0,
    totalOrder: 0,
    activeStepNumber: 1
}

export default function (state = initState, action) {

    switch (action.type) {
        case "ADD_ORDER": {

            let totalOrder = 0;
            if (action?.product?.price && action.quantity > 0) {
                totalOrder = action.product.price * action.quantity;
            }

            return {
                ...state,
                product: action.product,
                quantity: action.quantity,
                totalOrder
            };
        }

        case "CHANGE_QUANTITY": {
            return {
                ...state,
                quantity: action.quantity
            }
        }

        case "DELETE_ORDER": {
            return {
                product: null,
                address: null,
                quantity: 0,
                totalOrder: 0,
                activeStepNumber: 1
            }
        }

        case "ACTIVE_STEP_NUMBER": {
            return {
                ...state,
                activeStepNumber: action.activeStepNumber
            }
        }

        case "SET_ADDRESS": {
            return {
                ...state,
                address: action.address
            }
        }

        default: {
            return state;
        }
    }
};