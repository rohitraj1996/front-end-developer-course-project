import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navigation from "./common/navigation/Navigation";
import {Box} from "@mui/material";
import SignIn from "./components/sign-in/SignIn";
import SignUp from "./components/sign-up/SignUp";
import {useEffect} from "react";
import Products from "./components/products/Products";
import ProtectedUser from "./common/ProtectedUser";
import {loadCategories, loadProducts} from "./common/store/actions/productActions";
import {useDispatch} from "react-redux";
import Order from "./components/order/Order";
import ProtectedAdmin from "./common/ProtectedAdmin";
import ProductForm from "./components/product-form/ProductForm";
import ProductDetails from "./components/product-details/ProductDetails";

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadProducts());
        dispatch(loadCategories());
    }, [dispatch]);

    return (
        <Box>
            <Router>
                <Navigation/>
                <Box>
                    <Routes>
                        <Route path={"/"} exact element={
                            <ProtectedUser>
                                <Products/>
                            </ProtectedUser>
                        }/>

                        <Route path={"/signin"} element={<SignIn/>}/>
                        <Route path={"/signup"} element={<SignUp/>}/>
                        <Route path={"/products/:id"} element={
                            <ProtectedUser>
                                <ProductDetails/>
                            </ProtectedUser>
                        }/>
                        <Route path={"/products/:id/order"} element={
                            <ProtectedUser>
                                <Order/>
                            </ProtectedUser>
                        }/>
                        <Route path={"/products/:id/edit"} element={
                            <ProtectedAdmin>
                                <ProductForm/>
                            </ProtectedAdmin>
                        }/>
                        <Route path={"/products/add"} element={
                            <ProtectedAdmin>
                                <ProductForm/>
                            </ProtectedAdmin>
                        }/>
                    </Routes>
                </Box>
            </Router>
        </Box>
    );
}

export default App;
