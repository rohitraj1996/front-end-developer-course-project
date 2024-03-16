import {AppBar, Box, Button, IconButton, Stack, Toolbar, Typography} from "@mui/material";
import {ShoppingCart} from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import StyledInputBase from "../search-bar/StyledInputBase";
import SearchIconWrapper from "../search-bar/SearchIconWrapper";
import Search from "../search-bar/Search";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useRef} from "react";
import useAuthentication from "../../useAuthentication";
import {deleteOrder} from "../store/actions/orderActions";
import {useDispatch} from "react-redux";


const Navigation = () => {
    const searchInput = useRef("");

    const {AuthCtx} = useAuthentication();
    const {user, logOut} = useContext(AuthCtx);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (

        <AppBar position={"sticky"} sx={{backgroundColor: "#3f51b5"}}>
            <Toolbar>
                <IconButton edge="start" color="inherit" size={"small"} sx={{mr: 1}}>
                    <ShoppingCart/>
                </IconButton>
                <Typography variant={"body1"} sx={{flexGrow: 1}}>upGrad E-Shop</Typography>
                <Box sx={{width: "30%"}}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon></SearchIcon>
                        </SearchIconWrapper>
                        <StyledInputBase
                            type="string"
                            placeholder="Search…"
                            inputProps={{'aria-label': 'search'}}
                            ref={searchInput}
                        />
                    </Search>
                </Box>
                <Box sx={{flexGrow: 1}}/>
                <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                    <Stack sx={{minWidth: "15%", display: "block", textAlign: "end"}}
                           direction="row"
                           alignItems="start" spacing={4}>
                        <Link to={"/"} className={"react-router-dom-link"}>Home</Link>
                        {user?.roles?.includes("ADMIN") ?
                            <Link to={"/products/add"} className={"react-router-dom-link"}>Add Product</Link> : null}
                        {!user?.token ? <><Link to={"/signin"} className={"react-router-dom-link"}>Login</Link>
                            <Link to={"/signup"} className={"react-router-dom-link"}>Sign Up</Link></> : null}
                        {user?.token ? <Button variant="contained" color="error" onClick={event => {
                            event.preventDefault();
                            dispatch(deleteOrder());
                            logOut();
                            navigate("/");
                        }}>
                            LOGOUT
                        </Button> : null}
                    </Stack>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navigation;