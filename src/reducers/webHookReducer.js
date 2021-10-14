import {DELETE_WEBHOOK, GET_WEBHOOK, GET_WEBHOOKS} from "../actions/types";

const initialState = {
  webHooks: [],
  webHook: {}
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
        webHooks: state.webHooks.filter(webHook => webHook.webHookIdentifier !== action.payload)
      };
    default:
      return state;
  }
}