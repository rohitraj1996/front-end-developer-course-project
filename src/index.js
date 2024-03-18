import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import useAuthentication from "./useAuthentication";
import {Provider} from "react-redux";
import store, {persistor} from "./common/store";
import {PersistGate} from "redux-persist/integration/react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function ConnectedApp() {
    const {AuthProvider} = useAuthentication();
    return (
        <Provider store={store}>
            <ToastContainer icon={false} autoClose={5000} position={"top-right"} theme={"colored"}/>
            <PersistGate persistor={persistor} loading={null}>
                <AuthProvider>
                    <App/>
                </AuthProvider>
            </PersistGate>
        </Provider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ConnectedApp/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
