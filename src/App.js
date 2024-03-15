import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navigation from "./common/navigation/Navigation";
import {Box, IconButton} from "@mui/material";
import SignIn from "./components/sign-in/SignIn";
import SignUp from "./components/sign-up/SignUp";
import useAuthentication from "./useAuthentication";
import {useContext, useEffect} from "react";
import Products from "./components/products/Products";
import ProtectedUser from "./common/ProtectedUser";
import {loadCategories, loadProducts} from "./common/store/actions/productActions";
import {useDispatch} from "react-redux";
import Order from "./components/order/Order";
import {closeSnackbar, SnackbarProvider} from "notistack";
import ClearIcon from "@mui/icons-material/Clear";

function App() {
    const {AuthCtx} = useAuthentication();
    const {user} = useContext(AuthCtx);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadProducts());
        dispatch(loadCategories());
    }, []);

    return (
        <Box>
            <Router>
                <Navigation/>
                <Box>
                    <SnackbarProvider hideIconVariant
                                      anchorOrigin={{vertical: "top", horizontal: "right"}}
                                      action={(snackBarId) => {
                                          return <IconButton onClick={() => {
                                              closeSnackbar(snackBarId)
                                          }}>
                                              <ClearIcon sx={{color: "#fff", fontSize: "medium"}}/>
                                          </IconButton>
                                      }}>
                        <Routes>
                            <Route path={"/"} exact element={
                                <ProtectedUser roles={user.roles} token={user.token}>
                                    <Products/>
                                </ProtectedUser>
                            }/>

                            <Route path={"/signin"} element={<SignIn/>}/>
                            <Route path={"/signup"} element={<SignUp/>}/>
                            <Route path={"/products/:id"} element={
                                <ProtectedUser roles={user.roles} token={user.token}>
                                    <Products/>
                                </ProtectedUser>
                            }/>
                            <Route path={"/products/:id/order"} element={
                                <ProtectedUser roles={user.roles} token={user.token}>
                                    <Order/>
                                </ProtectedUser>
                            }/>
                        </Routes>
                    </SnackbarProvider>
                </Box>
            </Router>
        </Box>
    );
}

export default App;
