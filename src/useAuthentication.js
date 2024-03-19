import React, {createContext, useEffect, useState} from "react";
import $ from 'jquery';
import {toast} from "react-toastify";

const AuthCtx = createContext();

const useAuthentication = () => {

    const [user, setUser] = useState({});

    useEffect(() => {
        const userStr = localStorage.getItem("user");

        if (userStr) {
            const userObj = JSON.parse(userStr);

            if (userObj?.token) {
                setUser(userObj);
            } else {
                setUser({})
            }
        } else {
            setUser({});
        }
    }, []);

    const parseApiError = (err) => {

        try {
            return JSON.parse(err.responseText)?.error || err.statusText;
        } catch (e) {
            return err.statusText + ". StatusCode: " + err.status;
        }
    }

    const checkForToken = (res) => {
        if (res?.token) {
            return res.token
        }

        toast.error("No 'token' key present in response. Please check if back-end is properly sending response.");
        return null;
    }

    const checkForRoles = (res) => {

        if (res?.roles) {
            return res.roles;
        }

        toast.error("No 'roles' key present in response. Please check if back-end is properly sending response.");
        return null;
    }

    const checkForUserId = (res) => {

        if (res?.id) {
            return res.id;
        } else if (res?.user?.id) {
            return res.user.id;
        }

        toast.error("No 'id' or 'user.id' key present in response. Please check if back-end is properly " +
            "sending response.");
        return null;
    }

    const login = (username, password, successLoginCallback, enqueueSnackbar) => {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/auth/signin",
            data: JSON.stringify({username, password}),
            contentType: "application/json",
            async: false,
            success: (data) => {

                // ***********************************************************************************************
                // As there is problem in back-end, only sending token and not user details like id, roles.
                // Fixing user idd and roles here to fetch and retrieve address for UI to work.
                // Uncomment if back-end is not giving proper response and also change the value as per
                // your data and requirement.

                // data.id = "65ed74ecc5bd2539d2ba66d7";
                // data.roles = ["USER"];

                // ***********************************************************************************************

                const token = checkForToken(data);
                const roles = checkForRoles(data);
                const id = checkForUserId(data);

                if (!token || !roles || !id) {
                    return;
                }

                const user = {
                    ...data,
                    token: token,
                    roles: roles,
                    id: id,
                    error: null
                };

                setUser(user);
                localStorage.setItem("user", JSON.stringify(user));

                if (typeof successLoginCallback === 'function') {
                    successLoginCallback();
                }
            },
            error: err => {
                const message = `Error while login. Message: ${parseApiError(err)}`;

                const user = {
                    token: null,
                    roles: [],
                    error: message
                }
                localStorage.setItem("user", JSON.stringify(user));

                setUser(user)
                if (typeof enqueueSnackbar === 'function') {
                    enqueueSnackbar(message);
                }
            }

        })
    };

    const logOut = () => {
        const user = {
            token: null,
            roles: [],
            error: null
        }
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));

    };
    return {
        AuthCtx,
        AuthProvider: ({children}) => (
            <AuthCtx.Provider value={{user, login, logOut}}>
                {children}
            </AuthCtx.Provider>
        )
    };
};

export default useAuthentication;
