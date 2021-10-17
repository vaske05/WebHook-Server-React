import React, {Component} from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import {createWebHook, getWebHook} from "../../actions/webHookActions";
import {connect} from "react-redux";
import Select from "react-select";

class UpdateWebHook extends Component {

  constructor() {
    super();

    this.state = {
      id: "",
      name: "",
      type: "",
      url: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this); //binding
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.getWebHook(id, this.props.history);
  }

  //life cycle hooks
  componentWillReceiveProps(nextProps, nextContext) {
    const {
      id,
      name,
      type,
      url
    } = nextProps.webHook;

    this.setState({id, name, type, url});

    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onChangeSelect(e) {
    this.setState({[e.name]: e.value});
  }

  onSubmit(e) {
    e.preventDefault(); // turn off reload
    const newWebHook = {
      id: this.state.id,
      name: this.state.name,
      type: this.state.type,
      url: this.state.url
    };
    this.props.createWebHook(newWebHook, this.props.history);
  }

  render() {
    const {errors} = this.state;
    const whTypes = [
      {value: 'AIR_DATA', label: 'AIR_DATA', name: "type"},
      {value: 'COVID_DATA', label: 'COVID_DATA', name: "type"}
    ];
    return (
        <div className="web_hook">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">
                  Edit Web Hook
                </h5>
                <hr/>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <h6>Select Web Hook type:</h6>
                    <Select className={classnames("", {
                      "is-invalid border-input-red": errors.type,
                    })} options={whTypes} name="type" onChange={this.onChangeSelect}
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
  errors: PropTypes.object.isRequired,
  webHook: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  webHook: state.webHook.webHook
});

//Connect React component to a Redux store.
export default connect(mapStateToProps, {createWebHook, getWebHook})(UpdateWebHook);
