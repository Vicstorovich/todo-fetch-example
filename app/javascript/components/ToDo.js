import React from "react";
import PropTypes from "prop-types";

class ToDo extends React.Component {
  render() {
    const { items } = this.props;
    return (
      <React.Fragment>
        <h1>Start page ToDo application</h1>
        {/* <App items={items} /> */}
      </React.Fragment>
    );
  }
}

export default ToDo;
