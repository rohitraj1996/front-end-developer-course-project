import React, {createContext, useEffect, useState} from "react";
import $ from 'jquery';

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

    const login = (username, password, successLoginCallback, enqueueSnackbar) => {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/auth/signin",
            data: JSON.stringify({username, password}),
            contentType: "application/json",
            async: false,
            success: (data) => {

                const roles = data.roles && data.roles.length > 0 ? data.roles : ["ADMIN"];

                const user = {
                    token: data.token,
                    roles: roles,
                    error: null
                }

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
