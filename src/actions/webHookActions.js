import axios from "axios";
import {
  DELETE_WEBHOOK,
  GET_AIR_SELECT_CITY,
  GET_AIR_SELECT_REGION,
  GET_COVID_OR_AIR_SELECT_COUNTRIES,
  GET_ERRORS,
  GET_WEBHOOK,
  GET_WEBHOOKS
} from "./types";
import {AIR_DATA, COVID_DATA} from "../constants";

//Endpoint urls
const CREATE_WEBHOOK_PATH = "/api/v1/wh/create";
const GET_WEBHOOKS_PATH = "/api/v1/wh/all";
const DELETE_WEBHOOK_PATH = "/api/v1/wh/delete";
const GET_WEBHOOK_PATH = "/api/v1/wh/get";

const GET_AIR_SELECT_COUNTRIES_PATH = "/api/v1/wh/getAirSelectCountries";
const GET_AIR_SELECT_REGIONS_PATH = "/api/v1/wh/getAirSelectRegions";
const GET_AIR_SELECT_CITIES_PATH = "/api/v1/wh/getAirSelectCities";

const GET_COVID_SELECT_COUNTRIES_PATH = "/api/v1/wh/getCovidSelectCountries";


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
export const getWebHook = (webHookId, history) => async dispatch => {

  try {
    const res = await axios.get(GET_WEBHOOK_PATH + `/${webHookId}`);
    dispatch({
      type: GET_WEBHOOK,
      payload: res.data
    });

  } catch (error) {
    console.log(error);
    history.push("/dashboard");
  }
}

/*
* Http GET request to get all available countries for COVID or AIR data
*/
export const getCountriesForCovidOrAirSelect = (whType) => async dispatch => {

  try {
    let res;
    if (whType === COVID_DATA) {
      res = await axios.get(GET_COVID_SELECT_COUNTRIES_PATH);
    } else if (whType === AIR_DATA) {
      res = await axios.get(GET_AIR_SELECT_COUNTRIES_PATH);
    }
    let countries = res.data.countries;

    const countriesForSelect = [];
    countries.forEach(country => {
      let element = {
        value: "",
        label: "",
        name: "country"
      };
      element.value = country;
      element.label = country;
      countriesForSelect.push(element);

    });
    dispatch({
      type: GET_COVID_OR_AIR_SELECT_COUNTRIES,
      payload: countriesForSelect
    });

  } catch (error) {
    console.log(error);
  }
};

/*
* Http GET request to get all available regions for AIR data
*/
export const getRegionsForAirSelect = (selectedCountry) => async dispatch => {

  try {
    let res = await axios.get(GET_AIR_SELECT_REGIONS_PATH, {params: {country: selectedCountry}});
    let regions = res.data.regions;
    const regionsForSelect = [];
    regions.forEach(region => {
      let element = {
        value: "",
        label: "",
        name: "region"
      };
      element.value = region;
      element.label = region;
      regionsForSelect.push(element);
    });
    dispatch({
      type: GET_AIR_SELECT_REGION,
      payload: regionsForSelect
    });
  } catch (error) {
    console.log(error);
  }
};

/*
* Http GET request to get all available cities for AIR select
*/
export const getCitiesForAirSelect = (selectedCountry, selectedRegion) => async dispatch => {

  try {
    let res = await axios.get(GET_AIR_SELECT_CITIES_PATH, {params: {country: selectedCountry, region: selectedRegion}});
    let cities = res.data.cities;
    const citiesForSelect = [];
    cities.forEach(city => {
      let element = {
        value: "",
        label: "",
        name: "city"
      };
      element.value = city;
      element.label = city;
      citiesForSelect.push(element);

    });
    dispatch({
      type: GET_AIR_SELECT_CITY,
      payload: citiesForSelect
    });
  } catch (error) {
    console.log(error);
  }
};