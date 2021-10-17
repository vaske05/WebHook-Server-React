import React, {Component} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Loader from "./layout/Loader";
import CreateWebHookButton from "./webHook/CreateWebHookButton";
import {gelAllWebHooks} from "../actions/webHookActions";
import WebHookItem from "./webHook/WebHookItem";


class Dashboard extends Component {

  constructor() {
    super();
    this.state = {
      isLoaded: false
    }

    this.handleLoading = this.handleLoading.bind(this);
  }

  componentDidMount() {
    if (!this.props.security.isAuthenticated) {
      this.props.history.push("/");
    } else {
      setTimeout(this.handleLoading, 800);
    }

  }

  async handleLoading() {
    await this.props.gelAllWebHooks();
    this.setState({isLoaded: true});
  }


  render() {

    const {webHooks} = this.props.webHook;
    let itemCounter = 0;

    return (
        <div className="web_hooks">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4 text-center">Web Hooks</h1>
                <br/>
                <CreateWebHookButton/>
                <br/>
                <hr/>

                {
                  /* WebHook Item Component */

                  //If data is loaded show "No web hooks found" or found web hooks. Otherwise show loader animation
                  this.state.isLoaded ? (webHooks.length < 1 ?
                      <div className="alert alert-heading text-center" role="alert">No web hooks found.</div> :
                      webHooks.map(webHook => (
                          <WebHookItem key={webHook.id} webHook={webHook} itemCount={itemCounter = itemCounter + 1}/>
                      ))) : (<Loader/>)

                  /* End of WebHook Item Component */
                }

              </div>
            </div>
          </div>
        </div>
    );
  }
}

Dashboard.propTypes = {
  gelAllWebHooks: PropTypes.func.isRequired,
  webHook: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  webHook: state.webHook, // from index.js - combine reducers
  security: state.security
})

export default connect(mapStateToProps, {gelAllWebHooks})(Dashboard);
