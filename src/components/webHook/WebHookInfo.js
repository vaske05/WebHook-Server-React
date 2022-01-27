import React, {Component} from "react";
import PropTypes from "prop-types";
import {createWebHook, getWebHook} from "../../actions/webHookActions";
import {connect} from "react-redux";
import {AIR_DATA} from "../../constants";
import Loader from "../layout/Loader";

class WebHookInfo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: "",
      name: "",
      type: "",
      url: "",
      country: "",
      region: "",
      city: "",
      isLoaded: false
    };
    this.handleLoading = this.handleLoading.bind(this);
  }

  componentDidMount() {
    setTimeout(this.handleLoading, 400);
  }

  async handleLoading() {
    const {id} = this.props.match.params;
    await this.props.getWebHook(id, this.props.history);
    this.setState({isLoaded: true});
  }

//life cycle hooks
  componentWillReceiveProps(nextProps, nextContext) {
    const {
      id,
      name,
      type,
      url,
      country,
      region,
      city
    } = nextProps.webHook;
    this.setState({id, name, type, url, country, region, city});
  }

  render() {

    return (
        <div className="web_hook">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">
                  Web Hook info
                </h5>
                <hr/>
                {
                  this.state.isLoaded ? <form>
                    <div className="form-group">
                      <h6 className="width70px">Type:</h6>
                      <input
                          disabled={true}
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Web Hook Name"
                          name="name"
                          value={this.state.type}
                      />
                    </div>

                    <div className="form-group">
                      <h6 className="width70px">Name:</h6>
                      <input
                          disabled={true}
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Web Hook Name"
                          name="name"
                          value={this.state.name}
                      />
                    </div>

                    <div className="form-group">
                      <h6>Target URL:</h6>
                      <input
                          disabled={true}
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Target url"
                          name="url"
                          value={this.state.url}
                      />
                    </div>

                    <div className="form-group">
                      <h6>Country:</h6>
                      <input
                          disabled={true}
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Country"
                          name="url"
                          value={this.state.country}
                      />
                    </div>

                    {
                      this.state.type === AIR_DATA ?
                          <div>
                            <div className="form-group">
                              <h6>Region:</h6>
                              <input
                                  disabled={true}
                                  type="text"
                                  className="form-control form-control-lg"
                                  placeholder="Country"
                                  name="url"
                                  value={this.state.region}
                                  onChange={this.onChange}
                              />
                            </div>
                            <div className="form-group">
                              <h6>City:</h6>
                              <input
                                  disabled={true}
                                  type="text"
                                  className="form-control form-control-lg"
                                  placeholder="Country"
                                  name="url"
                                  value={this.state.city}
                                  onChange={this.onChange}
                              />
                            </div>
                          </div> : <div/>
                    }
                  </form> : <Loader/>

                }
              </div>
            </div>
          </div>
        </div>
    );
  }
}

WebHookInfo.propTypes = {
  createWebHook: PropTypes.func.isRequired,
  getWebHook: PropTypes.func.isRequired,
  webHook: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  webHook: state.webHookData.webHook
});

//Connect React component to a Redux store.
export default connect(mapStateToProps, {createWebHook, getWebHook})(WebHookInfo);
