import { combineReducers } from "redux";
import productReducers from "./productReducers";
import orderReducers from "./orderReducers";

export default combineReducers({
  products: productReducers,
  order: orderReducers
});
