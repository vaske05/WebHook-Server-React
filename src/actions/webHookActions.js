import axios from "axios";
import {DELETE_WEBHOOK, GET_ERRORS, GET_WEBHOOK, GET_WEBHOOKS} from "./types";

//Endpoint urls
const CREATE_WEBHOOK_PATH = "/api/v1/wh/create";
const GET_WEBHOOKS_PATH = "/api/v1/wh/all";
const DELETE_WEBHOOK_PATH = "/api/v1/wh/delete";
const GET_WEBHOOK_PATH = "/api/v1/wh/get";

/*
* Http Post request to create new WebHook
*/
export const createWebHook = (webHook, history) => async dispatch => {

  try {
    await axios.post(CREATE_WEBHOOK_PATH, webHook);
    history.push("/dashboard");
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });

  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

/*
* Http Post request to get all WebHooks from DB
*/
export const gelAllWebHooks = () => async dispatch => {
  const res = await axios.get(GET_WEBHOOKS_PATH);
  dispatch({
    type: GET_WEBHOOKS,
    payload: res.data
  });

};

/*
* Http Delete request to delete WebHook
*/
export const deleteWebHook = webHook => async dispatch => {
  if ((window.confirm(`Are you sure to delete web hook ${webHook.name}`))) {
    await axios.delete(DELETE_WEBHOOK_PATH + `/${webHook.id}`);
    dispatch({
      type: DELETE_WEBHOOK,
      payload: webHook.id
    });
  }

};

/*
* Http Get request to grab WebHook
*/
export const getWebHook = (web_hook_id, history) => async dispatch => {

  try {
    const res = await axios.get(GET_WEBHOOK_PATH + `/${web_hook_id}`);
    dispatch({
      type: GET_WEBHOOK,
      payload: res.data
    });

  } catch (error) {
    history.push("/dashboard");
  }
}