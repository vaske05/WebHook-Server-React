import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap import
import React from 'react';
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "./components/layout/Header";
import Landing from "./components/layout/Landing";
import Register from "./components/userManagement/Register";
import Login from "./components/userManagement/Login";
import store from "./store";
import jwt_decode from 'jwt-decode';
import {SET_CURRENT_USER} from "./actions/types";
import setJwtToken from "./securityUtils/setJwtToken";
import {startLogoutTimer} from "./actions/securityActions";
import SecuredRoute from "./securityUtils/SecureRoute";
import Dashboard from "./components/Dashboard";
import AddWebHook from "./components/webHook/AddWebHook";
import UpdateWebHook from "./components/webHook/UpdateWebHook";
import WebHookInfo from "./components/webHook/WebHookInfo";


/*
 * Set token and start timer logout when page gets reloaded
 */
const token = localStorage.getItem("jwtToken");
if (token) {
    setJwtToken(token);
    const decodedToken = jwt_decode(token);
    store.dispatch({
        type: SET_CURRENT_USER,
        payload: decodedToken
    });
    startLogoutTimer(decodedToken.exp)(store.dispatch);
}

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Header/>

                    { /* Public Routes */}
                    <Route exact path="/" component={Landing}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/login" component={Login}/>

                    { /*Private Routes*/}
                    <Switch>
                        <SecuredRoute exact path="/dashboard" component={Dashboard}/>
                        <SecuredRoute exact path="/addWebHook" component={AddWebHook}/>
                        <SecuredRoute exact path="/updateWebHook/:id" component={UpdateWebHook}/>
                        <SecuredRoute exact path="/webHookInfo/:id" component={WebHookInfo}/>
                    </Switch>

                </div>
            </Router>
        </Provider>
    );
}

export default App;
