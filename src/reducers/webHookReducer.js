import {
    DELETE_WEBHOOK,
    GET_AIR_SELECT_CITY,
    GET_AIR_SELECT_REGION,
    GET_COVID_OR_AIR_SELECT_COUNTRIES,
    GET_WEBHOOK,
    GET_WEBHOOKS
} from "../actions/types";

const initialState = {
    webHooks: [],
    webHook: {},
    countriesForSelect: []
}

export default function webHookReducer(state = initialState, action) {
    switch (action.type) {
        case GET_WEBHOOKS:
            return { // returning an object
                ...state,
                webHooks: action.payload
            };
        case GET_WEBHOOK:
            return {
                ...state,
                webHook: action.payload
            };
        case DELETE_WEBHOOK:
            return {
                ...state,
                webHooks: state.webHooks.filter(webHook => webHook.id !== action.payload)
            };
        case GET_COVID_OR_AIR_SELECT_COUNTRIES:
            return {
                ...state,
                countriesForSelect: action.payload
            };
        case GET_AIR_SELECT_REGION:
            return {
                ...state,
                regionsForSelect: action.payload
            };
        case GET_AIR_SELECT_CITY:
            return {
                ...state,
                citiesForSelect: action.payload
            };
        default:
            return state;
    }
}