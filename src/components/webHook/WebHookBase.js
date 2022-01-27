import React, {Component} from 'react';
import {AIR_DATA, COVID_DATA} from "../../constants";

class WebHookBase extends Component {

  constructor(props) {
    super(props);
    this.onChangeWhTypeSelect = this.onChangeWhTypeSelect.bind(this);
    this.onChangeCountrySelect = this.onChangeCountrySelect.bind(this);
    this.onChangeRegionSelect = this.onChangeRegionSelect.bind(this);
    this.onChangeCitySelect = this.onChangeCitySelect.bind(this);
  }

  async onChangeWhTypeSelect(e) {
    this.setState({isLoaded: false});
    const newWhType = e.value;
    if (e.value === AIR_DATA) {
      await this.props.getCountriesForCovidOrAirSelect(newWhType);
      await this.props.getRegionsForAirSelect(this.props.webHookData.countriesForSelect.at(0).value);
      await this.props.getCitiesForAirSelect(this.props.webHookData.countriesForSelect.at(0).value, this.props.webHookData.regionsForSelect.at(0).value);
      this.setState({
        country: this.props.webHookData.countriesForSelect.at(0).value,
        region: this.props.webHookData.regionsForSelect.at(0).value,
        city: this.props.webHookData.citiesForSelect.at(0).value
      });
    } else if (e.value === COVID_DATA) {
      await this.props.getCountriesForCovidOrAirSelect(newWhType);
      this.setState({
        country: this.props.webHookData.countriesForSelect.at(0).value,
        region: "",
        city: ""
      });
    }
    this.setState({[e.name]: e.value, isLoaded: true});
  }

  async onChangeCountrySelect(e) {
    const newCountry = e.value;
    this.setState({isLoaded: false})
    if (this.state.type === AIR_DATA) {
      await this.props.getRegionsForAirSelect(newCountry);
      await this.props.getCitiesForAirSelect(newCountry, this.props.webHookData.regionsForSelect.at(0).value);
      this.setState({
        country: newCountry,
        region: this.props.webHookData.regionsForSelect.at(0).value,
        city: this.props.webHookData.citiesForSelect.length > 0 ? this.props.webHookData.citiesForSelect.at(0).value : ""
      });
    }
    this.setState({[e.name]: e.value, isLoaded: true});
  }

  async onChangeRegionSelect(e) {
    const newRegion = e.value;
    this.setState({isLoaded: false})
    if (this.state.type === AIR_DATA) {
      await this.props.getCitiesForAirSelect(this.state.country, newRegion);
      this.setState({
        region: newRegion,
        city: this.props.webHookData.citiesForSelect.length > 0 ? this.props.webHookData.citiesForSelect.at(0).value : ""
      });
    }
    this.setState({[e.name]: e.value, isLoaded: true});
  }

  async onChangeCitySelect(e) {
    this.setState({[e.name]: e.value});
  }
}

export default WebHookBase;