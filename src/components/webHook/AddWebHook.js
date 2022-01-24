import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
  createWebHook,
  getCitiesForAirSelect,
  getCountriesForCovidOrAirSelect,
  getRegionsForAirSelect
} from "../../actions/webHookActions";
import classnames from "classnames";
import Select from 'react-select';
import Loader from "../layout/Loader";
import {AIR_DATA, COVID_DATA} from "../../constants";

class AddWebHook extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      type: COVID_DATA,
      url: "",
      country: "",
      city: "",
      region: "",
      isLoaded: false,
      errors: {}
    };
    // binding
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleInitialLoading = this.handleInitialLoading.bind(this);
    this.onChangeWhTypeSelect = this.onChangeWhTypeSelect.bind(this);
    this.onChangeCountrySelect = this.onChangeCountrySelect.bind(this);
    this.onChangeRegionSelect = this.onChangeRegionSelect.bind(this);
    this.onChangeCitySelect = this.onChangeCitySelect.bind(this);
  }

  //life cycle hooks
  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
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

  onSubmit(e) {
    e.preventDefault(); // turn off reload
    const newWebHook = {
      name: this.state.name,
      type: this.state.type,
      url: this.state.url,
      country: this.state.country,
      region: this.state.region,
      city: this.state.city
    };
    this.props.createWebHook(newWebHook, this.props.history);
  }

  async componentDidMount() {
    // setTimeout(this.handleLoading, 100);
    await this.handleInitialLoading();
  }

  async handleInitialLoading() {
    await this.props.getCountriesForCovidOrAirSelect(this.state.type);
    const firstCountry = this.props.webHookData.countriesForSelect.at(0).value;
    this.setState({isLoaded: true, country: firstCountry});
    if (this.state.type === AIR_DATA) {
      await this.props.getRegionsForAirSelect(firstCountry);
      await this.props.getCitiesForAirSelect(firstCountry, this.props.webHookData.regionsForSelect.at(0).value);
      this.setState({
        isLoaded: true,
        region: this.props.webHookData.regionsForSelect.at(0).value,
        city: this.props.webHookData.citiesForSelect.at(0).value
      });
    }
  }

  render() {
    const {errors} = this.state; // mapping "this.state.errors" to "errors" constant
    const whTypes = [
      {value: COVID_DATA, label: COVID_DATA, name: "type"},
      {value: AIR_DATA, label: AIR_DATA, name: "type"}
    ];
    const {countriesForSelect} = this.props.webHookData;
    const {regionsForSelect} = this.props.webHookData;
    const {citiesForSelect} = this.props.webHookData;

    return (
        <div className="web_hook">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">
                  Create/Edit Web Hook
                </h5>
                <hr/>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <h6>Select Web Hook type:</h6>
                    <Select id="countrySelect" className={classnames("", {
                      "is-invalid border-input-red": errors.type,
                    })} options={whTypes} name="type" defaultValue={whTypes.at(0)}
                            onChange={this.onChangeWhTypeSelect}/>
                    {errors.type && (
                        <div className="invalid-feedback">{errors.type}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                        type="text"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.name,
                        })}
                        placeholder="Web Hook Name"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                    />
                    {errors.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                        type="text"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.url,
                        })}
                        placeholder="Target url"
                        name="url"
                        value={this.state.url}
                        onChange={this.onChange}
                    />
                    {errors.url && (
                        <div className="invalid-feedback">
                          {errors.url}
                        </div>
                    )}
                  </div>

                  {
                    this.state.type === COVID_DATA ? (this.state.isLoaded ? (<div className="form-group">
                      {/*COVID SELECT INPUT*/}
                      <h6>Select country:</h6>
                      <Select className={classnames("", {
                        "is-invalid border-input-red": errors.country,
                      })} options={countriesForSelect} name="country"
                              value={countriesForSelect.filter(c => this.state.country === c.value)}
                              onChange={this.onChangeCountrySelect}/>
                      {errors.country && (
                          <div className="invalid-feedback">{errors.country}</div>
                      )}
                    </div>) : (<Loader/>)) : (this.state.isLoaded ? (<div className="form-group">
                      {/*AIR SELECT INPUTS*/}
                      <h6>Select country:</h6>
                      <Select className={classnames("", {
                        "is-invalid border-input-red": errors.type,
                      })} options={countriesForSelect} name="country"
                              value={countriesForSelect.filter(c => this.state.country === c.value)}
                              onChange={this.onChangeCountrySelect}/>
                      {errors.country && (
                          <div className="invalid-feedback">{errors.country}</div>
                      )}
                      <h6>Select region:</h6>
                      <Select className={classnames("", {
                        "is-invalid border-input-red": errors.type,
                      })} options={regionsForSelect} name="region"
                              value={regionsForSelect.filter(r => this.state.region === r.value)}
                              onChange={this.onChangeRegionSelect}/>
                      {errors.country && (
                          <div className="invalid-feedback">{errors.country}</div>
                      )}
                      <h6>Select city:</h6>
                      <Select className={classnames("", {
                        "is-invalid border-input-red": errors.type,
                      })} options={citiesForSelect} name="city" defaultValue={citiesForSelect.at(0)}
                              onChange={this.onChangeCitySelect}/>
                      {errors.city && (
                          <div className="invalid-feedback">{errors.city}</div>
                      )}
                    </div>) : (<Loader/>))
                  }

                  <input
                      type="submit"
                      className="btn btn-success btn-block mt-4"
                      value="Submit"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

AddWebHook.propTypes = {
  createWebHook: PropTypes.func.isRequired,
  getCountriesForCovidOrAirSelect: PropTypes.func.isRequired,
  getRegionsForAirSelect: PropTypes.func.isRequired,
  getCitiesForAirSelect: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  webHook: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  webHookData: state.webHookData
});

//Connect React component to a Redux store.
export default connect(mapStateToProps, {
  createWebHook,
  getCountriesForCovidOrAirSelect,
  getRegionsForAirSelect,
  getCitiesForAirSelect
})(AddWebHook);
