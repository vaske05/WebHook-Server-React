import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {deleteWebHook} from "../../actions/webHookActions";
import {COVID_DATA} from "../../constants";


class WebHookItem extends Component {

  onDeleteClick = webHook => {
    this.props.deleteWebHook(webHook);
  }

  render() {
    const {webHook} = this.props;
    const {itemCount} = this.props;

    return (
        <div className="container">
          <div className="card card-body bg-light mb-3">
            <div className="row">
              <div className="col-1">
                <span className="mx-auto">{itemCount}.</span>
              </div>
              <div className="col-lg-6 col-md-4 col-8">
                <h3>{webHook.name}</h3>
                <ul className="margin-bottom-0">
                  <li>Type: {webHook.type}</li>
                  <li>URL: {webHook.url}</li>
                </ul>
                {
                  webHook.type === COVID_DATA ? (<ul>
                    <li>Country: {webHook.country}</li>
                  </ul>) : (<ul>
                    <li>Country: {webHook.country}</li>
                    <li>Region: {webHook.region}</li>
                    <li>City: {webHook.city}</li>
                  </ul>)
                }
              </div>
              <div className="col-5 d-none d-lg-block">
                <ul className="list-group">
                  <Link to={`/webHookInfo/${webHook.id}`}>
                    <li className="list-group-item update">
                      <i className="fa fa-success pr-1"> Info</i>
                    </li>
                  </Link>
                  <Link to={`/updateWebHook/${webHook.id}`}>
                    <li className="list-group-item update">
                      <i className="fa fa-edit pr-1"> Update</i>
                    </li>
                  </Link>
                  <li onClick={this.onDeleteClick.bind(this, webHook)}
                      className="list-group-item delete">
                    <i className="fa fa-minus-circle pr-1"> Delete</i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

WebHookItem.propTypes = {
  deleteWebHook: PropTypes.func.isRequired
}

//Connect React component to a Redux store.
export default connect(null, {deleteWebHook})(WebHookItem);
