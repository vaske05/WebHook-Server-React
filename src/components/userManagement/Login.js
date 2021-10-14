import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {login} from "../../actions/securityActions";


class Login extends Component {

	constructor() {
		super();

		this.state = {
			email: "",
			password: "",
			errors: ""
		}
	}

	// If user is loggedIn, they cannot go to the login page
	componentDidMount() {
		if (this.props.security.isAuthenticated) {
			this.props.history("/dashboard");
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.security.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
		if (nextProps.errors) {
			this.setState({errors: nextProps.errors});
		}
	}

	onChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmit = (e) => {
		e.preventDefault();
		const LoginRequest = {
			email: this.state.email,
			password: this.state.password
		}
		this.props.login(LoginRequest, this.props.history);
	}


	render() {
		const {errors} = this.state;
		return (
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Log In</h1>
							<form onSubmit={this.onSubmit}>
								<div className="form-group">
									<input type="text"
										   className={classNames("form-control form-control-lg", {
											   "is-invalid": errors.email
										   })}
										   placeholder="Email Address"
										   name="email"
										   value={this.state.email}
										   onChange={this.onChange}
									/>
									{
										errors.email && (<div className="invalid-feedback">{errors.email}</div>)
									}
								</div>
								<div className="form-group">
									<input type="password"
										   className={classNames("form-control form-control-lg", {
											   "is-invalid": errors.password
										   })}
										   placeholder="Password"
										   name="password"
										   value={this.state.password}
										   onChange={this.onChange}
									/>
									{
										errors.password && (<div className="invalid-feedback">{errors.password}</div>)
									}
								</div>
								<input type="submit" className="btn btn-success btn-block mt-4 font-weight-bold"
									   value="Log In"/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	login: PropTypes.func.isRequired,
	security: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	security: state.security,
	errors: state.errors
});

export default connect(mapStateToProps, {login})(Login);