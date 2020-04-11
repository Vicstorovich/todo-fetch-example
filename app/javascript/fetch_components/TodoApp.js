import React from "react";
import App from "./app/";
import PropTypes from "prop-types";

class TodoApp extends React.Component {
  render() {
    console.log("Render TodoApp");
    return (
      <React.Fragment>
        <h1>Start page</h1>
        <App />
      </React.Fragment>
    );
  }
}

export default TodoApp;
