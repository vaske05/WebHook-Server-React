import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createWebHook} from "../../actions/webHookActions";
import classnames from "classnames";
import Select from 'react-select';

class AddWebHook extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      //webHookIdentifier: "",
      type: null,
      url: "",
      errors: {},
    };
    // binding
    this.onChange = this.onChange.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //life cycle hooks
  componentWillReceiveProps(nextProps) {
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
    // if (this.state.type === "") {
    //   this.setState({"type": ""})
    //
    // }
    const newWebHook = {
      name: this.state.name,
      // webHookIdentifier: this.state.webHookIdentifier,
      type: this.state.type,
      url: this.state.url
    };
    this.props.createWebHook(newWebHook, this.props.history);
  }

  render() {
    const {errors} = this.state; // mapping "this.state.errors" to "errors" constant
    const options = [
      {value: 'AIR_DATA', label: 'AIR_DATA', name: "type"},
      {value: 'COVID_DATA', label: 'COVID_DATA', name: "type"}
    ]
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
                    <Select className={classnames("", {
                      "is-invalid border-input-red": errors.type,
                    })} options={options} name="type" defaultValue={this.state.type} onChange={this.onChangeSelect}/>
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
                  {/*<div className="form-group">*/}
                  {/*  <input*/}
                  {/*    type="text"*/}
                  {/*    className={classnames("form-control form-control-lg", {*/}
                  {/*      "is-invalid": errors.projectIdentifier,*/}
                  {/*    })}*/}
                  {/*    placeholder="Unique Project ID"*/}
                  {/*    name="projectIdentifier"*/}
                  {/*    value={this.state.projectIdentifier}*/}
                  {/*    onChange={this.onChange}*/}
                  {/*  />*/}
                  {/*  {errors.projectIdentifier && (*/}
                  {/*    <div className="invalid-feedback">*/}
                  {/*      {errors.projectIdentifier}*/}
                  {/*    </div>*/}
                  {/*  )}*/}
                  {/*</div>*/}


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

AddWebHook.propTypes = {
  createWebHook: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

//Connect React component to a Redux store.
export default connect(mapStateToProps, {createWebHook})(AddWebHook);
