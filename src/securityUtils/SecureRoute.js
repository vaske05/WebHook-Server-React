import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


const SecuredRoute = ({component: Component, security, ...otherProps}) => (
    <Route {...otherProps}
           render={props =>
               security.isAuthenticated === true ? (<Component {...props}/>) : (<Redirect to="/"/>)}/>
);

SecuredRoute.propTypes = {
    security: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    security: state.security
});


export default connect(mapStateToProps, {})(SecuredRoute);