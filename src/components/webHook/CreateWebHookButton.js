import React, {Fragment} from "react";
import {Link} from "react-router-dom";

const CreateWebHookButton = () => {
  // Functional component
  return (
      <Fragment>
        <Link to="/addWebHook" className="btn btn-lg btn-success">
          Create Web Hook
        </Link>
      </Fragment>
  );
};

export default CreateWebHookButton;
