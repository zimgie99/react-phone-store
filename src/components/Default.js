import React from "react";

const Default = (props) => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto text-center text-title text-uppercase pt-5">
            <h1 className="display-3">404</h1>
            <h2>Error</h2>
            <h3>The request URL : <span className="text-danger">{props.location.pathname}</span> was not found</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Default;
