export const addOrder = (product, quantity) => {
    return {
        type: "ADD_ORDER",
        product,
        quantity
    }
}

export const changeQuantity = (quantity) => {
    return {
        type: "CHANGE_QUANTITY",
        quantity: quantity
    }
}

export const deleteOrder = () => {
  return {
      type: "DELETE_ORDER"
  }
}

export const changeOrderStep = (activeStepNumber) => {
  return {
      type: "ACTIVE_STEP_NUMBER",
      activeStepNumber
  }
}

export const setAddress = (address) => {
  return {
      type: "SET_ADDRESS",
      address
  }
}