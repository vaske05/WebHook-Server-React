import {combineReducers} from "redux";
import errorsReducer from "./errorsReducer";
import securityReducer from "./securityReducer";
import webHookReducer from "./webHookReducer";

export default combineReducers ({
    errors: errorsReducer,
    security: securityReducer,
    webHook: webHookReducer
});