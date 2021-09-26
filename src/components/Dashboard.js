import React, {Component} from "react";
// import ProjecItem from "./Project/ProjecItem";
// import CreateProjectButton from "./Project/CreateProjectButton";
import PropTypes from 'prop-types';
// import {gelAllProjects} from '../actions/projectActions';
import {connect} from "react-redux";
import Loader from "./layout/Loader";
import CreateWebHookButton from "./webHook/CreateWebHookButton";


class Dashboard extends Component {

  
  constructor() {
    super();
    this.state = {
      isLoaded: false
    }

    this.handleLoading = this.handleLoading.bind(this);
  }

   componentDidMount() {
     if(!this.props.security.isAuthenticated) {
       this.props.history.push("/");
     } else {
       setTimeout(this.handleLoading, 800);
     }

  }
  
  async handleLoading() {
    // await this.props.gelAllProjects();
    this.setState({isLoaded:true});
  }


  render() {

    // const {projects} = this.props.project;

    return (
      <div className="web_hooks">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Web Hooks</h1>
              <br/>
              <CreateWebHookButton></CreateWebHookButton>
              <br/>
              <hr />

              {
                /* WebHook Item Component */
                
                //If data is loaded show "No projects found" or found projects. Otherwise show loader animation
                this.state.isLoaded ? /*TODO: Remove this div when uncomment ->*/ <div>Hooks</div>/*( projects.length < 1 ? <div className="alert alert-info text-center" role="alert">No projects found.</div> :
                  projects.map(project=> (
                    <ProjecItem key={project.id} project={project}></ProjecItem>
                  )))*/ : (<Loader/>)

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
  // gelAllProjects: PropTypes.func.isRequired,
  // project:  PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  // project: state.project, // from index.js - combine reducers
  security: state.security
})

export default connect(mapStateToProps, { /*gelAllProjects*/ })(Dashboard);
