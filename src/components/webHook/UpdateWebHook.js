import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import {
  createWebHook,
  getCitiesForAirSelect,
  getCountriesForCovidOrAirSelect,
  getRegionsForAirSelect,
  getWebHook
} from "../../actions/webHookActions";
import {connect} from "react-redux";
import Select from "react-select";
import Loader from "../layout/Loader";
import {AIR_DATA, COVID_DATA} from "../../constants";
import WebHookBase from "./WebHookBase";

class UpdateWebHook extends WebHookBase {

  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      type: "",
      url: "",
      country: "",
      city: "",
      region: "",
      isLoaded: false,
      errors: {},
    };
    // binding
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.initializeState = this.initializeState.bind(this);
    this.handleInitialDataLoading = this.handleInitialDataLoading.bind(this);
  }

  async componentDidMount() {
    const {id} = this.props.match.params;
    await this.props.getWebHook(id, this.props.history);
    await this.initializeState();
    await this.handleInitialDataLoading();
  }

  async initializeState() {
    const {
      id,
      name,
      type,
      url,
      country,
      region,
      city
    } = this.props.webHookData.webHook;
    this.setState({id, name, type, url, country, region, city});
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

  onSubmit(e) {
    e.preventDefault(); // turn off reload
    const newWebHook = {
      id: this.state.id,
      name: this.state.name,
      type: this.state.type,
      url: this.state.url,
      country: this.state.country,
      region: this.state.region,
      city: this.state.city
    };
    this.props.createWebHook(newWebHook, this.props.history);
  }

  async handleInitialDataLoading() {
    const {webHook} = this.props.webHookData;
    await this.props.getCountriesForCovidOrAirSelect(webHook.type);
    if (webHook.type === AIR_DATA) {
      await this.props.getRegionsForAirSelect(webHook.country);
      await this.props.getCitiesForAirSelect(webHook.country, webHook.region);
    }
    this.setState({isLoaded: true});
  }

  render() {
    const {errors} = this.state;
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
                <h5 className="secondary-header display-4">
                  Update Web Hook
                </h5>
                <hr/>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <h6>Select Web Hook type:</h6>
                    <Select className={classnames("", {
                      "is-invalid border-input-red": errors.type,
                    })} options={whTypes} name="type" onChange={this.onChangeWhTypeSelect}
                            value={whTypes.filter(type => this.state.type === type.value)}/>
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
                      })} options={citiesForSelect} name="city"
                              value={citiesForSelect.filter(c => this.state.city === c.value)}
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

UpdateWebHook.propTypes = {
  createWebHook: PropTypes.func.isRequired,
  getWebHook: PropTypes.func.isRequired,
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
  getWebHook,
  getCountriesForCovidOrAirSelect,
  getRegionsForAirSelect,
  getCitiesForAirSelect
})(UpdateWebHook);
