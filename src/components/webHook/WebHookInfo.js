import React, {Component} from "react";
import PropTypes from "prop-types";
import {createWebHook, getWebHook} from "../../actions/webHookActions";
import {connect} from "react-redux";

class UpdateWebHook extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: "",
      name: "",
      type: "",
      url: ""
    };
    this.onChange = this.onChange.bind(this); //binding
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.getWebHook(id, this.props.history);
    // this.props.
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
                    <h6 className="width70px">Type:</h6>
                    <input
                        disabled={true}
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Web Hook Name"
                        name="name"
                        value={this.state.type}
                        onChange={this.onChange}
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
                        onChange={this.onChange}
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
                        onChange={this.onChange}
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
                        onChange={this.onChange}
                    />
                  </div>

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
  webHook: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  webHook: state.webHook.webHook
});

//Connect React component to a Redux store.
export default connect(mapStateToProps, {createWebHook, getWebHook})(UpdateWebHook);
